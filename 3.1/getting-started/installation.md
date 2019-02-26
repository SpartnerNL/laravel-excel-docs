# Installation

[[toc]]

## Requirements

* PHP: `^7.0`
* Laravel: `^5.5`
* PhpSpreadsheet: `^1.6`
* PHP extension `php_zip` enabled
* PHP extension `php_xml` enabled
* PHP extension `php_gd2` enabled

## Installation

Require this package in the `composer.json` of your Laravel project. This will download the package and PhpSpreadsheet.

```
composer require maatwebsite/excel
```

The `Maatwebsite\Excel\ExcelServiceProvider` is __auto-discovered__ and registered by default, but if you want to register it yourself:

Add the ServiceProvider in `config/app.php`

```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```

The `Excel` facade is also __auto-discovered__, but if you want to add it manually:

Add the Facade in `config/app.php`

```php
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```

To publish the config, run the vendor publish command:

```
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```

This will create a new config file named `config/excel.php`.
