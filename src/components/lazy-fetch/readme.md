# lazy-fetch

## Component to make lazy API calls. Request is done after component is scrolled into viewport  

## Usage
```html
    <lazy-fetch
        url="https://jsonplaceholder.typicode.com/users/1">
    </lazy-fetch>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                                                                                                         | Type      | Default         |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --------------- |
| `headers` | --        | Request headers                                                                                                                                                                                     | `Headers` | `new Headers()` |
| `margin`  | `margin`  | Determines how far from the viewport lazy loading starts. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).  The values can be percentages | `string`  | `undefined`     |
| `method`  | `method`  | Http requst type: GET, POST, PUT, DELETE, PATCH                                                                                                                                                     | `string`  | `'GET'`         |
| `url`     | `url`     | Request url                                                                                                                                                                                         | `string`  | `''`            |


## Events

| Event      | Description                                                      | Type                |
| ---------- | ---------------------------------------------------------------- | ------------------- |
| `error`    | Thrown as a failed request callback. Carries response object     | `CustomEvent<void>` |
| `resolved` | Thrown as a succesfull request callback. Carries response object | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
