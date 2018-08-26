# Customize exports

[[toc]]

## Convenience methods

Exportable actions expose a few convenience methods that make customizing your resource exports a breeze.

### Filename

By default the filename of the export is generated based on the plural form of the resource name. For a `User` resource this would be `users.xlsx`.

If you want to customize this, you can easily use the `withFilename()` method on the action.

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
        (new DownloadExcel)->withFilename('users-' . time() . '.xlsx'),
    ];
}
```

The file will now be downloaded as e.g. `users-1535273559.xlsx`.

### Writer type

By default the writer type of the export is based on the file extension of the filename. When not using any custom filename, this will be `.xlsx`.

If you want to customize this, you can easily use the `withWriterType()` method on the action.

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
        (new DownloadExcel)->withWriterType(\Maatwebsite\Excel\Excel::CSV),
    ];
}
```

The file will now be downloaded in the `csv` format.

### Disk

By default the Export will be stored in the `default` storage disk. 

If you want to customize this, you can easily use the `withDisk()` method on the action.

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
        (new ExportToExcel)->withDisk('my-custom-disk'),
    ];
}
```

The file will now be downloaded in the `csv` format.

:::warning
For `DownloadExcel` the default disk is the `public` disk. 
Only change this is you know what you are doing, as it might break the download functionality from working!
:::

### Chunk count

By default we chunk the resource query in chunks of **200**, if you want to change this for performance reasons, you can use the `withChunkCount()`
 method.
 
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
            (new DownloadExcel)->withChunkCount(300),
        ];
    }
```

## Full control

If you want to gain full control over your resource exports, you can choose to create your own actions.

If you create a custom action it should either extend from `ExportToExcel` or `DownloadExcel`, depending on the functionality you want to use.

```php
<?php

namespace App\Nova\Actions;

use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class ExportUsers extends DownloadExcel
{

}
```

### Concerns

Just like in the base package **Laravel-Excel** you can apply concerns to your action.

E.g. we could add a `WithMapping` concern to the action. Now when exporting the resource it will first map each row, before exporting it.

```php
<?php

namespace App\Nova\Actions;

use App\User;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class ExportUsers extends DownloadExcel implements WithMapping
{
    /**
     * @param User $user
     *
     * @return array
     */
    public function map($user): array
    {
        return [
            $user->name,
            $user->email,
            Date::dateTimeToExcel($user->created_at),
        ];
    }
}
```

You can find a full list of concerns at [Overview of concerns](/3.0/exports/concerns.html)

### Custom response handling

By default both `ExportToExcel` and `DownloadExcel` send notifications to the user when an export is failed or succeeded. If you want to have some custom handling over this, you can overrule the `handle()` method.

```php
<?php

namespace App\Nova\Actions;

use Illuminate\Foundation\Bus\PendingDispatch;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Http\Requests\ActionRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class ExportUsers extends DownloadExcel
{
    /**
     * @param ActionRequest        $request
     * @param bool|PendingDispatch $response
     *
     * @return array
     */
    public function handle(ActionRequest $request, $response)
    {
        if (false === $response) {
            return Action::danger(__('Oh dear! I could not create that export for you :(.'));
        }

        return Action::message(__('Your export is ready for you! :)'));
    }
}
```

When having a queued response, the `$response` parameter is a `PendingDispatch`, meaning you can chain other Jobs.

```php
<?php

namespace App\Nova\Actions;

use App\Jobs\NotifyUserOfCompletedExport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\PendingDispatch;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Http\Requests\ActionRequest;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class ExportUsers extends DownloadExcel implements ShouldQueue
{
    /**
     * @param ActionRequest        $request
     * @param bool|PendingDispatch $response
     *
     * @return array
     */
    public function handle(ActionRequest $request, $response)
    {
        if (false === $response) {
            return Action::danger(__('Resource could not be exported.'));
        }

        $response->allOnQueue('exports')->chain([
            new NotifyUserOfCompletedExport($request->user()),
        ]);

        return Action::message(__('Resource was successfully exported.'));
    }
}
```
