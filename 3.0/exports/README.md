## :rocket: 5 minute quick start

:muscle: Create an export class in `app/Exports`

You may do this by using the `make:export` command.

```
php artisan make:export UsersExport --model=User
```

If you prefer to create the export manually, you can create the following in `app/Exports`:

```php
<?php

namespace App\Exports;

use App\User;
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

use App\Exports\UsersExport;
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

:page_facing_up: Find your `users.xlsx` in your downloads folder!
