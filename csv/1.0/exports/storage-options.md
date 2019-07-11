# Implementing the FromCollection concern

[[toc]]

The store functionality uses the default Storage disk. It's possible to choose a different disk as well as custom disk options.

:fire: In your controller you can customize the export like this:

```php

use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use Maatwebsite\LaravelCsv\Facades\Csv;

class UsersController extends Controller 
{
    public function export() 
    {
        return Csv::download(
            new UsersExport, 
            'users.csv',
            's3',
            'public'
        );
    }
}
```

The disk option accepts a string as diskname, the diskoptions accept a string for the visibility option, or an array for more advanced options.
