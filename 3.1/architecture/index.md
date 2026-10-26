# Lifecycle

[[toc]]

## Introduction

When using a package in your application, it's good to understand how the package functions behind the scenes. 
Understanding the behind-the-scenes will make you feel more comfortable and confident using the maximum potential of the tool.

The goal of this page is to give you a high-level overview of how Laravel Excel works. 

## Exports Lifecycle Overview

This section will try to give you an overview of how the export works behind the scenes.

### Export Object

Everything starts with the `Export` object. This object **encapsulates** your entire export logic. 
It both configures and handles the export logic.

A simple example of an export object is:

```php
<?php

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

If you want to read more about export objects, go to the architecture page of [export objects](/3.1/architecture/objects.html).

### Passing on the Export object

Next the Export object will be passed on to the Laravel Excel package. The main entry point for this is the `Maatwebsite/Excel/Excel` class. This class can be called in multiple ways.

#### Facade

The easiest way to work with the `Excel` class is to use the `Maatwebsite\Excel\Facades\Excel` facade. 
If you use [auto-discovery](https://laravel.com/docs/packages#package-discovery), you can use the alias `\Excel` directly instead of using the fully qualified namespace.

#### Dependency injection

You can inject the `Maatwebsite/Excel/Excel` manager class into your class, either via constructor injection 
or method injection in case of a controller.

```php
<?php
use App\Exports\UsersExport;
use Maatwebsite\Excel\Excel;

class ExportController
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }
    
    public function exportViaConstructorInjection()
    {
        return $this->excel->download(new UsersExport, 'users.xlsx');
    }
    
    public function exportViaMethodInjection(Excel $excel)
    {
        return $excel->download(new UsersExport, 'users.xlsx');
    }
}
```

#### Contract

You can also use the `Maatwebsite\Excel\Exporter` interface to decouple more from the concrete Excel manager implementation. The contract offers the same methods as the `Excel` class. 
It will make it easier to e.g. stub out the Exporter in your unit tests. The `Exporter` contract can be either injected via the constructor or a method in a controller.

```php
use App\Exports\UsersExport;
use Maatwebsite\Excel\Exporter;

class ExportsController
{
    private $exporter;

    public function __construct(Exporter $exporter)
    {
        $this->exporter = $exporter;
    }
    
    public function export()
    {
        return $this->exporter->download(new UsersExport, 'users.xlsx');
    }
}
```

#### Container binding

If you want to bind the `Maatwebsite\Excel\Excel` manager to your own class via a container binding, you can use the `excel` container binding.

```php
$this->app->bind(YourCustomExporter::class, function() {
    return new YourCustomExporter($this->app['excel']);
});
```

#### Exportable trait

If you prefer a sprinkle of magic, you can use the `Maatwebsite\Excel\Concerns\Exportable` trait in your `Export` object. This trait will expose a couple of methods that will make it possible to directly export an `Export` object.

```php
namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;

class UsersExport implements FromCollection
{
    use Exportable;

    public function collection()
    {
        return User::all();
    }
}
```

You can now download the export without the need for the `facade` or `Excel` manager.

```php
return (new UsersExport)->download('users.xlsx');
```

Read more about the exportable trait in the [exportables](/3.1/exports/exportables.html) docs.

### Handling the Export object

#### Writer type detection

After using one of the above methods to pass on the `Export` object to the `Excel` manager, it will try to figure out what export it needs to be generated to. 
This will be either based on the extension of the file, the explicitly passed writer type. You can find the extension to writer type mapping in the `excel.php` config, in the `extension_detector` section. 
In case no writer type can be detected, a `Maatwebsite\Excel\Exceptions\NoTypeDetectedException` exception is thrown and the export process will be stopped.

#### Starting the Writing process

The `Excel` manager will then delegate the handling to the `Maatwebsite\Excel\Writer`. The first action of the `Writer` is to register the event listeners that are registered. 
Next it will create a new `PhpOffice\PhpSpreadsheet\Spreadsheet` instance that we will use to convert our `Export` object to.

The first event raised is the `BeforeExport` event. This is raised just after the `Spreadsheet` instance is created and allows early access to it.

#### Multiple sheets

Next the `Writer` will determine if multiple sheets are configured, by checking for the `Maatwebsite\Excel\Concerns\WithMultipleSheets` concern.

Then it will delegate the further handling of each sheet to the `Maatwebsite\Excel\Sheet` class.

#### Processing the sheets

In the `Sheet` class, the most heavy lifting happens. It first will create a `PhpOffice\PhpSpreadsheet\Worksheet\Worksheet` instance. Then it will raise the `BeforeSheet` event which allows you to hook into the moment just before the sheet handling starts.

Then it will determine what kind of export we are dealing with: `FromQuery`, `FromArray`, `FromCollection` or `FromView`. Based on that it will start the connected export process.

- `FromView` will pass on the rendered `Blade` view to PhpSpreadsheet's `Html` Reader. That Reader will turn the table html into Excel cells. It also handles some inline styles (color and background color) and col/rowspans.
- The **Query** passed with the `FromQuery` will automatically be chunked and each chunk will be appended to the Sheet. The chunking is done to limit the amount of Eloquent objects it needs to keep in memory. It greatly reduces memory usage.
- The entire array of Collection will directly be appended to the Sheet. 

When the `Sheet` starts appending records, it will first call the `map()` method if the `WithMapping` concern is used. This allows the `Export` object to format the data before it is inserted.

Then it will handle column formatting (`WithColumnFormatting` concern) and cell autosizing (`ShouldAutoSize`).

To close off the Sheet processing, it will raise a `AfterSheet` event.

### Passing on to PhpSpreadsheet

After the sheets are processed, the writing process will start. The writing process is started by raising the `BeforeWriting` event; this allows you to hook into the process of writing.
Next we will create a new `PhpSpreadsheet Writer` based on the writer type that was determined. Then it will save it to a temporary file and return that filepath to the `Excel` manager.

### Creating a Response

The `Excel` manager basically has 2 types of responses, it either starts the **download** process or it will **store** the file to disk.

#### Download the file

We will take the temporary file that was returned by the `Writer` and use Laravel's `ResponseFactory` to create a `Symfony\Component\HttpFoundation\BinaryFileResponse`. When returning this response in your controller, it will start a download.

#### Storing the file

The storing of the file will be handled by Laravel's `Filesystem`. By default the file will be stored on your `default` disk, but you can also pass a custom disk via the `Excel::store()` method.

## Imports Lifecycle Overview

This section will try to give you an overview of how the import works behind the scenes.

### Import Object

Everything starts with the `Import` object. This object **encapsulates** your entire import logic. 
It both configures and handles the import logic.

A simple example of an import object is:

```php
namespace App\Imports;

use App\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class UsersImport implements ToCollection
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {
            User::create([
                'name' => $row[0],
            ]);
        }
    }
}
```

If you want to read more about imports objects, go to the architecture page of [imports objects](/3.1/architecture/objects.html).

### Passing on the Import object

Next the Import object will be passed on to the Laravel Excel package. The main entry point for this is the `Maatwebsite/Excel/Excel` class. This class can be called in the same way as outlined in the Export lifecycle.

#### Contract

You can also use the `Maatwebsite\Excel\Importer` interface to decouple more from the concrete Excel manager implementation. The contract offers the same methods as the `Excel` class. 
It will make it easier to e.g. stub out the Importer in your unit tests. The `Importer` contract can be either injected via the constructor or the method of a controller.

```php
use App\Imports\UsersImport;
use Maatwebsite\Excel\Importer;

class ImportsController
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }
    
    public function import()
    {
        return $this->importer->import(new UsersImport, 'users.xlsx');
    }
}
```

#### Importable trait

If you prefer a sprinkle of magic, you can use the `Maatwebsite\Excel\Concerns\Importable` trait in your `Import` object. This trait will expose a couple of methods that will make it possible to directly import an `Import` object.

```php
namespace App\Imports;

use App\User;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\Importable;

class UsersImport implements ToCollection
{
    use Importable;

    ...
}
```

You can now import without the need for the `facade` or `Excel` manager.

```php
(new UsersImport)->import('users.xlsx');
```

Read more about the importable trait in the [importables](/3.1/imports/importables.html) docs.

### Handling the Import object

#### Reader type detection

After using one of the above methods to pass on the `Import` object to the `Excel` manager, it will try to figure out what reader type it is . 
This will be either based on the extension of the file or the explicitly passed reader type. You can find the extension to reader type mapping in the `excel.php` config, in the `extension_detector` section. 
In case no reader type can be detected, a `Maatwebsite\Excel\Exceptions\NoTypeDetectedException` exception is thrown and the import process will be stopped.

#### Starting the Reading process

The `Excel` manager will then delegate the handling to the `Maatwebsite\Excel\Reader`. The first action of the `Reader` is to register the event listeners that are registered. 
It will copy the file from Laravel's `Filesystem` to the local filesystem, so PhpSpreadsheet can read it. 
Next it will create a PhpSpreadsheet `Reader` based on the reader type that was given and load the file into a `PhpOffice\PhpSpreadsheet\Spreadsheet` instance.

Next it will create a new `PhpOffice\PhpSpreadsheet\Spreadsheet` instance that we will use to read our `Import` object from.

The first event that is raised, is the `BeforeImport` event. This is raised just after the `Spreadsheet` instance is loaded and allows early access to it.

#### Multiple sheets

Next we will determine if we are dealing with multiple sheets. This is done based on the `WithMultipleSheets` concern.

#### Processing the sheets

Then each Sheet gets processed. This process gets started off by raising the `BeforeSheet` event. 
Then it will either import it to a Collection, an array or handle each row as an Eloquent model.

- When using `ToModel`, each returned model will be persisted via Eloquent. When using this in combination with `WithBatchInserts`, it will defer the persistence till the batch is complete and then insert them as one batch in the database.
- When using `ToCollection` or `ToArray`, the entire dataset will be passed to the Import method and the user can determine itself how to use it.

The sheet handling is ended by raising the `AfterSheet` event.
