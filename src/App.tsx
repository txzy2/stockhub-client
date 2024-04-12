import React, {useEffect} from 'react';
import './App.scss';

import {Header, Main} from './components';
import Circles from './components/ui/Circles';
import {UseTg} from './hooks/useTg';

const App = () => {
  const {tg} = UseTg();
  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg]);

  return (
    <div className='App'>
      <div className='background'>
        <Circles />
      </div>
      <Header />
      <Main />
    </div>
  );
};

export default App;
