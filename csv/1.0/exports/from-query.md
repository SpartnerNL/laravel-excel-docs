# From Query

[[toc]]

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
use Maatwebsite\LaravelCsv\Concerns\FromQuery;

class UsersExport implements FromQuery
{
    public function query()
    {
        return User::query();
    }
}
```

In your controller we can now download this export:

```php

use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        return Csv::download(new UsersExport, 'users.csv');
    }
}
```

## Chunking
FromQuery automatically uses __chunking__ (`chunkById`) to optimize performance. This happens in much the same way as it does in Laravel Excel. 

You can customize the chunk size via the [config file](/csv/1.0/exports/configuration.html#query-chunk-size):

```php
<?php

return [
    'chunkSize' => 10000,
];
```
