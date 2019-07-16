# Export formats

[[toc]]

By default, the export format is determined by the extension of the file. If you want 
to explicitly configure the export format, you can pass it through as 2nd parameter. 

## XLSX

```php
return (new InvoicesExport)->download('invoices.xlsx', \Maatwebsite\Excel\Excel::XLSX);
```

## CSV

```php
return (new InvoicesExport)->download('invoices.csv', \Maatwebsite\Excel\Excel::CSV);
```

By default the CSV is download with Content Type `text/plain`, if you want to customize the Content-Type header, you can do so by passing it as 3rd parameter.

```php
return (new InvoicesExport)->download('invoices.csv', \Maatwebsite\Excel\Excel::CSV, [
      'Content-Type' => 'text/csv',
]);
```

:::tip Laravel CSV
You may have a look at our [Laravel CSV](/csv/1.0/getting-started/) package as well.
:::

## TSV

```php
return (new InvoicesExport)->download('invoices.tsv', \Maatwebsite\Excel\Excel::TSV);
```

## ODS

```php
return (new InvoicesExport)->download('invoices.ods', \Maatwebsite\Excel\Excel::ODS);
```

## XLS

```php
return (new InvoicesExport)->download('invoices.xls', \Maatwebsite\Excel\Excel::XLS);
```

## HTML

```php
return (new InvoicesExport)->download('invoices.html', \Maatwebsite\Excel\Excel::HTML);
```

::: warning Exporting to PDF
If you'd like to export to PDF, you must now install a PDF rendering library yourself. Please refer to the [PhpSpreadsheet Documentation](https://phpspreadsheet.readthedocs.io/en/latest/topics/reading-and-writing-to-file/#pdf) for more information.
:::

## MPDF

```php
return (new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::MPDF);
```

## DOMPDF

```php
return (new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
```

## TCPDF

```php
return (new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::TCPDF);
```
