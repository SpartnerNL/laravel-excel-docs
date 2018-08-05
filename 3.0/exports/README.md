# Quick start

:muscle: Create an export class in `app/Exports`

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

use App\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;

class UsersController extends Controller 
{
    public function export 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
```

:page_facing_up: Find your `users.xlsx` in your downloads folder!
