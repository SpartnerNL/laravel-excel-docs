# Configuration options

[[toc]]

#### CSV export format
If you need a bit more control over the CSV format, you can customize the 
delimiter, enclosure and line ending through the config file:
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

NB: The delimiter and enclosure both must be exactly one character in length. 

#### Query chunk size
You can also customize the chunk size, which impacts performance for FromQuery concerns, as follows: 
  
```php
<?php

return [
    'exports' => [
        'chunk_size' => 10000,
    ],
];
```