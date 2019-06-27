# Implementing the FromCollection concern

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

class UsersExport implements FromQuery
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
        return Csv::download(new UsersExport, 'users.csv');
    }
}
```

What's different about the FromQuery handler is that it automatically uses chunking (chunkById) to optimize performance. This happens in much the same way as it doesn in Laravel-Excel. 
You can customize the chunksize via the config file `csv.php`:

```
<?php

return [
    'chunkSize' => 10000,
];

```
