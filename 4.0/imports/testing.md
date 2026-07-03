# Testing

[[toc]]

The Excel facade can be used to swap the importer to a fake.

## Testing imports

```php
/**
* @test
*/
public function user_can_import_users() 
{
    Excel::fake();
    
    $this->actingAs($this->givenUser())
         ->get('/users/import/xlsx');

    Excel::assertImported('filename.xlsx', 'diskName');
    
    Excel::assertImported('filename.xlsx', 'diskName', function(UsersImport $import) {
        return true;
    });
    
    // When passing the callback as 2nd param, the disk will be the default disk.
    Excel::assertImported('filename.xlsx', function(UsersImport $import) {
        return true;
    });
}
```

## Testing queuing imports

```php
/**
* @test
*/
public function user_can_queue_the_users_import() 
{
    Excel::fake();

    $this->actingAs($this->givenUser())
         ->get('/users/queue/xlsx');

    Excel::assertQueued('filename.xlsx', 'diskName');
    
    Excel::assertQueued('filename.xlsx', 'diskName', function(UsersImport $import) {
        return true;
    });
    
    // When passing the callback as 2nd param, the disk will be the default disk.
    Excel::assertQueued('filename.xlsx', function(UsersImport $import) {
        return true;
    });
}
```

## Testing imports with dynamic file name/path

If you have dynamic naming for files or paths, you can use a regular expression to represent those while testing:

```php
/**
* @test
*/
public function user_can_import_users() 
{
    Excel::fake();
    
    $this->actingAs($this->givenUser())
         ->get('/users/import/xlsx');
    
    // Tells the mock to use regular expressions
    Excel::matchByRegex(); 
    // For a given dynamic named file 'dynamic_1234_filename.xlsx'
    Excel::assertImported('/\w{7}_\d{4}\_\w{8}\.xlsx/', 'diskName');
}
```
Please note that your expression must match only one file/path. If more than one match is found, the test will fail.
