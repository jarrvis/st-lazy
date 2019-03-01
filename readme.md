# st-lazy

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## What is it?
`st-lazy` is a collection of tools (web components) for lazy loading. You can use them everywhere (any framework: React, Angular, Vue etc.) without any dependency (doesn't matter if you use SSR with templating system like JSP or CSR). Beating heart of this library is a [Stencil](https://stenciljs.com/) `@Lazy` decorator that allows you to call component method as the user scrolls component into the viewport. For Stencil devs: `@Lazy` is being exported in this module so you can easily use it in your Stencil projects. On supported browsers (Chrome and chrome based browsers, Firefox and Edge) `st-lazy` uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accomplish this functionality. For Safari and IE it simply falls back to setTimeout unless you use polyfill. Inspired by [st-img](https://github.com/jgw96/st-img)

## Polyfilling
If you want `st-lazy` to work everywhere (also on IE and Safari) use polyfill. You can pop this script tag:
```
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>
```
in index.html and that's it:)
Polyfill is not included in `st-lazy` not to increase the bundle size and to leave the decision to you: either you go with setTimeout fallback or if you prefer, go with polyfill

## Installing
Outside of Stencil world you can use web components. To do that you can either 
- put `st-lazy` as dependency in your package.json and import web component that is relevant for you in your js/ts
- or if outside of npm you can pop this script tag: 
```
<script async defer src='https://unpkg.com/st-lazy@2.1.0/dist/stlazy.js'></script>
``` 
into your index.html
Then you can just use web components in your html/jsx 

In Stencil project, additionaly you can use `@Lazy`, just add `st-lazy` to your package.json:
```
npm i st-lazy
```


# Module contains
- [@Lazy decorator (only for Stencil)](#1-@Lazy)
- [lazy-cmp component](#2-lazy-cmp)
- [lazy-img component](#3-lazy-img)
- [lazy-fetch component](#4-lazy-fetch)



# 1. @Lazy

@Lazy is a decorator that allows you to call component method as the user scrolls component into the viewport.

## How to use it?
It's very simple: you just need to anotate your method with `@Lazy` and it will be called when host component is scrolled to viewport. Method will be called once - the first time you scroll to component. Additionally you need to pass host's `@Element`. You can do it in two ways:

Option 1: passing host element with `@LazyHost`
```javascript

import { Component, Element } from '@stencil/core';
import { Lazy, LazyHost } from 'st-lazy';

@Component({ tag: 'lazy-component', shadow: true })
export class LazyComponent {

  @LazyHost() @Element() host;

  @Lazy()
  someMethod() { console.log("someMethod was called because user scrolled to LazyComponent"); }

  render() { return <div>Hello, World!</div>; }
}
```

Option 2: passing host element manually
```javascript

import { Component, Element } from '@stencil/core';
import { Lazy } from 'st-lazy';

@Component({ tag: 'lazy-component', shadow: true })
export class LazyComponent {

  @Element() host;

  @Lazy({ hostProperty: "host" })
  someMethod() { console.log("someMethod was called because user scrolled to LazyComponent"); }

  render() { return <div>Hello, World!</div>; }
}
```
## Margin
You can also set margin for `@Lazy`. It determines how far from the viewport lazy loading starts. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages.
```javascript
  @Lazy({ margin: "50%" })
  someMethod() { console.log("someMethod was called because user scrolled to margin of LazyComponent extended by 50%"); }
```
or if you want to have it dynamic (as web component `@Prop`)
```javascript
  @LazyMargin() @Prop() margin?: string;
```
All web components here have optional `margin` prop.

## When use it?
Basically you can think of every action that you would normally do with the load of the page/component. Maybe some of those actions are time consuming, generating not needed network traffic and not giving any benefit to most of users? Good example is calling an API to get data to be presented by component. Maybe most of users are not even checking some forgotten carousel on the bottom of every page in your app? Or you need an easy way to implement a listing page with *infinie* scrolling?

## Example
Following component
```javascript
import { Component, State, Element } from '@stencil/core';
import { Lazy, LazyHost } from 'st-lazy';


@Component({
    tag: 'test-st-lazy'
})
export class TestStLazy {
    @State() name: string;
    @LazyHost() @Element() host;

    @Lazy()
    getName() {
        console.log("fetching user data...");
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/users/1")
                .then(res => res.json())
                .then(data => {
                    this.name = data.name
                    console.log(this.name);
                })
          }, 300);
    }
    

    render() {
        return (
            <div><p>Hello {this.name}</p></div>
        );
    }
}
```
...on the page
```html
<body>
    <div style="height: 1000px"></div>
    <test-st-lazy></test-st-lazy>
</body>
```
gives

![lazy api call](https://j.gifs.com/oVYVwB.gif)

# 2. lazy-cmp

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jarrvis/lazy-cmp)

`lazy-cmp` is a web component to lazy load other components while its scrolled to viewport.
Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/lazy-cmp)

## Why?
Stencil (and also some other web components compilers or frameworks) is lazy loading components by default. It loads only the ones that are actually used on the page not to add not needed js to be evaluated by the browser. Here we lift it. `lazy-cmp` component is using IntersectionObserver to load the component by name only if it is in the viewport. It means no html will be rendered by the browser and no js will be evaluated until you actually scroll to `lazy-cmp`. Then you dynamically render your component, it can have a complicated view, it can call the API to initialize... Great way to optimize your page, perfect for infinite scroll pages. On non supported browsers (IE, Safari) it falls back to setTimeout unless you use polyfill. 

## Example
having a simple component
```javascript
import { Component } from '@stencil/core';

@Component({
    tag: 'my-component'
})
export class MyComponent {
    @Prop() name: string;
    @Prop() surname: string;

    componentWillLoad() {
        console.log('The MyComponent is about to be rendered');
    }

    componentDidLoad() {
        console.log('The MyComponent has been rendered');
    }
    
    render() {
        return (
            <div><p>Was I lazy loaded with lazy-cmp?</p></div>
        );
    }
}

```
and page

```html
<body>
    <div style="height: 1000px"></div>
    <lazy-cmp
        component="my-component">
    </lazy-cmp>
</body>
```
gives

![lazy component load](https://j.gifs.com/2xRYEP.gif)

As you see component is not loaded untill it's scrolled onto viewport. Then full component lifecycle runs.

## How to pass props to component?

Option 1: In JSX you can pass `componentProps` key/value object to lazy-cmp   
```html
  <lazy-cmp
    component="my-component"
    componentProps={{ name: 'Lazy', surname: 'Stencil' }}>
  </lazy-cmp>
```
Option 2: In html you can pass `component-prop-?` attributes to lazy-cmp
```html
  <lazy-cmp
    component="my-component"
    component-prop-name='Lazy'
    component-prop-surname='Stencil'>
  </lazy-cmp>
```
or optionally you can pass the componentProps over javascript:
```javascript
document.querySelector('lazy-cmp').componentProps = { name: 'Lazy', surname: 'Stencil' }
```
## I just want to use lazy-cmp to be notifed about scrolling to some html
Sure just react on the event that lazy-cmp will throw. Will only be thrown if you pass `event-value` attribute
```html
  <lazy-cmp
    event-value="contentId">
    some html...
  </lazy-cmp>
```
# 3. lazy-img

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jarrvis/lazy-img)

`lazy-img` is a web component to lazy load image while its scrolled to viewport.
Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/lazy-img)

## Example
```html
<body>
    <div style="height: 1000px"></div>
    <lazy-img
        src="https://stenciljs.com/assets/img/logo.png"
        fallback-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5VWGwI_ToYUkeZjAxP16jZB94Yzus4Q5YErjzzB2C44rWKwL7"
        alt="Lazy image">
    </lazy-img>
</body>
```

gives

![lazy image load](https://j.gifs.com/NLxMyK.gif)


# 4. lazy-fetch

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jarrvis/lazy-fetch)

`lazy-fetch` is a web component to make lazy API calls. Request is done after component is scrolled into viewport. You can set url, headers, http method and body over component params. Response will be given over events: either `resolved` or `error`. Take a look at [API](https://github.com/jarrvis/st-lazy/tree/master/src/components/lazy-fetch). You can also check [stencil-fetch](https://github.com/Fdom92/stencil-fetch) as `lazy-fetch` is based on it. 


## Example
```html
<body>
    <div style="height: 1000px"></div>
    <lazy-fetch
        url="https://jsonplaceholder.typicode.com/users/1">
    </lazy-fetch>
</body>
```

gives

![lazy fetch](https://j.gifs.com/xnGB4l.gif)

## How to pass headers?

In html you can use `header-?` attribute
```html
  <lazy-fetch
    url="https://jsonplaceholder.typicode.com/users/1"
    header-keyid='authorization key'
    >
  </lazy-fetch>
```