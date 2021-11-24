# Installation

## Requirements

* PHP: `^7.1`
* Laravel: `^5.5`
* Laravel Nova:`Orion` 
* Maatwebsite Laravel Excel: `^3.0` 

## Installation

Before installing the package, make sure you have set-up Laravel Nova.

Require this package (`maatwebsite/laravel-nova-excel`) in the `composer.json` of your Laravel project or run the following command in your console:

```
composer require maatwebsite/laravel-nova-excel
```

## Service Provider

In case you don't have auto-discovery enabled, you'll have to add the following two service providers in `config/app.php`:

```
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
    Maatwebsite\LaravelNovaExcel\LaravelNovaExcelServiceProvider::class,
]
```
