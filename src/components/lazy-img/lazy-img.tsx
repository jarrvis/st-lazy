import { Component, Prop, State, Element } from '@stencil/core';
import { Lazy, LazyHost, LazyMargin } from '../../utils/utils';

/**
 * Component to lazy load images while its scrolled to viewport. 
 */
@Component({
    tag: 'lazy-img'
})
export class LazyImg {

    /**
     * Source url of image to be lazy loaded  
     */
    @Prop() src: string;

    /**
     * Alternate text to be shown in case image cannot be displayed 
     */
    @Prop() alt: string;

    /**
     * Source url of image to be shown in case error while loading src url
     */
    @Prop() fallbackSrc: string;

    /**
     * Determines how far from the viewport lazy loading starts.
     * Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). 
     * The values can be percentages
     */
    @LazyMargin() @Prop() margin?: string;
  
    @State() oldSrc: string;
    
    @LazyHost() @Element() el;
    
    imgEl: HTMLImageElement

    @Lazy()
    handleImage() {
        this.imgEl.setAttribute('src', this.imgEl.getAttribute('data-src'));
        this.imgEl.onload = () => {
          this.imgEl.removeAttribute('data-src');
        };
    }

    componentDidLoad() {}

    render() {
        return (
            <img data-src={this.src} 
                 alt={this.alt} 
                 onError={() => this.imgEl.src = this.fallbackSrc } 
                 ref={imgEl => this.imgEl = imgEl }>
            </img>
          );
    }
}
