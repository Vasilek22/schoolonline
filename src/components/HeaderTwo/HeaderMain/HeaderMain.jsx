import React, { useState, useEffect } from 'react';
import style from './headerMain.module.css';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import { auth, db } from '../../../firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';

export default function HeaderMain() {
  const [hasSubscription, setHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const unsubscribe = onSnapshot(doc(collection(db, 'users'), userId), (snapshot) => {
        if (snapshot.exists() && snapshot.data().sub === 'Лайт') {
          setHasSubscription(true);
          setLoading(false);
        } else {
          setLoading(false);
          setHasSubscription(false);
        }
      });

      // Отписываемся от подписки при размонтировании компонента
      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <header className={style.header}>
      {loading && (
          <div className={style.loadingOverlay}>
            <div className={style.loadingSpinner}></div>
          </div>
        )}  
      <div className={style.container}>
        <div className={style.logo}>YourLogo</div>
        <nav className={style.menu}>
          <Link className={style.menuLink} to="/main">
            Главная
          </Link>
          <Link className={style.menuLink} to="/lessons">
            Обучариум
          </Link>
          <Link className={style.menuLink} to="/trainer">
            Тренажер
          </Link>
        </nav>

        <div className={style.info}>
          {hasSubscription ? null : (
            <Link className={style.linkBuy} to="/subscription">
              Купить подписку
            </Link>
          )}
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
