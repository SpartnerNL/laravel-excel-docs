# Import concerns

| Interface | Explanation |
|---- |----|
|`Maatwebsite\Excel\Concerns\ToCollection`| Import to a collection. |
|`Maatwebsite\Excel\Concerns\ToArray`| Import to an array. | 
|`Maatwebsite\Excel\Concerns\ToModel`| Import each row to a model. |
|`Maatwebsite\Excel\Concerns\OnEachRow`| Handle each row manually. |
|`Maatwebsite\Excel\Concerns\WithBatchInserts`| Insert models in batches. |
|`Maatwebsite\Excel\Concerns\WithChunkReading`| Read the sheet in chunks. |
|`Maatwebsite\Excel\Concerns\WithHeadingRow`| Define a row as heading row. |
|`Maatwebsite\Excel\Concerns\WithLimit`| Define a limit of the amount of rows that need to be imported. |
|`Maatwebsite\Excel\Concerns\WithCustomValueBinder`| Define a custom value binder. |
|`Maatwebsite\Excel\Concerns\WithMappedCells`| Define a custom cell mapping. |
|`Maatwebsite\Excel\Concerns\WithMapping`| Map the row before being called in ToModel/ToCollection. |
|`Maatwebsite\Excel\Concerns\WithMultipleSheets`| Enable multi-sheet support. Each sheet can have its own concerns (except this one). |
|`Maatwebsite\Excel\Concerns\WithCalculatedFormulas`| Calculates the formulas when importing. By default this is disabled. |
|`Maatwebsite\Excel\Concerns\WithEvents`| Register events to hook into the PhpSpreadsheet process. |
|`Maatwebsite\Excel\Concerns\WithCustomCsvSettings`| Allows to run custom Csv settings for this specific importable. |
|`Maatwebsite\Excel\Concerns\WithStartRow`| Define a custom start row. |

### Traits

| Trait | Explanation |
|---- |----|
|`Maatwebsite\Excel\Concerns\Importable` | Add import/queue abilities right on the import class itself.
|`Maatwebsite\Excel\Concerns\RegistersEventListeners` | Auto-register the available event listeners. | 
