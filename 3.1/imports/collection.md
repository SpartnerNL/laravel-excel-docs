# Importing to collections

The easiest way to start an import is to create a custom import class. We'll use a user import as example.

Create a new class called `UsersImport` in `App/Imports`:

```php
namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{
    public function collection(Collection $sheets)
    {
        foreach ($sheets->first() as $row) 
        {
            User::create([
                'name' => $row[0],
            ]);
        }
    }
}
```

The collection method will receive a collection of sheets. Each sheet will contain a collection of rows. A row is an array filled with the cell values.

In your controller we can now import this:

```php
public function export() 
{
    return Excel::import(new UsersImport, 'users.xlsx');
}
```