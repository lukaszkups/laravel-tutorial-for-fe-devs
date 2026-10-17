# Controllers

> Controllers are thin HTTP adapters - validate / authorize / call services / return a response. Same advice as Nest or Express: don't bury domain logic forever in the controller… but for learning, it's fine to start there.

## Generate one

```bash
php artisan make:controller PostController
# or resource:
php artisan make:controller PostController --resource
```

## Thin example

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;

class PostController extends Controller
{
    public function index(): View
    {
        $posts = Post::query()->latest()->paginate(10);

        return view('posts.index', compact('posts'));
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ]);

        Post::query()->create($data);

        return redirect()->route('posts.index');
    }
}
```

Comments for the code above:

- Return types (`View`, `RedirectResponse`) help readers and static analysis
- `$request->validate([...])` throws a redirect-back with errors on failure - browser form UX for free
- `compact('posts')` is `['posts' => $posts]` - old PHP sugar, still common

## Invokable controllers

Single-action class - nice for dedicated endpoints:

```php
<?php

namespace App\Http\Controllers;

class PublishPostController extends Controller
{
    public function __invoke(Post $post)
    {
        $post->update(['published_at' => now()]);

        return redirect()->route('posts.show', $post);
    }
}

// Route::post('/posts/{post}/publish', PublishPostController::class);
```

## Dependency injection

```php
<?php

public function __construct(
    private PostService $posts,
) {}
```

Laravel resolves `PostService` from the container - the DI story from the [PHP tutorial](/lab/php-tutorial-for-fe-devs/) runway chapter, now automatic.

## What to return

| Intent | Typical return |
| --- | --- |
| HTML page | `view('…', $data)` |
| Redirect after POST | `redirect()->route('…')` |
| JSON | `response()->json($data)` |
| 404 | `abort(404)` or `findOrFail` |
| Download | `response()->download($path)` |

Keep controllers boring. Boring is good.

Best,

-- ł.
