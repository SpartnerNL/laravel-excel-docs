# Installation

[[toc]]

## Requirements

* PHP: `^7.2\|^8.0`
* Laravel: `^5.8`
* PhpSpreadsheet: `^1.21`
* psr/simple-cache: `^1.0`
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

If composer require fails on Laravel 9 because of the `simple-cache` dependency, you will have to specify the `psr/simple-cache` version as `^2.0` in your composer.json to satisfy the PhpSpreadsheet dependency. You can install both at the same time as:

```
composer require psr/simple-cache:^2.0 maatwebsite/excel
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
