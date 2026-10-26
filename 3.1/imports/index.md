---
pageClass: no-toc
---

## :rocket: 5 minute quick start

:muscle: Create an import class in `app/Imports`

You may do this by using the `make:import` command.

```
php artisan make:import UsersImport --model=User
```

The file can be found in `app/Imports`:

::: vue
.
├── app
│   ├── `Imports` 
│   │   ├── UsersImport.php
│ 
└── composer.json
:::

If you prefer to create the import manually, you can create the following in `app/Imports`:

```php
<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return User|null
     */
    public function model(array $row)
    {
        return new User([
           'name'     => $row[0],
           'email'    => $row[1], 
           'password' => Hash::make($row[2]),
        ]);
    }
}
```

:fire: In your controller you can call this import now:

```php

use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function import() 
    {
        Excel::import(new UsersImport, 'users.xlsx');
        
        return redirect('/')->with('success', 'All good!');
    }
}
```

:page_facing_up: Find the imported users in your database!
