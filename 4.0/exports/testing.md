# Testing

[[toc]]

The Excel facade can be faked to make assertions without actually writing spreadsheet files.

## Faking the facade

```php
Excel::fake();
```

## Testing downloads

```php
public function test_user_can_download_invoices_export()
{
    Excel::fake();

    $this->actingAs($this->givenUser())
         ->get('/invoices/download/xlsx');

    Excel::assertDownloaded('filename.xlsx', function(InvoicesExport $export) {
        // Assert that the correct export is downloaded.
        return $export->collection()->contains('#2018-01');
    });
}
```

## Testing storing exports

```php
public function test_user_can_store_invoices_export()
{
    Excel::fake();

    $this->actingAs($this->givenUser())
         ->get('/invoices/store/xlsx');

    Excel::assertStored('filename.xlsx', 'diskName');

    Excel::assertStored('filename.xlsx', 'diskName', function(InvoicesExport $export) {
        return true;
    });

    // When passing the callback as 2nd param, the disk will be the default disk.
    Excel::assertStored('filename.xlsx', function(InvoicesExport $export) {
        return true;
    });
}
```

## Testing exports with dynamic file name/path

If you have dynamic naming for files or paths, you can use a regular expression to represent those while testing:

```php
public function test_user_can_store_invoices_export()
{
    Excel::fake();

    $this->actingAs($this->givenUser())
         ->get('/invoices/store/xlsx');

    // Tells the mock to use regular expressions
    Excel::matchByRegex();
    // For a given dynamic named file 'invoices_2019.xlsx'
    Excel::assertStored('/invoices_\d{4}\.xlsx/', 'diskName');
}
```

Please note that your expression must match only one file/path. If more than one match is found, the test will fail.
