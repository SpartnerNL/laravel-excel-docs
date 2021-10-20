# Drawings

[[toc]]

By using the `WithDrawings` concern, you can add one or multiple drawings to your worksheet.

## Instantiating a drawing
You first have to instantiate a new `\PhpOffice\PhpSpreadsheet\Worksheet\Drawing`, and assign its properties a meaningful value.

```php
$drawing = new \PhpOffice\PhpSpreadsheet\Worksheet\Drawing();
$drawing->setName('Logo');
$drawing->setDescription('This is my logo');
$drawing->setPath(public_path('/img/logo.jpg'));
$drawing->setHeight(90);
```

You can view all available properties for Drawing on the [PhpSpreadsheet docs](https://github.com/PHPOffice/PhpSpreadsheet/blob/master/src/PhpSpreadsheet/Worksheet/BaseDrawing.php).

## Adding a single drawing
When you've instantiated the drawing, you can add the `WithDrawings` concern to your export class. Return the Drawing instance in the `drawings` method.

```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class InvoicesExport implements WithDrawings
{
    public function drawings()
    {
        $drawing = new Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('/img/logo.jpg'));
        $drawing->setHeight(90);
        $drawing->setCoordinates('B3');

        return $drawing;
    }
}
```

## Adding multiple drawings
You can add multiple drawings to the worksheet by returning an array in the `drawings` method.

```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;

class InvoicesExport implements WithDrawings
{
    public function drawings()
    {
        $drawing = new Drawing();
        $drawing->setName('Logo');
        $drawing->setDescription('This is my logo');
        $drawing->setPath(public_path('/img/logo.jpg'));
        $drawing->setHeight(50);
        $drawing->setCoordinates('B3');

        $drawing2 = new Drawing();
        $drawing2->setName('Other image');
        $drawing2->setDescription('This is a second image');
        $drawing2->setPath(public_path('/img/other.jpg'));
        $drawing2->setHeight(120);
        $drawing2->setCoordinates('G2');

        return [$drawing, $drawing2];
    }
}
```
