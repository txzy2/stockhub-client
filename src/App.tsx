import React, {useEffect} from 'react';
import './styles/styles.scss';

import {Header, Main, Footer} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import ErrorPage from './components/error/ErrorPage';

const App = () => {
  const {tg, user} = UseTg();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className='App'>
      <div className='background'>
        <Circles />
      </div>

      {/* {user?.id && tg.platform !== 'tdesktop' ? ( */}
      <>
        <Header />
        <Main />
      </>
      {/* ) : (
        <>
          <ErrorPage />
        </>
      )} */}
    </div>
  );
};

export default App;
