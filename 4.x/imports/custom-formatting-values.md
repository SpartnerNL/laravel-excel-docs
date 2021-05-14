# Custom Formatting Values

[[toc]]

## Value Binder

By default Laravel Excel uses PhpSpreadsheet's default value binder to intelligently format a cell's value when reading it. You may override this behavior by implementing the `WithCustomValueBinder` concern and the `bindValue` method. Your import class may also extend `DefaultValueBinder` to return the default behavior.

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
}
```

## Available DataTypes

* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_FORMULA`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NUMERIC`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_BOOL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_NULL`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_INLINE`
* `PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_ERROR`

## Disable intelligent formatting

If you want to disable the intelligent formatting of values, you can extend your import class with  `\PhpOffice\PhpSpreadsheet\Cell\StringValueBinder`. In this case all values are passed on as strings.

```php
namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;

class UsersImport extends \PhpOffice\PhpSpreadsheet\Cell\StringValueBinder implements WithCustomValueBinder, ToModel
{

}
```

## Default Value Binder

If you want to use one value binder for all your imports, you can configure the default value binder in the config.

In `config/excel.php`:

```php
'value_binder' => [
    'default' => Maatwebsite\Excel\DefaultValueBinder::class,
],
```
