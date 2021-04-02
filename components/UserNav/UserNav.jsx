import React from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../helper/AuthenticationService";
import styles from "./UserNav.module.css";

function UserNav() {
   return (
      <div id="userNavbar">
         <nav className={"navbar navbar-expand-lg p-3 " + styles.navbars}>
            <Link
               className={`navbar-brand text-light pl-5 ${styles.brandFont}`}
               to={"/home"}
            >
               Mob Store
            </Link>
            <button
               className="navbar-toggler text-light"
               type="button"
               data-toggle="collapse"
               data-target="#navbarNav"
               aria-controls="navbarNav"
               aria-expanded="false"
               aria-label="Toggle navigation"
            >
               <i className="fas fa-bars"></i>
               {/* <span
                  className={"navbar-toggler-icon" + styles.navbarTogglerIcon}
               ></span> */}
            </button>
            <div
               className="collapse navbar-collapse text-light pl-4"
               id="navbarNav"
            >
               <ul className="navbar-nav">
                  <li className="nav-item px-4">
                     <Link
                        className={`nav-link text-light ${styles.links}`}
                        id="mobileHomeButton"
                        to={"/home"}
                     >
                        Home <span className="sr-only">(current)</span>
                     </Link>
                  </li>
                  <li className="nav-item  px-4">
                     <Link
                        className={`nav-link text-light ${styles.links}`}
                        id="mobileCartButton"
                        to={"/cart"}
                     >
                        Cart
                     </Link>
                  </li>
                  <li className="nav-item  px-4">
                     <a
                        className={`nav-link text-light ${styles.links}`}
                        id="mobileOrderButton"
                        href="www.gg.com"
                     >
                        My Order
                     </a>
                  </li>
               </ul>
               <ul className="navbar-nav ml-auto pr-5">
                  <li className="nav-item  px-4">
                     <Link
                        className={`nav-link text-light ${styles.links}`}
                        id="logoutButton"
                        href="#"
                        to="/logout"
                        onClick={() => {
                           AuthenticationService.logout();
                        }}
                        replace
                     >
                        Logout
                     </Link>
                  </li>
                  <li className="nav-item  px-4">
                     <Link
                        className={`font-weight-bold nav-link text-light ${styles.links}`}
                        id="logoutButton"
                        href="#"
                        to="/home"
                     >
                        User: {AuthenticationService.getCurrentUser().username}
                     </Link>
                  </li>
               </ul>
            </div>
         </nav>
      </div>
   );
}

export default UserNav;
