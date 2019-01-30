# Multiple Sheets

[[toc]]

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

## Skipping unknown sheets

When you have defined a sheet **name** or **index** that does not exist a `Maatwebsite\Excel\Exceptions\SheetNotFoundException` will be thrown.

If you want to ignore when a sheet does not exists, you can use the `Maatwebsite\Excel\Concerns\SkipsUnknownSheets` concern.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;

class UsersImport implements WithMultipleSheets, SkipsUnknownSheets
{
    public function sheets(): array
    {
        return [
            'Worksheet 1' => new FirstSheetImport(),
            'Worksheet 2' => new SecondSheetImport(),
        ];
    }
    
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        info("Sheet {$sheetName} was skipped");
    }
}
```

### Skipping only specific sheets

If you want to have 1 optional sheet and still have the others fail, you can also let the Sheet import object implement `SkipsUnknownSheets`.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\SkipsUnknownSheets;

class FirstSheetImport implements SkipsUnknownSheets
{
    public function onUnknownSheet($sheetName)
    {
        // E.g. you can log that a sheet was not found.
        info("Sheet {$sheetName} was skipped");
    }
}
```

Now only `FirstSheetImport` will be skipped if it's not found. Any other defined sheet will be skipped.

## Conditional sheet loading

If you want to indicate per import which sheets should be imported, you can use the `Maatwebsite\Excel\Concerns\WithConditionalSheets` trait.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithConditionalSheets;

class UsersImport implements WithMultipleSheets 
{
    use WithConditionalSheets;

    public function conditionalSheets(): array
    {
        return [
            'Worksheet 1' => new FirstSheetImport(),
            'Worksheet 2' => new SecondSheetImport(),
            'Worksheet 3' => new ThirdSheetImport(),
        ];
    }
}
```

Now you can use the `onlySheets` method to indicate which sheets should be loaded for this import.

```php
$import = new UsersImport();
$import->onlySheets('Worksheet 1', 'Worksheet 3');

Excel::import($import, 'users.xlsx');
```