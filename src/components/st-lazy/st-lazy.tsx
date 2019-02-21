import { Component, Prop, State, Element } from '@stencil/core';
import { Lazy, LazyHost } from '../../utils/utils';

/**
 * Component to lazy load other Stencil components while its scrolled to viewport. 
 */
@Component({
    tag: 'st-lazy'
})
export class StLazy {

    /**
     * Name of component to be lazy loaded 
     */
    @Prop() component?: string;

    /**
     * Props of component that will be lazy loaded
     */
    @Prop() componentProps?: { [key: string]: any } = {};

    @State() rendered: boolean = false;
    @LazyHost() @Element() el;

    @Lazy()
    loadComponent() {
        if (this.component) {
            this.rendered = true;
        }
    }

    render() {
        if(this.rendered) {
            return (
              <this.component {...this.componentProps}/>
            );
        }
    }
}
