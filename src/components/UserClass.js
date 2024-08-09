// This is a class based component.
import React from 'react';
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'dummy name',
        location: 'dummy location',
      },
    };
  }

  async componentDidMount() {
    const data = await fetch('https://api.github.com/users/vishalk1995');
    const json = await data.json();
    console.log(json);
    this.setState({ userInfo: json });
  }

  componentDidUpdate() {
    console.log('Component Updated');
  }

  componentWillUnmount() {}

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <img src={avatar_url} />
      </div>
    );
  }
}

export default UserClass;
