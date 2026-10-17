# Setup

> Just enough to get `php artisan serve` running. No Forge, no Docker lecture - unless you want Sail later.

## What you need

- PHP 8.3+ (8.4 is great)
- Composer 2.x
- Node 20+ (Laravel's frontend uses Vite - you already know this world)
- A database for later chapters: SQLite is perfect for learning (zero babysitting)

Check:

```bash
php -v
composer -V
node -v
```

## Create a project

```bash
composer create-project laravel/laravel laravel-playground
cd laravel-playground
```

Comments for the code above:

- This downloads Laravel + dependencies into `laravel-playground/`
- It generates `.env` from `.env.example` and an `APP_KEY`
- You're looking at a real app skeleton - not a toy framework demo

## Run it

```bash
php artisan serve
```

Open `http://127.0.0.1:8000` - welcome page. Good enough.

In another terminal (when we hit frontend assets):

```bash
npm install
npm run dev
```

Yes - Laravel ships a Vite setup. Your FE muscle memory applies.

## SQLite for learning (recommended)

In `.env`:

```ini
DB_CONNECTION=sqlite
# leave DB_HOST / DB_DATABASE empty-ish for default database/database.sqlite
```

Create the file if needed:

```bash
touch database/database.sqlite
php artisan migrate
```

MySQL/Postgres work fine too - more moving parts for day one.

## Artisan is your friend

```bash
php artisan list
php artisan about
php artisan route:list
```

`about` is a nice sanity dump (PHP version, env, drivers). `route:list` is the Laravel equivalent of "show me the router table".

## Sail? (optional)

Laravel Sail = Docker Compose wrapper. Handy if you want Redis/MySQL matching production without installing them on the host. For this tutorial, plain PHP + SQLite is enough. Come back to Sail when the team uses it.

## Editor

- PHP Intelephense / Laravel Idea / Laravel extension - whatever helps autocomplete Facades and routes
- Don't commit `.env` - commit `.env.example`

Once the welcome page loads, you're set. Next: where everything lives.

Best,

-- ł.
