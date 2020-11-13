---
pageClass: no-toc
---

# Batch inserts

Importing a large file to Eloquent models, might quickly become a bottleneck as every row results into an insert query. 

With the `WithBatchInserts` concern you can limit the amount of queries done by specifying a batch size. This batch size will determine how many models will be inserted into the database in one time. This will drastically reduce the import duration.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithBatchInserts;

class UsersImport implements ToModel, WithBatchInserts
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function batchSize(): int
    {
        return 1000;
    }
}
```

:::warning ToModel
This concern **only** works with the `ToModel` concern.
:::

:::tip Batch Size
A batch size of `1000` will not be the most optimal situation for your import. Play around with this number to find the sweet spot.
:::

## Batch upserts

For batch upserts, you can additionally implement the `WithUpserts` concern.

```php
class UsersImport implements ToModel, WithBatchInserts, WithUpserts
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function batchSize(): int
    {
        return 1000;
    }

    public function uniqueBy()
    {
        return 'email';
    }
}
```

In the example above, if a user already exists with the same email, the row will be updated instead. Behind the scenes, this feature uses the Laravel `upsert` method and the `uniqueBy` method is used for the second argument of the `upsert` method, which lists the column(s) that uniquely identify records within the associated table.

:::warning
All databases except SQL Server require the `uniqueBy` columns to have a "primary" or "unique" index.
:::
