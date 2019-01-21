# Mapped Cells

In case you have a more custom spreadsheet and only want to access specific **cells**, you can implement the `WithMappedCells` concern.

You might have a speadsheet looking like this:

|name | Patrick Brouwers|
|---- |----|
| email | patrick@maatwebsite.nl |

We can now map `name` to `B1` and `email` to `B2`. The value of those coordinates will then be available under the given array key.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMappedCells;

new UsersImport implements WithMappedCells, ToModel 
{
    public function mapping(): array
    {
        return [
            'name'  => 'B1',
            'email' => 'B2',
        ];
    }
    
    public function model(array $row)
    {
        return new User([
            'name' => $row['name'],
            'email' => $row['email'],
        ]);
    }
}
```

::: warning
This concern is not meant to map `**columns**, only specific **cell** reference are allowed.
:::
