# Exporting collections

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
use Maatwebsite\LaravelCsv\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
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

Or store it on a (e.g. s3) disk:

```php
public function storeCsv() 
{
    return Csv::store(new UsersExport, 'users.csv', 's3');
}
```

:bulb: More about storing exports can be found in the [storing exports on disk page](/csv/1.0/exports/store.html).
