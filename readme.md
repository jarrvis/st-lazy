# st-lazy

![Built For Stencil](https://img.shields.io/badge/-Built%20For%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)


## What is it?
st-lazy is [Stencil](https://stenciljs.com/) decorator that allows you to call component method as the user scrolls component into the viewport. On supported browsers (Chrome and chrome based browsers, Firefox and Edge) it uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accomplish this functionality. For Safari and IE it simply falls back to setTimeout. Inspired by [st-img](https://github.com/jgw96/st-img)

## Installing
Just add module to your Stencil project package.json:
```
npm i st-lazy
```

## How to use it?
It's very simple: you just need to anotate your method with @Lazy and it will be called when host component is scrolled to viewport. Method will be called once - the first time you scroll to component. Additionally you need to pass host's @Element. You can do it in two ways:

Option 1: passing host element with @LazyHost
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

  @Lazy("host")
  someMethod() { console.log("someMethod was called because user scrolled to LazyComponent"); }

  render() { return <div>Hello, World!</div>; }
}
```

## When use it?
Basically you can think of every action that you would normally do in componentWillLoad. Maybe some of those actions are time consuming, generating not needed network traffic and not giving any benefit to most of users? Good example is calling an API to get data to be presented by component. Maybe most of users are not even checking some forgotten carousel on the bottom of every page in your app?

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

## See also
[lazy-fetch](https://github.com/jarrvis/lazy-fetch)