# Vite & frontend assets

> And you know what? Laravel uses Vite. The same Vite you already run for Vue/React apps. This chapter should feel like home.

## The setup you already understand

```js
// vite.config.js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.js'],
      refresh: true,
    }),
  ],
})
```

```bash
npm install
npm run dev      # HMR during development
npm run build    # production assets → public/build
```

In Blade:

```blade
@vite(['resources/css/app.css', 'resources/js/app.js'])
```

Comments for the code above:

- `@vite` points at the Vite entrypoints - in dev it talks to the Vite server; in prod it reads the manifest
- `refresh: true` reloads the browser when Blade changes - nice DX
- Don't manually dump hashed files into `public/` for app JS/CSS - let Vite cook

## app.js is just JS

```js
// resources/js/app.js
import './bootstrap'

// Alpine, Vue, React, plain JS - your call
```

`bootstrap.js` usually wires Axios defaults (X-Requested-With, CSRF from the cookie). Peek at it once.

## CSS

Laravel often ships Tailwind in recent starter kits. Plain CSS is fine too - it's just an entry file.

## Compared to a SPA repo

| SPA | Laravel |
| --- | --- |
| Vite owns the whole app | Vite owns assets; PHP owns routes/HTML |
| `index.html` entry | Blade + `@vite` |
| client router | server router |
| env `VITE_*` | same - only `VITE_` prefixed vars hit the client |

## Production gotcha

Deploy must run `npm run build` (or CI artifact). If CSS/JS 404 in prod, you forgot the build or the manifest isn't on the server.

You're not learning a new bundler - you're plugging the one you know into Blade.

Best,

-- ł.
