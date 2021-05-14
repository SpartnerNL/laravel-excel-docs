# Data sources

[[toc]]

## TLDR;

<span class="inline-step">1</span> **Exporting from array or collection**

Using the `FromCollection` and `FromArray` concerns any type list of rows can be exported.

<span class="inline-step">2</span> **Exporting a Model query**

Models can be exported using the `FromQuery` concern. Behind the scenes the query will be chunked for improved performance.

<span class="inline-step">3</span> **Exporting a Blade View**

To have more control on how the export should be presented `FromView` can be used with a Blade view that has a HTML table.

## Collection

## Array

## Model

## Query

## View

Exports can be created from a Blade view, by using the FromView concern.

```php
namespace App\Exports;

use App\User;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class UsersExport implements FromView
{
    public function view(): View
    {
        return view('exports.users', [
            'users' => User::all()
        ]);
    }
}
```

It will convert an HTML table into an Excel spreadsheet. For example; `exports/users.blade.php`:

```html
<table>
    <thead>
    <tr>
        <th>Name</th>
        <th>Email</th>
    </tr>
    </thead>
    <tbody>
    @foreach($users as $user)
        <tr>
            <td>{{ $user->name }}</td>
            <td>{{ $user->email }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
```

## Generators
