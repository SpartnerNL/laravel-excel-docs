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

### Custom type and format

```php
Column::make('Name')->type(PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING);
```

```php
Column::make('Name')->format(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);
```

### Text

```php
Text::make('Name');
```

### Number

```php
Number::make('ID');
```

### Decimal

```php
Decimal::make('Average Working Hours');
```

### Date

```php
Date::make('Date of Birth');
```

### Datetime

```php
DateTime::make('Registration Date');
```

### Price

```php
Price::make('Order Total');
```

### Boolean

```php
Boolean::make('Is Verified');
```

### Boolean

```php
Boolean::make('Is Verified');
```

### RichText

```php
RichText::make('Html', function() {
    return 'Html <strong>bold</strong>';
});
```

### Image

```php
Image::make('Avatar', function(User $user) {
    return Storage::path($user->avatar);
})->width(100.0)->height(100.0);
```

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

```php
Text::make('Name')->withCellStyling(function(CellStyle $style, $name) {
    $style->bold($name === 'Patrick');
});
```


## Filters

```php
Text::make('Name')->autoFilter();
```
