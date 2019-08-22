---
pageClass: no-toc
---

# Export concerns

| Interface | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\LaravelCsv\Concerns\FromArray`| Use an array to populate the export. | [From Array](/csv/1.0/exports/) |
|`Maatwebsite\LaravelCsv\Concerns\FromCollection`| Use a Laravel Collection to populate the export. | [Exporting collections](/csv/1.0/exports/collection.html) |
|`Maatwebsite\LaravelCsv\Concerns\FromQuery`| Use an Eloquent query to populate the export. | [From Query](/csv/1.0/exports/from-query.html) | 
|`Maatwebsite\LaravelCsv\Concerns\WithHeadings`| Prepend a heading row. | [Adding a heading row](/csv/1.0/exports/mapping.html#adding-a-heading-row) |
|`Maatwebsite\LaravelCsv\Concerns\WithMapping`| Format the row before it's written to the file. | [Mapping data](/csv/1.0/exports/mapping.html) |

### Traits

| Trait | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\LaravelCsv\Concerns\Exportable` | Add download/store abilities right on the export class itself. | [Exportables](/csv/1.0/exports/exportables.html) |
