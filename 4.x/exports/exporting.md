# Exporting

In this chapter we'll have a look at how we can export data. The source of the data and the presentational side of things, will be explained in next chapters.

[[toc]]

## TLDR;

<span class="inline-step">1</span> **Exports can be downloaded or stored**

Using `Excel::download()` or `Excel::store()` the data can be exported to a spreadsheet.

<span class="inline-step">2</span> **Facade, exportables, collection macro's and dependency injection**

Pick and choose any of those techniques to your own preference or coding standards. 

<span class="inline-step">3</span> **Exporting to other formats**

While the main focus on the package is xlsx, other types like xls and pdf are supported as well.


## Ways of exporting

Laravel Excel offers several ways of exporting the spreadsheet. In the first examples we'll use the facade technique, in later parts of this chapter other techniques will also be explained. 

:::warning
Make sure to import the class `use Maatwebsite\Excel\Facades\Excel` at the top of your file. For brevity this step will not be repeated in each example.
:::

### Downloading

A very common way of exporting a spreadsheet, is by directly downloading it after it's being created. This is only recommend for small exports.

```php
return Excel::download(new UsersExport, 'users.xlsx');
```

The `download` method requires an export object and a filename including a file extension. Optionally the writer type can be passed as third parameter.

:::tip
Make sure to always `return` the download response to the controller/route.
:::

### Storing

```php
Excel::store(new UsersExport, 'users.xlsx');
```

```php
Excel::store(new UsersExport, 'users.xlsx', 's3');
```

```php
Excel::store(new UsersExport, 'users.xlsx', 's3', null, [
    'visibility' => 'private',
]);
```

### Raw

If you want to receive the raw contents of the exported file for API's or mail attachments, you can use the `::raw` method.

```php
$contents = Excel::raw(new UsersExport, 'users.xlsx');
```

## Export techniques

Laravel Excel offers several techniques to call the export. You can pick any of the following techniques, based on your own preferences or coding standards.

### Facade

```php
return Excel::download(new UsersExport, 'users.xlsx');
```

### Exportables

Laravel Excel provides a `Maatwebsite\Excel\Concerns\Exportable` trait, to make export classes exportable.

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return User::all();
    }
}
```

Instead of using the facade, you can now chain methods like `download` and `store` directly to the export object.

```php
return (new UsersExport)->download('users.xlsx');
```

### Responsables

The previous (download) example can be made even shorter when adding Laravel's `Responsable` interface to the export class:

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Excel;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class UsersExport implements FromCollection, Responsable
{
    use Exportable;
    
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'users.xlsx';
    
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
        return User::all();
    }
}
```

Within your controller you can now, just return the Export class and it will internally trigger the download response.

```php
return new UsersExport();
```

### Dependency injection

```php
use Maatwebsite\Excel\Excel;

public function export(Excel $excel)
{
    return $excel->download(new UsersExport, 'users.xlsx');
}
```

### Collection macro's

On Eloquent model collections and custom collections, custom macro's called `downloadExcel` and `storeExcel` can be called. Different
from the previous documented methods is that these exports do not require an export object. 

These macro's will export the data
in the collection **as is**. If you need to process the data before exporting, please use an export object.

```php
return User::all()->downloadExcel('users.xlsx');
```

```php
return (new Collection([
    [1, 2, 3], 
    [1, 2, 3]
]))->downloadExcel('my-collection.xlsx');
```

```php
return $collection->storeExcel('my-collection.xlsx');
```

## Writer types

While the main focus on the package is Excel (xlsx) spreadsheets, other types are supported as well. These writer types can be either passed as file extension or as explicit writer type:

The following will detect the writer type based on the extension:

```php
Excel::download(new UsersExport, 'users.xls');
```

The following will detect the writer type based on the explicit writer type

```php
Excel::download(new UsersExport, 'users.xls', \Maatwebsite\Excel\Excel::XLS);
```

The following extensions are supported:

|File extension|Writer type|
|---|---|
|xlsx|`Maatwebsite\Excel\Excel::XLSX`|
|xls|`Maatwebsite\Excel\Excel::XLS`|
|csv|`Maatwebsite\Excel\Excel::CSV`|
|tsv|`Maatwebsite\Excel\Excel::TSV`|
|ods|`Maatwebsite\Excel\Excel::ODS`|
|html|`Maatwebsite\Excel\Excel::HTML`|
|pdf|`Maatwebsite\Excel\Excel::PDF`|

:::warning Exporting to PDF
If you'd like to export to PDF, you must now install a PDF rendering library yourself. Please refer to the [PhpSpreadsheet Documentation](https://phpspreadsheet.readthedocs.io/en/latest/topics/reading-and-writing-to-file/#pdf) for more information.
:::
