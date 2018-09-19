# Importables

In the previous example, we used the `Excel::import` facade to start an import. 

Laravel-Excel also provides a `Maatwebsite\Excel\Concerns\Importable` trait, to make import classes importable.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;

class UsersImport implements ToModel
{
    use Importable;

    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
}
```

We can now import without the need for the facade:

```php
return (new UsersImport)->import('users.xlsx');
```

Or queue the import:

```php
return (new UsersImport)->queue('users.xlsx');
```
