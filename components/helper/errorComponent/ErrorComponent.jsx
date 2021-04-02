import React from "react";
import styles from "./ErrorComponent.module.css";
import { Link } from "react-router-dom";

function ErrorComponent() {
   return (
      <div className={` ${styles.notfoundid}`}>
         <div class={` ${styles.notfound}`}>
            <div class={` ${styles.notfound404}`}>
               <h1>404</h1>
               <h2>Page not found</h2>
            </div>
            <Link to="/login">Homepage</Link>
         </div>
      </div>
   );
}

export default ErrorComponent;
