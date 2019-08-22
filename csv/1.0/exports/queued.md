# Queued

[[toc]]

In case you are working with a lot of data, it might be wise to queue the entire process.

Create a new class called `UsersExport` in `app/Exports`:

::: vue
.
├── app
│   ├── `Exports` 
│   │   ├── UsersExport.php
:::

```php
<?php

namespace App\Exports;

use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\LaravelCsv\Concerns\FromQuery;

class UsersExport implements FromQuery, ShouldQueue
{
    public function query()
    {
        return User::query();
    }
}
```

In your controller we can now queue this export:

```php
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        Csv::queue(new UsersExport, 'users.csv');
    }
}
```

## Appending jobs
The same configuration for chunking as with [FromQuery](/csv/1.0/exports/export-from-query.html) applies here as well. The difference is that the `queue` method will always return a `PendingDispatch` instance. 
This allows you to add additional jobs to the existing chain. 

```php
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        $queuedJob = Csv::queue(new UsersExport, 'users.csv');
        $queuedJob->chain([
            new AfterQueueExportJob(),
        ]);
    }
}
```

If you use the `store` method instead of the `queue` method, but the export class implements `ShouldQueue`,
then `Csv::store` will still return a `PendingDispatch` instance, so this will still work:
```php
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        $queuedJob = Csv::store(new UsersExport, 'users.csv');
        $queuedJob->chain([
            new AfterQueueExportJob(),
        ]);
    }
}
```