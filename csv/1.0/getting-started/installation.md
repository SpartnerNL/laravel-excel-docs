# Installation

[[toc]]

## Requirements

* PHP: `^7.2`
* Laravel: `^5.8`
* League/Csv: `^9.0`

## Installation

Require Laravel CSV in the `composer.json` of your Laravel project. This will download the package and _League/Csv_.

```
composer require maatwebsite/laravel-csv
```

The `Maatwebsite\LaravelCsv\LaravelCsvServiceProvider` is __auto-discovered__ and registered by default.

If you want to register it yourself, add the ServiceProvider in `config/app.php`:

```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\LaravelCsv\LaravelCsvServiceProvider::class,
]
```

The `Csv` facade is also __auto-discovered__.

If you want to add it manually, add the Facade in `config/app.php`:

```php
'aliases' => [
    ...
    'Csv' => Maatwebsite\LaravelCsv\Facades\Csv::class,
]
```

To publish the config, run the `vendor:publish` command:

```
php artisan vendor:publish --provider="Maatwebsite\LaravelCsv\LaravelCsvServiceProvider"
```

This will create a new config file named `config/csv.php`.
