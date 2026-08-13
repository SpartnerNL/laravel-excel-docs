# Upgrade Guide

[[toc]]

## Upgrading to 4.0 from 3.1

### Minimum requirements

Laravel-Excel 4.0 requires **PHP 8.3** or higher and **Laravel 12** or higher.
You will also need **phpoffice/phpspreadsheet 5.3** or higher.

If you are on an older version of PHP or Laravel, upgrade those first before upgrading to Laravel-Excel 4.0.

### PhpSpreadsheet 5

The underlying `phpoffice/phpspreadsheet` dependency has been upgraded from `^1.30` to `^5.3`. Code that only uses Laravel-Excel's own API (exports, imports, concerns) is largely unaffected. However, if you interact with PhpSpreadsheet objects directly, review your code against the PhpSpreadsheet 2.x–5.x breaking changes. Common places this applies:

- Event listeners registered via `WithEvents` (e.g. styling a sheet through `$event->sheet->getDelegate()` in `AfterSheet`)
- The `WithCharts` and `WithDrawings` concerns
- Custom value binders (`WithCustomValueBinder`) and anything extending `DefaultValueBinder`
- Direct use of PhpSpreadsheet classes such as `NumberFormat`, `Style`, or `Coordinate`

See the [PhpSpreadsheet changelog](https://github.com/PHPOffice/PhpSpreadsheet/blob/master/CHANGELOG.md) for the 2.0, 3.0, 4.0 and 5.0 breaking changes.

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
| `uniqueBy()`        | `string\|array` |
| `rules()`           | `array`        |
| `registerEvents()`  | `array`        |

Because return types are now enforced natively, some signatures are stricter than the 3.1 docblocks suggested:

- `Exportable::store()` returns `bool|PendingDispatch|PendingBatch`; `Exportable::queue()` returns `PendingDispatch|PendingBatch`.
- `Importable::import()` returns `Importer|PendingDispatch|PendingBatch`; `Importable::queue()` returns `PendingDispatch|PendingBatch` (it no longer advertises returning the importable instance itself).

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

### Export and Import marker interfaces

Two new marker interfaces have been introduced: `Maatwebsite\Excel\Concerns\Export` and `Maatwebsite\Excel\Concerns\Import`. All export-related data-source concerns (e.g. `FromArray`, `FromCollection`, `FromQuery`) now extend `Export`, and all import data-sink concerns (e.g. `ToModel`, `ToArray`, `ToCollection`, `OnEachRow`) now extend `Import`.

Because your export and import classes already implement those concerns, they automatically satisfy the new interfaces — no changes are required in most cases.

You can now use `Export` and `Import` as type hints wherever you previously used `object`:

```php
use Maatwebsite\Excel\Concerns\Export;

public function handle(Export $export): void { ... }
```

**`WithMultipleSheets`** — the `sheets()` method docblock return type has been narrowed from `array<int|string, object>` to `array<int|string, Export|Import>`. Sheets returned should implement at least one export or import concern, which is almost certainly already the case.

**`Event::getConcernable()`** now returns `Export|Import|null` instead of `object`. Update any code that relies on the `object` return type in a type-strict context.

### Job batching (`ShouldBatch`)

Queued exports and chunked queued imports can now implement the `Maatwebsite\Excel\Concerns\ShouldBatch` marker interface to be dispatched as a [job batch](https://laravel.com/docs/queues#job-batching) instead of a chain.

```php
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldBatch;
use Illuminate\Contracts\Queue\ShouldQueue;

class UsersExport implements FromQuery, ShouldQueue, ShouldBatch
{
    use Exportable;

    public function query(): Builder
    {
        return User::query();
    }
}
```

When `ShouldBatch` is implemented, `Excel::store()`, `Excel::queue()`, `Exportable::queue()` and `Importable::queue()` return an `Illuminate\Bus\PendingBatch` instead of a `PendingDispatch`. Update any code that type-hints these return values.

### Queue attributes

Imports support Laravel's native `#[Queue]` and `#[Connection]` PHP attributes (requires Laravel 13+) in addition to the existing `$queue` and `$connection` properties.

```php
use Illuminate\Queue\Attributes\Connection;
use Illuminate\Queue\Attributes\Queue;

#[Queue('imports')]
#[Connection('redis')]
class UsersImport implements ToModel, WithChunkReading, ShouldQueue
{
    // ...
}
```

### Configuration

The published configuration file (`config/excel.php`) has no key changes compared to 3.1 — there is no need to republish or migrate your configuration.

### Removed requirements

The `ext-json` requirement has been dropped (JSON support is bundled with PHP 8). No action is required.

__Additions__

* Column exports and imports (`WithColumns`)
* `FromScout` concern for Scout-based exports
* `WithExportTemplate` concern to base exports on an existing spreadsheet
* `ShouldBatch` marker interface for job-batch queuing
* Queue attribute support (`#[Queue]`, `#[Connection]`) on imports
* `Export` and `Import` marker interfaces
* Extensible export source handler registry (`Excel::registerSourceHandler()`)

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
