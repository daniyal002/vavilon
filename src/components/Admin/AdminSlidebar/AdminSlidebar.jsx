import React from "react";
import style from "./AdminSlidebar.module.css";
import { Link } from "react-router-dom";
const AdminSlidebar = () => {
  return (
    <div className={style.adminSlidebar}>
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
  );
};

export default AdminSlidebar;
