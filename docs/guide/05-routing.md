# Routing

> `routes/web.php` is your React Router / Vue Router config - but for the server. You've already built the toy version.

## Basic routes

```php
<?php

// routes/web.php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello/{name}', function (string $name) {
    return "Hello, {$name}";
});

Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
```

Comments for the code above:

- Closures are fine for tiny experiments; controllers scale better
- `{name}` is the same idea as your mini-router params
- `->name('posts.index')` gives you stable links (`route('posts.index')`) so URLs can change without hunting strings

## Verb helpers

`get`, `post`, `put`, `patch`, `delete`, `options`, and `match` / `any`. Browser forms only do GET/POST natively - Laravel spoofs PUT/PATCH/DELETE via `_method` (more in the forms chapter).

## Groups, prefixes, middleware

```php
<?php

Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', PostController::class);
});
```

`Route::resource` wires the classic 7 REST actions (`index`, `create`, `store`, `show`, `edit`, `update`, `destroy`). Run `php artisan route:list` after - you'll see them.

## Route model binding

```php
<?php

Route::get('/posts/{post}', function (Post $post) {
    return view('posts.show', compact('post'));
});
```

If `{post}` is an id (by default), Laravel fetches `Post::findOrFail($id)` for you. 404 if missing. Feels like magic the first time - it's just a resolver hooked into the router.

## web vs api

- `routes/web.php` - sessions, cookies, CSRF (browser apps)
- `routes/api.php` - typically stateless / token auth, JSON (when present in your version's skeleton)

Same router; different default middleware stacks.

## FE comparison

| Front-end router | Laravel |
| --- | --- |
| `<Route path="/posts/:id">` | `/posts/{post}` |
| nested layouts | route groups + Blade layouts |
| loaders | controller / route action |
| link helpers | `route('name')`, `url('/…')` |

Next: putting logic in controllers instead of fat closures.

Best,

-- ł.
