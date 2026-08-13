# Export Templates

[[toc]]

## Introduction

The `WithExportTemplate` concern lets you base an export on an existing spreadsheet file. Instead of starting from a blank workbook, Laravel Excel loads the template file and writes your data into it — preserving existing styles, formulas, page setup, additional sheets, and any other content defined in the template.

## Basic usage

Implement `WithExportTemplate` and return the absolute path to the template file from `exportTemplate()`:

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithExportTemplate;

class ReportExport implements FromArray, WithCustomStartCell, WithExportTemplate
{
    use Exportable;

    public function array(): array
    {
        return [
            ['Patrick', 'Brouwers'],
            ['Taylor', 'Otwell'],
        ];
    }

    public function startCell(): string
    {
        return 'A3';
    }

    public function exportTemplate(): string
    {
        return storage_path('templates/report.xlsx');
    }
}
```

In this example the template already has a title in `A1`, a formula in `C3` and landscape page orientation. Those are preserved in the output; only rows from `A3` downward are written by the export.

## What is preserved

Everything in the template file is kept unless your export explicitly overwrites it:

- **Styles and formatting** — fonts, borders, fills, number formats
- **Formulas** — cells with formulas remain intact
- **Page setup** — orientation, margins, print area
- **Additional sheets** — extra worksheets in the template are carried over to the output

## Combining with `WithMultipleSheets`

When your export uses `WithMultipleSheets`, each sheet in the export is written into the corresponding worksheet in the template (by position). Any template worksheets beyond the number of export sheets are preserved as-is.

```php
class MultiSheetReportExport implements WithMultipleSheets, WithExportTemplate
{
    use Exportable;

    public function sheets(): array
    {
        return [
            new DataSheet,
            new SummarySheet,
        ];
    }

    public function exportTemplate(): string
    {
        return storage_path('templates/multi-sheet-report.xlsx');
    }
}
```

## Queued exports

`WithExportTemplate` works with queued exports. The template path is resolved when the first chunk job runs.

```php
class QueuedReportExport implements FromQuery, ShouldQueue, WithExportTemplate
{
    use Exportable, Queueable;

    public function query(): Builder
    {
        return Report::query();
    }

    public function exportTemplate(): string
    {
        return storage_path('templates/report.xlsx');
    }
}
```

:::warning
Make sure the template file exists and is readable when the job runs. If you store templates on a remote disk, copy them to local storage first or use an absolute local path.
:::
