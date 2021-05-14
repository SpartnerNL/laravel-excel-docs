# Import & Export Objects

[[toc]]

The entire Laravel Excel philosophy evolves around having `Export` and/or `Import` objects.

## Directory structure

The location of these Import and Exports classes could be as follows:

::: vue
.
├── app
│   ├── `Exports` _(**Groups all exports in your app**)_
│   │   ├── UsersExport.php
│   │   ├── ProductsExport.php
│   │   └── `Sheets` _(**You can group sheets together**)_
│   │      ├── InactiveUsersSheet.php
│   │      └── ActiveUsersSheet.php
|   |
│   ├── `Imports` _(**Groups all imports in your app**)_
│   │   ├── UsersImport.php
│   │   ├── ProductsImport.php
│   │   └── `Sheets` _(**You can group sheets together**)_
│   │      ├── OutOfStockProductsSheet.php
│   │      └── ProductsOnSaleSheet.php
│ 
└── composer.json
:::

## Encapsulation

These objects encapsulate the entire export or import process. 
The idea behind it is that you can neatly use these objects in controllers, services, jobs, event listeners or commands. 
In all of theses cases, the entire logic of how the export/import needs to happen is kept within this object. 

## Data transfer object

The import/export objects are in essence simple data transfer objects (DTO). 
This means they will transfer the information you want to export/import to the Excel writer/reader. 
This information is not only the actual data you want to export, but also additional information like 
the styling of the file, the name of the worksheet, the number format of the cell etc.

In most cases, this means that your code doesn't need to have direct exposure to the actual read/write process.

## Plain Old PHP Object

Besides being a DTO, the import/export objects are also just Plain Old PHP Objects (POPO). This means that you can do anything with them that you can do with normal PHP objects. 

### Constructor

For instance, you can simply inject data through the constructor of the export object.

```php
class UsersExport implements FromCollection {
    private $year;

    public function __construct(int $year) 
    {
        $this->year = $year;
    }
    
    public function collection()
    {
        return Users::whereYear('created_at', $this->year)->get();
    }
}
```

```php
Excel::download(new UsersExport(2019), 'users.xlsx');
```

### Setters

Another option is to add setters for data that you want to pass.

```php
class UsersExport implements FromCollection {
    private $year;

    public function setYear(int $year)
    {
        $this->year = $year;
    }
    
    public function collection()
    {
        return Users::whereYear('created_at', $this->year)->get();
    }
}
```

```php
$export = new UsersExport();
$export->setYear(2019);

Excel::download($export, 'users.xlsx');
```

### Getters

In similar fashion to setters, you can also add getters. This can potentially be useful if you want to keep a state of your export/import.

For instance, you can keep a row count in your users import.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    private $rows = 0;

    public function model(array $row)
    {
        ++$this->rows;
    
        return new User([
            'name' => $row[0],
        ]);
    }
    
    public function getRowCount(): int
    {
        return $this->rows;
    }
}
```

After doing the import, we can request the state with the getter.

```php
$import = new UsersImport;
Excel::import($import, 'users.xlsx');

dd('Row count: ' . $import->getRowCount()); 
```

## Concerns

Most of the export/import configuration is done by using **Concerns**. Concerns are basically just simple interfaces. 
Implementing them will make the object adhere to a certain contract. This contract can request specific methods that e.g. data can be passed through.
In other cases it might not ask for any methods to be implemented, but merely functions as a pointer interface.

Read more about Concerns in the [concerns documentation](/3.1/architecture/concerns.html).

## Hooks

In more complex cases you might want to hook into certain moments of the read/write process. This can be done by using Events.
To register these events in your import/export object, you need to implement the `Maatwebsite\Excel\Concerns\WithEvents` concern.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\BeforeExport;

class UsersExport implements WithEvents
{
    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            // Handle by a closure.
            BeforeExport::class => function(BeforeExport $event) {
                // Do something before the export process starts.
            },
        ];
    }
}
```

Alternatively, you can also configure these listeners globally if you want it to happen to any export.

```php
Writer::listen(BeforeExport::class, function () {
    // Do something before any export process starts.
});
```
