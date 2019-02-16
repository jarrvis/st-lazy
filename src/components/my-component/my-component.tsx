import { Component } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css'
})
export class MyComponent {

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
