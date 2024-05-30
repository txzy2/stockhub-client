import React, {useEffect} from 'react';
import './styles/styles.scss';

import {Footer, Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';

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

      {/*{user?.id && tg.platform !== 'tdesktop' ? (*/}
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
      {/*) : (*/}
      {/*  <>*/}
      {/*    <ErrorPage />*/}
      {/*  </>*/}
      {/*)}*/}
    </>
  );
};

export default App;
