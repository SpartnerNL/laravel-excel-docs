# Multiple Sheets

When a file has multiple sheets, each sheet will go through the import object. If you want to handle each sheet separately, you'll need to implement the `WithMultipleSheets` concern.

The `sheets()` method expects an array of sheet import objects to be returned.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class UsersImport implements WithMultipleSheets {
    
    public function sheets(): array
    {
        return [
            // Select by sheet index
            0 => new FirstSheetImport(),
            
            // Select by sheet name
            'Sheet2' => new SecondSheetImport
        ];
    }
}
```

The `FirstSheetImport` can implement concerns like `ToCollection`, `ToModel`, ...