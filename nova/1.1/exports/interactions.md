# Interact with exports

[[toc]]

## Asking the user for a filename

If you want your users to choose their own filename when exporting a resource, you can use the `askForFilename()` interaction.

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
        (new DownloadExcel())->askForFilename()
    ];
}
```

The user will now be prompted with the question how he wants to name the file. 

![Laravel Nova Excel ask for filename](https://user-images.githubusercontent.com/7728097/44626722-ce013280-a921-11e8-924a-1ef73214f269.png)

:bulb: If you want to have a custom label, you can simply pass that via the method: `(new DownloadExcel())->askForFilename(__('Filename for your export'))`

:::warning
When not specifying any default writer type, the user can control the file type by typing an extensions in the filename. 
E.g. `users.csv` will result into an Csv document. If the user doesn't specify any extension, it will default to `.xlsx`.

If you don't want the user to have this kind of control,make sure to use `withWriterType()`.
:::

## Asking the user for the writer type

If you want your users to choose their own writer type when exporting a resource, you can use the `askForWriterType()` interaction.

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
        (new DownloadExcel())->askForWriterType()
    ];
}
```

![Laravel Excel Nova asking for writer type](https://user-images.githubusercontent.com/7728097/44626801-592ef800-a923-11e8-8fd2-7789244d818b.png)

:bulb: If you want to specify the options the user can choose yourself, you can pass them via the `askForWriterType`:

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
        (new DownloadExcel)->askForWriterType([
            \Maatwebsite\Excel\Excel::CSV => __('Csv document'),
        ]),
    ];
}
```

:bulb: If you want to have a custom label, you can simply pass that via the method: `(new DownloadExcel())->askForWriterType(null, __('Filename for your export'))`

