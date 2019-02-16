
export function Lazy(id: string) {
  return (proto, prop) => {
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
          io.observe(document.querySelector(`#${id}`));          
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
