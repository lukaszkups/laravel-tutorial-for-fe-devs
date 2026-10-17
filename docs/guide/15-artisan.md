# Artisan & workflows

> `artisan` is the project's CLI. Think npm scripts + code generators + ops switches in one binary.

## Everyday commands

```bash
php artisan serve
php artisan route:list
php artisan migrate
php artisan migrate:fresh --seed   # wipe DB - never on prod
php artisan tinker                 # REPL with app bootstrapped
php artisan about
php artisan make:controller PostController --resource
php artisan make:model Post -mfs   # model, migration, factory, seeder
php artisan make:request StorePostRequest
php artisan make:middleware …
php artisan test
php artisan config:clear
php artisan cache:clear
php artisan view:clear
```

Comments for the list above:

- `tinker` is incredible for poking Eloquent without writing a throwaway route
- `make:*` generators keep namespaces/folders consistent
- `*:clear` commands fix "I changed config but nothing happened" (often config cache in prod)

## Custom commands

```bash
php artisan make:command SendWeeklyReport
```

```php
<?php

protected $signature = 'report:weekly {--dry-run}';

public function handle(): int
{
    // …
    return self::SUCCESS;
}
```

Schedule in `routes/console.php` / bootstrap schedule (version-dependent) - cron hits `php artisan schedule:run` every minute in production.

## Workflow I actually use

1. `route:list` when lost
2. `make:model -m` then fill migration
3. `migrate`
4. Controller + Form Request
5. Blade views
6. Feature test
7. `pint` / formatter if the team uses it

Artisan doesn't replace thinking - it removes typing.

Best,

-- ł.
