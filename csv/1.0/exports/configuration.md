# Configuration options

[[toc]]

## CSV export format
If you need a bit more control over the CSV format, you can customize the 
_delimiter_, _enclosure_ and _line ending_ through the config file:
```php
<?php

return [
    'exports' => [
        'delimiter'   => ',',
        'enclosure'   => '"',
        'line_ending' => "\n",
    ],
];
```

The default values match the default values used by League/Csv.

__NB:__ The _delimiter_ and _enclosure_ both must be exactly one character in length. 

## Query chunk size
You can also customize the chunk size, which impacts performance for FromQuery concerns, as follows: 
  
```php
<?php

return [
    'exports' => [
        'chunk_size' => 10000,
    ],
];
```

::: warning
You might need to find the sweet spot for your application, however we've experienced chunks bigger than 20000 to become slower.
:::