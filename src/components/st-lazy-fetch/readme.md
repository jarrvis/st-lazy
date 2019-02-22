# st-lazy-fetch

## Component to make lazy API calls. Request is done after component is scrolled into viewport  

## Usage
```html
    <st-lazy-fetch
        url="https://jsonplaceholder.typicode.com/users/1">
    </st-lazy-fetch>
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                     | Type      | Default         |
| --------- | --------- | ----------------------------------------------- | --------- | --------------- |
| `headers` | --        | Request headers                                 | `Headers` | `new Headers()` |
| `method`  | `method`  | Http requst type: GET, POST, PUT, DELETE, PATCH | `string`  | `'GET'`         |
| `url`     | `url`     | Request url                                     | `string`  | `''`            |


## Events

| Event      | Description                                                      | Type                |
| ---------- | ---------------------------------------------------------------- | ------------------- |
| `error`    | Thrown as a failed request callback. Carries response object     | `CustomEvent<void>` |
| `resolved` | Thrown as a succesfull request callback. Carries response object | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
