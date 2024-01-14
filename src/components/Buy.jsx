import React from 'react';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Buy() {
    const navigate = useNavigate();

  const handleBuy = async () => {
    try {
      const userId = auth.currentUser.uid;
      const userDocRef = doc(db, 'users', userId);

      await setDoc(userDocRef, { sub: 'Лайт' }, { merge: true });

      console.log('Успешно добавлено в базу данных.');
      navigate('/lessons')
    } catch (error) {
      console.error('Ошибка при добавлении в базу данных:', error.message);
    }
  };

  return (
    <div>
      <h2>Buy</h2>
      <button onClick={handleBuy}>Купить 'Лайт'</button>
    </div>
  );
}
