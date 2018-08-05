# Upgrade Guide

[[toc]]

## Upgrading to 3.0 from 2.1

Version 3.0 is not backwards compatible with 2.*. It's not possible to provide a step-by-step migration guide as it's a complete paradigm shift.

__New dependencies__

3.0 introduces some new dependencies.

* Requires PHP 7.0 or higher.
* Requires Laravel 5.5 (or higher).
* Requires PhpSpreadsheet instead of PHPExcel.

__Deprecations__

ALL Laravel Excel 2.* methods are deprecated and will not be able to use in 3.0 . 

- Excel::load() is removed and will not be re-added until 3.1
- Excel::create() is removed and replaced by Excel::download/Excel::store($yourExport)
- 3.0 provides no convenience methods for styling, you are encouraged to use PhpSpreadsheets native methods.
