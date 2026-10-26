## :rocket: 5 minute quick start

:bulb: Require this package in the `composer.json` of your Laravel project. This will download the package and Laravel Excel.

```
composer require maatwebsite/laravel-nova-excel
```

:muscle: Go to your Nova resource. As example we'll use the `app/Nova/User.php`. Add `Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel` action to your `actions()` list.

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

![Dowload Excel](https://user-images.githubusercontent.com/7728097/44807515-0dea4300-abca-11e8-9396-9bd969f6a6c9.png)

:page_facing_up: Find your `users.xlsx` in your downloads folder!
