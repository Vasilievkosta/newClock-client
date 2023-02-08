import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderContainer from './components/HeaderContainer';
import AppRouter from './components/AppRouter';

const App = () => {

  return (
    <BrowserRouter>
      <HeaderContainer />
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
