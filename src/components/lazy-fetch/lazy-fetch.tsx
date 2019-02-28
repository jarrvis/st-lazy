import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { Lazy, LazyHost, LazyMargin } from '../../utils/utils';

/**
 * Component to make lazy API calls. Request is done after component is scrolled into viewport 
 */
@Component({
    tag: 'lazy-fetch'
})
export class LazyFetch {

    /**
     * Request url
     */
    @Prop() url: string  = '';

    /**
     * Request headers  
     */
    @Prop() headers?: Headers = new Headers();

    /**
     * Http requst type: GET, POST, PUT, DELETE, PATCH  
     */
    @Prop() method?: string  = 'GET';

    /**
     * Determines how far from the viewport lazy loading starts.
     * Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). 
     * The values can be percentages
     */
    @LazyMargin() @Prop() margin?: string;
  
    /**
     * Thrown as a succesfull request callback. Carries response object 
     */
    @Event() resolved : EventEmitter;
    /**
     * Thrown as a failed request callback. Carries response object 
     */
    @Event() error    : EventEmitter;

    @LazyHost() @Element() el;

    request   : Request;

  
    componentDidLoad() {
        let options = {
          method: this.method,
          headers: new Headers(this.headers)
        }; 
        this.request = new Request(this.url, options);
    }
  
    @Lazy()
    makeRequest () {
        fetch(this.request)
            .then(response => this.resolved.emit(response))
            .catch(err => this.error.emit(err));
    }
  
    render() {
        return;
    }
}
