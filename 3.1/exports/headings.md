# Headings

[[toc]]

## Adding a heading row

A heading row can easily be added by adding the `WithHeadings` concern. The heading row will be added
as very first row of the sheet.

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings
{
    public function headings(): array
    {
        return [
            '#',
            'User',
            'Date',
        ];
    }
}
```

If you need to have multiple heading rows, you can return multiple rows from the `headings()` method:


```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings
{
    public function headings(): array
    {
        return [
           ['First row', 'First row'],
           ['Second row', 'Second row'],
        ];
    }
}
```