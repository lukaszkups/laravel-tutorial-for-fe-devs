# API routes & JSON

> Sometimes Blade isn't the consumer - your React/Vue/SPA is. Laravel can speak JSON without becoming a different framework.

## Returning JSON

```php
<?php

Route::get('/api/posts', function () {
    return Post::query()->latest()->paginate(20);
});

// in a controller
return response()->json(['ok' => true], 201);
```

Eloquent models / collections / paginators know how to serialize. Customize with API Resources when the shape matters:

```bash
php artisan make:resource PostResource
```

```php
<?php

return PostResource::collection($posts);
```

## api.php vs web.php

API routes typically skip CSRF/session cookie assumptions and use token / Sanctum auth instead. Web routes are cookie-session first.

If you're building a first-party SPA on the same domain, **Laravel Sanctum** (cookie SPA auth or tokens) is the usual path - read its docs when you go there. Don't invent JWT until you know why you need it.

## Validation errors for APIs

Same `validate()` - Laravel detects JSON requests and returns **422** with an `errors` object. Your FE form library can map field → messages.

## Versioning / structure (keep it light)

```php
<?php

Route::prefix('api')->group(function () {
    Route::get('/posts', [PostApiController::class, 'index']);
});
```

Folders like `app/Http/Controllers/Api/` are convention, not magic.

## CORS

If the SPA is on another origin, configure CORS (Laravel has middleware / config for this). Same-origin + Sanctum cookies is simpler for learning.

## Compared to Next API routes

| Next route handler | Laravel |
| --- | --- |
| `Response.json()` | `response()->json()` / Resources |
| cookies / JWT choices | session (web) or Sanctum |
| zod validation | `$request->validate` / Form Requests |

You're still writing request handlers - the folder names changed.

Best,

-- ł.
