---
pageClass: no-toc with-steps
---

# :rocket: 5 minute quick start

As a quick demonstration, we'll create an export for the User model. 
This guide expects that a Laravel is already installed, and the project has a seeded users table and User Eloquent model.

We'll follow 3 steps:

<span class="inline-step">1</span> **Creating the export**

<span class="inline-step">2</span> **Customizing the export**

<span class="inline-step">3</span> **Exporting**

## Creating the export <span class="step">1</span>

Laravel Excel Exports are all about **export objects** and **concerns**. These Exports are a set of instructions about how to get data and how to present it inside the Spreadsheet.

:::tip
:bulb: If you want to read more about the architecture behind export objects and concerns, you find it in the [architecture docs](/4.x/architecture/objects).
:::

These Exports are located in the `app/Exports` folder and can either be created by the corresponding Artisan command or manually.

You may do this by using the `make:export` command.

```shell
php artisan make:export UsersExport --model=User
```

If you prefer to create the export manually, create a new class in `app/Exports` called `UsersExport`.

::: vue
.
├── app
│   ├── `Exports`
│   │   ├── UsersExport.php
│
└── composer.json
:::

## Customizing the export <span class="step">2</span>

Next we can open the newly created `app/Exports/UsersExport` class. You'll see that the entire export is already prepared by the Artisan command.

```php{12}
<?php

namespace App\Exports;

use App\User;
use Maatwebsite\Excel\Concerns\FromCollection;

class UsersExport implements FromCollection
{
    public function collection()
    {
        return User::all();
    }
}
```

The Export class implements the `FromCollection` concern. This concern is a **data source** concern, meaning it determines the data we want to export.

:::tip TIP
:bulb: `FromCollection` is only one of several sources of data. You can find the other ones in the next chapter of the documentation.
:::

##  Exporting <span class="step">3</span>

Next we'll want to export our newly created Users Export. One way to export, is by triggering a direct download. 

To keep the example simple, we'll do the export right in the `routes/web.php` file, however you are free to trigger the export in a controller, Artisan command, Queue job, etc.

`Excel::download` has two required parameters: the export object and the filename.

```php
Route::get('users/export', function() {
    return Excel::download(new UsersExport, 'users.xlsx');
});
```

Open `http://localhost/users/export` in your browser. If everything went well a `users.xlsx` spreadsheet will have been downloaded.

:::tip TIP
:bulb: `Excel::download()` is one way of exporting. More ways can be found in the next chapters.
:::

# What's next?

Of course Laravel Excel has more functionality than only downloading a spreadsheet of Eloquent models. In the next chapters we'll have a closer look at the following basic concepts:

<span class="inline-step">1</span> **Ways of exporting**

You might not want to download the spreadsheet, but save it to the disk. In this chapter we'll cover the other ways of storing the spreadsheet.

<span class="inline-step">2</span> **Data sources**

Exporting a collection of Eloquent models is just one way of exporting data. In this chapter we'll cover exporting from views, models, arrays and other data sources.

<span class="inline-step">3</span> **Data presentation**

In some cases you might want to alter the data or style the data of a specific row, cell or column. First we'll have a look at the recommended way of using column configuration, 
in next chapters other -more verbose- methods we'll be explained.

<span class="inline-step">4</span> **Advanced**

Laravel Excel also contains more advanced concepts, these we'll be tackled in the remaining chapters.
