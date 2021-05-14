# Concerns

[[toc]]

Most of the export/import configuration is done by using **Concerns**. 

## Contracts

Concerns are basically just simple interfaces. Implementing them will make the object adhere to a 
certain contract. This contract can request specific methods that e.g. data can be passed through.

For instance, the `FromCollection` requests the Export object to implement a `collection` method, that needs to return a `Collection` instance.

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```

## Pointer interface

In other cases it might not ask for any methods to be implemented, but merely functions as a pointer interface.

For instance, the `ShouldAutoSize` concern doesn't pass on any specific information, but does tell the Export process that the columns need to be automatically sized.

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class UsersExport implements ShouldAutoSize
{

}
```
