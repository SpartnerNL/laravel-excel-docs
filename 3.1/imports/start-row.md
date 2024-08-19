# Start row

[[toc]]

If you want to skip a certain number of rows during an import, you can specify the starting row by implementing the `WithStartRow` concern.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class UsersImport implements ToModel, WithStartRow
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }

    public function startRow(): int
    {
        return 2;
    }
}
```
