# Charts

[[toc]]

By using the `WithCharts` concern, you can add one or multiple charts to your worksheet.

## Instantiating a chart
You first have to instantiate a new `PhpOffice\PhpSpreadsheet\Worksheet\Chart`, passing the name, title, legend and plot in the constructor.

```php
$label      = [new DataSeriesValues('String', 'Worksheet!$B$1', null, 1)];
$categories = [new DataSeriesValues('String', 'Worksheet!$B$2:$B$5', null, 4)];
$values     = [new DataSeriesValues('Number', 'Worksheet!$A$2:$A$5', null, 4)];

$series = new DataSeries(DataSeries::TYPE_PIECHART, DataSeries::GROUPING_STANDARD,
    range(0, \count($values) - 1), $label, $categories, $values);
$plot   = new PlotArea(null, [$series]);

$legend = new Legend();
$chart  = new Chart('chart name', new Title('chart title'), $legend, $plot);
```

You can view all available properties for Charts on the [PhpSpreadsheet docs](https://phpoffice.github.io/PhpSpreadsheet/namespaces/phpoffice-phpspreadsheet-chart.html).

## Adding a single chart
When you've instantiated the chart, you can add the `WithCharts` concern to your export class and return the Chart instance in the `charts` method.

```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCharts;
use PhpOffice\PhpSpreadsheet\Worksheet\Chart;

class InvoicesExport implements WithCharts
{
    public function charts()
    {
        $label      = [new DataSeriesValues('String', 'Worksheet!$B$1', null, 1)];
        $categories = [new DataSeriesValues('String', 'Worksheet!$B$2:$B$5', null, 4)];
        $values     = [new DataSeriesValues('Number', 'Worksheet!$A$2:$A$5', null, 4)];

        $series = new DataSeries(DataSeries::TYPE_PIECHART, DataSeries::GROUPING_STANDARD,
            range(0, \count($values) - 1), $label, $categories, $values);
        $plot   = new PlotArea(null, [$series]);

        $legend = new Legend();
        $chart  = new Chart('chart name', new Title('chart title'), $legend, $plot);

        return $chart;
    }
}
```

## Adding multiple charts
You can add multiple charts to the worksheet by returning an array in the `charts` method.

```php
<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithCharts;
use PhpOffice\PhpSpreadsheet\Worksheet\Chart;

class InvoicesExport implements WithCharts
{
    public function charts()
    {
        $label      = [new DataSeriesValues('String', 'Worksheet!$B$1', null, 1)];
        $categories = [new DataSeriesValues('String', 'Worksheet!$B$2:$B$5', null, 4)];
        $values     = [new DataSeriesValues('Number', 'Worksheet!$A$2:$A$5', null, 4)];

        $series = new DataSeries(DataSeries::TYPE_PIECHART, DataSeries::GROUPING_STANDARD,
            range(0, \count($values) - 1), $label, $categories, $values);
        $plot   = new PlotArea(null, [$series]);

        $legend = new Legend();
        $chart  = new Chart('chart name', new Title('chart title'), $legend, $plot);
        $chart2 = new Chart('chart 2 name', new Title('chart 2 title'), $legend, $plot);

        return [$chart, $chart2];
    }
}
```
