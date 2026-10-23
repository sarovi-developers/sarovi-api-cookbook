# اولین درخواست با cURL

اول `SAROVI_API_KEY` را در محیط محلی خودتان تنظیم کنید. هر درخواست تازه باید کلید منطقی تازه داشته باشد؛ برای پیگیری عملیات قبلی، همان کلید اصلی را نگه دارید.

```sh
export SAROVI_REQUEST_KEY="$(python3 -c 'import uuid; print(uuid.uuid4())')"
curl --fail-with-body --max-time 300 \
  https://api.sarovi.site/v1/chat/completions \
  -H "Authorization: Bearer $SAROVI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: $SAROVI_REQUEST_KEY" \
  --data '{"model":"z-ai/glm-5.3-flash","messages":[{"role":"user","content":"یک سلام کوتاه فارسی بنویس."}],"max_tokens":512}'
```

به درخواست پولی `--location` یا تکرار خودکار اضافه نکنید. اگر اتصال قطع شد، شناسهٔ درخواست و کلید منطقی اصلی را نگه دارید و نتیجهٔ نهایی را در کنسول بررسی کنید. کلید خصوصی را در تصویر صفحه، تاریخچهٔ منتشرشدهٔ ترمینال یا گزارش عمومی نگذارید.
