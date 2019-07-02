# Configuration options

[[toc]]

#### Csv export format
If you need a bit more control over the csv format, you can customize the 
delimiter, enclosure and newline through the config file:
```php
<?php

return [
    'delimiter' => ',',
    'enclosure' => '"',
    'newLine'   => "\n",
];
```

The default values match the default values used by League/Csv.

NB: The delimiter and enclosure both must be exactly one character in length. 

#### Query chunk size
You can also customize the chunksize, which impacts performance for FromQuery concerns, as follows: 
  
```php
<?php

return [
    'chunkSize' => 10000,
];
```