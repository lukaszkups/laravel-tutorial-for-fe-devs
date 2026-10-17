# What next

> You've got enough Laravel to read a codebase and build a CRUD app with auth. Here's where people usually go next - without me writing five more books in this repo.

## Practice project ideas

- Notes app (you already did PDO CRUD - redo it in Eloquent + Blade)
- Tiny issue tracker (users, projects, comments, policies)
- JSON API for a Vue/React client + Sanctum

Ship something imperfect. Reading alone doesn't stick.

## Ecosystem paths (pick by taste)

| Path | Vibe |
| --- | --- |
| **Blade + Alpine** | classic MPA, light JS |
| **Livewire** | server-driven UI, less custom JS |
| **Inertia + Vue/React** | SPA feel, Laravel routes/controllers stay |
| **Filament / admin panels** | batteries for internal tools |
| **Horizon** | Redis queue dashboard |
| **Telescope** | local debugging HUD |

If you love React/Vue components but want Laravel's backend - Inertia often feels like home.

## Symfony later?

Still valuable. Different DI aesthetics, more explicit structure, huge enterprise footprint. Your PHP fundamentals + Laravel experience transfer; you'll re-learn naming and config layout.

## Habits worth keeping

- Eager load list pages
- Validate at the edge
- Feature-test auth boundaries
- Never `APP_DEBUG` in prod
- Prefer `config()` over scattered `env()`

## Docs that matter

- [laravel.com/docs](https://laravel.com/docs) - actually good; use them
- Dig into the source of one Facade when curious - demystifies a lot

You're past the scary part. Go build a small thing this weekend.

Wish you all the best.

Best,

-- ł.
