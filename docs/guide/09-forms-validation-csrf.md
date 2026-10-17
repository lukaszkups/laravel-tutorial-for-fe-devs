<div v-pre>

# Forms, validation, CSRF

> The [PHP tutorial](/lab/php-tutorial-for-fe-devs/) made you do CSRF and validation by hand. Laravel turns that into `@csrf` + `$request->validate()`. Same dance, less foot-guns.

## A Blade form

```blade
<form method="POST" action="{{ route('posts.store') }}">
  @csrf

  <label>
    Title
    <input type="text" name="title" value="{{ old('title') }}">
  </label>
  @error('title')
    <p>{{ $message }}</p>
  @enderror

  <label>
    Body
    <textarea name="body">{{ old('body') }}</textarea>
  </label>
  @error('body')
    <p>{{ $message }}</p>
  @enderror

  <button type="submit">Save</button>
</form>
```

Comments for the code above:

- `@csrf` outputs the hidden `_token` field - middleware verifies it on POST/PUT/PATCH/DELETE
- `old('title')` repopulates after a failed validation redirect
- `@error` reads the flashed validation bag

## Spoofing methods

```blade
<form method="POST" action="{{ route('posts.update', $post) }}">
  @csrf
  @method('PUT')
  {{-- fields --}}
</form>
```

Browsers don't speak PUT from forms - Laravel checks `_method`.

## Validate in the controller

```php
<?php

$data = $request->validate([
    'title' => ['required', 'string', 'max:255'],
    'body' => ['required', 'string'],
    'published' => ['sometimes', 'boolean'],
]);
```

On failure: redirect back with errors + old input (for web). For JSON requests: 422 JSON errors. Feels like a form library that lives on the server.

## Form Request classes (when it grows)

```bash
php artisan make:request StorePostRequest
```

```php
<?php

public function rules(): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'body' => ['required', 'string'],
    ];
}

// controller:
public function store(StorePostRequest $request)
{
    $data = $request->validated();
}
```

Authorization can live in `authorize()` on the same class - neat boundary.

## Fetch / Axios from JS

CSRF cookie + header - Laravel's `resources/js/bootstrap.js` usually sets this up with Axios. For `fetch`, send `X-XSRF-TOKEN` from the `XSRF-TOKEN` cookie (decoded), or include the token from a meta tag.

Same-site form posts with `@csrf` remain the simple path.

## Mass assignment reminder

Only put validated keys into `create()` / `update()`, and keep `$fillable` / `$guarded` honest on the model. The [PHP tutorial](/lab/php-tutorial-for-fe-devs/) warned about "foreach $_POST into DB" - Eloquent makes that mistake easy if you `$request->all()` blindly.

Best,

-- ł.

</div>
