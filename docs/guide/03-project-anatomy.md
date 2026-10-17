# Project anatomy

> As you might have noticed, Laravel's folder tree looks big the first week. Most days you live in five places.

## The map (FE brain edition)

```bash
laravel-playground/
  app/                 # your PHP code (PSR-4 App\)
    Http/Controllers/
    Models/
    # … Providers, etc.
  bootstrap/app.php    # app wiring (routing, middleware, exceptions)
  config/              # PHP config arrays (cached in prod)
  database/
    migrations/
    seeders/
  public/              # web root - index.php lives here
  resources/
    views/             # Blade templates
    css/ js/           # Vite entrypoints
  routes/
    web.php            # browser routes
    console.php        # artisan commands schedule-ish
  storage/             # logs, uploads, cache (not in git much)
  tests/
  vendor/              # Composer - like node_modules
  .env                 # secrets + env-specific values
  artisan              # CLI entry
  composer.json
  package.json         # frontend deps
  vite.config.js
```

## Compared to what you know

| Front-end / [PHP tutorial](/lab/php-tutorial-for-fe-devs/) | Laravel |
| --- | --- |
| `src/` | `app/` |
| `public/index.php` | `public/index.php` |
| router file | `routes/web.php` |
| templates | `resources/views` |
| `npm run dev` | `npm run dev` (Vite) |
| `.env` | `.env` (vlucas/phpdotenv under the hood) |
| `vendor/autoload.php` | required by `public/index.php` for you |

## Where to look when debugging

1. **URL weird?** → `php artisan route:list` / `routes/web.php`
2. **HTML weird?** → `resources/views/…`
3. **DB weird?** → `app/Models/…` + `database/migrations/`
4. **500 / exception?** → `storage/logs/laravel.log`
5. **Config weird?** → `config/*.php` then check `.env` overrides

## Facades vs DI (don't panic)

You'll see:

```php
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', …);
DB::table('users')->get();
```

Facades are static-looking proxies into the service container. Underneath there's still a real object. Controllers can also type-hint dependencies in the constructor - same DI story from the [PHP tutorial](/lab/php-tutorial-for-fe-devs/)'s "before frameworks" chapter.

Use Facades in routes/controllers when it's idiomatic; inject when testing or when the dependency is yours.

## `bootstrap/app.php` (modern Laravel)

This is where the app declares routes, middleware defaults, exception handling - the "kernel config" got slimmer and moved here across recent versions. Peek at it once so it's not mysterious; you won't edit it every day.

Next up: what happens when a request hits `public/index.php`.

Best,

-- ł.
