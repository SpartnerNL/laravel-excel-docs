# Installation

## Requirements

* PHP: `^7.0`
* Laravel: `^5.5`
* PhpSpreadsheet: `^1.2`
* PHP extension `php_zip` enabled
* PHP extension `php_xml` enabled
* PHP extension `php_gd2` enabled

## Installation

Require this package in the `composer.json` of your Laravel project. This will download the package and PhpSpreadsheet.

```
composer require maatwebsite/excel
```

The `Maatwebsite\Excel\ExcelServiceProvider` is __auto-discovered__ and registered by default, but if you want to register it yourself:

Add the ServiceProvider in `config/app.php`:

```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]
```

The `Excel` facade is also __auto-discovered__, but if you want to add it manually:

Add the Facade in `config/app.php`:

```php
'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```

To publish the config, run the vendor publish command:

```
php artisan vendor:publish
```

This will create a new config file named `config/excel.php`.

## Usage

Laravel Excel can be used in a various of ways. I'm sure you will find your prefered of using it. This can be either via dependency injection or if you prefer you can even use a facade.

### Via dependency injection

You can inject the `Excel` manager class into your class, either via constructor injection or method injection in case of a controller.

```php
use App\YourExport;
use Maatwebsite\Excel\Excel;

class YourController
{
    private $excel;

    public function __construct(Excel $excel)
    {
        $this->excel = $excel;
    }
    
    public function export()
    {
        return $this->excel->download(new YourExport);
    }
}
```

### Via Exporter interface

You can also use the `Maatwebsite\Excel\Exporter` to decouple more from the concrete Excel manager implementation.

```php
use App\YourExport;
use Maatwebsite\Excel\Exporter;

class YourController
{
    private $exporter;

    public function __construct(Exporter $exporter)
    {
        $this->exporter = $exporter;
    }
    
    public function export()
    {
        return $this->exporter->download(new YourExport);
    }
}
```

### Via the Facade

If you prefer facades, you can you use the `Maatwebsite\Excel\Facades\Excel` facade or if you use the alias the `Excel` facade alias.

```php
use App\YourExport;
use Maatwebsite\Excel\Facades\Excel;

class YourController
{
    public function export()
    {
        return Excel::download(new YourExport);
    }
}
```

### Via container binding

If you want to bind the `Excel` manager to your own class via a container binding, you can use the `excel` container binding.

```php
$this->app->bind(YourCustomExporter::class, function() {
    return new YourCustomExporter($this->app['excel']);
});
```
