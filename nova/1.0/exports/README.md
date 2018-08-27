## :rocket: 5 minutes quick start

:bulb: Require this package in the `composer.json` of your Laravel project. This will download the package and Laravel-Excel.

```
composer require maatwebsite/laravel-nova-excel
```

:muscle: Go to your resource. As example we'll use the `app/Nova/User.php`. Add `DownloadExcel` action to your `actions()` list.

```php
<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;

class User extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = 'App\\User';
    
    // Other default resource methods
    
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
            new DownloadExcel,
        ];
    }
}
```

:fire: Go to your resource in your Nova admin panel, select all or some users and click "Download Excel"

![Dowload Excel](https://user-images.githubusercontent.com/7728097/44621835-af615400-a8ad-11e8-9d9e-924c553a10ac.png)

:page_facing_up: Find your `users.xlsx` in your downloads folder!