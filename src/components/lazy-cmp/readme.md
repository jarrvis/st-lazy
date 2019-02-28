# lazy-cmp

## Component to lazy load other Stencil components while its scrolled to viewport. 
You can also use this component just to be notified about scrolling into viewport of some HTML content.

## Usage
in jsx
```html
  <lazy-cmp
    component="my-component"
    componentProps={{ name: 'Lazy', surname: 'Stencil' }}>
  </lazy-cmp>
```

or if in html - you cannot pass object componentProps but you can pass properties one by one
```html
  <lazy-cmp
    component="my-component"
    component-prop-name='Lazy'
    component-prop-surname='Stencil'>
  </lazy-cmp>
```
optionally you can pass the componentProps over javascript:
```javascript
document.querySelector('lazy-cmp').componentProps = { name: 'Lazy', surname: 'Stencil' }
```

if you want just to be notified
```html
  <lazy-cmp
    event-value="contentId">
  </lazy-cmp>
```

## Why?
Stencil is lazy loading components by default. It loads only the ones that are actually used on the page. Here we lift it. `lazy-cmp` component is using IntersectionObserver to load the component by name only if it is in the viewport. On non supported browsers (IE, Safari) it falls back to setTimeout unless you use polyfill.   

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute          | Description                                                                                                                                                                                         | Type                      | Default     |
| ------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `component`        | `component`        | Name of component to be lazy loaded                                                                                                                                                                 | `string`                  | `undefined` |
| `component-prop-?` | `component-prop-?` | Prop of component to be lazy loaded                                                                                                                                                                 | `string`                  | `undefined` |
| `componentProps`   | --                 | Props of component that will be lazy loaded                                                                                                                                                         | `{ [key: string]: any; }` | `{}`        |
| `eventValue`       | `event-value`      | Value of event that will be thrown while lazy loading                                                                                                                                               | `string`                  | `undefined` |
| `margin`           | `margin`           | Determines how far from the viewport lazy loading starts. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).  The values can be percentages | `string`                  | `undefined` |


## Events

| Event    | Description                                                                                  | Type                |
| -------- | -------------------------------------------------------------------------------------------- | ------------------- |
| `loaded` | Event that will be thrown while lazy loading. Will be thrown only if `eventValue` was passed | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
