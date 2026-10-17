<div v-pre>

# Blade templates

> Blade is HTML with superpowers - layouts, components, escaped echo. If you know JSX/Vue SFCs, the ideas transfer; the syntax is PHP-flavored.

## Escape by default

```blade
{{-- resources/views/posts/show.blade.php --}}
<h1>{{ $post->title }}</h1>
<div>{!! $post->trusted_html !!}</div>
```

Comments for the code above:

- `{{ }}` runs `htmlspecialchars` - your XSS habit from the [PHP tutorial](/lab/php-tutorial-for-fe-devs/), automatic
- `{!! !!}` is raw - only for trusted HTML
- `{{-- --}}` is a Blade comment

## Layouts

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>@yield('title', 'App')</title>
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
  <main>
    @yield('content')
  </main>
</body>
</html>
```

```blade
{{-- resources/views/posts/index.blade.php --}}
@extends('layouts.app')

@section('title', 'Posts')

@section('content')
  <h1>Posts</h1>
  @foreach ($posts as $post)
    <article>
      <a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a>
    </article>
  @endforeach

  {{ $posts->links() }}
@endsection
```

`@extends` / `@section` / `@yield` = layout slots. Blade **components** (`<x-alert />`) are the more modern composition style - same energy as Vue components; learn them when layouts feel clunky.

## Conditionals & loops

```blade
@auth
  <p>Hi, {{ auth()->user()->name }}</p>
@endauth

@guest
  <a href="{{ route('login') }}">Log in</a>
@endguest

@if ($posts->isEmpty())
  <p>No posts yet.</p>
@endif

@forelse ($posts as $post)
  <p>{{ $post->title }}</p>
@empty
  <p>No posts yet.</p>
@endforelse
```

## Including partials

```blade
@include('posts._card', ['post' => $post])
```

## Compared to Vue / React

| Vue / React | Blade |
| --- | --- |
| `{{ title }}` / `{title}` | `{{ $title }}` (escaped) |
| layout routes | `@extends` / components |
| `v-if` / `&&` | `@if` |
| `v-for` / `.map` | `@foreach` |
| CSRF in fetch headers | `@csrf` in forms |
| client components | mostly server-rendered HTML (unless Inertia/Livewire) |

Classic Laravel = multi-page app with sprinkles of JS. That's not outdated - it's how a lot of SaaS admin UIs still ship. Inertia/Livewire come later if you want SPA feelings.

Best,

-- ł.

</div>
