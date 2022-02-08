import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Redirect} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {

  const [isAuthenticated, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <div>
          <Header isAuthenticated={isAuthenticated}  setAuth={setAuth} />
        </div>
        <div>
          <Routes>
            <Route path="/" element={ <Home isAuthenticated={isAuthenticated} setAuth={setAuth} /> }/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;