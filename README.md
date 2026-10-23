# Sarovi API cookbook

Runnable examples for your first AI response, streaming text, structured JSON, and function tools. JavaScript and Python; no package install required.

[فارسی](README.fa.md) · [Create a key](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_key) · [Models & pricing](https://api.sarovi.site/developers/pricing?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_pricing)

## Try it in 30 seconds

Requires Node.js 24+ or Python 3.10+.

```sh
git clone https://github.com/sarovi-developers/sarovi-api-cookbook.git
cd sarovi-api-cookbook
node examples.mjs hello --demo
# Or:
python3 example.py hello --demo
```

The demo is offline. To call a model, create a Sarovi key, then:

```sh
cp .env.example .env
# Edit .env: set your private SAROVI_API_KEY.
node --env-file=.env examples.mjs hello
```

Python reads environment variables:

```sh
export SAROVI_API_KEY="YOUR_SAROVI_API_KEY"
python3 example.py hello
```

In PowerShell, use `$env:SAROVI_API_KEY="YOUR_SAROVI_API_KEY"`. Set a small key budget in the console before a real run.

## Recipes

| Task | Command |
| --- | --- |
| Discover available models | `node --env-file=.env examples.mjs models` |
| First response | `node --env-file=.env examples.mjs hello` |
| Stream text to your terminal | `node --env-file=.env examples.mjs stream` |
| Return a validated task-plan object | `node --env-file=.env examples.mjs structured` |
| Let the model call a safe local addition function | `node --env-file=.env examples.mjs tools` |
| Recover billing metadata after an uncertain response | `node --env-file=.env examples.mjs receipt --idempotency-key=ORIGINAL_KEY` |

Add `--demo` to generation recipes for offline fixtures. Tool calling uses two separate requests. Structured output and tools require a model that supports those features. Change `SAROVI_MODEL` to a current model ID; omitted reasoning settings keep the provider default.

## Build something

- [Streaming chat app](https://github.com/sarovi-developers/sarovi-ai-chat-starter)
- [CSV translation and classification](https://github.com/sarovi-developers/sarovi-batch-tools)
- [Connect Continue](docs/continue.md)
- [cURL first request](docs/curl.md)
- [API behavior, costs, privacy, and validation limits](docs/API-NOTES.md)

## Checks

```sh
node --test test/*.test.mjs
python3 -m py_compile example.py sarovi_http.py
```

Tests are offline: split Persian UTF-8 streams, early EOF, provider errors, redirect refusal, and one-send behavior. Live provider generation has not been exercised by these tests.

[Complete your first API request](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_first_request). Check the settled request in your Sarovi console.

MIT-licensed example code. Sarovi API usage is billed separately.
