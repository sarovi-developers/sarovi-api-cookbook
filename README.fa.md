# نمونه‌کدهای API ساروی

از اولین پاسخ تا متن زنده، خروجی JSON و فراخوانی ابزار؛ با JavaScript و Python، بدون نصب کتابخانهٔ اضافی.

[English](README.md) · [ساخت کلید API](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_key_fa) · [مدل‌ها و قیمت](https://api.sarovi.site/developers/pricing?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_pricing_fa)

## اول بدون هزینه امتحان کنید

Node.js نسخهٔ ۲۴ به بالا یا Python نسخهٔ ۳٫۱۰ به بالا لازم است.

```sh
git clone https://github.com/sarovi-developers/sarovi-api-cookbook.git
cd sarovi-api-cookbook
node examples.mjs hello --demo
python3 example.py hello --demo
```

حالت demo فقط نمونهٔ محلی است؛ درخواستی به مدل نمی‌فرستد و اعتبار مصرف نمی‌کند.

## اولین درخواست واقعی

```sh
cp .env.example .env
# کلید خصوصی خودتان را در .env بگذارید.
node --env-file=.env examples.mjs hello
```

دستور `stream` پاسخ زنده، `structured` خروجی ساختاریافته و `tools` فراخوانی یک تابع جمع محلی را نشان می‌دهد. نمونهٔ ابزار دو درخواست جدا مصرف می‌کند. کلید را در مرورگر یا GitHub نگذارید.

مدل پیش‌فرض از قرارداد عمومی فعلی انتخاب شده است. مدل، قابلیت‌ها و هزینهٔ روز را در کنسول بررسی کنید و برای کلید سقف مصرف کوچک بگذارید. محدودیت توکن، سقف پولی نیست.

اگر پاسخ قطع شد، درخواست پولی خودکار تکرار نمی‌شود. [راهنمای درخواست و پیگیری](docs/API-NOTES.md) را ببینید و قبل از ارسال مجدد، مصرف همان درخواست را بررسی کنید.

[چت آماده](https://github.com/sarovi-developers/sarovi-ai-chat-starter) · [ابزارهای CSV](https://github.com/sarovi-developers/sarovi-batch-tools) · [راهنمای اولین پاسخ](https://api.sarovi.site/developers/start?utm_source=github&utm_medium=organic&utm_campaign=developer_tools_202610&utm_content=sarovi-api-cookbook_first_request_fa)

آزمون‌ها با دادهٔ ساختگی انجام می‌شوند؛ استفاده از همهٔ مدل‌های زنده تأیید نشده است. کد نمونه با مجوز MIT منتشر می‌شود؛ مصرف API جداگانه محاسبه می‌شود.
