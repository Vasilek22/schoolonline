import React, { useState, useEffect } from 'react';
import style from './profile.module.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Profile() {
    const [userData, setUserData] = useState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
    });
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tariff, setTariff] = useState('');
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          // Get the current user's ID
          const userId = auth.currentUser.uid;
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', userId));
  
          if (userDoc.exists()) {
            // If user document exists, update the state with user data
            setUserData(userDoc.data());
            setTariff(userDoc.data().sub || ''); // Set tariff if available
          } else {
            // If user document doesn't exist, set userData to default values or handle accordingly
            setUserData({
              firstName: '',
              lastName: '',
              phoneNumber: '',
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      };
  
      if (auth.currentUser) {
        fetchUserData();
      }
    }, [auth.currentUser]);
  
    const handleFirstNameChange = (e) => {
      setUserData((prevData) => ({
        ...prevData,
        firstName: e.target.value,
      }));
    };
  
    const handleLastNameChange = (e) => {
      setUserData((prevData) => ({
        ...prevData,
        lastName: e.target.value,
      }));
    };
  
    const handleSaveButtonClick = async () => {
      try {
        setLoading(true);
  
        // Validate input fields
        if (!userData.firstName || !userData.lastName) {
          setError('Пожалуйста, заполните все поля.');
          return;
        }
  
        // Clear any previous errors
        setError('');
  
        // Get the current user's ID
        const userId = auth.currentUser.uid;
  
        // Update the user document in Firestore
        await updateDoc(doc(db, 'users', userId), {
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
  
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className={style.profile}>
      <div className={style.profileBlockOne}>
        <div className={style.blockTitle}>
          <h1 className={style.title}>Личная Информация</h1>
        </div>
        <div className={style.BlockOneInfo}>
          <div className={style.BlockOneInfoContacts}>
            <img
              className={style.BlockOneInfoImg}
              src="https://pristor.ru/wp-content/uploads/2023/06/Красивые-картинки-на-аву-тян-за-2023-год-19.jpg"
              alt=""
            />
            <div className={style.BlockOneInfoDesc}>
              <div className={style.BlockOneDescEmail}>
                <p className={style.emailName}>Почта:</p>
                <p className={style.emailDesc}>{auth.currentUser?.email || 'N/A'}</p>
              </div>
              <div className={style.BlockOneDescPhone}>
                <p className={style.phoneName}>Номер:</p>
                <p className={style.phoneDesc}>{userData?.phoneNumber || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className={style.BlockOneInfoName}>
            <div className={style.nameOne}>
              <h3 className={style.nameOneTitle}>Имя</h3>
              <input
                className={style.nameOneInput}
                type="text"
                value={userData.firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className={style.nameTwo}>
              <h3 className={style.nameTwoTitle}>Фамилия</h3>
              <input
                className={style.nameTwoInput}
                type="text"
                value={userData.lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className={style.nameBtns}>
              <button className={style.nameBtn} onClick={handleSaveButtonClick} disabled={loading}>
                {loading ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
              {error && <p className={style.error}>{error}</p>}
        </div>
      </div>
      <div className={style.profileBlockTwo}>
        <div className={style.blockTwoTitle}>
          <h1 className={style.title}>Подписка</h1>
          {tariff ? (
            <p className={style.podpiska}>Активна</p>
          ) : (
            <p className={style.podpiskaNone}>Нету тарифа</p>
          )}
        </div>
        {tariff && (
          <>
            <div className={style.blockTwoTarif}>
              <p className={style.tarifText}>
                <b>Тариф:</b> {tariff}
              </p>
            </div>
            <div className={style.blockTwoItems}>
              <Link className={style.item}>Русский язык</Link>
              <Link className={style.item}>Обществознание</Link>
              <Link className={style.item}>Математика</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
