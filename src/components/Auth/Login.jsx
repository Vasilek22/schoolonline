import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './login.module.css';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Изначально устанавливаем в true для отображения индикатора загрузки

  useEffect(() => {
    // Проверяем, аутентифицирован ли уже пользователь
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Устанавливаем loading в false после проверки состояния аутентификации

      if (user) {
        // Перенаправляем на главную страницу, если пользователь уже аутентифицирован
        navigate('/main');
      }
    });

    // Отменяем подписку при размонтировании компонента
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Устанавливаем loading в true при начале процесса входа
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/main'); // Перенаправляем на главную страницу после успешного входа
    } catch (error) {
      console.error(error.message);
      // Обрабатываем ошибки входа
    } finally {
      setLoading(false); // Устанавливаем loading в false после попытки входа, независимо от успеха или неудачи
    }
  };

  return (
    <div className={style.loginContainer}>

        {loading && (
          <div className={style.loadingOverlay}>
            <div className={style.loadingSpinner}></div>
          </div>
        )}      
        
      {/*<div className={style.squareLeft}>
        <p className={style.LeftImg}></p>
        </div>*/}
        
      <div className={style.squareRight}>
        <div className={style.squareText}>
          <h1 className={style.title}>Вход</h1>
          <p className={style.desc}>Авторизуйся, чтобы начать заниматься</p>
        </div>
        <form className={style.form} onSubmit={handleLogin}>
          <input
            className={style.formInput}
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={style.formInput}
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={style.formBtn}>
            <button className={style.btn} type="submit">
              Войти
            </button>
          </div>
          <div className={style.bottomDesc}>
            <p className={style.descText}>Нет аккаунта?</p>
            <Link className={style.descLink} to="/register">
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

