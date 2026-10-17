import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Laravel for FE devs',
  description: 'Laravel tutorial for front-end developers who already know modern PHP',
  base: '/lab/laravel-tutorial-for-fe-devs/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: [
    /^\/lab\/php-tutorial-for-fe-devs/,
  ],

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/01-why-laravel' },
      { text: 'Cheatsheet', link: '/guide/cheatsheet' },
    ],

    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Getting oriented',
        collapsed: false,
        items: [
          { text: 'Why Laravel next', link: '/guide/01-why-laravel' },
          { text: 'Setup', link: '/guide/02-setup' },
          { text: 'Project anatomy', link: '/guide/03-project-anatomy' },
          { text: 'Request lifecycle', link: '/guide/04-request-lifecycle' },
        ],
      },
      {
        text: 'HTTP layer',
        collapsed: false,
        items: [
          { text: 'Routing', link: '/guide/05-routing' },
          { text: 'Controllers', link: '/guide/06-controllers' },
          { text: 'Blade templates', link: '/guide/07-blade' },
          { text: 'Vite & frontend assets', link: '/guide/08-vite-and-assets' },
          { text: 'Forms, validation, CSRF', link: '/guide/09-forms-validation-csrf' },
          { text: 'Middleware', link: '/guide/10-middleware' },
        ],
      },
      {
        text: 'Data & auth',
        collapsed: false,
        items: [
          { text: 'Migrations & Eloquent', link: '/guide/11-migrations-and-eloquent' },
          { text: 'Relationships & N+1', link: '/guide/12-relationships' },
          { text: 'Auth', link: '/guide/13-auth' },
          { text: 'API routes & JSON', link: '/guide/14-api-and-json' },
        ],
      },
      {
        text: 'Day-to-day Laravel',
        collapsed: false,
        items: [
          { text: 'Artisan & workflows', link: '/guide/15-artisan' },
          { text: 'Config & .env', link: '/guide/16-config-and-env' },
          { text: 'Testing', link: '/guide/17-testing' },
          { text: 'Queues (quick look)', link: '/guide/18-queues' },
          { text: 'What next', link: '/guide/19-what-next' },
          { text: 'Cheatsheet', link: '/guide/cheatsheet' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lukaszkups' },
    ],

    footer: {
      message: 'Continues after /lab/php-tutorial-for-fe-devs/',
      copyright: 'Copyright © 2026-present Łukasz Kuś. All rights reserved.',
    },
  },
})
