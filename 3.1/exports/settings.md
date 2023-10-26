# Settings

[[toc]]

## Properties

By default the Worksheet properties get configured in `config/excel.php`. You can configure a default title, description, creator, etc.

If you want to overrule on a per export basis, you can use the `WithProperties` concern.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithProperties;

class InvoicesExport implements WithProperties
{    
    public function properties(): array
    {
        return [
            'creator'        => 'Patrick Brouwers',
            'lastModifiedBy' => 'Patrick Brouwers',
            'title'          => 'Invoices Export',
            'description'    => 'Latest Invoices',
            'subject'        => 'Invoices',
            'keywords'       => 'invoices,export,spreadsheet',
            'category'       => 'Invoices',
            'manager'        => 'Patrick Brouwers',
            'company'        => 'Maatwebsite',
        ];
    }
}
```

It's not required to return all properties, you can ommit the keys you don't want to overrule.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithProperties;

class InvoicesExport implements WithProperties
{    
    public function properties(): array
    {
        return [
            'creator'        => 'Patrick Brouwers',
        ];
    }
}
```

## Custom CSV Settings

By default Laravel Excel uses the defaults from the config (`config/excel.php`). You can change this by adding the `WithCustomCsvSettings` interface.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class InvoicesExport implements WithCustomCsvSettings
{    
    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';',
            'use_bom' => false,
            'output_encoding' => 'ISO-8859-1',
        ];
    }
}
```

### Available csv settings

* `delimiter`
* `enclosure`
* `line_ending`
* `use_bom`
* `include_separator_line`
* `excel_compatibility`
* `output_encoding`

## Cell caching

By default PhpSpreadsheet keeps all cell values in memory, however when dealing with large files, this might result into memory issues. If you want to mitigate that, you can configure a cell caching driver here.

When using the illuminate driver, it will store each value in the cache store. This can slow down the process, because it needs to store each value. However it will use less memory.
It will automatically use your default cache store. However if you prefer to have the cell cache on a separate store, you can configure the store name here. You can use any store defined in your cache config. When leaving at "null" it will use the default store.

You can use the "batch" store if you want to only persist to the store when the memory limit is reached. You can tweak the memory limit in the config.
