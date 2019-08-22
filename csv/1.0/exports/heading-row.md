# Heading row

[[toc]]


## Adding a heading row

A heading row can easily be added by adding the `WithHeadings` concern. The heading row will be added
as very first row of the file.

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings
    
    public function headings(): array
    {
        return [
            '#',
            'Date',
        ];
    }
}
```

## Multiple rows
It is possible to return multiple heading rows. These will be added as the first x rows.
Example: 
```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings
    
    public function headings(): array
    {
        return [
           ['#', 'date'],
           ['Amount', 'Status'],
        ];
    }
}
```

This would result in the following export:
```
"#","date"
"amount","status"
```