---
pageClass: no-toc
---

# From View

Exports can be created from a Blade view, by using the `FromView` concern.

```php
namespace App\Exports;

use App\Invoice;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class InvoicesExport implements FromView
{
    public function view(): View
    {
        return view('exports.invoices', [
            'invoices' => Invoice::all()
        ]);
    }
}
```

It will convert an HTML table into an Excel spreadsheet. For example; `invoices.blade.php`:

```html
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
    </thead>
    <tbody>
    @foreach($invoices as $invoice)
        <tr>
            <td>{{ $invoice->name }}</td>
            <td>{{ $invoice->email }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```

You can download the export in your controller:

```php
public function export() 
{
    return Excel::download(new InvoicesExport, 'invoices.xlsx');
}
```
