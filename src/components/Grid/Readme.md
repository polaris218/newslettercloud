# Grid

## Properties
- `spinner` [bool] - to show Spinner on data loading or not.
- `paginate` [bool] - to show pagination or not.
- `itemsPerPage` [number]: Number of items to show in one page. Default value is `100`.
- `service` [func]: Service that makes request to get data.
- `onResponse` [func]: Callback to be called when data is received. Response is passed as parameter of function.
- `data` [array]: Optional data can be passed to the grid. If so service function is ignored. 
- `headers` [array]: Array of `<th>` tags. Elements of array could be `string`, `HTML element` or `React component`.
- `tableMapper` [func]: Mapper function that modifies response data to table data.
- `itemsType` [node] -  word to show in summary: ` Showing 1-1 of 1 {itemsType}`.
- `query` [object] - additional query to be send along with pagination if exist. It could be used as filter parameter.
    When query property is changed new request is made to update table.
 

 ### Note:
 - If property `paginate` is set to `false` pagination is not shown and number of items to show is controlled by `itemsPerPage`
 property.

 - If property `itemsPerPage` is set to `0` than `paginate` property is ignored and all items are going to be shown without pagination.