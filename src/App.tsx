import React, {useEffect} from 'react';
import './styles/App.scss';

import {Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';
import Error from './components/error/Error';

const App = () => {
  const {tg, user} = UseTg();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg, user]);

  return (
    <div className="App">
      <div className="background">
        <Circles />
      </div>

      {user?.id && tg.platform !== 'tdesktop' ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        <>
          <Error />
        </>
      )}

    </div>
  );
};

export default App;
