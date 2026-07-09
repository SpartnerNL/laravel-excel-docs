# Concern overview

| Interface | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\FromArray`| Use an array to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\FromCollection`| Use a Laravel Collection to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\FromGenerator`| Use a generator to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\FromIterator`| Use an iterator to populate the export. | |
|`Maatwebsite\Excel\Concerns\FromQuery`| Use an Eloquent query to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\FromScout`| Use a Laravel Scout query to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\FromView`| Use a (Blade) view to populate the export. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets`| Allows precalculated values where one sheet has references to another sheet. | |
|`Maatwebsite\Excel\Concerns\ShouldAutoSize`| Auto-size the columns in the worksheet. | [Presentation](/4.x/exports/presentation.html) |
|`Maatwebsite\Excel\Concerns\WithCharts`| Allows running one or multiple PhpSpreadsheet Chart instances. | |
|`Maatwebsite\Excel\Concerns\WithColumnFormatting`| Format certain columns. | |
|`Maatwebsite\Excel\Concerns\WithColumns`| Define columns for the export. | |
|`Maatwebsite\Excel\Concerns\WithColumnWidths`| Set column widths. | [Presentation](/4.x/exports/presentation.html) |
|`Maatwebsite\Excel\Concerns\WithCustomChunkSize`| Allows Exportables to define their chunk size. | |
|`Maatwebsite\Excel\Concerns\WithCustomCsvSettings`| Allows running custom CSV settings for this specific exportable. | [Settings](/4.x/exports/settings.html) |
|`Maatwebsite\Excel\Concerns\WithCustomQuerySize`| Allows Exportables that implement the `FromQuery` concern to provide their own custom query size. | |
|`Maatwebsite\Excel\Concerns\WithCustomStartCell`| Allows specifying a custom start cell. Only supported for `FromCollection` exports. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\WithCustomValueBinder`| Allows specifying a custom value binder. | [Custom Value Binder](/4.x/exports/presentation.html#custom-value-binder) |
|`Maatwebsite\Excel\Concerns\WithDrawings`| Allows running one or multiple PhpSpreadsheet Drawing instances. | |
|`Maatwebsite\Excel\Concerns\WithEvents`| Register events to hook into the PhpSpreadsheet process. | |
|`Maatwebsite\Excel\Concerns\WithHeadings`| Prepend a heading row. | [Presentation](/4.x/exports/presentation.html) |
|`Maatwebsite\Excel\Concerns\WithMapping`| Format the row before it's written to the file. | [Presentation](/4.x/exports/presentation.html) |
|`Maatwebsite\Excel\Concerns\WithMultipleSheets`| Enable multi-sheet support. Each sheet can have its own concerns (except this one). | |
|`Maatwebsite\Excel\Concerns\WithPreCalculateFormulas`| Forces PhpSpreadsheet to recalculate all formulae when saving. | |
|`Maatwebsite\Excel\Concerns\WithProperties`| Allows setting document properties. | [Settings](/4.x/exports/settings.html) |
|`Maatwebsite\Excel\Concerns\WithStrictNullComparison`| Uses strict comparisons when testing cells for null values. | [Data sources](/4.x/exports/data.html) |
|`Maatwebsite\Excel\Concerns\WithStyles`| Allows setting styles on worksheets. | [Presentation](/4.x/exports/presentation.html) |
|`Maatwebsite\Excel\Concerns\WithTitle`| Set the Workbook or Worksheet title. | |

### Traits

| Trait | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\Exportable` | Add download/store abilities directly on the export class itself. | [Exporting](/4.x/exports/exporting.html) |
|`Maatwebsite\Excel\Concerns\RegistersEventListeners` | Auto-register the available event listeners. | |
