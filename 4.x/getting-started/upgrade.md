# Upgrade Guide

[[toc]]

## Upgrading to 4.0 from 3.1

### Minimum requirements

Laravel-Excel 4.0 requires **PHP 8.3** or higher and **Laravel 12** or higher.
You will also need **phpoffice/phpspreadsheet 5.3** or higher.

If you are on an older version of PHP or Laravel, upgrade those first before upgrading to Laravel-Excel 4.0.

### Fully typed codebase

Native PHP types have been added across the entire codebase, including all public methods and interfaces. If you implement any Laravel-Excel interface or override any method, you must update your method signatures to include the matching return types.

```php
// Before (3.1)
class MyExport implements FromArray
{
    public function array()
    {
        return [];
    }
}

// After (4.0)
class MyExport implements FromArray
{
    public function array(): array
    {
        return [];
    }
}
```

Common return types to add:

| Method              | Return type    |
|---------------------|----------------|
| `array()`           | `array`        |
| `collection()`      | `Collection`   |
| `query()`           | `Builder`      |
| `view()`            | `View`         |
| `generator()`       | `Generator`    |
| `headings()`        | `array`        |
| `map($row)`         | `array`        |
| `model(array $row)` | `?Model`       |
| `batchSize()`       | `int`          |
| `uniqueBy()`        | `string|array` |
| `rules()`           | `array`        |
| `registerEvents()`  | `array`        |

### FromScout

To keep `laravel/scout` as an optional dependency, `FromQuery` no longer supports returning a Scout `Builder` instance. Use the new `FromScout` export interface instead.

```php
// Before (3.1)
use Maatwebsite\Excel\Concerns\FromQuery;

class ProductsExport implements FromQuery
{
    public function query(): Builder
    {
        return Product::search('*');
    }
}

// After (4.0)
use Maatwebsite\Excel\Concerns\FromScout;

class ProductsExport implements FromScout
{
    public function scout(): \Laravel\Scout\Builder
    {
        return Product::search('*');
    }
}
```

### Queue attributes

Imports now support `#[Queue]` and `#[Connection]` PHP attributes as an alternative to implementing the queue configuration methods.

__Additions__

* Column exports
* Column imports
* `FromScout` concern for Scout-based exports
* Queue attribute support (`#[Queue]`, `#[Connection]`)

__Deprecations__

* Queued exports are deprecated and will be removed in 5.x. Please check the [performance documentation](/4.x/exports/performance.html) for the new and improved way.

## Upgrading to 3.1 from 3.0

Version 3.1 is backwards compatible with 3.0. Only features were added in this release.

__Additions__

* Imports feature.
* ChunkReading
* BatchInserts
* Queued imports
* ToArray concern for Exports.
* Custom value binders for Imports and Exports.

__Removals__

* `Excel::filter('chunk')` method is removed, chunk filter is automatically added when using chunk reading.

## Upgrading to 3.* from 2.1

Version 3.* is not backwards compatible with 2.*. It's not possible to provide a step-by-step migration guide as it's a complete paradigm shift.

__New dependencies__

3.* introduces some new dependencies.

* Requires PHP 7.0 or higher.
* Requires Laravel 5.5 (or higher).
* Requires PhpSpreadsheet instead of PHPExcel.

__Deprecations__

ALL Laravel Excel 2.* methods are deprecated and will not be able to use in 3.0 . 

- `Excel::load()` is removed and replaced by `Excel::import($yourImport)`
- `Excel::create()` is removed and replaced by `Excel::download/Excel::store($yourExport)`
- `Excel::create()->string('xlsx')` is removed an replaced by `Excel::raw($yourExport, Excel::XLSX)`
- 3.0 provides no convenience methods for styling, you are encouraged to use PhpSpreadsheets native methods.

You can find an example upgrade for an export here: [https://github.com/SpartnerNL/Laravel-Excel/issues/1799](https://github.com/SpartnerNL/Laravel-Excel/issues/1799)
