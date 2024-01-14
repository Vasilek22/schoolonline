import React, { useState } from 'react';
import style from './navbar.module.css';
import ob from './ob.png';
import rus from './rus.png';
import math from './math.png';
import { Link } from 'react-router-dom';

export default function Navbar({ onNavItemSelect  }) {

    const [selectedNavItem, setSelectedNavItem] = useState('');

    const handleNavItemSelect = (item) => {
        setSelectedNavItem(item);
        onNavItemSelect(item); // Передаем выбранный пункт в родительский компонент
    };

  return (
    <div className={style.navbar}>
        <div onClick={() => handleNavItemSelect('item1')} className={style.windowItem}>
            <div className={style.itemInfo}>
                <img className={style.itemImg} src={ob} alt="" />
                <p className={style.itemName}>Обществознание</p>
            </div>
        </div>
        <div onClick={() => handleNavItemSelect('item2')} className={style.windowItem}>
            <div className={style.itemInfo}>
                <img className={style.itemImg} src={rus} alt="" />
                <p className={style.itemName}>Русский язык</p>
            </div>
        </div>
        <div onClick={() => handleNavItemSelect('item3')} className={style.windowItem}>
            <div className={style.itemInfo}>
                <img className={style.itemImg} src={math} alt="" />
                <p className={style.itemName}>Математика</p>
            </div>
        </div>
    </div>
  )
}
