# Storing exports

To store a resource export to a disk, add the `Maatwebsite\LaravelNovaExcel\Actions\ExportToExcel` to `actions()`.

```php
use Maatwebsite\LaravelNovaExcel\Actions\ExportToExcel;

public function actions(Request $request)
{
    return [
        new ExportToExcel(),
    ];
}
```

Now you should see "Export To Excel" in your list of actions.

![Store To Excel](https://user-images.githubusercontent.com/7728097/44626423-4664f500-a91c-11e8-88ee-0bafa2a00260.png)

The `users.xlxs` file will be stored in your `default` storage folder. By default Laravel-settings this will be `storage/app`.