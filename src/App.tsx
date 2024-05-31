import React, {useEffect} from 'react';
import './styles/styles.scss';

import {Footer, Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import {userReq} from './hooks/fetchUser';
import ErrorPage from './components/error/ErrorPage';

const App = () => {
  const {tg, user} = UseTg();

  const userGet = async () => {
    localStorage.setItem('userData', '');
    if (user?.id) {
      // const fetchedUserData = await userReq('307777256');
      const fetchedUserData = await userReq(user.id.toString());
      if (fetchedUserData) {
        localStorage.setItem('userData', JSON.stringify(fetchedUserData));
      }

      console.log(fetchedUserData);
    }

  };

  useEffect(() => {
    tg.ready();
    tg.expand();

    userGet();
  }, [tg, user]);

  return (
    <>
      <div className="App">
        <div className=" background">
          <Circles />
        </div>

        {user?.id && tg.platform !== 'tdesktop' ? (
          <>
            <Header />
            <Main />
            <Footer />
          </>
        ) : (
          <>
            <ErrorPage />
          </>
        )}
      </div>

    </>
  );
};

export default App;
