# Presentation

The third major part of exports is the presentational side of things: transforming the data, sizing the columns, styling the cells,... 

[[toc]]

## TLDR;

<span class="inline-step">1</span> **Mapping data**

You can either map on a per-column basis like shown in the previous chapter by using a callback as attribute of on a per row basis with the `WithMapping` concern.

<span class="inline-step">2</span> **Styling cells**

Just like with mapping, you can style the column (or cell) as shown in the previous chapter. To do more generic styling, a `WithStyling` concern is available.

<span class="inline-step">3</span> **Sizing columns**

Column widths can be configured, or the width can be autosized based on the content.

<span class="inline-step">4</span> **Adding filters**

Filters can be added on a column.


## Mapping data

### Column mapping

If you are already using columns, you can add the mapping on the column level: the second argument 
of the column accepts a callback in which you can map the data from the model or array. 
You also have access to (eagerloaded) relationship data.

```php
class UsersExport implements WithColumns
{
    public function collection()
    {
        return Users::with('country')->get();
    }

    public function columns(): array
    {
        return [
            Text::make('Name', function(User $user) {
                return strtoupper($user->name);
            }),
            Text::make('Country', function(User $user) {
                return strtoupper($user->country->name);
            }),
        ];
    }
}
```

### Row mapping

By adding `WithMapping` you map the data that needs to be added as row. 
This way you have control over the actual source for each column.
In case of using the Eloquent query builder:

```php
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersExport implements FromQuery, WithMapping
{    
    /**
    * @var User $user
    */
    public function map(mixed $user): array
    {
        return [
            $user->id,
            $user->lastOrder->description,
            Date::dateTimeToExcel($user->created_at),
        ];
    }
}
```

### Multiple rows

You can also return multiple rows inside the map function.

```php
public function map($user): array
{
    // This example will return 3 rows.
    // First row will have 2 column, the next 2 will have 1 column
    return [
        [
            $user->id,
            Date::dateTimeToExcel($user->created_at),
        ],
        [
            $user->orders->first()->description,
        ],
        [
            $user->orders->last()->description,
        ]
    ];
}
```

## Heading row

If you are using columns, the heading row will already be applied by using the name of the column.

```php
use Maatwebsite\Excel\Concerns\WithColumns;

class UsersExport implements WithColumns
{   
    public function columns(): array
    {
        return [
            Number::make('#', 'id'),
            Text::make('Name'),
            Text::make('Email'),
            Text::make('Registration Date'),
        ];
    }
}
```

You can also add a heading row by adding the `WithHeadings` concern. The heading row will be added as very first row of the sheet.

```php
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements WithHeadings
{   
    public function headings(): array
    {
        return [
            '#',
            'Name',
            'Email',
            'Date',
        ];
    }
}
```

If you need multiple heading rows, return nested arrays from the `headings()` method:

```php
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements WithHeadings
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

## Styling

### Column styling

Styles can be applied on a per-column basis. Styles can be passed as a PhpSpreadsheet style array via the `style()` method.

```php
Text::make('Name')->style([
    'font' => [
        'bold' => true,
    ],
]);
```

Styles can also be applied by using the Fluent syntax.

```php
Text::make('Name')
    ->font('Calibri', 16.0)
    ->textSize(16.0)
    ->bold()
    ->italic();
```

### Cell styling

In some cases you might want to optionally style specific cells. Within the `withCellStyling` callback, you can do any conditional check to decide which styles should be applied.

```php
Text::make('Name')->withCellStyling(function(CellStyle $style, User $user) {
    $style->bold($user->name === 'Patrick');
});
```

### Generic styling

The `WithStyles` concerns allows styling columns, cells and rows. This might be useful when you want to make the heading row bold.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class UsersExport implements WithStyles
{
    public function styles(Worksheet $sheet): array
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

class UsersExport implements WithStyles
{
    public function styles(Worksheet $sheet): void
    {
        $sheet->getStyle('B2')->getFont()->setBold(true);
    }
}
```

## Sizing columns

### Auto sizing

Autosizing can be enabled per columns:

```php
Text::make('Name')->autoSize();
```


If you want Laravel Excel to perform an automatic width calculation on **all** columns, use the following code.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersExport implements ShouldAutoSize
{
    ...
}
```

### Columns widths

In some cases you might want more control over the actual column width instead of relying on autosizing. This can be done per column, directly on the column definition.

```php
Text::make('Name')->width(100);
```

You can also do so with the `WithColumnWidths` concerns. It accepts an array of columns (alphabetic representation: A, B, C) and a numeric width.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithColumnWidths;

class UsersExport implements WithColumnWidths
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

The `WithColumnWidths` concern can be used together with `ShouldAutoSize`. Only the columns with explicit widths won't be autosized.

## Custom Value Binder

By default Laravel Excel uses PhpSpreadsheet's default value binder to intelligently format a cell's value when writing it. You may override this behavior by implementing the `WithCustomValueBinder` concern and the `bindValue` method. Your export class may also extend `DefaultValueBinder` to fall back to the default behavior.

```php
namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;

class UsersExport extends DefaultValueBinder implements WithCustomValueBinder, FromCollection
{
    public function bindValue(Cell $cell, mixed $value): bool
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

### Available DataTypes

* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NUMERIC`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_BOOL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NULL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_INLINE`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_ERROR`

### Default Value Binder

If you want to use one value binder for all your exports, you can configure the default value binder in the config.

In `config/excel.php`:

```php
'value_binder' => [
    'default' => Maatwebsite\Excel\DefaultValueBinder::class,
],
```

:::warning
`WithCustomValueBinder` is only supported for **exports**. It has no effect when used on an import class.
:::

## Filters

```php
Text::make('Country')->autoFilter();
```

```php
use PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule;

Text::make('Country')->autoFilter([
    Rule::AUTOFILTER_COLUMN_RULE_EQUAL => [
        'The Netherlands', 
        'Belgium'
    ],
]);
```

