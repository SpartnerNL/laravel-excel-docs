# Data sources

An important part of each export is where the data should come from. Laravel Excel offers several ways of feeding data
to the spreadsheet.

[[toc]]

## TLDR;

<span class="inline-step">1</span> **Exporting from array or collection**

Using the `FromCollection` and `FromArray` concerns any type list of rows can be exported.

<span class="inline-step">2</span> **Exporting a Model query**

Models can be exported using the `FromQuery` concern. Behind the scenes the query will be chunked for improved
performance.

<span class="inline-step">3</span> **Exporting a Blade View**

To have more control on how the export should be presented `FromView` can be used with a Blade view that has a HTML
table.

## Collection

### Eloquent collections

`FromCollection` allows a collection of Eloquent models to be returned. Every Model will become a row in the export. 

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        // All User models.
        return User::all();
        
        // Query some User models.
        return User::query()->select('')->where('country', 'NL')->get();
    }
}
```

You can also do a more complex query with select, joins, where conditions etc. Just like with any Export object, you can pass any data via the constructor (or setters).

```php
class UsersExport implements FromCollection
{
    public function __construct(
        public string $country
    ) {
    }

    public function collection()
    {
        return User::query()
            ->join('orders', 'users.id', '=', 'orders.user_id')
            ->select('users.name', 'users.country', 'orders.price')
            ->where('users.country', $this->country)
            ->get();
    }
}
```

In the controller you can pass any required data to the export.

```php
return Excel::download(new UsersExport('NL'));
```

### Custom collections

If you are not using Eloquent or having another datasource (e.g. an API, MongoDB, Cache, ...) you can also return a
custom collection:

```php
class InvoicesExport implements FromCollection
{
    public function collection()
    {
        return new Collection([
            [1, 2, 3],
            [4, 5, 6]
        ]);
    }
}
```

### Lazy Collection

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromCollection;

class InvoicesExport implements FromCollection
{
    public function collection()
    {
        return Invoice::query()->lazy();
    }
}
```

## Array

If you prefer to use plain arrays over Collections, you can use the FromArray concern:

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromArray;

class InvoicesExport implements FromArray
{
    public function array(): array
    {
        return [
            [1, 2, 3],
            [4, 5, 6]
        ];
    }
}
```

## Query

In the previous examples, we did the query inside the export class. While this is a good solution for small exports, for
bigger exports this will come at a hefty performance price.

By using the `FromQuery` concern, we can prepare a query for an export. Behind the scenes this query is executed in
chunks to limit the amount of models held in memory.

In the `InvoicesExport` class, add the `FromQuery` concern and return a query. Be sure to not `->get()` the results!

```php
namespace App\Exports;

use App\Invoice;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;

class InvoicesExport implements FromQuery
{
    use Exportable;

    public function query()
    {
        return Invoice::query();
    }
}
```

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

Exports can be created from a PHP generator class, by using the `FromGenerator` concern.

A generator allows you to write code that uses foreach to iterate over a set of data without needing to build an array
in memory.

```php
namespace App\Exports;

use Generator;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromGenerator;

class DataExport implements FromGenerator
{
    public function generator(): Generator
    {
        for ($i = 1; $i <= 100; $i++) {
            yield [$i, $i+1, $i+2];
        }
    }
}
```

## Generic data manipulations

### Strict null comparison

If you want your `0` values to be actual `0` values in your Excel sheet instead of `null` (empty cells), you can use `WithStrictNullComparison`.

```php
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;

class UsersExport implements FromCollection, WithStrictNullComparison
```

### Custom start cell

The default start cell is A1. Implementing the `WithCustomStartCell` concern in your export class allows you to specify a custom start cell.

```php
use Maatwebsite\Excel\Concerns\WithCustomStartCell;

class UsersExport implements FromCollection, WithCustomStartCell
{
    public function startCell(): string
    {
        return 'B2';
    }
}
```

:::warning
WithCustomStartCell is only supported for FromCollection exports.
:::
