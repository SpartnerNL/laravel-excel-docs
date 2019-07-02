# Implementing the FromQuery concern with ShouldQueue

[[toc]]

:muscle: Create an export class in `app/Exports` in the same way as shown in the 5 minute quick start.

:::vue
.
├── app
│   ├── `Exports` 
│   │   ├── UsersExport.php
:::

```php
<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Csv\Concerns\FromQuery;

class UsersExport implements FromQuery, ShouldQueue
{
    public function query()
    {
        return User::query();
    }
}
```

:fire: In your controller you can call this export now:

```php
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        return Csv::queue(new UsersExport, 'users.csv');
    }
}
```

The same configuration for chunking as with FromQuery applies here as well. The difference is that the queue method will always return a PendingDispatch instance. 
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
then Csv::store will still return a PendingDispatch instance, so this will still work:
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