---
pageClass: no-toc
---

# Import concerns

| Interface | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\ToCollection`| Import to a collection. | [Importing to collections](/3.1/imports/collection.html) |
|`Maatwebsite\Excel\Concerns\ToArray`| Import to an array. | |
|`Maatwebsite\Excel\Concerns\ToModel`| Import each row to a model. | [Importing to models](/3.1/imports/model.html) |
|`Maatwebsite\Excel\Concerns\OnEachRow`| Handle each row manually. | |
|`Maatwebsite\Excel\Concerns\WithBatchInserts`| Insert models in batches. | [Batch inserts](/3.1/imports/batch-inserts.html) |
|`Maatwebsite\Excel\Concerns\WithChunkReading`| Read the sheet in chunks. | [Chunk reading](/3.1/imports/chunk-reading.html) |
|`Maatwebsite\Excel\Concerns\WithHeadingRow`| Define a row as heading row. | [Heading row](/3.1/imports/heading-row.html) |
|`Maatwebsite\Excel\Concerns\WithLimit`| Define a limit of the amount of rows that need to be imported. |
|`Maatwebsite\Excel\Concerns\WithCustomValueBinder`| Define a custom value binder. | [Custom Formatting Values](/3.1/imports/custom-formatting-values.html) |
|`Maatwebsite\Excel\Concerns\WithMappedCells`| Define a custom cell mapping. | [Mapped Cells](/3.1/imports/mapped-cells.html) |
|`Maatwebsite\Excel\Concerns\WithMapping`| Map the row before being called in ToModel/ToCollection. | |
|`Maatwebsite\Excel\Concerns\WithMultipleSheets`| Enable multi-sheet support. Each sheet can have its own concerns (except this one). | [Multiple Sheets](/3.1/imports/multiple-sheets.html) |
|`Maatwebsite\Excel\Concerns\WithCalculatedFormulas`| Calculates the formulas when importing. By default this is disabled. | |
|`Maatwebsite\Excel\Concerns\WithEvents`| Register events to hook into the PhpSpreadsheet process. | [Events](/3.1/imports/extending.html#events) |
|`Maatwebsite\Excel\Concerns\WithCustomCsvSettings`| Allows to run custom Csv settings for this specific importable. | [Custom CSV Settings](/3.1/imports/custom-csv-settings.html) |
|`Maatwebsite\Excel\Concerns\WithStartRow`| Define a custom start row. | |
|`Maatwebsite\Excel\Concerns\WithProgressBar`| Shows a progress bar when uploading via the console. | [Progress Bar](/3.1/imports/progress-bar.html) |
|`Maatwebsite\Excel\Concerns\WithUpsert`| Allows to upsert models. | [Upserting models](/3.1/imports/model.html#upserting-models) |
|`Maatwebsite\Excel\Concerns\WithUpsertColumns`| Allows upsert columns definition. | [Upserting with specific columns](/3.1/imports/model.html#upserting-with-specific-columns) |
|`Maatwebsite\Excel\Concerns\WithValidation`| Validates each row against a set of rules. | [Row Validation](/3.1/imports/validation.html) |
|`Maatwebsite\Excel\Concerns\SkipsEmptyRows`| Skips empty rows. | [Row Validation](/3.1/imports/validation.html#skipping-empty-rows) |
|`Maatwebsite\Excel\Concerns\SkipsOnFailure`| Skips on validation errors. | [Row Validation](/3.1/imports/validation.html#skipping-failures) |
|`Maatwebsite\Excel\Concerns\SkipsOnError`| Skips on database exceptions. | [Row Validation](/3.1/imports/validation.html#skipping-errors) |
|`Maatwebsite\Excel\Concerns\WithColumnLimit` | Allows setting an end column ||
|`Maatwebsite\Excel\Concerns\WithReadFilter` | Allows defining a custom read filter ||


### Traits

| Trait | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\Importable` | Add import/queue abilities right on the import class itself. | [Importables](/3.1/imports/importables.html) |
|`Maatwebsite\Excel\Concerns\RegistersEventListeners` | Auto-register the available event listeners. | [Auto register event listeners](/3.1/imports/extending.html#auto-register-event-listeners) |
