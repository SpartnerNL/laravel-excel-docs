# Exportables

[[toc]]

In the previous example, we used the `Csv::download` facade to start an export. 

Laravel CSV also provides a `Maatwebsite\LaravelCsv\Concerns\Exportable` trait, to make export classes exportable.

```php
<?php

namespace App\Exports;

use App\User;
use Maatwebsite\LaravelCsv\Concerns\Exportable;
use Maatwebsite\LaravelCsv\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    use Exportable;
    
    public function collection()
    {
        return User::all();
    }
}
```

We can now download the export without the need for the facade:

```php
return (new UsersExport)->download('users.csv');
```

You can also pass optional headers to the download method:

```php
return (new UsersExport)->download('users.csv', ['Content-Type' => 'text/csv']);
```

Or store it on a disk:

```php
return (new UsersExport)->store('users.csv', 's3');
```

You can also pass options to the disk if you like:

```php
return (new UsersExport)->store('users.csv', 's3', 'public');
```

## Responsable

The previous (download) example can be made even shorter when adding Laravel's `Responsable` interface to the export class:

```php
namespace App\Exports;

use App\User;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\LaravelCsv\Concerns\Exportable;
use Maatwebsite\LaravelCsv\Concerns\FromCollection;

class UsersExport implements FromCollection, Responsable
{
    use Exportable;
    
    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'users.csv';
    
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

You can now easily return the export class, without the need of calling `->download()`.

```php
return new UsersExport();
```
