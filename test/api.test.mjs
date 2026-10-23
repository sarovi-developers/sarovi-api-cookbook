import test from 'node:test';
import assert from 'node:assert/strict';
import {client, parseEvents, settings} from '../api.mjs';

const stream = bytes => new ReadableStream({start(c) { for (const part of bytes) c.enqueue(part); c.close(); }});
const encode = text => new TextEncoder().encode(text);
test('Persian text survives split UTF-8 packets and CRLF framing', async () => {
  const bytes = encode('data: {"choices":[{"delta":{"content":"سلام"}}]}\r\n\r\ndata: [DONE]\r\n\r\n');
  const chunks = Array.from(bytes, byte => new Uint8Array([byte]));
  const events = [];
  for await (const e of parseEvents(stream(chunks))) events.push(e);
  assert.equal(events[0].choices[0].delta.content, 'سلام');
});
test('early EOF is not a successful stream', async () => {
  await assert.rejects(async () => { for await (const e of parseEvents(stream([encode('data: {"choices":[]}\n\n')]))) void e; }, /STREAM_ENDED_EARLY/);
});
test('a streamed API error is not treated as a successful HTTP response', async () => {
  await assert.rejects(async () => { for await (const e of parseEvents(stream([encode('data: {"error":{"code":"PROVIDER_BUSY"}}\n\n')]))) void e; }, /PROVIDER_BUSY/);
});
test('a charged POST is sent only once and preserves its logical key', async () => {
  let count = 0;
  const api = client({base: 'https://api.sarovi.site/v1', key: 'test-only', model: 'fixture'}, async (url, init) => {
    count++; assert.equal(url, 'https://api.sarovi.site/v1/chat/completions');
    assert.equal(init.redirect, 'error'); assert.equal(init.headers['Idempotency-Key'], 'same-logical-request');
    return Response.json({error: {code: 'PROVIDER_BUSY'}}, {status: 503, headers: {'x-request-id': 'receipt-1'}});
  });
  await assert.rejects(api.chat({messages: []}, 'same-logical-request'), /PROVIDER_BUSY/);
  assert.equal(count, 1);
});
test('credential URLs and non-local insecure base URLs are refused', () => {
  for (const url of ['http://example.com/v1', 'https://key@example.com/v1', 'https://api.sarovi.site/v1?key=x']) {
    assert.throws(() => settings({SAROVI_BASE_URL: url}));
  }
  assert.equal(settings({SAROVI_BASE_URL: 'http://127.0.0.1:4000/v1'}).base, 'http://127.0.0.1:4000/v1');
});
