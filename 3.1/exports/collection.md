# Exporting collections

[[toc]]

The easiest way to start an export is to create a custom export class. We'll use an invoices export as example.

Create a new class called `InvoicesExport` in `app/Exports`:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{
    public function collection()
    {
        return Invoice::all();
    }
}
```

In your controller we can now download this export:

```php
public function export() 
{
    return Excel::download(new InvoicesExport, 'invoices.xlsx');
}
```

Optionally you can pass in whether or not to output headers and custom response headers:

```php
public function export() 
{
    return Excel::download(new InvoicesExport, 'invoices.xlsx', true, ['X-Vapor-Base64-Encode' => 'True']);
}
```


Or store it on a disk, (e.g. s3):

```php
public function storeExcel() 
{
    return Excel::store(new InvoicesExport, 'invoices.xlsx', 's3');
}
```

:bulb: More about storing exports can be found in the [storing exports on disk page](/3.1/exports/store.html).

:::tip
If you want to use relationships in Collection, combine with [Mapping Data](/3.1/exports/mapping.html)
:::

## Using custom structures

If you are not using Eloquent or having another datasource (e.g. an API, MongoDB, Cache, ...) you can also return a custom collection:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{
    public function collection()
    {
        return new Collection([
            [1, 2, 3],
            [4, 5, 6]
        ]);
    }
}
```

## Using arrays

If you prefer to use plain arrays over Collections, you can use the `FromArray` concern:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromArray;

class InvoicesExport implements FromArray
{
    public function array(): array
    {
        return [
            [1, 2, 3],
            [4, 5, 6]
        ];
    }
}
```

If you need to pass data from the controller to your export, you can use the constructor to do so:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromArray;

class InvoicesExport implements FromArray
{
    protected $invoices;

    public function __construct(array $invoices)
    {
        $this->invoices = $invoices;
    }

    public function array(): array
    {
        return $this->invoices;
    }
}
```

In your controller you can now use the constructor of the export class:

```php
public function export() 
{
    $export = new InvoicesExport([
        [1, 2, 3],
        [4, 5, 6]
    ]);

    return Excel::download($export, 'invoices.xlsx');
}
```

## Dependency injection

In case your export needs dependencies, you can inject the export class:

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{
    public function __construct(InvoicesRepository $invoices)
    {
        $this->invoices = $invoices;
    }

    public function collection()
    {
        return $this->invoices->all();
    }
}
```

```php
public function export(Excel $excel, InvoicesExport $export) 
{
    return $excel->download($export, 'invoices.xlsx');
}
```

## Strict null comparisons

If you want your `0` values to be actual `0` values in your Excel sheet instead of `null` (empty cells), you can use `WithStrictNullComparison`.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class InvoicesExport implements FromCollection, WithStrictNullComparison
{
    public function __construct(InvoicesRepository $invoices)
    {
        $this->invoices = $invoices;
    }

    public function collection()
    {
        return $this->invoices->all();
    }
}
```

## Custom start cell
The default start cell is _A1_. Implementing the `WithCustomStartCell` concern in your export class allows you to specify a custom start cell.

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;

class InvoicesExport implements FromCollection, WithCustomStartCell
{
    public function collection()
    {
        return Invoice::all();
    }

    public function startCell(): string
    {
        return 'B2';
    }
}
```

:::warning
`WithCustomStartCell` is only supported for `FromCollection` exports.
:::

## Storing raw contents

If you want to receive the raw contents of the exported file, you can use the `raw()` method:

```php
$contents = Excel::raw(new InvoicesExport, \Maatwebsite\Excel\Excel::XLSX);
```

## Collection macros

The package provides some macro to Laravel's collection class to easily download or store a collection.

### Downloading a collection as Excel

```php
User::all()->downloadExcel(
    $filePath,
    $writerType = null,
    $headings = false
)
```

It doesn't have to be an Eloquent collection to work:


```php
(new Collection([[1, 2, 3], [1, 2, 3]]))->downloadExcel(
    $filePath,
    $writerType = null,
    $headings = false
)
```

### Storing a collection on disk

```php
User::all()->storeExcel(
    $filePath,
    $disk = null,
    $writerType = null,
    $headings = false
)
```
