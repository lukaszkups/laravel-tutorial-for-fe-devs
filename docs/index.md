---
layout: home

hero:
  name: Laravel for FE devs
  text: After the PHP tutorial
  tagline: Notes-style walkthrough of Laravel - for front-end folks who already finished /lab/php-tutorial-for-fe-devs/ (modern PHP, Composer, request lifecycle).
  actions:
    - theme: brand
      text: Start reading
      link: /guide/01-why-laravel
    - theme: alt
      text: Cheatsheet
      link: /guide/cheatsheet

features:
  - title: You already did the hard part
    details: Types, Composer, PDO, sessions, CSRF, a mini-router - that's the floor. Laravel is mostly nicer packaging of those ideas.
  - title: Front-end brain welcome
    details: Blade vs JSX/Vue, Vite (yes, the same Vite), routes like a router config, validation like form libraries - I'll keep mapping.
  - title: Build mental models, not magic
    details: When docs say "Eloquent" or "middleware", you'll know what sits underneath - so leaks don't panic you.
---

## Who this is for

You've shipped front-end apps. You've gone through the [PHP tutorial for FE devs](/lab/php-tutorial-for-fe-devs/) (or equivalent): strict types, PSR-4, HTTP lifecycle, forms, PDO, security basics.

Now you want Laravel to feel like a tool - not a religion.

## How to follow along

1. Have PHP 8.3+, Composer, and Node ready ([Setup](/guide/02-setup))
2. Create a throwaway Laravel app and keep it open while reading
3. Chapters build in order - later ones assume the earlier maps
4. Keep the [cheatsheet](/guide/cheatsheet) nearby once you're past routing

```bash
npm install
npm run docs:dev
```

## What's intentionally light

- Deep Livewire / Inertia / Filament rabbit holes (pointed at in [What next](/guide/19-what-next))
- Deploy / Forge / Vapor ops deep dives
- "Rewrite your SPA in Laravel" evangelism

We're here so you can open a Laravel codebase, find the route, follow the controller, touch the model, and not feel lost.

Wish you all the best - hope you're gonna enjoy this one too.

Best,

-- ł.
