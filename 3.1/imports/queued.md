---
pageClass: no-toc
---

# Queued reading

When using the `WithChunkReading` concern, you can also choose to execute each chunk into a queue job. You can do so by simply adding the `ShouldQueue` contract.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class UsersImport implements ToModel, WithChunkReading, ShouldQueue
{
    public function model(array $row)
    {
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
```

Each chunk of 1000 rows will now be executed into a queue job.