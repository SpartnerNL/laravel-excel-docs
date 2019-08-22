---
pageClass: no-toc
---

# Importing to collections

[[toc]]

The easiest way to start an import is to create a custom import class. We'll use a user import as example.

Create a new class called `UsersImport` in `app/Imports`:

```php
namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {
            User::create([
                'name' => $row[0],
            ]);
        }
    }
}
```

The collection method will receive a collection of rows. A row is an array filled with the cell values. 

In case of the file having multiple sheets, the `collection()` method will be called multiple times.

In your controller we can now import this:

```php
public function import() 
{
    Excel::import(new UsersImport, 'users.xlsx');
}
```

:::warning
Whatever you return in the `collection()` method will **not** be returned to the controller.
:::
