import React, {useEffect} from 'react';
import './styles/styles.scss';

import {Footer, Header, Main} from './components';
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
    <>
      <div className="background">
        <Circles />
      </div>


      <div className="App">
        {user?.id && tg.platform !== 'tdesktop' ? (
          <>
            <Header />
            <Main />
            <Footer /></>

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
