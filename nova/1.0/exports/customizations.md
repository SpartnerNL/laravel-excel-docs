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

### With Headings

By default the Export doesn't contain a heading row. If you want this, you can use the `withHeadings` method.

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
        (new DownloadExcel)->withHeadings(),
    ];
}
```

This will result into each column having their corresponding column name as first row.

If you want more control, you can pass in the headings yourself.

```php
public function actions(Request $request)
{
    return [
        (new DownloadExcel)->withHeadings('#', __('Name'), __('E-mail')),
    ];
}
```

### Exporting only certain columns.

If you want to select only a few columns for your export, you can use `->only()`.

```php
public function actions(Request $request)
{
    return [
        (new DownloadExcel)->only('name', 'email'),
    ];
}
```

### Exporting all index columns

By default it exports all visible attributes of your model. If you only want to export the columns that are visible on the index, you can use `->onlyIndexFields()`.

```php
public function actions(Request $request)
{
    return [
        (new DownloadExcel)->onlyIndexFields(),
    ];
}
```

### Chunk count

By default we chunk the resource query in chunks of **200**, if you want to change this for performance reasons, you can use the `withChunkCount()`
 method.
 
```php
public function actions(Request $request)
{
    return [
        (new DownloadExcel)->withChunkCount(300),
    ];
}
```

### Custom success and error messages

By default both `ExportToExcel` and `DownloadExcel` send notifications to the user when an export is failed or succeeded. 
If you want to customize this, you can use the `onSuccess` or `onFailure` callbacks.

```php
public function actions(Request $request)
{
    return [
        (new ExportToExcel)
            ->onSuccess(function() {
                return Action::message(__('Your export is ready for you! :)'));
            })->onFailure(function() {
                 return Action::danger(__('Oh dear! I could not create that export for you :(.'));
            }),
    ];
}
```

::: warning
Using `onSuccess` on `DownloadExcel` expects a `Action::download` to be returned!
:::

### Chaining jobs

Just like in Laravel-Excel it's possible to chain extra jobs to the export queue when using the `QueuedExport`. You could e.g. notify the user about the export completion.


```php
use Illuminate\Foundation\Bus\PendingDispatch;

public function actions(Request $request)
{
    return [
        (new QueuedExport)
            ->onSuccess(function (ActionRequest $request, PendingDispatch $queue) {
                $queue
                    ->allOnQueue('exports')
                    ->chain([
                        new NotifyUserOfCompletedExport($request->user()),
                    ]);
    
                return Action::message(__('Your export is queued!'));
            }),
    ];
}
```

```php
<?php

namespace App\Jobs;

use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NotifyUserOfCompletedExport implements ShouldQueue
{
    use SerializesModels, InteractsWithQueue, Queueable;

    /**
     * @var User
     */
    private $user;

    /**
     * @param User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        $this->user->notify(...);
    }
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

