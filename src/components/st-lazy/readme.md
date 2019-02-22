# st-lazy

## Component to lazy load other Stencil components while its scrolled to viewport. 

## Usage
```html
  <st-lazy
    component="my-component"
    componentProps={{ name: 'Lazy Stencil' }}>
  </st-lazy>
```
## Why?
Stencil is lazy loading components by default. It loads only the ones that are actually used on the page. Here we lift it. st-lazy component is using IntersectionObserver to load the component by name only if it is in the viewport. On non supported browsers (IE, Safari) it falls back to setTimeout unless you use polyfill.   

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute   | Description                                 | Type                      | Default     |
| ---------------- | ----------- | ------------------------------------------- | ------------------------- | ----------- |
| `component`      | `component` | Name of component to be lazy loaded         | `string`                  | `undefined` |
| `componentProps` | --          | Props of component that will be lazy loaded | `{ [key: string]: any; }` | `{}`        |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
