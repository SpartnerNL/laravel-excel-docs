---
pageClass: no-toc
---

# Importing to collections

[[toc]]

The easiest way to start an import is to create a custom import class. We'll use a user import as example.

Create a new class called `UsersImport` in `App/Imports`:

```php
namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{
    public $data;

    public function collection(Collection $collection)
    {
        $this->data = $collection->transform(function ($row) {
            return User::make([
                'name' => $row[0],
            ]);
        });
    }
}
```

The collection method will receive a collection of rows. A row is an array filled with the cell values. 

In case of the file having multiple sheets, the `collection()` method will be called multiple times.

In your controller we can now import this:

```php
public function import() 
{
    $import = new UsersImport;
    Excel::import($import, 'users.xlsx');
    $resultsCollection = $import->data;
}
```

:::warning
Whatever you return in the `collection()` method will **not** be returned to the controller.
:::
