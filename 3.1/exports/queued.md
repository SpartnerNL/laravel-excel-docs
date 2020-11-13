# Queued

[[toc]]

In case you are working with a lot of data, it might be wise to queue the entire process. 

Given we have the following export class:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;

class InvoicesExport implements FromQuery
{
    use Exportable;

    public function query()
    {
        return Invoice::query();
    }
}
```

It's as easy as calling `->queue()` now.

```php
(new InvoicesExport)->queue('invoices.xlsx');

return back()->withSuccess('Export started!');
```

Behind the scenes the query will be chunked and multiple jobs will be chained. These jobs will be executed in the correct order,
and will only execute if none of the previous have failed. 

## Implicit Export queueing

You can also mark an export implicitly as a queued export. You can do this by using Laravel's `ShouldQueue` contract.

```php
namespace App\Exports;

use App\Invoice;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;

class InvoicesExport implements FromQuery, ShouldQueue
{
    use Exportable;

    public function query()
    {
        return Invoice::query();
    }
}
```

In your controller you can now call the normal `->store()` method. 
Based on the presence of the `ShouldQueue` contract, the export will be queued.

```php
(new InvoicesExport)->store('invoices.xlsx');
```

## Appending jobs

The `queue()` method returns an instance of Laravel's `PendingDispatch`. This means you can chain extra jobs that will be added to the end of the queue and only executed if all export jobs are correctly executed.

```php
(new InvoicesExport)->queue('invoices.xlsx')->chain([
    new NotifyUserOfCompletedExport(request()->user()),
]);
```

```php
namespace App\Jobs;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class NotifyUserOfCompletedExport implements ShouldQueue
{
    use Queueable, SerializesModels;
    
    public $user;
    
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        $this->user->notify(new ExportReady());
    }
}
```

## Handling failures in queued exports

When queuing exports you might want a way to handle failed exports. You can do this by adding `failed` method to your export class.

```php

use Throwable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromQuery, WithHeadings
{   
    public function failed(Throwable $exception): void
    {
        // handle failed export
    }
}
```


## Custom queues

Because `PendingDispatch` is returned, we can also change the queue that should be used.

For Laravel 8+:

```php
(new InvoicesExport)->queue('invoices.xlsx')->onQueue('exports');
```
For older versions of Laravel:

```php
(new InvoicesExport)->queue('invoices.xlsx')->allOnQueue('exports');
```

## Multi-server setup

If you are dealing with a multi-server setup (using e.g. a loadbalancer), you might want to make sure the temporary file that is used to store each chunk of data on, is the same for each job. You can achieve this by configuring a remote temporary file in the config.

In `config/excel.php`

```php
'temporary_files' => [
    'remote_disk' => 's3',
],
```

## Job Middleware

If you are using Laravel 6, [job middleware](https://laravel.com/docs/6.x/queues#job-middleware) can be attached to the export class using the `middleware` method:

```php
namespace App\Exports;

use App\Jobs\Middleware\RateLimited;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;

class ExportClass implements FromQuery
{
    use Exportable;
    
    public function middleware()
    {
        return [new RateLimited];
    }

    public function query()
    {
        // ...
    }
}
```

## Localizing Queued Export

If you want to localize your queued export you should implement `HasLocalePreference` contract on your export:

```php
namespace App\Exports;

use Illuminate\Contracts\Translation\HasLocalePreference;
use Maatwebsite\Excel\Concerns\Exportable;

class ExportClass implements HasLocalePreference
{
    use Exportable;
    
    public function __construct(string $locale)
    {
        $this->locale = $locale;
    }
    
    public function preferredLocale()
    {
        return $this->locale;
    }
}
```

## Custom Query Size
Queued exportables are processed in chunks; each chunk being a job pushed to the queue by the `QueuedWriter`.
In case of exportables that implement the [FromQuery](/3.1/exports/from-query.html) concern, the number of jobs is calculated by dividing the `$query->count()` by the chunk size.

### When to use
Depending on the implementation of the `query()` method (e.g. when using a `groupBy` clause), the calculation mentioned before might not be correct.

If this is the case, you should use the `WithCustomQuerySize` concern to provide a custom calculation of the query size.
