import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import HeaderMain from "./components/HeaderTwo/HeaderMain/HeaderMain";
import Header from "./components/Header/Header";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import style from './app.module.css'
import Lessons from "./components/Lessons/Lessons";
import './App.css'
import Trainer from "./components/Trainer/Trainer";
import Subscription from "./components/Subscription/Subscription";
import Buy from "./components/Buy";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Подписываемся на изменения в состоянии аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once user data is fetched
    });

    // Отписываемся при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const showHeader = user && location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className="App">
      {loading && (
          <div className={style.loadingOverlay}>
            <div className={style.loadingSpinner}></div>
          </div>
        )}  
      {showHeader && user ? <HeaderMain /> : null}
      {showHeader && !user ? <Header /> : null}
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='/main' element={<Main/>} />
          <Route path='/lessons' element={<Lessons/>} />
          <Route path='/trainer' element={<Trainer/>} />

          <Route path='/subscription' element={<Subscription/>} />
          <Route path='/profile' element={<Profile/>} />

          <Route path='/buypodpiska' element={<Buy/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
