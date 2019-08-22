# Exportables

[[toc]]

In the previous example, we used the `Excel::download` facade to start an export. 

Laravel Excel also provides a `Maatwebsite\Excel\Concerns\Exportable` trait, to make export classes exportable.

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class InvoicesExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return Invoice::all();
    }
}
```

We can now download the export without the need for the facade:

```php
return (new InvoicesExport)->download('invoices.xlsx');
```

You can also pass the Writer Type and optional headers to the download method:

```php
return (new InvoicesExport)->download('invoices.csv', Excel::CSV, ['Content-Type' => 'text/csv']);
```

Or store it on a disk:

```php
return (new InvoicesExport)->store('invoices.xlsx', 's3');
```

You can also pass options to the disk if you like:

```php
return (new InvoicesExport)->store('invoices.xlsx', 's3', null, 'private');
```

## Responsable

The previous (download) example can be made even shorter when adding Laravel's `Responsable` interface to the export class:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Excel;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class InvoicesExport implements FromCollection, Responsable
{
    use Exportable;
    
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'invoices.xlsx';
    
    /**
    * Optional Writer Type
    */
    private $writerType = Excel::XLSX;
    
    /**
    * Optional headers
    */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function collection()
    {
        return Invoice::all();
    }
}
```

You can now easily return the export class, without the need of calling `->download()`.

```php
return new InvoicesExport();
```
