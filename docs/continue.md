# استفاده از API ساروی در Continue

این نمونهٔ تنظیمات، اتصال چت سازگار با OpenAI در Continue را به API ساروی وصل می‌کند. قالب با مستندات فعلی Continue بررسی شده است؛ اجرای زندهٔ داخل ویرایشگر در این مجموعه تأیید نشده است.

مدل زیر را به تنظیمات محلی Continue اضافه کنید. مدل باید قابلیت مورد نیاز را داشته باشد. کلید را با سازوکار محلی نگهداری رازهای Continue وارد کنید و فایل حاوی کلید واقعی را منتشر نکنید.

```yaml
name: تنظیمات محلی ساروی
version: 0.0.1
schema: v1
models:
  - name: ساروی
    provider: openai
    model: z-ai/glm-5.3-flash
    apiBase: https://api.sarovi.site/v1
    apiKey: YOUR_SAROVI_API_KEY
    useResponsesApi: false
    roles:
      - chat
      - edit
```

نام `provider` قالب درخواست را تعیین می‌کند؛ نشانی و کلید این تنظیمات متعلق به ساروی است. این نمونه تکمیل خودکار وسط کد را فعال نمی‌کند. پیش از استفاده از ابزارهای عامل، پشتیبانی مدل و مجوزهای دسترسی به فایل و اجرای عمل در ویرایشگر را بررسی کنید.

[راهنمای رسمی ارائه‌دهندگان سازگار در Continue](https://docs.continue.dev/customize/model-providers/top-level/openai) · [سازگاری API ساروی](https://api.sarovi.site/developers/docs/compatibility)
