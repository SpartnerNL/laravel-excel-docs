# Importing to models

[[toc]]

In case you want to import a workbook to an Eloquent model, you can use the `ToModel` concern. The concern enforces a `model()` method which accepts a model to be returned.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
}
```

The returned model will be saved for you. Each row will result into (at least) one save and will also fire model events.

:::warning
When using `ToModel` you should never save the model yourself, as that will break the batch insert functionality.
:::

## Skipping rows

In case you want to skip a row, you can return null. 

```php
public function model(array $row)
{
    if (!isset($row[0])) {
        return null;
    }

    return new User([
        'name' => $row[0],
    ]);
}
```
