# First request with cURL

Set `SAROVI_API_KEY` in your local shell first. Use a fresh logical key for a genuinely new request, and preserve it if you need to inspect the original operation.

```sh
export SAROVI_REQUEST_KEY="$(python3 -c 'import uuid; print(uuid.uuid4())')"
curl --fail-with-body --max-time 300 \
  https://api.sarovi.site/v1/chat/completions \
  -H "Authorization: Bearer $SAROVI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $SAROVI_REQUEST_KEY" \
  --data '{"model":"z-ai/glm-5.3-flash","messages":[{"role":"user","content":"Say hello in Persian and English."}],"max_tokens":512}'
```

Do not add `--location` or automatic retries to a paid request. Keep the request ID and original logical key if the connection fails. Use your console to inspect the settled result. The API key must stay out of screenshots, shell-history shares, and public issues.
