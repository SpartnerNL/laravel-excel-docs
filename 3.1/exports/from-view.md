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

Attribute in tag html support:

|Attributes|Description
|-----------|-------------
|bgcolor| set background color to cell `<td>`
|colspan| merge column cell
|rowspan| merge row cell
|width| set width to cell
|height| set height to cell
|data-format| set format `PhpOffice\PhpSpreadsheet\Style::NumberFormat`
|data-type| set type `PhpOffice\PhpSpreadsheet\Cell`
|align| set text align to cell
|valign| set vertical align to cell
|style| set style to cell

Style inline support
- background
- background-color
- color
- border|border-top|border-bottom|border-left|border-right
- font-size|font-weight|font-sytle|font-family
- text-decoration: underline|line-through
- text-align
- vertical-align
- with|height
- word-wrap
- text-indent

You can download the export in your controller:

```php
public function export() 
{
    return Excel::download(new InvoicesExport, 'invoices.xlsx');
}
```
