# Custom CSV Settings

[[toc]]

By default Laravel Excel uses the defaults from the config (`config/excel.php`). You can change this by adding the `WithCustomCsvSettings` interface.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class InvoicesExport implements WithCustomCsvSettings
{    
    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';'
        ];
    }
}
```

## Available settings

* `delimiter`
* `enclosure`
* `line_ending`
* `use_bom`
* `include_separator_line`
* `excel_compatibility`
