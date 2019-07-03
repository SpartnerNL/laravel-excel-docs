# Custom Query Size

[[toc]]

Queued exportables are processed in chunks; each chunk being a job pushed to the queue by the `QueuedWriter`.
In case of exportables that implement the [FromQuery](/3.1/exports/from-query.html) concern, the number of jobs is calculated by dividing the `$query->count()` by the chunk size.

## When to use
Depending on the implementation of the `query()` method (e.g. when using a `groupBy` clause), the calculation mentioned before might not be correct.

If this is the case, you should use the `WithCustomQuerySize` concern to provide a custom calculation of the query size.
