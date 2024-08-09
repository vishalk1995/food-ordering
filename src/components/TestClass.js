// This is a class based component.
import React from 'react';
class TestClass extends React.Component {
  constructor(props) {
    super(props);
    console.log('test class constructor');
  }

  componentDidMount() {
    console.log('test class componentDidMount');
  }
  render() {
    console.log('test class render');
    return (
      <div>
        <h3>Test</h3>
        <h4>Test</h4>
      </div>
    );
  }
}

export default TestClass;
