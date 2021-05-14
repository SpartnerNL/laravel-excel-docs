# Heading row

[[toc]]

In case your file contains a heading row (a row in which each cells indicates the purpose of that column) and you want to use those names as array keys of each row, you can implement the `WithHeadingRow` concern.

Given we have an Excel file looking like this:

| Name | Email | @ Field |
|---- |----|---|
| Patrick Brouwers | patrick@maatwebsite.nl | Some value |

We can now reference the heading instead of a numeric array key.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name'  => $row['name'],
            'email' => $row['email'],
            'at'    => $row['at_field'],
        ]);
    }
}
```

## Heading row on different row

In case your heading row is not on the first row, you can easily specify this in your import class:

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name'  => $row['name'],
            'email' => $row['email'],
        ]);
    }
    
    public function headingRow(): int
    {
        return 2;
    }
}
```

The 2nd row will now be used as heading row.

## Heading key formatting

By default the heading keys are formatted with the Laravel `str_slug()` helper. E.g. this means all spaces are converted to `_`.

If you want to change this behaviour, you can do so by extending the `HeadingRowFormatter`

### No formatting

If you want no formatting at all, you can use the `none` formatter. The array keys will contain the exact data that was in the heading row.

```php
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

HeadingRowFormatter::default('none');

public function model(array $row)
{
    return new User([
        'name'  => $row['Name'],
        'email' => $row['Email'],
    ]);
}
```

### Custom formatter

You can define a custom formatter with `::extend()` in a service provider.

```php
HeadingRowFormatter::extend('custom', function($value) {
    return 'do-something-custom' . $value; 
});
```

You can set the custom formatter in `config/excel.php`.

```php
'imports' => [
    'heading_row' => [
        'formatter' => 'custom',
    ],
],
```

Or you can then set this new formatter in a service provider.

```php
HeadingRowFormatter::default('custom');
```

## Importing only the heading row

Sometimes you might want to prefetch the heading row to do some validation. We have an easy shortcut for this: `HeadingRowImport`.

```php
use Maatwebsite\Excel\HeadingRowImport;

class UsersImportController extends Controller 
{
    public function import()
    {
        $headings = (new HeadingRowImport)->toArray('users.xlsx');
    }
}
```

The headings array contains an array of headings per sheet. 
