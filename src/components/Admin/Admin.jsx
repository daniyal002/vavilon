import React from "react";
import style from "./Admin.module.css";
import AdminSlidebar from "./AdminSlidebar/AdminSlidebar";

const Admin = () => {
  return (
    <div className={style.admin}>
      <AdminSlidebar />
    </div>
  );
};

export default Admin;
