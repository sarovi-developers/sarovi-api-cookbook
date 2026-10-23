# Use the Sarovi API in Continue

A configuration recipe for Continue's OpenAI-compatible chat endpoint. It has been checked against Continue's current configuration documentation; a live editor session has not been certified here.

Add this model to your local Continue config. Use a model with the required capability, and store your key in Continue's local secret mechanism. Never commit a filled-in key.

```yaml
name: Sarovi local config
version: 0.0.1
schema: v1
models:
  - name: Sarovi
    provider: openai
    model: z-ai/glm-5.3-flash
    apiBase: https://api.sarovi.site/v1
    apiKey: YOUR_SAROVI_API_KEY
    useResponsesApi: false
    roles:
      - chat
      - edit
```

The provider label selects the request format; the key and endpoint here belong to Sarovi. This configuration does not enable fill-in-the-middle autocomplete. Before enabling agent tools, check the model's tool support and your editor's file/action approvals.

[Continue: OpenAI-compatible providers](https://docs.continue.dev/customize/model-providers/top-level/openai) · [Sarovi compatibility](https://api.sarovi.site/developers/docs/compatibility)
