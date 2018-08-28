# Export formats

By default the export format is determined by the extension of the file, however if you want 
to explicitly configured this, you can pass through the export format as 2nd parameter. 

## XLSX

```php
(new InvoicesExport)->download('invoices.xlsx', \Maatwebsite\Excel\Excel::XLSX);
```

## CSV

```php
(new InvoicesExport)->download('invoices.csv', \Maatwebsite\Excel\Excel::CSV);
```

## TSV

```php
(new InvoicesExport)->download('invoices.tsv', \Maatwebsite\Excel\Excel::TSV);
```

## ODS

```php
(new InvoicesExport)->download('invoices.ods', \Maatwebsite\Excel\Excel::ODS);
```

## XLS

```php
(new InvoicesExport)->download('invoices.xls', \Maatwebsite\Excel\Excel::XLS);
```

## SLK

```php
(new InvoicesExport)->download('invoices.slk', \Maatwebsite\Excel\Excel::SLK);
```

## XML

```php
(new InvoicesExport)->download('invoices.xml', \Maatwebsite\Excel\Excel::XML);
```

## GNUMERIC

```php
(new InvoicesExport)->download('invoices.gnumeric', \Maatwebsite\Excel\Excel::GNUMERIC);
```

## HTML

```php
(new InvoicesExport)->download('invoices.html', \Maatwebsite\Excel\Excel::HTML);
```

## MPDF

```php
(new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::MPDF);
```

## DOMPDF

```php
(new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::DOMPDF);
```

## TCPDF

```php
(new InvoicesExport)->download('invoices.pdf', \Maatwebsite\Excel\Excel::TCPDF);
```
