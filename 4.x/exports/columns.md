# Columns

In the previous chapter, we defined the source of data. Laravel Excel tries to export this data as good as possible. By
using Columns you'll get more fine-grained control on how the data will be presented.

## TLDR;

<span class="inline-step">1</span> **What is a column?**

A column is a vertical series of cells in a spreadsheet. In the Export they will be defined by with `Column` class,
like `Text::make('Name')`

<span class="inline-step">2</span> **Defining columns**

Columns can be configured using the `WithColumns` concern within the export class. An array of `Column` instances are
expected.s

<span class="inline-step">3</span> **Presenting**

Columns can select which data and how it should be presented. Each column has a chain of methods
like `Text::make('Name')->bold()->autoSize()`.

[[toc]]

## What are columns?

A column in a spreadsheet is a vertical series of cells in a spreadsheet. In the example underneath `A` and `B` are
columns.

| |A|B| 
|---|---|---|
|1|A1|B1|
|2|A2|B2|

Each of these columns will be represented by an instance of `Column`.

```php
use Maatwebsite\Excel\Columns\Column;

[
    Column::make('Name'),  // A
    Column::make('Email'), // B
]
```

Purposes of a `Column` within Laravel Excel are:

<span class="inline-step">1</span> **Defining which data should be inserted in which column**

A column can pick any attribute of a model.

<span class="inline-step">2</span> **Setting data types and Excel number formatting**

Indicate columns are text, number, prices, dates, etc.

<span class="inline-step">2</span> **Customizing column presentation**

Changing styling, width, etc.

## Defining columns

To start using columns, you'll have to add the `WithColumns` concern to the export class.

```php
class UsersExport implements WithColumns
{
    public function columns(): array
    {
        return [
            Text::make('Name', 'name'),
            Date::make('Date of Birth', 'dob'),
        ];
    }
}
```

This concern will enforce a `columns()` method which should return an array of `Column` instance. When not passing any array keys, the columns
will be inserted from left to right in A, B, etc.

The above example will give the following spreadsheet output:

|Name|Date of Birth|
|:---|:---|
|Spock| 06-01-2230 |
|Captain Kirk| 22-03-2233|

If you want more control in which columns the data should end, you can configure the column letter as array key. Column coordinates
without a column definition will be left empty.

```php
 return [
    'B' => Text::make('Name', 'name'),
    'D' => Date::make('Date of Birth', 'dob'),
];
```

### Column definition

```php
Column::make('{Title}', '{attribute}');
```

A column consist of a required `title` which will be used as column header. The second parameter refers to the name of
the `attribute` of the model.

If no `attribute` is passed, the title will be converted to a snake case attribute.

```php
Text::make('Name'); // uses "name" attribute
```

A callback can also be passed as second argument. The closure will get the row or Model. Whatever is returned within the
closure, will be inserted in the cell.

```php
Text::make('Uppercased Name', function(User $user) {
    return strtoupper($user->name);
});
```

By using a specific data type, that data type will automatically configure the right internal data type and number
formatting for Excel.

```php
Date::make('Date of Birth', 'dob');
```

## Column Types

### Custom type

By using the `type()` setter, you can set any PhpSpreadsheet DataType to the specific column cells.

```php
use PhpOffice\PhpSpreadsheet\Cell\DataType;

Column::make('Name')->type(DataType::TYPE_STRING);
```

### Custom number format

By using the `format()` setter, you can set any PhpSpreadsheet NumberFormat to the specific column cells.

```php
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

Column::make('Name')->format(NumberFormat::FORMAT_TEXT);
```

### Text

```php
Text::make('Name');
```

### Number

```php
Number::make('ID');
```

Optionally you can enable decimals on the number.

```php
Number::make('ID')->withDecimals();
```

Or provide the entire number format yourself.

```php
Number::make('ID')->format('#,##0.00');
```

### Decimal

```php
Decimal::make('Average Working Hours');
```

You can provide a custom decimal number format with the `format()` method.

```php
Decimal::make('Average Working Hours')->format('#,##0.00');
```

### Percentage

```php
Percentage::make('Available');
```

You can provide a custom percentage number format with the `format()` method.

```php
Percentage::make('Available')->format('0.00%');
```

### Date

```php
Date::make('Date of Birth');
```

You can provide a custom date format with the `format()` method.

```php
Date::make('Date of Birth')->format('yyyy-mm-dd');
```

### Datetime

```php
DateTime::make('Registration Date');
```

You can provide a custom datetime format with the `format()` method.

```php
DateTime::make('Registration Date')->format('d/m/yy h:mm');
```

### Price

```php
Price::make('Order Total');
```

You can configure the Price format by selecting the wanted currency:

```php
Price::make('Order Total')->inEuros();
```

```php
Price::make('Order Total')->inDollars();
```

If you need a different format or currency, you can use the `currency()` setter.

```php
Price::make('Order Total')->currency('#,##0_-"€"');
```

### Boolean

```php
Boolean::make('Is Verified');
```

### RichText

If you want to insert some HTML in a cell and keep most of the styling, like bold/italic/etc. words, you can mark the column as rich text.

```php
RichText::make('Html', function() {
    return 'Html <strong>bold</strong>';
});
```

### Image

```php
Image::make('Avatar', function(User $user) {
    return Storage::path($user->avatar);
})->width(100)->height(100);
```

:::warning
Make sure to provide an absolute path
:::

### Formula

```php
Formula::make('Total', fn() => '=1+1');
```

### EmptyCell

```php
EmptyCell::make();
```

## Sizing

### Explicit width

```php
Text::make('Name')->width(100);
```

### Autosizing

```php
Text::make('Name')->autoSize();
```

## Styling

### Column styling

```php
Text::make('Name')->style([
    'font' => [
        'bold' => true,
    ],
]);
```

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


## Filters

```php
Text::make('Country')->autoFilter();
```

```php
use \PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter\Column\Rule;

Text::make('Country')->autoFilter([
    Rule::AUTOFILTER_COLUMN_RULE_EQUAL => ['The Netherlands', 'Belgium']
]);
```

