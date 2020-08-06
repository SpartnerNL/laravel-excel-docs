# Customizing columns

[[toc]]

## Formatting columns

You can easily format an entire column, by using `WithColumnFormatting`.
In case you want something more custom, it's suggested to use the `AfterSheet` event to directly interact with the underlying `Worksheet` class.

```php
namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithMapping;

class InvoicesExport implements WithColumnFormatting, WithMapping
{
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            Date::dateTimeToExcel($invoice->created_at),
            $invoice->total
        ];
    }
    
    public function columnFormats(): array
    {
        return [
            'B' => NumberFormat::FORMAT_DATE_DDMMYYYY,
            'C' => NumberFormat::FORMAT_CURRENCY_EUR_SIMPLE,
        ];
    }
}
```

### Dates

When working with dates, it's recommended to use `\PhpOffice\PhpSpreadsheet\Shared\Date::dateTimeToExcel()` in your mapping
to ensure correct parsing of dates.

### Value binders

By default Laravel Excel uses PhpSpreadsheet's default value binder to intelligently format a cell's value when reading it. You may override this behavior by implementing the `WithCustomValueBinder` concern and the `bindValue` method. Your export class may also extend `DefaultValueBinder` to return the default behavior.

```php
namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;

class UsersExport extends DefaultValueBinder implements WithCustomValueBinder
{
    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, DataType::TYPE_NUMERIC);

            return true;
        }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }
}
```

#### Available DataTypes 

* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NUMERIC`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_BOOL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NULL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_INLINE`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_ERROR`

### Disable intelligent formatting

If you want to disable the intelligent formatting of values, you can extend your export class with  `\PhpOffice\PhpSpreadsheet\Cell\StringValueBinder`. In this case all values are passed on as strings.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCustomValueBinder;

class UsersExport extends \PhpOffice\PhpSpreadsheet\Cell\StringValueBinder implements WithCustomValueBinder
{

}
```

### Default Value Binder

If you want to use one value binder for all your exports, you can configure the default value binder in the config.

In `config/excel.php`:

```php
'value_binder' => [
    'default' => Maatwebsite\Excel\DefaultValueBinder::class,
],
```

## Auto size

If you want Laravel Excel to perform an automatic width calculation, use the following code. 

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class InvoicesExport implements ShouldAutoSize
{
    ...
}
```

## Column widths

In some cases you might want more control over the actual column width instead of relying on autosizing. You can do so with the `WithColumnWidths` concerns. It accepts an array of columns (alphabetic representation: A, B, C) and a numeric width.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithColumnWidth;

class InvoicesExport implements WithColumnWidths
{
    public function columnWidths(): array
    {
        return [
            'A' => 55,
            'B' => 45,            
        ];
    }
}
```

Can be used together with `ShouldAutoSize`. Only the columns with explicit widths won't be autosized. 

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

For the contents of the styles array, please refer to the [PhpSpreadsheet docs](https://phpspreadsheet.readthedocs.io/en/latest/topics/recipes/#valid-array-keys-for-style-applyfromarray)

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