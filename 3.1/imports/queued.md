# Queued reading

[[toc]]

## Notes
:::warning
You currently cannot queue `xls` imports. PhpSpreadsheet's Xls reader contains some non-utf8 characters, which makes it impossible to queue.
:::


## Queuing chunks

When using the `WithChunkReading` concern, you can also choose to execute each chunk into a queue job. You can do so by simply adding the `ShouldQueue` contract.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading, ShouldQueue
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }

    public function chunkSize(): int
    {
        return 1000;
    }
}
```

Each chunk of 1000 rows will now be executed into a queue job.

:::warning
`ShouldQueue` is only supported in combination with `WithChunkReading`.
:::

### Explicit queued imports

You can explicitly queue the import by using `::queueImport`.

```
Excel::queueImport(new UsersImport, 'users.xlsx');
```

When using the `Importable` trait you can use the `queue` method:

```
(new UsersImport)->queue('users.xlsx');
```

:::warning
The `ShouldQueue` is always required.
:::

### Implicit queued imports

When `ShouldQueue` is used, the import will automatically be queued.

```
Excel::import(new UsersImport, 'users.xlsx');
```

## Handling failures in queued imports

When queuing imports you might want a way to handle failed imports. You can do this by using the `ImportFailed` event.

```php
namespace App\Imports;

use App\User;
use App\Notifications\ImportHasFailedNotification;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\ImportFailed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading, ShouldQueue, WithEvents
{
    public function __construct(User $importedBy)
    {
        $this->importedBy = $importedBy;
    }

    public function registerEvents(): array
    {
        return [
            ImportFailed::class => function(ImportFailed $event) {
                $this->importedBy->notify(new ImportHasFailedNotification);
            },
        ];
    }
}
```

## Appending jobs

When queuing an import an instance of Laravel's `PendingDispatch` is returned. This means you can chain extra jobs that will be added to the end of the queue and only executed if all import jobs are correctly executed.

```php
(new UsersImport)->queue('users.xlsx')->chain([
    new NotifyUserOfCompletedImport(request()->user()),
]);
```

```php
namespace App\Jobs;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;

class NotifyUserOfCompletedImport implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        $this->user->notify(new ImportReady());
    }
}
```

## Custom queues

Because `PendingDispatch` is returned, we can also change the queue that should be used.

```php
(new UsersImport)->queue('users.xlsx')->allOnQueue('imports');
```

## Multi-server setup

If you are dealing with a multi-server setup (using e.g. a loadbalancer), you might want to make sure the temporary file is the same for each job. You can achieve this by configuring a remote temporary file in the config.

In `config/excel.php`

```php
'temporary_files' => [
    'remote_disk' => 's3',
],
```

When dealing with a multi server setup as above, it's possible for the clean up that occurs after entire queue has been run to only cleanup the server that the last AfterImportJob runs on. The rest of the server would still have the local temporary file stored on it. In this case your local storage limits can be exceeded and future imports won't be processed. To mitigate this you can set this config value to be true, so that after every queued chunk is processed the local temporary file is deleted on the server that processed it.

```php
'temporary_files' => [
    'force_resync_remote' => true,
],
```


## Job Middleware

If you are using Laravel, [job middleware](https://laravel.com/docs/7.x/queues#job-middleware) can be attached to the import class using the `middleware` method.

```php
namespace App\Imports;

use App\Jobs\Middleware\RateLimited;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\FromQuery;

class ImportClass implements FromQuery
{
    use Importable;

    public function middleware()
    {
        return [new RateLimited];
    }

    public function retryUntil()
    {
        return now()->addSeconds(5);
    }

    public function query()
    {
        // ...
    }
}
```

