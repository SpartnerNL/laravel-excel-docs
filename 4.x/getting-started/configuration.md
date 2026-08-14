# Configuration

[[toc]]

The configuration file is published to `config/excel.php` during installation. It is not required to republish it when upgrading — defaults are always applied for any missing keys.

```shell
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

---

## Exports

### `exports.chunk_size`

Default: `1000`

Number of rows per database query chunk when using `FromQuery`. Tune this when you hit memory limits or want to reduce query time.

```php
'chunk_size' => 500,
```

### `exports.pre_calculate_formulas`

Default: `false`

When `true`, PhpSpreadsheet recalculates all formulas before saving. Useful if downstream consumers cannot calculate formulas themselves.

### `exports.strict_null_comparison`

Default: `false`

When `true`, empty strings (`''`) are written as empty cells rather than being treated as `null`. Enable this if `0` values are being swallowed.

### `exports.csv`

CSV-specific export settings:

| Key | Default | Description |
|---|---|---|
| `delimiter` | `,` | Column delimiter |
| `enclosure` | `"` | Value enclosure character |
| `line_ending` | `PHP_EOL` | Row terminator |
| `use_bom` | `false` | Prepend a UTF-8 BOM |
| `include_separator_line` | `false` | Add a `sep=` line for Excel CSV compatibility |
| `excel_compatibility` | `false` | Full Excel CSV compatibility mode |
| `output_encoding` | `''` | Output encoding (empty = UTF-8) |
| `test_auto_detect` | `true` | Test auto-detection of delimiter/enclosure |

### `exports.properties`

Default document properties written to every export:

```php
'properties' => [
    'creator'        => '',
    'lastModifiedBy' => '',
    'title'          => '',
    'description'    => '',
    'subject'        => '',
    'keywords'       => '',
    'category'       => '',
    'manager'        => '',
    'company'        => '',
],
```

Override per-export using the `WithProperties` concern.

### `exports.source_handlers`

Default: `[]`

Register custom `SheetSourceHandler` or `QueuedSheetSourceHandler` class names here. They are resolved from the service container and take priority over the built-in `From*` handlers. See [Data sources](/4.x/exports/data.html#custom-source-handlers).

---

## Imports

### `imports.read_only`

Default: `true`

When `true`, style information is not loaded from the file, which speeds up reading. Set to `false` if your import logic needs to inspect cell styles.

### `imports.ignore_empty`

Default: `false`

When `true`, rows where every cell is `null` or an empty string are skipped automatically.

### `imports.heading_row.formatter`

Default: `'slug'`

Controls how heading row values are formatted into array keys. Options:

| Value | Behaviour |
|---|---|
| `slug` | Converts headings to `snake_case` slugs (default) |
| `none` | Uses heading values as-is |
| `custom` | Supply your own formatter class |

### `imports.csv`

CSV-specific import settings:

| Key | Default | Description |
|---|---|---|
| `delimiter` | `null` | Column delimiter; `null` = auto-detect |
| `enclosure` | `"` | Value enclosure character |
| `escape_character` | `\\` | Escape character |
| `contiguous` | `false` | Merge contiguous delimiters |
| `input_encoding` | `Csv::GUESS_ENCODING` | Input file encoding |

### `imports.cells.middleware`

Default: `[]`

An array of middleware classes executed on each cell value as it is read. Two built-in middleware classes are available (commented out by default):

```php
'middleware' => [
    \Maatwebsite\Excel\Middleware\TrimCellValue::class,
    \Maatwebsite\Excel\Middleware\ConvertEmptyCellValuesToNull::class,
],
```

---

## Extension detector

Maps file extensions to reader/writer type constants. This is how the package decides which PhpSpreadsheet reader or writer to use when no explicit type is passed.

```php
'extension_detector' => [
    'xlsx' => Excel::XLSX,
    'xls'  => Excel::XLS,
    'csv'  => Excel::CSV,
    'ods'  => Excel::ODS,
    // ...
    'pdf'  => Excel::DOMPDF, // default PDF driver
],
```

Available PDF drivers: `Excel::MPDF`, `Excel::TCPDF`, `Excel::DOMPDF`. Requires installing the corresponding composer package.

---

## Value binder

Default: `Maatwebsite\Excel\DefaultValueBinder::class`

Controls how cell values are written by default. PhpSpreadsheet ships three binders:

| Class | Behaviour |
|---|---|
| `Maatwebsite\Excel\DefaultValueBinder` | Intelligent type detection (recommended) |
| `PhpOffice\PhpSpreadsheet\Cell\StringValueBinder` | All values written as strings |
| `PhpOffice\PhpSpreadsheet\Cell\AdvancedValueBinder` | Extended type detection (currency, fractions, etc.) |

Override per-export using the `WithCustomValueBinder` concern.

---

## Cache

Cell caching reduces memory use at the cost of speed.

### `cache.driver`

Default: `'memory'`

| Driver | Description |
|---|---|
| `memory` | All cell values kept in PHP memory (default, fastest) |
| `illuminate` | Each cell value stored in a Laravel cache store |
| `batch` | Values stored in cache only when the memory limit is reached |

### `cache.batch.memory_limit`

Default: `60000` (bytes)

Memory threshold for the `batch` driver. When PHP memory usage exceeds this value, the batch is flushed to the cache store.

### `cache.illuminate.store`

Default: `null` (uses the default cache store)

Specify a named cache store from `config/cache.php` to use a dedicated store for cell caching.

### `cache.default_ttl`

Default: `10800` (seconds — 3 hours)

TTL for cached cell values. Set to `null` to cache indefinitely.

---

## Transactions

Imports are wrapped in a database transaction by default so that a failed import can be retried cleanly.

### `transactions.handler`

Default: `'db'`

| Value | Behaviour |
|---|---|
| `'db'` | Wraps each import in a database transaction (default) |
| `null` | Disables transactions |

### `transactions.db.connection`

Default: `null` (uses the default database connection)

Specify a named connection from `config/database.php`.

---

## Temporary files

### `temporary_files.local_path`

Default: `storage_path('framework/cache/laravel-excel')`

Where temporary files are stored during export/import processing.

### `temporary_files.local_permissions`

Permissions for the temporary directory and files:

```php
'local_permissions' => [
    'dir'  => 0755,
    'file' => 0644,
],
```

### `temporary_files.remote_disk`

Default: `null`

In a multi-server queue setup, workers on different machines cannot share a local temporary path. Set this to a shared disk name (e.g. `'s3'`) so every worker retrieves the temporary file from the same location.

### `temporary_files.remote_prefix`

Default: `null`

Optional path prefix for remote temporary files on the shared disk.

### `temporary_files.force_resync_remote`

Default: `null`

When `true`, the local copy of the temporary file is deleted after each chunk job completes, preventing local disk exhaustion in multi-server setups. Only relevant when `remote_disk` is set.
