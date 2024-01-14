import React, { useState, useEffect, useRef } from 'react';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import auth from './auth.svg';
import ob from './ob.png';
import rus from './rus.png';
import math from './math.png';
import molniya from './molniya.svg';

export default function Header() {
  const [isTrainingDropdownOpen, setTrainingDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const trainingDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  const handleTrainingClick = () => {
    setTrainingDropdownOpen(!isTrainingDropdownOpen);
    setServicesDropdownOpen(false); // Закрыть другое окно, если открыто
  };

  const handleServicesClick = () => {
    setServicesDropdownOpen(!isServicesDropdownOpen);
    setTrainingDropdownOpen(false); // Закрыть другое окно, если открыто
  };

  const handleClickOutside = (event) => {
    if (
      trainingDropdownRef.current &&
      !trainingDropdownRef.current.contains(event.target) &&
      isTrainingDropdownOpen
    ) {
      setTrainingDropdownOpen(false);
    }

    if (
      servicesDropdownRef.current &&
      !servicesDropdownRef.current.contains(event.target) &&
      isServicesDropdownOpen
    ) {
      setServicesDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isTrainingDropdownOpen, isServicesDropdownOpen]);

  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>YourLogo</div>
        <nav className={style.menu}>
          <div
            ref={trainingDropdownRef}
            className={`${style.menuLink} ${isTrainingDropdownOpen && style.active}`}
            onClick={handleTrainingClick}>
            Обучение
          </div>
          {isTrainingDropdownOpen && (
            <div className={style.window}>
              <h2 className={style.windowTitle}>Курсы подготовки к ЕГЭ</h2>
              <div className={style.windowItem}>
                <div className={style.itemInfo}>
                  <img className={style.itemImg} src={ob} alt="" />
                  <p className={style.itemName}>Обществознание</p>
                </div>
              </div>
              <div className={style.windowItem}>
                <div className={style.itemInfo}>
                  <img className={style.itemImg} src={rus} alt="" />
                  <p className={style.itemName}>Русский язык</p>
                </div>
              </div>
              <div className={style.windowItem}>
                <div className={style.itemInfo}>
                  <img className={style.itemImg} src={math} alt="" />
                  <p className={style.itemName}>Математика</p>
                </div>
              </div>
            </div>
          )}

          <div
            ref={servicesDropdownRef}
            className={`${style.menuLink} ${isServicesDropdownOpen && style.active}`}
            onClick={handleServicesClick}>
            Сервисы
          </div>
          {isServicesDropdownOpen && (
            <div className={style.twoWindow}>
              <h2 className={style.twoWindowTitle}>Сервисы</h2>
              <div className={style.twoWindowItems}>
                <div className={style.twoWindowItem}>
                  <img className={style.twoWindowItemImg} src={molniya} alt="" />
                  <Link to='/login' className={style.twoWindowItemText}>Тренажер</Link>
                </div>
              </div>
            </div>
          )}
        </nav>
        <div className={style.info}>
          <Link className={style.infoLink} to="/">
            Вакансии преподавателей
          </Link>
          <Link to='/login' className={style.auth}>
            <img src={auth} alt="Авторизация" />
            <p className={style.authBtn}>
              Войти
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}

