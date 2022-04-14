import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import AdminPanel from './components/Admin/AdminPanel';

const App = () => {

  const [isAuthenticated, setAuth] = useState(false);
  async function isAdmin() {
    const url = process.env.REACT_APP_API_ENDPOINT || 'localhost:5000/api/isAdmin';
    let token = localStorage.getItem("token");
    console.log("LIGMA BALLS");
    if (!token)
      return false;

    const res = await fetch(url, {body: {"tokenId": token}});
    return res.status === 200;
  };

  return (
    <BrowserRouter>
      <div>
        <div>
          <Header isAuthenticated={isAuthenticated}  setAuth={setAuth} />
        </div>
        <div>
          <Routes>
            <Route path="/" element={ <Home isAuthenticated={isAuthenticated} setAuth={setAuth} /> }/>
            <Route exact path="/admin" element=
                { isAdmin ? <AdminPanel /> : <Navigate to="/" /> }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;