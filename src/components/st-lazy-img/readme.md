# st-lazy-img

## Component to lazy load image while its scrolled to viewport. 

## Usage
```html
    <st-lazy-img
        src="https://stenciljs.com/assets/img/logo.png"
        fallback-src="/some/fallback/img/url"
        alt="Lazy image">
    </st-lazy-img>
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                         | Type     | Default     |
| ------------- | -------------- | ------------------------------------------------------------------- | -------- | ----------- |
| `alt`         | `alt`          | Alternate text to be shown in case image cannot be displayed        | `string` | `undefined` |
| `fallbackSrc` | `fallback-src` | Source url of image to be shown in case error while loading src url | `string` | `undefined` |
| `src`         | `src`          | Source url of image to be lazy loaded                               | `string` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
