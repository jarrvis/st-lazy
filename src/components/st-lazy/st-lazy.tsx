import { Component, Prop, State, Element, Event, EventEmitter } from '@stencil/core';
import { Lazy, LazyHost, LazyMargin } from '../../utils/utils';

const COMPONENT_PROP_ATTR = 'component-prop-';
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
    @Prop({mutable: true}) componentProps?: { [key: string]: any } = {};

    /**
     * Prop of component to be lazy loaded 
     */
    @Prop() 'component-prop-?'?: string;
    
    /**
     * Value of event that will be thrown while lazy loading
     */
    @Prop() eventValue?: string;

    /**
     * Determines how far from the viewport lazy loading starts.
     * Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). 
     * The values can be percentages
     */
    @LazyMargin() @Prop() margin?: string;

    /**
     * Event that will be thrown while lazy loading. Will be thrown only if `eventValue` was passed
     */
    @Event() loaded: EventEmitter;

    @State() rendered: boolean = false;

    @LazyHost() @Element() el;


    componentWillLoad() {
        [...this.el.attributes]
            .filter(attr => attr.name.startsWith(COMPONENT_PROP_ATTR))
            .map(prop => {
                const name = prop.name.replace(COMPONENT_PROP_ATTR, '');
                this.componentProps[name] = prop.value
            })
    }

    componentDidLoad() {}

    @Lazy()
    loadComponent() {
        if (this.component) {
            this.rendered = true;
        }
        return this.eventValue && this.loaded.emit(this.eventValue);
    }

    render() {
        if(this.rendered) {
            return (
              <this.component {...this.componentProps}/>
            );
        }
    }
}
