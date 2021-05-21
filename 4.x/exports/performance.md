# Performance

[[toc]]

## TLDR;

<span class="inline-step">1</span> Data

<span class="inline-step">2</span> Queuing

<span class="inline-step">3</span> Cell caching

### Data

Most important part of performance is the amount of data that is held in memory...

### Limiting data

```php
public function query()
{
    return User::query()
        ->with('role')
        ->select('users.id', 'users.name', 'users.email', 'role.name');
}
```

### Joining data

```php
public function query()
{
    return User::query()
        ->innerJoin('roles')
        ->select('users.id', 'users.name', 'users.email', 'roles.name');
}
```

### Skipping Eloquent hydration

```php
public function query()
{
    return DB
        ::table('users')
        ->innerJoin('roles')
        ->select('users.id', 'users.name', 'users.email', 'roles.name');
}
```

### Using LazyCollections/Generators

```php
public function collection()
{
    return DB::table('users')->select('id', 'name', 'email')->lazy();
}
```

## Queuing

When the data set is too big for the user to wait sync, u can queue it.

```php
class ExportUsers implements ShouldQueue
{
    use Queuable;

    public $queue = 'long-running';
    public $timeout = 900;

    public function handle()
    {
        Excel::store(new UsersExport, 'users.xlsx');
    }
}
```

## Cell caching

By default PhpSpreadsheet keeps all cell values in memory, however when dealing with large files, this might result into memory issues. If you want to mitigate that, you can configure a cell caching driver here.

When using the illuminate driver, it will store each value in the cache store. This can slow down the process, because it needs to store each value. However it will use less memory. It will automatically use your default cache store. However if you prefer to have the cell cache on a separate store, you can configure the store name here. You can use any store defined in your cache config. When leaving at "null" it will use the default store.

You can use the "batch" store if you want to only persist to the store when the memory limit is reached. You can tweak the memory limit in the config.
