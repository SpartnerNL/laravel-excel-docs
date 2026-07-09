---
pageClass: no-toc
---

# Import concerns

| Interface | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\ToCollection`| Import to a collection. | [Importing to collections](/4.x/imports/collection.html) |
|`Maatwebsite\Excel\Concerns\ToArray`| Import to an array. | |
|`Maatwebsite\Excel\Concerns\ToModel`| Import each row to a model. | [Importing to models](/4.x/imports/model.html) |
|`Maatwebsite\Excel\Concerns\OnEachRow`| Handle each row manually. | |
|`Maatwebsite\Excel\Concerns\WithBatchInserts`| Insert models in batches. | [Batch inserts](/4.x/imports/batch-inserts.html) |
|`Maatwebsite\Excel\Concerns\WithChunkReading`| Read the sheet in chunks. | [Chunk reading](/4.x/imports/chunk-reading.html) |
|`Maatwebsite\Excel\Concerns\WithHeadingRow`| Define a row as heading row. | [Heading row](/4.x/imports/heading-row.html) |
|`Maatwebsite\Excel\Concerns\WithLimit`| Define a limit of the amount of rows that need to be imported. | |
|`Maatwebsite\Excel\Concerns\WithMappedCells`| Define a custom cell mapping. | [Mapped Cells](/4.x/imports/mapped-cells.html) |
|`Maatwebsite\Excel\Concerns\WithMapping`| Map the row before being called in ToModel/ToCollection. | |
|`Maatwebsite\Excel\Concerns\WithMultipleSheets`| Enable multi-sheet support. Each sheet can have its own concerns (except this one). | [Multiple Sheets](/4.x/imports/multiple-sheets.html) |
|`Maatwebsite\Excel\Concerns\WithCalculatedFormulas`| Calculates the formulas when importing. By default this is disabled. | |
|`Maatwebsite\Excel\Concerns\WithEvents`| Register events to hook into the PhpSpreadsheet process. | [Events](/4.x/imports/extending.html#events) |
|`Maatwebsite\Excel\Concerns\WithCustomCsvSettings`| Allows to run custom CSV settings for this specific importable. | [Custom CSV Settings](/4.x/imports/custom-csv-settings.html) |
|`Maatwebsite\Excel\Concerns\WithStartRow`| Define a custom start row. | |
|`Maatwebsite\Excel\Concerns\WithProgressBar`| Shows a progress bar when importing via the console. | [Progress Bar](/4.x/imports/progress-bar.html) |
|`Maatwebsite\Excel\Concerns\WithUpserts`| Allows to upsert models. | [Upserting models](/4.x/imports/model.html#upserting-models) |
|`Maatwebsite\Excel\Concerns\WithUpsertColumns`| Allows upsert columns definition. | [Upserting with specific columns](/4.x/imports/model.html#upserting-with-specific-columns) |
|`Maatwebsite\Excel\Concerns\WithSkipDuplicates`| Skip duplicate rows during batch inserts. | [Skipping duplicate rows](/4.x/imports/batch-inserts.html#skipping-duplicate-rows) |
|`Maatwebsite\Excel\Concerns\WithValidation`| Validates each row against a set of rules. | [Row Validation](/4.x/imports/validation.html) |
|`Maatwebsite\Excel\Concerns\SkipsEmptyRows`| Skips empty rows. | [Row Validation](/4.x/imports/validation.html#skipping-empty-rows) |
|`Maatwebsite\Excel\Concerns\SkipsOnFailure`| Skips on validation errors. | [Row Validation](/4.x/imports/validation.html#skipping-failures) |
|`Maatwebsite\Excel\Concerns\SkipsOnError`| Skips on database exceptions. | [Row Validation](/4.x/imports/validation.html#skipping-errors) |
|`Maatwebsite\Excel\Concerns\WithColumnLimit` | Allows setting an end column. | |
|`Maatwebsite\Excel\Concerns\WithReadFilter` | Allows defining a custom read filter. | |


### Traits

| Trait | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\Excel\Concerns\Importable` | Add import/queue abilities right on the import class itself. | [Importables](/4.x/imports/importables.html) |
|`Maatwebsite\Excel\Concerns\RegistersEventListeners` | Auto-register the available event listeners. | [Auto register event listeners](/4.x/imports/extending.html#auto-register-event-listeners) |
