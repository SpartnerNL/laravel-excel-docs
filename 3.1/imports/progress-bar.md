---
pageClass: no-toc
---

# Progress Bar

You can implement the `WithProgressBar` concern to display a progress bar when importing an Excel file via the console.

For example, your import class could look like this:

```php
<?php

namespace App\Imports;

use App\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithProgressBar;

class UsersImport implements ToModel, WithProgressBar
{
    use Importable;

    public function model(array $row)
    {
        return new User([
            'name'     => $row[0],
            'email'    => $row[1],
            'password' => Hash::make($row[2]),
        ]);
    }
}
```

In your console command, you'd use it as follows:

```php
<?php

namespace App\Console\Commands;

use App\Imports\UsersImport;
use Illuminate\Console\Command;

class ImportExcel extends Command
{
    protected $signature = 'import:excel';

    protected $description = 'Laravel Excel importer';

    public function handle()
    {
        $this->output->title('Starting import');
        (new UsersImport)->withOutput($this->output)->import('users.xlsx');
        $this->output->success('Import successful');
    }
}
```

By calling `php artisan import:excel` on the command line, your import will start.
You should now see the start message, the progress bar and (when completed) the success message.
