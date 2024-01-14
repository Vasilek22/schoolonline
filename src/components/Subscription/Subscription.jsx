import React, { useState, useEffect } from 'react';
import style from './subscription.module.css';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const subjectsPrices = {
  'Математика': {
    1: 450,
    2: 200,
  },
  'Обществознание': {
    1: 450,
    2: 200,
  },
  'Русский язык': {
    1: 450,
    2: 200,
  },
};

const tariffNames = {
  1: 'Про',
  2: 'Лайт',
};

export default function Subscription() {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTariff, setSelectedTariff] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the current user's ID
        const userId = auth.currentUser.uid;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
          // If user document exists, update the state with user data
          setPhoneNumber(userDoc.data().phoneNumber || ''); // Если нет номера, установите пустую строку
        } else {
          // If user document doesn't exist, set userData to default values or handle accordingly
          setPhoneNumber('');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (auth.currentUser) {
      fetchUserData();
    }
  }, [auth.currentUser]);

  const handleSubjectClick = (subject) => {
    setSelectedSubjects((prevSelectedSubjects) =>
      prevSelectedSubjects.includes(subject)
        ? prevSelectedSubjects.filter((selectedSubject) => selectedSubject !== subject)
        : [...prevSelectedSubjects, subject]
    );
  };

  const handleTariffClick = (tariff) => {
    setSelectedTariff(tariff);
  };

  useEffect(() => {
    const subjectsTotalPrice = selectedSubjects.reduce(
      (acc, subject) => acc + subjectsPrices[subject][selectedTariff],
      0
    );

    setTotalPrice(subjectsTotalPrice);
  }, [selectedSubjects, selectedTariff]);

  return (
    <div className={style.container}>
      <div className={style.subscription}>
        <div className={style.subscriptionLeft}>
          <div className={style.subscriptionBlockOne}>
            <h1 className={style.subscriptionBlockTitle}>Выбери предметы</h1>
            <p className={style.subscriptionBlockDesc}>Цена зависит от количества предметов</p>
            <div className={style.subscriptionBlockOneItems}>
              {Object.keys(subjectsPrices).map((subject) => (
                <p
                  key={subject}
                  className={`${style.subscriptionBlockOneItem} ${
                    selectedSubjects.includes(subject) ? style.selected : ''
                  }`}
                  onClick={() => handleSubjectClick(subject)}
                >
                  {subject}
                </p>
              ))}
            </div>
          </div>

          <div className={style.subscriptionBlockTwo}>
            <h1 className={style.subscriptionBlockTitle}>Выбери тариф</h1>
            <p className={style.subscriptionBlockDesc}>Баллы учеников тарифа Про на 26% выше</p>
            <div className={style.subscriptionBlockTwoItems}>
              <div
                className={`${style.subscriptionBlockTwoItem} ${
                  selectedTariff === 1 ? style.selectedRate : ''
                }`}
                onClick={() => handleTariffClick(1)}
              >
                <div className={style.subscriptionBlockTwoItemInfo}>
                  <p className={style.subscriptionBlockTwoItemTitle}>{tariffNames[1]}</p>
                  <p className={`${style.subscriptionBlockTwoItemMark} ${
                    selectedTariff === 1 ? style.selectedMark : ''
                  }`}></p>
                </div>
                <p className={style.subscriptionBlockTwoItemText}>450 ₽ с проверкой дз</p>
              </div>
              <div
                className={`${style.subscriptionBlockTwoItem} ${
                  selectedTariff === 2 ? style.selectedRate : ''
                }`}
                onClick={() => handleTariffClick(2)}
              >
                <div className={style.subscriptionBlockTwoItemInfo}>
                  <p className={style.subscriptionBlockTwoItemTitle}>{tariffNames[2]}</p>
                  <p className={`${style.subscriptionBlockTwoItemMark} ${
                    selectedTariff === 2 ? style.selectedMark : ''
                  }`}></p>
                </div>
                <p className={style.subscriptionBlockTwoItemText}>200 ₽ без проверки дз</p>
              </div>
            </div>
          </div>

          <div className={style.subscriptionBlockThree}>
            <h1 className={style.subscriptionBlockTitle}>Укажи контакты для связи</h1>
            <p className={style.subscriptionBlockThreeText}>Номер телефона</p>
            <input
                className={style.subscriptionBlockThreeInput}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>

        <div className={style.subscriptionRight}>
          <div className={style.subscriptionBlockPayment}>
            <h1 className={style.subscriptionBlockTitle}>Оплата</h1>
            <div className={style.subscriptionBlockPaymentInfos}>
              <div className={style.subscriptionBlockPaymentInfo}>
                <p className={style.subscriptionBlockPaymentInfoText}>
                  <b className={style.strong}>Тариф:</b>
                </p>
                {selectedTariff && (
                  <>
                    <p className={style.subscriptionBlockPaymentInfoPoint}></p>
                    <p className={style.subscriptionBlockPaymentRate}>{tariffNames[selectedTariff]}</p>
                  </>
                )}
              </div>
              {selectedTariff && (
                <div className={style.subscriptionBlockPaymentInfo}>
                  <p className={style.subscriptionBlockPaymentInfoText}>Итого:</p>
                  <p className={style.subscriptionBlockPaymentInfoPoint}></p>
                  <p className={style.subscriptionBlockPaymentInfoPrice}>{totalPrice} ₽</p>
                </div>
              )}
            </div>
            <Link to='/buypodpiska' className={style.subscriptionBlockPaymentBtn}>Купить</Link>
            <div className={style.subscriptionBlockPaymentBottomInfo}>
              <p className={style.subscriptionBlockPaymentDesc}>Оплачивая подписку, ты принимаешь</p>
              <Link className={style.subscriptionBlockPaymentLink}>договор-оферту</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
