<div v-pre>

# Auth

> Sessions + password hashes + middleware - you already know the pieces. Laravel wires them into `auth()->user()` and starter kits so you don't rebuild login every project.

## Mental model

1. User submits credentials
2. Hash check (`password_verify` energy via `Hash` / User model)
3. Session regenerate + store user id
4. `auth` middleware rejects guests on protected routes
5. Logout invalidates session

Same as the [PHP tutorial](/lab/php-tutorial-for-fe-devs/) sessions chapter - with helpers.

## Starter kits (pick one when you want UI fast)

Laravel's first-party kits change names over time (Breeze, Jetstream, newer official starters…). Roughly:

- **Blade + simple auth** - best for learning the framework itself
- **Livewire / Inertia** kits - more FE framework opinion

For this tutorial's learning path: install the simplest Blade-oriented kit when you want login screens, **or** roll a minimal login by hand once so you see the session calls.

```bash
# example - check current docs for the exact kit command in your Laravel version
composer require laravel/breeze --dev
php artisan breeze:install blade
npm install && npm run build
php artisan migrate
```

## Using auth in app code

```php
<?php

if (auth()->check()) {
    $id = auth()->id();
    $user = auth()->user();
}

// in a controller
public function store(Request $request)
{
    $request->user()->posts()->create(…);
}
```

```blade
@auth
  <form method="POST" action="{{ route('logout') }}">
    @csrf
    <button>Log out</button>
  </form>
@endauth
```

## Protecting routes

```php
<?php

Route::middleware('auth')->group(function () {
    Route::resource('posts', PostController::class);
});
```

Guests hitting these get redirected to login (web) or 401 (JSON expectations).

## Gates & policies (authorization ≠ authentication)

AuthN = who are you? AuthZ = are you allowed?

```bash
php artisan make:policy PostPolicy --model=Post
```

```php
<?php

public function update(User $user, Post $post): bool
{
    return $user->id === $post->user_id;
}

// controller
$this->authorize('update', $post);
```

Front-end analogy: auth context vs permission checks on buttons - except the server must enforce it. Always. UI hiding is not security.

## Passwords

Still `Hash::make` / cast `'password' => 'hashed'` on the User model in modern Laravel. Don't roll bcrypt yourself.

Best,

-- ł.

</div>
