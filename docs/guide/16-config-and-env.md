# Config & .env

> `.env` for secrets and environment differences. `config/*.php` for structured app settings. Don't call `env()` deep in random classes.

## The rule

```php
<?php

// .env
MAIL_HOST=smtp.example.com

// config/mail.php reads env(...)
'host' => env('MAIL_HOST', '127.0.0.1'),

// your app code:
config('mail.mailers.smtp.host'); // good
env('MAIL_HOST');                 // avoid outside config files
```

Why: in production, `config:cache` freezes config - `env()` outside config files can return `null` and ruin your afternoon.

## APP_KEY / APP_DEBUG

- `APP_KEY` - encryption / cookies; generated at create-project; don't commit, don't lose casually
- `APP_DEBUG=true` - pretty errors locally; **never** in production (leaks secrets)

## Common env dials

```ini
APP_ENV=local
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
MAIL_MAILER=log
```

`MAIL_MAILER=log` writes emails to the log in local - perfect while learning.

## FE parallel

| Front-end | Laravel |
| --- | --- |
| `.env` + `import.meta.env.VITE_*` | `.env` + `config()` |
| only expose public vars to client | only expose what Blade/JS need |
| never ship secrets to the browser | never `APP_DEBUG` / DB passwords in HTML |

## Clearing caches when things feel haunted

```bash
php artisan optimize:clear
```

Nuke config/route/view/cache in one go during local weirdness.

Best,

-- ł.
