# Installation

[[toc]]

## Requirements

* PHP: `^7.4\|^8.0`
* Laravel: `^8.0`
* PhpSpreadsheet: `^1.16`
* PHP extension `php_zip` enabled
* PHP extension `php_xml` enabled
* PHP extension `php_gd2` enabled
* PHP extension `php_iconv` enabled
* PHP extension `php_simplexml` enabled
* PHP extension `php_xmlreader` enabled
* PHP extension `php_zlib` enabled

## Installation

Require this package in the `composer.json` of your Laravel project. This will download the package and _PhpSpreadsheet_.

```
composer require maatwebsite/excel
```

The `Maatwebsite\Excel\ExcelServiceProvider` is __auto-discovered__ and registered by default.

If you want to register it yourself, add the ServiceProvider in `config/app.php`:

```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```

The `Excel` facade is also __auto-discovered__.

If you want to add it manually, add the Facade in `config/app.php`:

```php
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```

To publish the config, run the vendor publish command:

```
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```

This will create a new config file named `config/excel.php`.
