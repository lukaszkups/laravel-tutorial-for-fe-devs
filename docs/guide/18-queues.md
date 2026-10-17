# Queues (quick look)

> Not every request should wait on email SMTP / image resizing / slow APIs. Queues say: accept the job, respond fast, work later.

## Sync vs real queue

```ini
QUEUE_CONNECTION=sync      # runs immediately in-process - default local
QUEUE_CONNECTION=database  # jobs table
QUEUE_CONNECTION=redis     # common in production
```

`sync` means "no queue, just run it" - fine for learning. Switch when something is slow.

## A job

```bash
php artisan make:job SendWelcomeEmail
```

```php
<?php

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendWelcomeEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(public User $user) {}

    public function handle(): void
    {
        // Mail::to($this->user)->send(new WelcomeMail($this->user));
    }
}

// dispatch:
SendWelcomeEmail::dispatch($user);
```

Comments for the code above:

- `ShouldQueue` marks it async (when not on `sync` driver)
- Worker process: `php artisan queue:work`
- Failed jobs table / retries - ops details when you ship for real

## FE analogy

| Front-end | Laravel |
| --- | --- |
| background sync / service worker | queue worker |
| job queue library | `ShouldQueue` jobs |
| "don't block the UI thread" | "don't block the HTTP response" |

## When to reach for queues

- Email / notifications
- Webhooks you send outbound
- PDF / image processing
- Anything > ~1s that isn't needed to render the next page

You don't need Redis on day one. Know the dial exists so slow endpoints don't become "Laravel is slow" myths.

Best,

-- ł.
