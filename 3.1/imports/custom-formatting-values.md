# Custom Formatting Values

By default Laravel Excel uses PhpSpreadsheet's default value binder to intelligently format a cells value when reading it. You may override this behavior by implementing the `WithCustomValueBinder` concern and the `bindValue` method. Your import class may also extend `PHPExcel_Cell_DefaultValueBinder` to return the default behavior.

```php
namespace App\Imports;

use PHPExcel_Cell_DataType;
use PHPExcel_Cell_DefaultValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;

class UsersImport extends PHPExcel_Cell_DefaultValueBinder implements WithCustomValueBinder, ToModel
{
    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, PHPExcel_Cell_DataType::TYPE_NUMERIC);

            return true;
        }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }

    public function model(array $row)
    {
        return new User([
            'name' => $row['0'],
            'email' => $row['1']
        ]);
    }
}
```

Available PHPExcel_Cell_DataType's are `TYPE_STRING`, `TYPE_FORMULA`, `TYPE_NUMERIC`, `TYPE_BOOL`, `TYPE_NULL`, `TYPE_INLINE` and `TYPE_ERROR`
