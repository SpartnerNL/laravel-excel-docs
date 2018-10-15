# Custom Formatting Values

By default Laravel Excel uses PhpSpreadsheet's default value binder to intelligently format a cells value when reading it. You may override this behavior by implementing the `WithCustomValueBinder` concern and the `bindValue` method. Your import class may also extend `DefaultValueBinder` to return the default behavior.

```php
namespace App\Imports;

use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;

class UsersImport extends DefaultValueBinder implements WithCustomValueBinder, ToModel
{
    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, DataType::TYPE_NUMERIC);

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

Available DataTypes are:
* `TYPE_STRING`
* `TYPE_FORMULA`
* `TYPE_NUMERIC`
* `TYPE_BOOL`
* `TYPE_NULL`
* `TYPE_INLINE`
* `TYPE_ERROR`
