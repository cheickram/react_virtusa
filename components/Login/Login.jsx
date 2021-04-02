import React, { Component } from "react";
import AuthenticationService from "../helper/AuthenticationService";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

export default class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: "",
         password: "",
         hasLoginFailed: false,
         message: "",
      };

      // this.handleusernameChange = this.handleusernameChange.bind(this)
   }

   handleInputChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
         // username: event.target.value
      });
   }

   loginClickedHandler() {
      //test@test.com,1234
      // if (
      //    this.state.username === "test@test.com" &&
      //    this.state.password === "1234"
      // ) {
      //Very Important

      if (this.state.username.length > 0 && this.state.password.length > 0) {
         AuthenticationService.login(
            this.state.username,
            this.state.password
         ).then(
            () => {
               if (
                  this.state.username === "admin" &&
                  this.state.password === "admin"
               ) {
                  this.props.history.replace("/cart");
               } else {
                  this.props.history.replace("/home");
               }
               window.location.reload();
            },
            (error) => {
               const resMessage =
                  (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                  error.message ||
                  error.toString();

               this.setState({
                  message: resMessage,
               });
            }
         );

         // this.props.history.replace(`/home`);
      }
      // } else {
      //    console.log("Failed");
      //    this.setState({
      //       hasLoginFailed: true,
      //    });
      // }
      // console.log(this.state);
   }

   render() {
      return (
         <div className="container-fluid" id="loginBox">
            <div className="row no-gutter">
               <div
                  className={`d-none d-md-flex col-md-4 col-lg-6 ${styles.bgImage}`}
               ></div>
               <div className="col-md-8 col-lg-6">
                  <div
                     className={`${styles.login} d-flex align-items-center py-5"`}
                  >
                     <div className="container">
                        <div className="row">
                           <div className="col-md-9 col-lg-8 mx-auto">
                              <h3 className={`${styles.loginHeading} mb-4`}>
                                 Welcome back!
                              </h3>
                              <h5 className="text-center text-danger">
                                 {this.state.message}
                              </h5>
                              {/* <form> */}
                              <div
                                 className={`form-label-group ${styles.formLabelGroup}`}
                              >
                                 <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Username"
                                    required
                                    autoFocus
                                    name="username"
                                    value={this.state.username}
                                    onChange={(e) => this.handleInputChange(e)}
                                 />
                                 <label htmlFor="username">Username</label>
                              </div>

                              <div
                                 className={`form-label-group ${styles.formLabelGroup}`}
                              >
                                 <input
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleInputChange(e)}
                                 />
                                 <label htmlFor="password">Password</label>
                              </div>

                              <button
                                 id="submitButton"
                                 className={`btn btn-lg btn-primary btn-block ${styles.btnLogin} text-uppercase font-weight-bold mb-2`}
                                 onClick={() => this.loginClickedHandler()}
                              >
                                 Sign in
                              </button>
                              <div className="text-center">
                                 New to Mob Store? <span> </span>
                                 <Link
                                    className="small"
                                    to="/signup"
                                    id="signupLink"
                                 >
                                    Click Here
                                 </Link>
                              </div>
                              {/* </form> */}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
