import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./AdminSlidebar.module.css";
import hamburgerMenu from "../../../assets/icons/hamburger_menu.svg";
const AdminSlidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button className={style.menuButton} onClick={handleToggleMenu}>
        <img src={hamburgerMenu} alt="Hamburger" />
      </button>
      <div
        className={`${style.adminSlidebar} ${showMenu ? style.showMenu : ""}`}
      >
        <ul className={style.adminSlidebarList}>
          <li className={style.adminSlidebarListItem}>
            <Link
              to="/admin/customer"
              className={style.adminSlidebarListItemLink}
            >
              Забронированные фильмы
            </Link>
          </li>
          <li className={style.adminSlidebarListItem}>
            <Link
              to="/admin/movielist"
              className={style.adminSlidebarListItemLink}
            >
              Список фильмов
            </Link>
          </li>
          <li className={style.adminSlidebarListItem}>
            <Link
              to="/admin/movieposter"
              className={style.adminSlidebarListItemLink}
            >
              Список афиш
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSlidebar;
