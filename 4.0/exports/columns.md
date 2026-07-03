# Columns

In the previous chapter, we defined the source of data. Laravel Excel tries to export this data as good as possible. By
using Columns you'll get more fine-grained control on how the data will be presented.

## TLDR;

<span class="inline-step">1</span> **What is a column?**

A column is a vertical series of cells in a spreadsheet. In the Export they will be defined by with `Column` class,
like `Text::make('Name')`

<span class="inline-step">2</span> **Defining columns**

Columns can be configured using the `WithColumns` concern within the export class. An array of `Column` instances are
expected.

<span class="inline-step">3</span> **Data types**

Per column a data type can be configured. This is very useful when dealing with data likes numbers, dates and prices.

[[toc]]

## What is a column?

A column in a spreadsheet is a vertical series of cells in a spreadsheet. In the example underneath `A` and `B` are
columns.  `1` and `2` are rows and `A1`, `A2`, ... are cells.

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

Changing styling, width, etc. (See next chapter)

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

#### Auto resolving attributes

If no `attribute` is passed, the title will be converted to a snake case attribute.

```php
Text::make('Name'); // uses "name" attribute
```

#### Relation attributes

When working with relationships (e.g. HasOne and BelongsTo), you can use a dot notation as attribute:

```php
Text::make('Office', 'office.name'); // uses "name" attribute of the "office" BelongsTo relationship.
```

#### Computed values

A callback can also be passed as second argument. The closure will get the row or Model. Whatever is returned within the
closure, will be inserted in the cell.

```php
Text::make('Uppercased Name', function(User $user) {
    return strtoupper($user->name);
});
```

#### Data types

By using a specific data type, that data type will automatically configure the right internal data type and number
formatting for Excel.

```php
Date::make('Date of Birth', 'dob');
```

#### Nullable values

When using specific data types, the column will always force the datatype when exporting. This means that a `null` value will be written as a `0` when using a `Number` column.
If you want to make sure the cell stays empty, you can mark the column as `->nullable()`.

```php
[
    Number::make('Amount'),
    Number::make('Amount Nullable')->nullable(),
]
```

### Using different data sources

The above examples all expect the input source to be an Eloquent model. However, the data source is not only limited to Eloquent. You can use any other data source (except a View) in combination with columns.

The attribute expects the array key of the row. When using a callback as attribute, you'll get an array of the entire row.

```php
class UsersExport implements FromArray, WithColumns
{
    public function array(): array
    {
        return [
            ['firstname' => 'Patrick', 'lastname' => 'Brouwers'],
            ['firstname' => 'Taylor', 'lastname' => 'Otwell'],
        ];
    }
    
    public function columns(): array
    {
        return [
            Text::make('First Name', 'firstname'),
            Text::make('Last Name', 'lastname'),
            Text::make('Name', function(array $row) {
                return $row['firstname'] . ' ' . $row['lastname'];
            }),
        ];
    }
}
```

## Column Types

### Custom type

Types refer to the internal type that Excel uses to determine which kind of value is inside a cell like strings, numbers, ...
By using the `type()` setter, you can set any PhpSpreadsheet `DataType` to the specific column cells. It's advised to use the dedicated Column classes like `Text` and `Number`, however, it can be useful when you want to programmatically set the data type.

```php
use PhpOffice\PhpSpreadsheet\Cell\DataType;

Column::make('Name')->type(DataType::TYPE_STRING);
```

### Custom number format

Formats is what Excel uses to dynamically change how cells are displayed, like a float value that is shown as a percentage.
By using the `format()` setter, you can configure any PhpSpreadsheet `NumberFormat` to the specific column cells or provide a completely custom format.
The dedicated column classes already provide default formatting based on the column type, but it can be useful if you want to programmatically change any format code.

```php
// By using class constants of PhpSpreadsheet
Column::make('Name')->format(PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_TEXT);

// By using Excel format notation directly
Column::make('Number')->format('#,##0.00');
```

### Text

If you want values to be explicitly formatted and inserted as strings, you can use the `Text` column. This can be really useful when dealing with values like phone numbers that have a leading 0. Because of PhpSpreadsheet's default value binder, those values will be detected as a number and therefor inserted as a numeric value in the spreadsheet. Marking these columns as text will overrule the default value binder.

```php
Text::make('Name');
```

### Number

To explicitly mark a column as numeric the `Number` column can be used. This column type will format the numeric value as an integer (without the decimals), however the underlying value will remain the full number.

```php
Number::make('ID');
```

If you want the number to display including 2 decimals, you can indicate so via the `withDecimals` method.

```php
Number::make('ID')->withDecimals();
```

If you want to customize how the number should be formatted in the Excel file, you can use the `format` method.

```php
Number::make('ID')->format('#,##0.00');
```

### Decimal

As an alternative to using `withDecimals` on the `Number` column, you also directly use the `Decimal` column type. This column type will format to exactly 2 decimals. 

```php
Decimal::make('Average Working Hours');
```

If you want another format, you can do so via the `->format()` method.

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

### Hyperlink

If you want to make the cell value into a hyperlink, you can use the `Hyperlink` column type. 
The value of the cell will be used as hyperlink url and tooltip.

```php
Hyperlink::make('Url');
```

If you want to resolve a custom url, you can add a callback to the `url()` method. Whatever is returned
from that callback will be used as hyperlink.

```php
Hyperlink::make('Company', 'company.name')->url(function(User $user) {
    return $user->company->url;
});
```

A tooltip can be set using the `tooltip` setter.

```php
Hyperlink::make('Url')->tooltip('Open link');
```

If you want to have a dynamic tooltip, you can using a callback.

```php
Hyperlink::make('Url')->tooltip(function(User $user) {
    return 'Open link of '. $user->name;
});
```

### RichText

If you want to insert some HTML in a cell and keep most of the styling, like bold/italic/etc. words, you can mark the column as rich text.

```php
RichText::make('Html', function() {
    return 'Html <strong>bold</strong>';
});
```

### Image

When using an `Image` column, it will use the value as `path` when resolving it on the default disk.

```php
Image::make('Avatar');
```

You can provide any other disk by using the `->disk()` method.

```php
Image::make('Avatar')->disk('uploads');
```

If you need more control over how the absolute image path should be resolved, you can do so via a callback.

```php
Image::make('Avatar', function(User $user) {
    return Storage::path($user->avatar);
});
```

:::warning
Make sure to always provide an absolute path.
:::

#### Dimensions

Image width and height can be set using the `->width()` and `->height()` methods. Setting them will also influence the column width and row height.

```php
Image::make('Avatar')->width(100)->height(100);
```

### Formula

```php
Formula::make('Total', fn() => '=1+1');
```

### EmptyCell

```php
EmptyCell::make();
```

## Customizing cells

If you want to customize the cell, accessing the `PhpSpreadsheet` Cell directly, you can use the `writing()` callback:

```php
Text::make('Name')->writing(function(Cell $cell) {
    $cell->getHyperlink()->setUrl('https://spartner.software');
});
```
