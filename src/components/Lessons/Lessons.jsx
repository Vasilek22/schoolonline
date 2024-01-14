import React, { useState, useEffect } from 'react';
import style from './lessons.module.css';
import Navbar from './Navbar/Navbar';
import Content from './Content/Content';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Lessons() {
  const [selectedNavItem, setSelectedNavItem] = useState('');
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists() && userDoc.data().sub === 'Лайт') {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (error) {
        console.error('Ошибка при проверке подписки:', error.message);
      }
    };

    if (auth.currentUser) {
      checkSubscription();
    }
  }, [auth.currentUser]);

  const handleNavItemSelect = (item) => {
    setSelectedNavItem(item);
  };

  return (
    <div className={style.lessons}>
      {hasSubscription ? (
        <>
          <Navbar onNavItemSelect={handleNavItemSelect} />
          <Content selectedNavItem={selectedNavItem} />
        </>
      ) : (
        <div>
          {/* Контент для пользователей без подписки */}
          <h1>Пожалуйста, купите подписку, чтобы получить доступ к урокам.</h1>
        </div>
      )}
    </div>
  );
}
