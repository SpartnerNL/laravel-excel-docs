---
home: true
heroImage: /assets/img/logo-small.png
actionText: Read documentation →
actionLink: /3.0/
features:
- title: 💪 Export collections to Excel.
  details: Supercharge your Laravel collections and export them directly to an Excel or CSV document. Exporting has never been so easy.
- title: 🚀 Supercharged exports. 
  details: Export queries with automatic chunking for better performance. For even more superpowers, exports can also be queued.
- title: 🔥 Export blade views.
  details: Want to have a custom layout in your spreadsheet? Use a HTML table in a blade view and export that to Excel.
footer: MIT Licensed | Powered by Maatwebsite
---

:bulb: Install the package via `composer`

```
composer require maatwebsite/excel
```

:muscle: Create an export class

```php
php artisan make:export UsersExport --model=App\\User
```

:fire: Download your export

```php
<?php 

use App\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```
