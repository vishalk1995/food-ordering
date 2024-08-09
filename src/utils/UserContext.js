import { createContext } from 'react';

const UserContext = createContext({
  loggedInUser: 'No Logged in user',
});

export default UserContext;
