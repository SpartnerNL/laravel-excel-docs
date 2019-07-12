---
pageClass: no-toc
---

# Export concerns

| Interface | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\LaravelCsv\Concerns\FromArray`| Use an array to populate the export. | [From Array](/1.0/exports/getting-started/) |
|`Maatwebsite\LaravelCsv\Concerns\FromCollection`| Use a Laravel Collection to populate the export. | [Exporting collections](/1.0/exports/collection.html) |
|`Maatwebsite\LaravelCsv\Concerns\FromQuery`| Use an Eloquent query to populate the export. | [From Query](/1.0/exports/from-query.html) | 
|`Maatwebsite\LaravelCsv\Concerns\WithHeadings`| Prepend a heading row. | [Adding a heading row](/1.0/exports/mapping.html#adding-a-heading-row) |
|`Maatwebsite\LaravelCsv\Concerns\WithMapping`| Format the row before it's written to the file. | [Mapping data](/1.0/exports/mapping.html) |

### Traits

| Trait | Explanation | Documentation |
|---- |----|----|
|`Maatwebsite\LaravelCsv\Concerns\Exportable` | Add download/store abilities right on the export class itself. | |
