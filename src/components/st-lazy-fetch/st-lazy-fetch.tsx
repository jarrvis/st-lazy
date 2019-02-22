import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { Lazy, LazyHost } from '../../utils/utils';

/**
 * Component to make lazy API calls. Request is done after component is scrolled into viewport 
 */
@Component({
    tag: 'st-lazy-fetch'
})
export class StLazyFetch {
    /**
     * Request headers  
     */
    @Prop() headers     : Headers = new Headers();
    /**
     * Http requst type: GET, POST, PUT, DELETE, PATCH  
     */
    @Prop() method      : string  = 'GET';
    /**
     * Request url
     */
    @Prop() url         : string  = '';
  
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
