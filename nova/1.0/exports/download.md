# Download exports

Downloading an export of your resource is very easy. 

In your resource class, add the `Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel` to `actions()`.

```php
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

public function actions(Request $request)
{
    return [
        new DownloadExcel(),
    ];
}
```

Now you should see "Download Excel" in your list of actions.

![Download Excel](https://user-images.githubusercontent.com/7728097/44807515-0dea4300-abca-11e8-9396-9bd969f6a6c9.png)

When clicking a `users.xlsx` document will be downloaded. The name of the file is derived from the name of the resource.
