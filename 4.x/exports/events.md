# Export Events

[[toc]]

## Introduction

Laravel Excel fires several events during the export lifecycle. You can hook into these events to interact with the underlying PhpSpreadsheet objects, apply custom behaviour, or collect metrics.

Events are registered via the `WithEvents` concern, or automatically via the `RegistersEventListeners` trait.

## Registering event listeners

### `WithEvents`

Return a map of event class → callable from `registerEvents()`:

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;

class UsersExport implements FromQuery, WithEvents
{
    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event): void {
                $event->writer->getDelegate()->getProperties()->setCreator('Laravel');
            },

            AfterSheet::class => [self::class, 'afterSheet'],
        ];
    }

    public static function afterSheet(AfterSheet $event): void
    {
        $event->sheet->getDelegate()->getStyle('A1')->getFont()->setBold(true);
    }
}
```

:::warning
Closures cannot be serialised. When using queued exports, use a class with `__invoke` or a static method array-callable instead of a closure.
:::

### `RegistersEventListeners`

The `RegistersEventListeners` trait auto-registers static methods that match the event names, without needing `registerEvents()`:

```php
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\BeforeWriting;
use Maatwebsite\Excel\Events\BeforeSheet;
use Maatwebsite\Excel\Events\AfterSheet;

class UsersExport implements FromQuery, WithEvents
{
    use Exportable, RegistersEventListeners;

    public static function beforeExport(BeforeExport $event): void
    {
        //
    }

    public static function beforeWriting(BeforeWriting $event): void
    {
        //
    }

    public static function beforeSheet(BeforeSheet $event): void
    {
        //
    }

    public static function afterSheet(AfterSheet $event): void
    {
        //
    }
}
```

### Global event listeners

Events can also be registered globally in a service provider so they apply to every export in your application:

```php
use Maatwebsite\Excel\Writer;
use Maatwebsite\Excel\Sheet;
use Maatwebsite\Excel\Events\BeforeExport;
use Maatwebsite\Excel\Events\AfterSheet;

Writer::listen(BeforeExport::class, function (BeforeExport $event): void {
    //
});

Sheet::listen(AfterSheet::class, function (AfterSheet $event): void {
    //
});
```

## Available events

| Event | Fires when | Delegate |
|---|---|---|
| `Maatwebsite\Excel\Events\BeforeExport` | After the Spreadsheet object is created, before any data is written | `$event->writer : Writer` |
| `Maatwebsite\Excel\Events\BeforeWriting` | Before writing data to the first sheet begins | `$event->writer : Writer` |
| `Maatwebsite\Excel\Events\BeforeSheet` | Just before each worksheet is written | `$event->sheet : Sheet` |
| `Maatwebsite\Excel\Events\AfterSheet` | After each worksheet has been fully written | `$event->sheet : Sheet` |
| `Maatwebsite\Excel\Events\AfterChunk` | After each chunk is processed (queued exports) | `$event->getSheet() : Sheet`, `$event->getStartRow() : int` |

### `BeforeExport`

Gives access to the `Writer`, which wraps the PhpSpreadsheet `Spreadsheet` object via `$event->writer->getDelegate()`. Useful for setting document properties before any data is written.

```php
BeforeExport::class => function (BeforeExport $event): void {
    $event->writer->getDelegate()->getProperties()
        ->setCreator('Acme Corp')
        ->setTitle('Users Export');
},
```

### `BeforeWriting`

Fires after the spreadsheet is set up but before chunk/data writing begins. Use it for any last-minute configuration that needs to happen before rows are inserted.

### `BeforeSheet`

Gives access to the `Sheet` wrapping the PhpSpreadsheet `Worksheet`. Use it to configure the sheet before data is written — e.g. set orientation, freeze panes, add a custom header row.

```php
BeforeSheet::class => function (BeforeSheet $event): void {
    $event->sheet->getDelegate()
        ->getPageSetup()
        ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE);
},
```

### `AfterSheet`

The most commonly used export event. The sheet is fully written when this fires, so you can apply styling, set auto-filters, or freeze rows.

```php
AfterSheet::class => function (AfterSheet $event): void {
    $event->sheet->getDelegate()->freezePane('A2');
},
```

### `AfterChunk`

Fires after each chunk is processed when using a queued export. Useful for progress tracking.

```php
AfterChunk::class => function (AfterChunk $event): void {
    logger("Chunk starting at row {$event->getStartRow()} written.");
},
```

## Macroable

`Writer` and `Sheet` are macroable, so you can add shortcuts to PhpSpreadsheet methods not exposed directly by this package:

```php
use Maatwebsite\Excel\Writer;

Writer::macro('setCreator', function (Writer $writer, string $creator): void {
    $writer->getDelegate()->getProperties()->setCreator($creator);
});
```

For PhpSpreadsheet methods, refer to [their documentation](https://phpspreadsheet.readthedocs.io/).
