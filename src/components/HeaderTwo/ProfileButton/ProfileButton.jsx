import React, { useState, useEffect } from 'react';
import style from './profileButton.module.css';
import gl from './gl.svg';
import profile from './profile.svg';
import wallet from './wallet.svg';
import darts from './darts.svg';
import exit from './exit.svg';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

export default function ProfileButton() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          setUserData({
            firstName: userDoc.data().firstName,
            lastName: userDoc.data().lastName,
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

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (!event.target.closest(`.${style.profileButton}`)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleWindowClick);

    return () => {
      document.removeEventListener('click', handleWindowClick);
    };
  }, []);

  useEffect(() => {
    // Listen for changes in user data
    const userId = auth.currentUser.uid;
    const unsubscribe = onSnapshot(doc(db, 'users', userId), (snapshot) => {
      if (snapshot.exists()) {
        setUserData({
          firstName: snapshot.data().firstName,
          lastName: snapshot.data().lastName,
        });
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array ensures it only runs once

  const handleProfileClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className={style.profileButton} onClick={handleProfileClick}>
      <div className={style.profileContainer}>
        <img
          src="https://pristor.ru/wp-content/uploads/2023/06/Красивые-картинки-на-аву-тян-за-2023-год-19.jpg"
          alt=""
          className={style.profileImg}
        />
        <img src={gl} alt="" className={style.profileSvg} />
      </div>
      {isDropdownVisible && (
        <div className={style.dropdownContent}>
          <div className={style.dropdownInfo}>
            <img
              className={style.dropdownImg}
              src="https://pristor.ru/wp-content/uploads/2023/06/Красивые-картинки-на-аву-тян-за-2023-год-19.jpg"
              alt=""
            />
            <div className={style.dropdownName}>
              <p>{userData && `${userData.firstName} ${userData.lastName}`}</p>
            </div>
          </div>
          <div className={style.profileItems}>
            <Link to="/profile" className={style.profileItem}>
              <img className={style.itemImg} src={profile} alt="" />
              <p to="/profile" className={style.itemLink}>
                Профиль
              </p>
            </Link>
            <Link className={style.profileItem}>
              <img className={style.itemImg} src={darts} alt="" />
              <p className={style.itemLink}>Цели</p>
            </Link>
            <Link className={style.profileItem}>
              <img className={style.itemImg} src={wallet} alt="" />
              <p className={style.itemLink}>Подписка</p>
            </Link>
          </div>
          <div className={style.profileItemExit} onClick={handleLogout}>
            <div className={style.profileExit}>
              <img className={style.itemImg} src={exit} alt="" />
              <p className={style.itemLink}>Выйти</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
