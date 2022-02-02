import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SwipePage from './components/SwipePage';

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/" element={ <Home /> }/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;