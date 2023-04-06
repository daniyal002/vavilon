import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className={style.header}>
      <div className="container">
        <div className={style.headerB}>
          <div className={style.headerLogo}>
            <img src={logo} alt="Logo" />
          </div>

          <a href="#" className={style.headerBookLink}>
            Забронированные сеансы
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
