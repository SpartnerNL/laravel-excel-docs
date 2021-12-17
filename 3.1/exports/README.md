---
pageClass: no-toc
---

# :rocket: 5 minute quick start

[[toc]]

:muscle: Create an export class in `app/Exports`

You may do this by using the `make:export` command.

```
php artisan make:export UsersExport --model=User
```

The file can be found in `app/Exports`:

::: vue
.
├── app
│   ├── `Exports` 
│   │   ├── UsersExport.php
│ 
└── composer.json
:::

If you prefer to create the export manually, you can create the following in `app/Exports`:

```php
<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```

:fire: In your controller you can call this export now:

```php
<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

class UsersController extends Controller 
{
    public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```

And finally add a route to be able to access the export:
```php
Route::get('users/export/', [UsersController::class, 'export']);
```


:page_facing_up: Find your `users.xlsx` in your downloads folder!
