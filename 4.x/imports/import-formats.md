# Import formats

[[toc]]

By default, the import format is determined by the extension of the file. If you want 
to explicitly configure the import format, you can pass it through as 3rd parameter. 

## XLSX

```php
(new UsersImport)->import('users.xlsx', null, \Maatwebsite\Excel\Excel::XLSX);
```

## CSV

```php
(new UsersImport)->import('users.csv', null, \Maatwebsite\Excel\Excel::CSV);
```

## TSV

```php
(new UsersImport)->import('users.tsv', null, \Maatwebsite\Excel\Excel::TSV);
```

## ODS

```php
(new UsersImport)->import('users.ods', null, \Maatwebsite\Excel\Excel::ODS);
```

## XLS

```php
(new UsersImport)->import('users.xls', null, \Maatwebsite\Excel\Excel::XLS);
```

## SLK

```php
(new UsersImport)->import('users.slk', null, \Maatwebsite\Excel\Excel::SLK);
```

## XML

```php
(new UsersImport)->import('users.xml', null, \Maatwebsite\Excel\Excel::XML);
```

## GNUMERIC

```php
(new UsersImport)->import('users.gnumeric', null, \Maatwebsite\Excel\Excel::GNUMERIC);
```

## HTML

```php
(new UsersImport)->import('users.html', null, \Maatwebsite\Excel\Excel::HTML);
```
