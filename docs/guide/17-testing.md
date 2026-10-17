# Testing

> You met PHPUnit on the mini-router. Laravel wraps it (and often Pest) with HTTP helpers that feel like hitting your app without a browser.

## Feature test sketch

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_cannot_create_posts(): void
    {
        $this->post('/posts', [
            'title' => 'Nope',
            'body' => 'Still nope',
        ])->assertRedirect('/login');
    }

    public function test_user_can_create_a_post(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/posts', [
                'title' => 'Hello',
                'body' => 'World',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('posts', [
            'title' => 'Hello',
            'user_id' => $user->id,
        ]);
    }
}
```

Comments for the code above:

- `RefreshDatabase` migrates a clean DB per test - use SQLite in-memory in `phpunit.xml` when possible
- `actingAs($user)` = logged-in session without clicking the UI
- `assertRedirect` / `assertOk` / `assertSee` - HTTP-level assertions

## Pest flavor

```php
<?php

it('lets a user create a post', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/posts', ['title' => 'Hello', 'body' => 'World'])
        ->assertRedirect();

    expect(Post::query()->where('title', 'Hello')->exists())->toBeTrue();
});
```

Laravel ships Pest-friendly setups often - pick what your team uses.

## Factories

```bash
php artisan make:factory PostFactory --model=Post
```

```php
<?php

public function definition(): array
{
    return [
        'title' => fake()->sentence(),
        'body' => fake()->paragraph(),
        'user_id' => User::factory(),
    ];
}
```

Factories = test data without hand-building arrays forever. FE analogy: fixtures / MSW seed data, but for Eloquent.

## What to test first

1. Auth boundaries (guest vs user)
2. Validation failures (422 / redirect + errors)
3. Happy-path create/update that hits the DB
4. Policy denials (403)

Leave CSS pixel tests to Playwright later. Server feature tests are the Laravel sweet spot.

```bash
php artisan test
```

Best,

-- ł.
