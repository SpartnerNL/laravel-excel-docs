---
pageClass: no-toc
---

# :rocket: 5 minute quick start

[[toc]]

:muscle: Create an export class in `app/Exports`

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
use Maatwebsite\LaravelCsv\Concerns\FromArray;

class UsersExport implements FromArray
{
    public function array()
    {
        return User::all()->toArray();
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
