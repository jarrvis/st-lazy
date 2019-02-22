import { Component, Prop, State, Element } from '@stencil/core';
import { Lazy, LazyHost } from '../../utils/utils';

/**
 * Component to lazy load images while its scrolled to viewport. 
 */
@Component({
    tag: 'st-lazy-img'
})
export class StLazyImg {
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
