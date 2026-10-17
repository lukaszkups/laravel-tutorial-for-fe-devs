<div v-pre>

# Cheatsheet

> Pocket Laravel. Assumes the [PHP tutorial](/lab/php-tutorial-for-fe-devs/) cheatsheet already lives in your head.

## Create & run

```bash
composer create-project laravel/laravel app && cd app
php artisan serve
npm install && npm run dev
```

## Routes

```php
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::resource('posts', PostController::class)->middleware('auth');
Route::get('/posts/{post}', …); // model binding
```

```bash
php artisan route:list
```

## Controller returns

```php
return view('posts.index', compact('posts'));
return redirect()->route('posts.index');
return response()->json($data, 201);
abort(403);
```

## Blade

```blade
@extends('layouts.app')
@section('content') … @endsection
{{ $escaped }}
{!! $raw !!}
@csrf
@method('PUT')
{{ old('title') }}
@error('title') {{ $message }} @enderror
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

## Validation

```php
$data = $request->validate([
    'title' => ['required', 'string', 'max:255'],
]);
```

## Eloquent

```php
Post::query()->with('user')->latest()->paginate(10);
Post::query()->create($data);
$post = Post::query()->findOrFail($id);
$post->update($data);
$user->posts()->create($data);
DB::transaction(fn () => …);
```

## Auth

```php
auth()->check();
auth()->user();
$this->actingAs($user); // tests
$this->authorize('update', $post);
```

```php
Route::middleware('auth')->group(…);
```

## Artisan

```bash
php artisan make:model Post -mfs
php artisan migrate
php artisan tinker
php artisan test
php artisan optimize:clear
```

## Config

```php
config('app.name');
// env() only inside config/*.php
```

```ini
APP_DEBUG=true          # local only
QUEUE_CONNECTION=sync   # local default
MAIL_MAILER=log
```

## [PHP tutorial](/lab/php-tutorial-for-fe-devs/) → Laravel

| PHP tutorial | Laravel |
| --- | --- |
| mini-router | `routes/web.php` |
| `$_POST` + validate | `$request->validate` |
| CSRF session token | `@csrf` + middleware |
| PDO | Eloquent / Query Builder |
| `password_hash` | `Hash` / cast `hashed` |
| sessions | `auth` + session driver |
| front controller | `public/index.php` |

---

That's enough to unblock a coding session. For the why, jump back to the chapters.

Best,

-- ł.

</div>
