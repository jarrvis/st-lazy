/**
 * Call this function as soon as the element is inside the viewport.
 * @param hostProperty Optionally provide the name of the `@Element()` property. Alternatively add `@LazyHost()`.
 * @param margin Optionally provide the padding (rootMargin) for IntersectionObserver. Determines how far from the viewport lazy loading starts. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages
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
@Lazy({hostProperty: "theHost"})
lazyCallback() {
  // this will run when element is inside the viewport.
}
```
 * @example
```
@LazyHost() @Element() host;
@Lazy({margin: "100px"})
lazyCallback() {
  // this will run when element is 100px from the viewport.
}
```
 */
export function Lazy(options?: LazyOptions) {
  return (proto: any, prop: any) => {
    if (!options) {
      options = {};
    }

    if (!proto["__lazyHost"] && !options.hostProperty) {
      throw new Error(
        "@Lazy() decorator requires either a @LazyHost(), or a `hostProperty` argument that matches the name of the `@Element()` property."
      );
    } else if (!options.hostProperty) {
      options.hostProperty = proto["__lazyHost"];
    }

    if (proto["__lazyMargin"]) {
      options.margin = proto["__lazyMargin"];
    }


    if (proto["__lazyVisibility"]) {
      options.visibility = proto["__lazyVisibility"];
    }

    const { componentDidLoad } = proto;
    proto.componentDidLoad = function() {
      if ("IntersectionObserver" in window) {
        const margin = getValidMargin(this[options.margin])
        if (!margin) {
          throw new Error(
            "@Lazy() decorator's optional parameter 'margin' is given but not valid. It should be a string like CSS margin property, e.g. '10px 20px 30px 40px'(top, right, bottom, left) or just '10px' (all). The values can be percentages "
          );
        }
        let io = new IntersectionObserver(
          (data: any) => {
            if (!options.visibility) {
              if (data[0].isIntersecting) {
                this[prop].apply(this);
                io.disconnect();
                io = null;
              }
            } else if (options.visibility === "in") {
              if (data[0].isIntersecting) {
                this[prop].apply(this);
              }
            } else if (options.visibility === "out") {
              if (!data[0].isIntersecting) {
                this[prop].apply(this);
              }
            }
          },
          { rootMargin: margin }
        );
        io.observe(this[options.hostProperty]);
      } else {
        // fall back to setTimeout for Safari and IE
        setTimeout(() => {
          this[prop].apply(this);
        }, 300);
      }

      return componentDidLoad && componentDidLoad.apply(this);
    };
  };
}

/** Use on @Element. */
export function LazyHost() {
  return (proto: any, prop: any) => {
    proto.__lazyHost = prop;
  };
}

/** Use on @Prop. */
export function LazyMargin() {
  return (proto: any, prop: any) => {
    proto.__lazyMargin = prop;
  };
}

/**
 * Checs if margin has values like CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages.
 * For empty input string it returns default value '0px'. For not valid input it returns null.
 * @param margin Determines how far from the viewport lazy loading starts
 */
export function getValidMargin(margin): string {
  const marginString = margin || '0px';
  return marginString.split(/\s+/).every((margin) => {
      return /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
    }) ? marginString : null;
}

export interface LazyOptions {
  hostProperty?: string;
  margin?: string;
  visibility?: "in"|"out";
}
