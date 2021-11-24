# Upgrade Guide

[[toc]]

## Upgrading to 3.1 from 3.0

Version 3.1 is backwards compatible with 3.0. Only features were added in this release.

__Additions__

* Imports feature.
* ChunkReading
* BatchInserts
* Queued imports
* ToArray concern for Exports.
* Custom value binders for Imports and Exports.

__Removals__

* `Excel::filter('chunk')` method is removed, chunk filter is automatically added when using chunk reading.

## Upgrading to 3.* from 2.1

Version 3.* is not backwards compatible with 2.*. It's not possible to provide a step-by-step migration guide as it's a complete paradigm shift.

__New dependencies__

3.* introduces some new dependencies.

* Requires PHP 7.0 or higher.
* Requires Laravel 5.5 (or higher).
* Requires PhpSpreadsheet instead of PHPExcel.

__Deprecations__

ALL Laravel Excel 2.* methods are deprecated and will not be able to use in 3.0 . 

- `Excel::load()` is removed and replaced by `Excel::import($yourImport)`
- `Excel::create()` is removed and replaced by `Excel::download/Excel::store($yourExport)`
- `Excel::create()->string('xlsx')` is removed an replaced by `Excel::raw($yourExport, Excel::XLSX)`
- 3.0 provides no convenience methods for styling, you are encouraged to use PhpSpreadsheets native methods.

You can find an example upgrade for an export here: [https://github.com/SpartnerNL/Laravel-Excel/issues/1799](https://github.com/SpartnerNL/Laravel-Excel/issues/1799)
