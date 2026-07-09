# Settings

[[toc]]

## Properties

By default the Worksheet properties get configured in `config/excel.php`. You can configure a default title, description, creator, etc.

If you want to overrule on a per export basis, you can use the `WithProperties` concern.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithProperties;

class UsersExport implements WithProperties
{    
    public function properties(): array
    {
        return [
            'creator'        => 'Patrick Brouwers',
            'lastModifiedBy' => 'Patrick Brouwers',
            'title'          => 'Users Export',
            'description'    => 'Latest Users',
            'subject'        => 'Users',
            'keywords'       => 'users,export,spreadsheet',
            'category'       => 'Users',
            'manager'        => 'Patrick Brouwers',
            'company'        => 'Maatwebsite',
        ];
    }
}
```

It's not required to return all properties, you can ommit the keys you don't want to overrule.

```php
public function properties(): array
{
    return [
        'creator' => 'Patrick Brouwers',
    ];
}
```

## Custom CSV Settings

By default Laravel Excel uses the defaults from the config (`config/excel.php`). You can change this by adding the `WithCustomCsvSettings` interface.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class UsersExport implements WithCustomCsvSettings
{    
    public function getCsvSettings(): array
    {
        return [
            'delimiter' => ';'
        ];
    }
}
```

### Available csv settings settings

- delimiter
- enclosure
- line_ending
- use_bom
- include_separator_line
- excel_compatibility
