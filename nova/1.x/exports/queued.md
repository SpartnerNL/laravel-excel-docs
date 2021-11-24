# Queued

When dealing with a large resource selection (e.g. +20k models), you can choose to queue your export. 

In your resource class, add the `Maatwebsite\LaravelNovaExcel\Actions\QueuedExport` to `actions()`.

```php
use Maatwebsite\LaravelNovaExcel\Actions\QueuedExport;

public function actions(Request $request)
{
    return [
        new QueuedExport(),
    ];
}
```

Now you should see "Export To Excel" in your list of actions.

![Store To Excel](https://user-images.githubusercontent.com/7728097/44626423-4664f500-a91c-11e8-88ee-0bafa2a00260.png)

The `users.xlxs` file will be stored in your `default` storage folder. 
Behind the scenes the query is chunked with a chunk count of **200** and each chunk is queued.

You can customize this by using the `withChunkCount()` method.

```php
/**
 * Get the actions available for the resource.
 *
 * @param  \Illuminate\Http\Request $request
 *
 * @return array
 */
public function actions(Request $request)
{
    return [
        (new QueuedExport)->withChunkCount(1000),
    ];
}
```

::: warning
Queueing downloads is not supported! You can only queue exports that are stored to the disk.
:::
