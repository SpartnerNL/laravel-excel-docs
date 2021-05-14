# Presentation

:::warning
While all of these concerns have valid use-cases, make sure to first check the Columns chapter, as 
all of these functionalities can be scoped to a specific column.
:::

[[toc]]

## Mapping data

By adding WithMapping you map the data that needs to be added as row. 
This way you have control over the actual source for each column.
In case of using the Eloquent query builder:

```php
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;

class InvoicesExport implements FromQuery, WithMapping
{    
    /**
    * @var Invoice $invoice
    */
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            $invoice->user->name,
            Date::dateTimeToExcel($invoice->created_at),
        ];
    }
}
```

### Multiple rows

You can also return multiple rows inside the map function.

```php
public function map($invoice): array
{
    // This example will return 3 rows.
    // First row will have 2 column, the next 2 will have 1 column
    return [
        [
            $invoice->invoice_number,
            Date::dateTimeToExcel($invoice->created_at),
        ],
        [
            $invoice->lines->first()->description,
        ],
        [
            $invoice->lines->last()->description,
        ]
    ];
}
```

## Styling

The `WithStyles` concerns allows styling columns, cells and rows. This might be useful when you want to make the heading row bold.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InvoicesExport implements WithStyles
{
    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],

            // Styling a specific cell by coordinate.
            'B2' => ['font' => ['italic' => true]],

            // Styling an entire column.
            'C'  => ['font' => ['size' => 16]],
        ];
    }
}
```

For the contents of the styles array, please refer to the PhpSpreadsheet docs.

If you prefer the fluent syntax for styling cells, you can do it as follows:

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class InvoicesExport implements WithStyles
{
    public function styles(Worksheet $sheet)
    {
        $sheet->getStyle('B2')->getFont()->setBold(true);
    }
}
```

## Auto Sizing

If you want Laravel Excel to perform an automatic width calculation on **all** columns, use the following code.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class InvoicesExport implements ShouldAutoSize
{
    ...
}
```
