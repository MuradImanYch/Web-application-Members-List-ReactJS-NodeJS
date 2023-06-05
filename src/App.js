import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import cookies from 'js-cookie';

import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Profile from './components/Profile/Profile';
import UserData from './components/UserData/UserData';
import FindByDepartment from './components/FindByDepartment/FindByDepartment';
import ForgotPsw from './components/ForgotPsw/ForgotPsw';

const App = () => {
  const[token, setToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(cookies.get('auth')) {
      setToken(cookies.get('auth'));
    }

    if(!token) {
      navigate('/');
    }

    if(token) {
      if(location.pathname === '/') {
        navigate('/search');
      }
    }
}, [token]);

  return (
    <div>
      <Header />
      <div className='container'>
            <Routes>
                <Route path='/' element={<Auth />} />
                {cookies.get('auth') && <Route path='/search' element={<Search />} />}
                {cookies.get('auth') && <Route path='/profile' element={<Profile />} />}
                {cookies.get('auth') && <Route path='/user-data/:id' element={<UserData />} />}
                {cookies.get('auth') && <Route path='/find-by-department' element={<FindByDepartment />} />}
                <Route path='/forgot-password' element={<ForgotPsw />} />
            </Routes>
        </div>
    </div>
  );
};

export default App;