# Migrations & Eloquent

> Migrations are schema in git. Eloquent is Active Record on top of PDO. You already know prepared statements - this is the ergonomic layer.

## Migration

```bash
php artisan make:model Post -m
# model + migration
```

```php
<?php

// database/migrations/xxxx_create_posts_table.php

public function up(): void
{
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('body');
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        $table->timestamps();
    });
}
```

```bash
php artisan migrate
php artisan migrate:rollback
```

Comments for the code above:

- `id()` = big integer PK
- `timestamps()` = `created_at` / `updated_at`
- `constrained()` assumes `users.id` - nice defaults, readable schema

## The model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    protected $fillable = ['title', 'body', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

`$fillable` = mass-assignment allowlist. Without it, `Post::create($request->all())` is how apps get owned.

## CRUD-ish

```php
<?php

$post = Post::query()->create([
    'title' => 'Hello',
    'body' => 'First post',
    'user_id' => auth()->id(),
]);

$post = Post::query()->findOrFail($id);

Post::query()->where('user_id', $userId)->latest()->get();

$post->update(['title' => 'Updated']);
$post->delete();
```

`findOrFail` throws 404-friendly exception - good for route actions.

## Query Builder vs Eloquent

```php
<?php

use Illuminate\Support\Facades\DB;

DB::table('posts')->where('id', 1)->first(); // arrays/stdClass-ish
Post::query()->where('id', 1)->first();      // Post model
```

Both sit on PDO. Eloquent adds models, events, relations, casts.

## Casts (FE: think Zod output types)

```php
<?php

protected function casts(): array
{
    return [
        'published_at' => 'datetime',
        'is_draft' => 'boolean',
    ];
}
```

## Compared to PDO chapter

| PDO tutorial | Eloquent |
| --- | --- |
| `prepare` + `execute` | query builder methods |
| `fetch(PDO::FETCH_ASSOC)` | model / collection |
| transactions `$pdo->beginTransaction()` | `DB::transaction(fn () => …)` |
| manual SQL migrations | migration classes |

When Eloquent gets awkward (complex reports, weird joins), drop to query builder or raw bindings - you still know SQL.

Best,

-- ł.
