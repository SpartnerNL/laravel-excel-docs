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
When using `ToModel` you should never save the model yourself, as that will break the batch insert functionality. If you need this, consider using `OnEachRow`.
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

## Possible column names

In case you want to import rows by several possible column names (using `WithHeadingRow`), you can use null coalescing operator (`??`). If the column with the first name (in example _client_name_) exists and is not NULL, return its value; otherwise look for second possible name (in example _client_) etc.

```php
public function model(array $row) {
  return new User([
    'name' => $row['client_name'] ?? $row['client'] ?? $row['name'] ?? null
  ]);
}
```

## Handling persistence on your own

In some cases you might not have an import in which each row is an Eloquent model and you want more control over what happens. In those cases you can use the `OnEachRow` concern.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\OnEachRow;

class UsersImport implements OnEachRow
{
    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row      = $row->toArray();
        
        $group = Group::firstOrCreate([
            'name' => $row[1],
        ]);
    
        $group->users()->create([
            'name' => $row[0],
        ]);
    }
}
```

:::warning
When using `OnEachRow` you cannot use batch inserts, as the the model is already persisted in the `onRow` method.
:::
