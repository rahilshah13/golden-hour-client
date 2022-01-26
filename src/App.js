import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<p>ligma balls</p>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;