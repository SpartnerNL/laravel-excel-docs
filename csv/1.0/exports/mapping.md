# Mapping data

### Mapping rows

By adding `WithMapping` you map the data that needs to be added as row. This way you have control over the actual source for each column.
In case of using the Eloquent query builder: 

```php

use Maatwebsite\LaravelCsv\Concerns\FromQuery;
use Maatwebsite\LaravelCsv\Concerns\WithMapping;

class InvoicesExport implements FromQuery, WithMapping
    
    /**
    * @var Invoice $invoice
    */
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            $invoice->created_at,
        ];
    }
}
```

### Adding a heading row

A heading row can easily be added by adding the `WithHeadings` concern. The heading row will be added
as very first row of the sheet.

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings
    
    public function headings(): array
    {
        return [
            '#',
            'Date',
        ];
    }
}
```

### Multiple rows
In both cases, for headings as wel als mapping, you can return multiple rows. Each will be added in the export. 

Example: 
```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoicesExport implements FromQuery, WithHeadings, WithMapping
    
    public function headings(): array
    {
        return [
           ['#', 'date'],
           ['Amount', 'Status'],
        ];
    }
    
    /**
        * @var Invoice $invoice
        */
        public function map($invoice): array
        {
            return [[
                    $invoice->invoice_number,
                    $invoice->created_at,
                ], [
                    $invoice->order->amount,
                    $invoice->order->status,
            ]];
        }
}
```

This would result in the following export:
```csv
"#","date"
"amount","status"
"201901564","2019-07-04"
"350","paid"
"201901566","2019-07-03"
"645","pending"
"201901568","2019-07-02"
"100","paid"
"201901458","2019-07-01"
"999","cancelled"
```