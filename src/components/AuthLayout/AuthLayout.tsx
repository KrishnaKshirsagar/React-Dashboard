import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout: React.FC = () => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
