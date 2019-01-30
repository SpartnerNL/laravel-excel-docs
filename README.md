---
home: true
heroImage: /assets/img/logo-small.png
actionText: Read documentation →
actionLink: /3.1/getting-started/
features:
- title: 💪 Export to Excel.
  details: Supercharge your Laravel collections or Blade views and export them directly to an Excel or CSV document. Exporting has never been so easy.
- title: 🚀 Supercharged exports. 
  details: Export queries with automatic chunking for better performance. For even more superpowers, exports can also be queued.
- title: 🔥 Supercharged imports. 
  details: Import workbooks and worksheets to Eloquent models with chunk reading and batch inserts! You can also queue every chunk of a file! Your entire import will happen in the background.
footer: MIT Licensed | Powered by Maatwebsite
---

:bulb: Install the package via `composer`.

```
composer require maatwebsite/excel
```

:muscle: Create an export and import class.

```php
php artisan make:export UsersExport --model=App\\User
php artisan make:import UsersImport --model=App\\User
```

:fire: Download your export and import your file.

```php
<?php 

use App\Exports\UsersExport;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
    
    public function import() 
    {
        return Excel::import(new UsersImport, 'users.xlsx');
    }
}
```
