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