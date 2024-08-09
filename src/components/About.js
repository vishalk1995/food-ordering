import UserClass from './UserClass';
import { Component } from 'react';
import UserContext from '../utils/UserContext';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>About (Class based)</h1>
        <UserContext.Consumer>
          {(data) => <h1 className="font-bold">{data.loggedInUser}</h1>}
        </UserContext.Consumer>
        <h2>
          This is just a learning project. Making use of Swiggy API for learning
          purposes.
        </h2>
        <UserClass />
      </div>
    );
  }
}

export default About;
