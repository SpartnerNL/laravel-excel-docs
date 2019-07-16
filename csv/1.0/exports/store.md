# Storing exports on disk

[[toc]]

The store functionality uses the default Storage disk. It's possible to choose a different disk as well as custom disk options.

In your controller you can customize the export like this:

```php

use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        return Csv::store(
            new UsersExport, 
            'users.csv',
            's3',
            'public'
        );
    }
}
```

## Disk options
The disk option accepts:
* disk name (_string_)
* visibility option (_string_)
* more advanced options (_array_)
