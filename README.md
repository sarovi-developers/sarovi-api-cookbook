# نمونه‌کدهای API ساروی

از اولین پاسخ تا متن زنده، خروجی JSON و فراخوانی ابزار؛ با JavaScript و Python، بدون نصب کتابخانهٔ اضافی.

[ساخت کلید API](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_key_fa) · [مدل‌ها و قیمت‌ها](https://api.sarovi.site/developers/pricing?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_pricing_fa) · [اولین درخواست](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_first_request_fa)

## اول بدون هزینه امتحان کنید

Node.js نسخهٔ ۲۴ به بالا یا Python نسخهٔ ۳٫۱۰ به بالا لازم است.

```sh
git clone https://github.com/sarovi-developers/sarovi-api-cookbook.git
cd sarovi-api-cookbook
node examples.mjs hello --demo
# یا با پایتون:
python3 example.py hello --demo
```

حالت `--demo` فقط نمونهٔ محلی است؛ به مدل درخواست نمی‌فرستد و اعتبار مصرف نمی‌کند.

## اولین درخواست واقعی

در کنسول ساروی کلید پروژه بسازید و سقف مصرف کوچکی تعیین کنید. برای ارسال پیام، دسترسی `responses:write` و برای فهرست مدل‌ها `models:read` لازم است.

```sh
cp .env.example .env
# کلید خصوصی خودتان را در .env بگذارید.
node --env-file=.env examples.mjs hello
```

نمونهٔ پایتون متغیرهای محیط را می‌خواند:

```sh
export SAROVI_API_KEY="YOUR_SAROVI_API_KEY"
python3 example.py hello
```

در PowerShell از `$env:SAROVI_API_KEY="YOUR_SAROVI_API_KEY"` استفاده کنید. کلید را در مرورگر، تصویر صفحه یا مخزن عمومی نگذارید.

## نمونه‌ها

| کار | دستور |
| --- | --- |
| فهرست مدل‌ها | `node --env-file=.env examples.mjs models` |
| اولین پاسخ | `node --env-file=.env examples.mjs hello` |
| پاسخ زنده در ترمینال | `node --env-file=.env examples.mjs stream` |
| برنامهٔ کار با خروجی JSON اعتبارسنجی‌شده | `node --env-file=.env examples.mjs structured` |
| فراخوانی تابع جمع محلی | `node --env-file=.env examples.mjs tools` |
| پیگیری مصرف یک درخواست نامعلوم | `node --env-file=.env examples.mjs receipt --idempotency-key=ORIGINAL_KEY` |

به نمونه‌های تولید پاسخ، `--demo` اضافه کنید تا آفلاین اجرا شوند. نمونهٔ ابزار دو درخواست جدا مصرف می‌کند. خروجی ساختاریافته و ابزارها به مدل مناسب نیاز دارند؛ مدل را با `SAROVI_MODEL` انتخاب کنید و قابلیت و قیمت فعلی را در کنسول ببینید. محدودیت توکن، سقف پولی نیست. پیگیری مصرف به دسترسی `usage:read` نیاز دارد.

اگر پاسخ قطع شود، درخواست پولی خودکار تکرار نمی‌شود. کلید اصلی و شناسهٔ درخواست را نگه دارید و قبل از ارسال مجدد، مصرف همان عملیات را بررسی کنید.

## چیزی بسازید

- [چت آماده با پاسخ زنده](https://github.com/sarovi-developers/sarovi-ai-chat-starter)
- [ترجمه و دسته‌بندی فایل CSV](https://github.com/sarovi-developers/sarovi-batch-tools)
- [اتصال به Continue](docs/continue.md)
- [اولین درخواست با cURL](docs/curl.md)
- [رفتار API، هزینه و حریم خصوصی](docs/API-NOTES.md)

## بررسی کد

```sh
node --test test/*.test.mjs
python3 -m py_compile example.py sarovi_http.py
```

آزمون‌ها آفلاین‌اند: متن فارسی تکه‌تکه، پایان ناقص پاسخ زنده، خطای ارائه‌دهنده، جلوگیری از تغییر مسیر و ارسال یک‌بارهٔ درخواست را بررسی می‌کنند. همهٔ مدل‌های زنده با این آزمون‌ها تأیید نشده‌اند.

کد با مجوز [MIT](LICENSE.fa.md) منتشر شده است؛ مصرف API جداگانه محاسبه می‌شود. نتیجهٔ درخواست واقعی و مصرف نهایی را در کنسول ساروی ببینید.
