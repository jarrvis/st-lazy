/**
 * Call this function as soon as the element is inside the viewport.
 * @param hostProperty Optionally provide the name of the `@Element()` property. Alternatively add `@LazyHost()`.
 * @example
```
@LazyHost() @Element() host;
@Lazy()
lazyCallback() {
  // this will run when element is inside the viewport.
}
```
 * @example
```
@Element() theHost;
@Lazy("theHost")
lazyCallback() {
  // this will run when element is inside the viewport.
}
```
 */
export function Lazy(hostProperty?: string) {
  return (proto: any, prop: any) => {
    if (!hostProperty && !proto["__lazyHost"]) {
      throw new Error("@Lazy() decorator requires either a @LazyHost(), or a `hostProperty` argument that matches the name of the `@Element()` property.");
    } else if (!hostProperty) {
      hostProperty = proto["__lazyHost"];
    }

    const { componentDidLoad } = proto;
      proto.componentDidLoad = function () {
        if ('IntersectionObserver' in window) {
          let io = new IntersectionObserver((data: any) => {
            if (data[0].isIntersecting) {
              this[prop].apply(this);
              io.disconnect();
              io = null;
            }
          });
          io.observe(this[hostProperty]);
        }
        else {
          // fall back to setTimeout for Safari and IE
          setTimeout(() => {
            this[prop].apply(this);
          }, 300);
        }

        return componentDidLoad.apply(this);
      };
  };
}

/** Use on @Element. */
export function LazyHost() {
  return (proto: any, prop: any) => {
    proto.__lazyHost = prop;
  }
}