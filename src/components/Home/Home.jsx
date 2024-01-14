import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import style from './home.module.css';
import accept from './accept.png'

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={style.home}>
        {loading && (
          <div className={style.loadingOverlay}>
            <div className={style.loadingSpinner}></div>
          </div>
        )}
        <div>
          <Header/>
        </div>

        <div className={style.homeContent}>
          <h1 className={style.contentTitle}>Подготовься к ЕГЭ 2024 по подписке: <br /> каждый предмет всего за 200 ₽ в месяц.</h1>
          <p className={style.contentDesc}>600 ₽ в месяц за 3 предмета</p>
          <p className={style.contentBtn}><Link className={style.btnLink} to='/login'>Купить подписку</Link></p>
        </div>



        <div className={style.homeContentTwo}>
          <div className={style.homeContentTwoContainer}>
            <h1 className={style.contentTwoTitle}>Планируй обучение как хочешь <br /> с подпиской Новой Школы</h1>
            <div className={style.contentTwoBlocks}>
              <div className={style.contentTwoBlock}>
                <img className={style.contentTwoBlockImg} src={accept} alt="" />
                <p className={style.contentTwoBlockText} >Любое количество предметов <br />по цене одного</p>
              </div>
              <div className={style.contentTwoBlock}>
                <img className={style.contentTwoBlockImg}  src={accept} alt="" />
                <p className={style.contentTwoBlockText}>Меняй предметы в любое время — <br />это бесплатно</p>
              </div>
            </div>

            <div className={style.contentTwoBigBlock}>
              <h2 className={style.contentTwoBigBlockTitle} >Не знаешь, что сдавать?</h2>
              <h2 className={style.contentTwoBigBlockTitle}>Попробуй несколько предметов</h2>
              <p className={style.contentTwoBigBlockText}>Все предметы в подписке всего за 4790 ₽ в месяц</p>
              <Link to='/login' className={style.contentTwoBigBlockBtn}>Купить подписку</Link> 
            </div>
          </div>
        </div>




    </div>
  )
}
