# Relationships & N+1

> Relations are the ORM feature that feels amazing until you accidentally fire 200 queries on a list page. Let's enjoy them carefully.

## Common relation types

```php
<?php

// User.php
public function posts(): HasMany
{
    return $this->hasMany(Post::class);
}

// Post.php
public function user(): BelongsTo
{
    return $this->belongsTo(User::class);
}

public function tags(): BelongsToMany
{
    return $this->belongsToMany(Tag::class);
}
```

Usage:

```php
<?php

$user->posts;           // Collection of posts
$post->user->name;      // related user
$post->tags()->attach($tagId);
```

## Eager loading (the important habit)

**N+1 problem** - list 50 posts, each touches `$post->user` → 1 + 50 queries.

```php
<?php

// bad on index pages
$posts = Post::query()->latest()->get();
foreach ($posts as $post) {
    echo $post->user->name; // lazy query each time
}

// good
$posts = Post::query()->with('user')->latest()->get();
```

`with('user.profile', 'tags')` nests. `withCount('posts')` adds counts without loading rows.

Laravel Debugbar / `DB::listen` / Telescope - use something to **see** query counts while learning. Your FE brain knows "waterfalls"; this is the server equivalent.

## Lazy vs eager (FE analogy)

| Front-end | Eloquent |
| --- | --- |
| waterfall fetches in a list | lazy relations in a loop |
| React Query `prefetch` / GraphQL includes | `with(...)` |
| over-fetching | `with` too much data |

## Creating related models

```php
<?php

$user->posts()->create([
    'title' => 'Hi',
    'body' => '…',
]);
```

Sets `user_id` for you. Cute and useful.

## Soft deletes (quick peek)

```php
<?php

use SoftDeletes;
// + $table->softDeletes() in migration
```

`delete()` sets `deleted_at`; queries hide those rows by default. Know it exists when data "vanishes" but the row is still in the DB.

Default rule for list pages: **if you use a relation in the loop, eager load it.**

Best,

-- ł.
