import {randomUUID} from 'node:crypto';
import {client, settings, answer} from './api.mjs';

const command = process.argv[2] || 'models';
const demo = process.argv.includes('--demo');
const config = settings();
const api = client(config, demo ? demoFetch : fetch);
const model = config.model;
const base = {model, max_tokens: 512};
const prompt = process.argv.find(arg => arg.startsWith('--prompt='))?.slice(9) || 'Say hello in Persian and English in one sentence.';
const logicalKey = () => { const key = randomUUID(); console.error('Idempotency-Key: ' + key); return key; };
const usage = result => console.error(JSON.stringify({request_id: result.requestId, usage: result.data.usage}, null, 2));

async function run() {
  if (command === 'models') {
    const result = await api.get('/models');
    for (const item of result.data || []) console.log(item.id);
  } else if (command === 'receipt') {
    const key = process.argv.find(arg => arg.startsWith('--idempotency-key='))?.split('=').slice(1).join('=');
    if (!key) throw new Error('Provide --idempotency-key=THE_ORIGINAL_KEY. Requires usage:read.');
    console.log(JSON.stringify(await api.get('/requests/lookup?idempotency_key=' + encodeURIComponent(key)), null, 2));
  } else if (command === 'hello') {
    const key = logicalKey();
    const result = await api.chat({...base, messages: [{role: 'user', content: prompt}]}, key);
    console.log(answer(result.data)); usage(result);
  } else if (command === 'stream') {
    const key = logicalKey();
    const result = await api.stream({...base, messages: [{role: 'user', content: prompt}]}, key);
    let finishReason, tokens;
    for await (const event of result.events) {
      const choice = event.choices?.[0];
      if (choice?.delta?.content) process.stdout.write(choice.delta.content);
      if (choice?.finish_reason) finishReason = choice.finish_reason;
      if (event.usage) tokens = event.usage;
    }
    console.log();
    if (!finishReason || finishReason !== 'stop') throw new Error('Stream was not a complete text answer: ' + finishReason);
    console.error(JSON.stringify({request_id: result.requestId, usage: tokens}));
  } else if (command === 'structured') {
    const schema = {type: 'object', properties: {title: {type: 'string'}, tasks: {type: 'array', items: {type: 'string'}}}, required: ['title', 'tasks'], additionalProperties: false};
    const result = await api.chat({...base, messages: [{role: 'user', content: 'Create a three-task plan for adding a search box to a website.'}],
      response_format: {type: 'json_schema', json_schema: {name: 'task_plan', schema, strict: true}}}, logicalKey());
    const data = JSON.parse(answer(result.data));
    if (typeof data.title !== 'string' || !Array.isArray(data.tasks) || data.tasks.some(t => typeof t !== 'string')) throw new Error('Unexpected structured result. Do not retry automatically.');
    console.log(JSON.stringify(data, null, 2)); usage(result);
  } else if (command === 'tools') {
    const messages = [{role: 'user', content: 'Use add_numbers to calculate 4.5 plus 3.'}];
    const tools = [{type: 'function', function: {name: 'add_numbers', description: 'Add two numbers locally.',
      parameters: {type: 'object', properties: {a: {type: 'number'}, b: {type: 'number'}}, required: ['a', 'b'], additionalProperties: false}}}];
    const first = await api.chat({...base, messages, tools, tool_choice: 'required'}, logicalKey());
    const message = first.data.choices?.[0]?.message;
    if (!message?.tool_calls?.length || message.tool_calls.length > 4) throw new Error('Expected one to four tool calls.');
    messages.push(message);
    for (const call of message.tool_calls) {
      const args = JSON.parse(call.function.arguments);
      if (call.function.name !== 'add_numbers' || !Number.isFinite(args.a) || !Number.isFinite(args.b)) throw new Error('Rejected unapproved tool or arguments.');
      messages.push({role: 'tool', tool_call_id: call.id, content: JSON.stringify({sum: args.a + args.b})});
    }
    const result = await api.chat({...base, messages}, logicalKey());
    console.log(answer(result.data)); usage(first); usage(result);
  } else throw new Error('Choose models, hello, stream, structured, tools, or receipt.');
}

let demoCalls = 0;
async function demoFetch(url, init) {
  if (url.endsWith('/models')) return Response.json({data: [{id: config.model}]});
  if (url.includes('/requests/lookup?')) return Response.json({data: [], demo: true});
  const body = JSON.parse(init.body); demoCalls++;
  const headers = {'x-request-id': 'demo-request'};
  const use = {prompt_tokens: 0, completion_tokens: 0, total_tokens: 0};
  if (body.stream) {
    const events = [{choices: [{delta: {content: 'سلام! Hello from the offline demo.'}, finish_reason: null}]},
      {choices: [{delta: {}, finish_reason: 'stop'}], usage: use}];
    return new Response(events.map(e => 'data: ' + JSON.stringify(e) + '\n\n').join('') + 'data: [DONE]\n\n',
      {headers: {...headers, 'content-type': 'text/event-stream'}});
  }
  let message = {role: 'assistant', content: 'سلام! Hello from the offline demo.'};
  if (body.response_format) message.content = JSON.stringify({title: 'Add search', tasks: ['Build an input', 'Filter items', 'Test keyboard access']});
  if (body.tools && demoCalls === 1) message = {role: 'assistant', content: null, tool_calls: [
    {id: 'demo-call', type: 'function', function: {name: 'add_numbers', arguments: '{"a":4.5,"b":3}'}}]};
  else if (body.messages.some(m => m.role === 'tool')) message.content = '4.5 + 3 = 7.5';
  return Response.json({id: 'demo-response', model: body.model, choices: [{index: 0, message, finish_reason: message.tool_calls ? 'tool_calls' : 'stop'}], usage: use}, {headers});
}

if (demo) config.key = 'offline-demo';
run().catch(error => { console.error(error.message); process.exitCode = 1; });
