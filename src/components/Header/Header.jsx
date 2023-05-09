import React from 'react';
import style from './Header.module.css';
import logo from '../../assets/logo.webp';

const Header = () => {
  return (
    <header className={style.header}>
      <div className="container">
        <div className={style.headerB}>
          <div className={style.headerLogo}>
            <img src={logo} alt="Logo" className={style.headerLogoImg} />
            <h2 className={style.headerLogoHeader2}>Vavilon</h2>
            <h1 className={style.headerLogoHeader1}>Кинотеатр на Крыше</h1>
          </div>

          <nav className={style.headerNav}>
            <ul className={style.headerNavList}>
              {/* <li className={style.headerNavListItem}>
                <a href="#" className={style.headerNavListItemLink}>
                  Забронированные сеансы
                </a>
              </li> */}
              <li className={style.headerNavListItem}>
                <a href="#contacts" className={style.headerNavListItemLink}>
                  Контакты
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
