import React, { useEffect, useState } from 'react';
import style from './register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        // Redirect to the main dashboard if the user is already authenticated
        navigate('/main');
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
  
      // Используйте firestore.collection
      const usersCollection = collection(db, 'users');
      const userDoc = doc(usersCollection, userId);
      
      // Используйте setDoc для добавления данных в документ
      await setDoc(userDoc, {
        firstName,
        lastName,
        phoneNumber,
      });
  
      // Успешная регистрация
    } catch (error) {
      console.error(error.message);
      // Обработка ошибок регистрации
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
          <h1 className={style.title}>Регистрация</h1>
          <p className={style.desc}>Авторизуйся, чтобы начать заниматься</p>
        </div>
        <form className={style.form} onSubmit={handleRegister}>
          <input
            className={style.formInput}
            type="text"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className={style.formInput}
            type="text"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className={style.formInput}
            type="email"
            placeholder="Почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={style.formInput}
            type="tel"
            placeholder="+7 (999) 999 99 99"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className={style.formInput}
            type="password"
            placeholder="Пароль (не менее 6 символов)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={style.formBtn}>
            <button className={style.btn} type="submit">
              Зарегистрироваться
            </button>
          </div>
          <div className={style.bottomDesc}>
            <p className={style.descText}>Есть аккаунт?</p>
            <Link className={style.descLink} to="/login">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
