import { Component, Method } from '@stencil/core';
import { Lazy } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {

  @Lazy("test")
  @Method()
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
    return <div id="test">Hello, World!</div>;
  }
}
