# Heading row

In case your file contains a heading row (a row in which each cells indicates the purpose of that column) and you want to use those names as array keys of each row, you can implement the `WithHeadingRow` concern.

Given we have an excel file looking like this:

| name | email |
|---- |----|
| Patrick Brouwers | patrick@maatwebsite.nl |

We can now reference the heading instead of a numeric array key.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name'  => $row['name'],
            'email' => $row['email'],
        ]);
    }
}
```

### Heading row on different row

In case your heading row is not on the first row, you can easily specify this in your import class:

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name'  => $row['name'],
            'email' => $row['email'],
        ]);
    }
    
    public function headingRow(): int
    {
        return 2;
    }
}
```

The 2nd row will now be used as heading row.
