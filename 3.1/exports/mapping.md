# Mapping data

[[toc]]

## Mapping rows

By adding `WithMapping` you map the data that needs to be added as row. This way you have control over the actual source for each column.
In case of using the Eloquent query builder: 

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class InvoicesExport implements FromQuery, WithMapping
{    
    /**
    * @param Invoice $invoice
    */
    public function map($invoice): array
    {
        return [
            $invoice->invoice_number,
            $invoice->user->name,
            Date::dateTimeToExcel($invoice->created_at),
        ];
    }
}
```


### Multiple rows

You can also return multiple rows inside the map function:

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class InvoicesExport implements FromQuery, WithMapping
{    
    /**
    * @param Invoice $invoice
    */
    public function map($invoice): array
    {
        // This example will return 3 rows.
        // First row will have 2 column, the next 2 will have 1 column
        return [
            [
                $invoice->invoice_number,
                Date::dateTimeToExcel($invoice->created_at),
            ],
            [
                $invoice->lines->first()->description,
            ],
            [
                $invoice->lines->last()->description,
            ]
        ];
    }
}
```

## Prepare rows

If you need to prepare rows before appending these rows to sheet, you can add method `prepareRows` to your export class. This method will be called before flattening the query output and calling `map()`.

```php

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromQuery, WithHeadings
{   
    public function prepareRows($rows)
    {
        return $rows->transform(function ($user) {
            $user->name .= ' (prepared)';

            return $user;
        });
    }
}
```
