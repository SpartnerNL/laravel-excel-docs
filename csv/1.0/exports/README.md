---
pageClass: no-toc
---

# :rocket: 5 minutes quick start

[[toc]]

:muscle: Create an export class in `app/Exports`

:::vue
.
├── app
│   ├── `Exports` 
│   │   ├── UsersExport.php
│ 
└── composer.json
:::

```php
<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Csv\Concerns\FromCollection;

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
