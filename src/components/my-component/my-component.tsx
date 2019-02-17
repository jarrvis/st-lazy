import { Component, Element } from '@stencil/core';
import { Lazy, LazyHost } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
   
  @LazyHost() @Element() host;

  @Lazy()
  testLazy() {
    console.log("lazy method called");
  }

  componentWillLoad() {
    console.log('The component is about to be rendered');
  }

  componentDidLoad() {
    console.log('The component has been rendered');
  }

  render() {
    return <div>Hello, World!</div>;
  }
}
