# Multiple Sheets

When a file has multiple sheets, each sheet will go through the import object. If you want to handle each sheet separately, you'll need to implement the `WithMultipleSheets` concern.

The `sheets()` method expects an array of sheet import objects to be returned. The order of the sheets is important, the first sheet import object in the array will automatically be linked to the first worksheet in the excel file.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersImport implements WithMultipleSheets 
{
   
    public function sheets(): array
    {
        return [
            new FirstSheetImport()
        ];
    }
}
```

A sheet import class can import the same concerns as a normal import object. 

```php
namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class FirstSheetImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        //
    }
}
```

## Selecting sheets by worksheet index

If you want more control over which sheets are selected and how their are mapped to specific sheet import objects, you can use the sheet index as key. Sheet indices start at 0.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersImport implements WithMultipleSheets 
{
   
    public function sheets(): array
    {
        return [
            0 => new FirstSheetImport(),
            1 => new SecondSheetImport(),
        ];
    }
}
```

## Selecting sheets by worksheet name

If you only know the name of the worksheet and don't know the sheet index, you can also use the worksheet name as a selector. Put the worksheet name as array index to link that worksheet to your sheet import object.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersImport implements WithMultipleSheets 
{
    public function sheets(): array
    {
        return [
            'Worksheet 1' => new FirstSheetImport(),
            'Worksheet 2' => new SecondSheetImport(),
        ];
    }
}
```

:::warning
Sheets that are not explicitly defined in the `sheet()` method, will be ignored and thus not be imported.
:::
