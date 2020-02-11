## Importing basics

[[toc]]

If you have followed the 5 minute quick start, you'll already have a `UsersImport` class.

```php
<?php

namespace App\Imports;

use App\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class UsersImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return User|null
     */
    public function model(array $row)
    {
        return new User([
           'name'     => $row[0],
           'email'    => $row[1],
           'password' => Hash::make($row[2]),
        ]);
    }
}
```

## Importing from default disk

Passing the UsersImport object to the `Excel::import()` method, will tell the package how to import the file that is passed as second parameter. 
The file is expected to be located in your default filesystem disk (see `config/filesystems.php`).

```php
Excel::import(new UsersImport, 'users.xlsx');
```

### Importing from another disk

You can specify another disk with the third parameter like your Amazon s3 disk. (see `config/filesystems.php`)

```php
Excel::import(new UsersImport, 'users.xlsx', 's3');
```

## Importing uploaded files

If you let your user upload the document, you can also just pass the uploaded file directly.

```php
Excel::import(new UsersImport, request()->file('your_file'));
```

### Importing full path 

If you want to specifiy the path where your file is, without having to move it to a disk, you can directly pass that file path to the import method.

```php
Excel::import(new UsersImport, storage_path('users.xlsx'));
```

## Importing to array or collection

If you want to bypass the `ToArray` or `ToCollection` concerns and want to have an array of imported data in your controller (beware of performance!), you can use the `::toArray()` or `::toCollection()` method.

```php
$array = Excel::toArray(new UsersImport, 'users.xlsx');

$collection = Excel::toCollection(new UsersImport, 'users.xlsx');
```

## Specifying a reader type

If the reader type is not detectable by the file extension, you can specify a reader type by passing it as fourth parameter.

```php
Excel::import(new UsersImport, 'users.xlsx', 's3', \Maatwebsite\Excel\Excel::XLSX);
```
