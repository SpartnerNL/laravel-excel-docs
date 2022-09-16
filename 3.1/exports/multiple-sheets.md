# Multiple Sheets

[[toc]]

To allow the export to have multiple sheets, the `WithMultipleSheets` concern should be used. 
The `sheets()` method expects an array of sheet export objects to be returned.

```php
namespace App\Exports;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class InvoicesExport implements WithMultipleSheets
{
    use Exportable;

    protected $year;
    
    public function __construct(int $year)
    {
        $this->year = $year;
    }

    /**
     * @return array
     */
    public function sheets(): array
    {
        $sheets = [];

        for ($month = 1; $month <= 12; $month++) {
            $sheets[] = new InvoicesPerMonthSheet($this->year, $month);
        }

        return $sheets;
    }
}
```

## Sheet classes

The `InvoicesPerMonthSheet` can implement concerns like `FromQuery`, `FromCollection`, `FromView`, ... 

_Note: The WithTitle concern is needed in order to name each sheet using the `title()` method_
```php
namespace App\Exports\Sheets;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithTitle;

class InvoicesPerMonthSheet implements FromQuery, WithTitle
{
    private $month;
    private $year;

    public function __construct(int $year, int $month)
    {
        $this->month = $month;
        $this->year  = $year;
    }

    /**
     * @return Builder
     */
    public function query()
    {
        return Invoice
            ::query()
            ->whereYear('created_at', $this->year)
            ->whereMonth('created_at', $this->month);
    }

    /**
     * @return string
     */
    public function title(): string
    {
        return 'Month ' . $this->month;
    }
}
```

The code below can be implemented in any class in order to download an xlsx of all invoices from the current year, with 12 worksheets representing each month of the year.

```php
public function downloadInvoices() 
{
    return (new InvoicesExport(2018))->download('invoices.xlsx');
}
```
