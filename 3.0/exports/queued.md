# Queued

In case you are working with a lot of data, it might be wise to queue the entire process. 

Given we have the following export class:

```php
namespace App\Exports;

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

### Implicit Export queueing

You can also mark an export implicitly as a queued export. You can do this by using Laravel's `ShouldQueue` contract.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Illuminate\Contracts\Queue\ShouldQueue;

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

### Appending jobs

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

### Custom queues

Because `PendingDispatch` is returned, we can also change the queue that should be used.

```php
(new InvoicesExport)->queue('invoices.xlsx')->allOnQueue('exports');
```
