import Header from './Header';
import Body from './Body';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserContext from '../utils/UserContext';
import { Provider } from 'react-redux';
import appStore from '../utils/appStore';

const AppLayout = () => {
  // suppose authentication
  const [userName, setUserName] = useState('hello');
  useEffect(() => {
    const data = 'Nishad';
    setUserName(data);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default AppLayout;
