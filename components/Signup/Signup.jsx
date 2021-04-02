import React, { Component } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import AuthenticationService from "../helper/AuthenticationService";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;

export class Signup extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // email
         email: "",
         isValidemail: false,
         isTouchedemail: false,
         // email

         // userName
         username: "",
         isValidusername: false,
         isTouchedusername: false,
         // userName

         // mobilenumber
         mobilenumber: "",
         isValidmobilenumber: false,
         isTouchedmobilenumber: false,
         // mobilenumber

         // password
         password: "",
         isValidpassword: false,
         isTouchedpassword: false,
         // password

         // confirmpassword
         confirmpassword: "",
         isValidconfirmpassword: false,
         isTouchedconfirmpassword: false,
         // confirmpassword

         // hasSignUpFailed
         hasSignUpFailed: false,
         message: "",
         // hasSignUpFailed
      };

      // this.handleemailChange = this.handleemailChange.bind(this)
   }

   handleInputChange(event) {
      if (event.target.name === "email") {
         if (emailRegex.test(event.target.value.trim().toLowerCase())) {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: true,
               [`isTouched${event.target.name}`]: true,
            });
         } else {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: false,
               [`isTouched${event.target.name}`]: true,
            });
         }
      }

      if (event.target.name === "mobilenumber") {
         if (phoneRegex.test(event.target.value.trim().toLowerCase())) {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: true,
               [`isTouched${event.target.name}`]: true,
            });
         } else {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: false,
               [`isTouched${event.target.name}`]: true,
            });
         }
      }

      if (event.target.name === "username") {
         if (event.target.value.trim() >= 4) {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: true,
               [`isTouched${event.target.name}`]: true,
            });
         } else {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: false,
               [`isTouched${event.target.name}`]: true,
            });
         }
      }

      if (event.target.name === "password") {
         if (event.target.value.trim() >= 6) {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: true,
               [`isTouched${event.target.name}`]: true,
            });
         } else {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: false,
               [`isTouched${event.target.name}`]: true,
            });
         }
      }

      if (event.target.name === "confirmpassword") {
         if (event.target.value.trim() === this.state.password) {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: true,
               [`isTouched${event.target.name}`]: true,
            });
         } else {
            this.setState({
               [event.target.name]: event.target.value,
               [`isValid${event.target.name}`]: false,
               [`isTouched${event.target.name}`]: true,
            });
         }
      }
   }

   checkIfFormIsValid() {
      if (
         !this.state.isValidemail ||
         !this.state.isValidusername ||
         !this.state.isValidmobilenumber ||
         !this.state.isValidpassword ||
         !this.state.isValidconfirmpassword
      ) {
         this.setState({
            hasSignUpFailed: true,
         });
      } else {
         this.setState({
            hasSignUpFailed: false,
         });
      }
   }

   loginClickedHandler() {
      //test@test.com,1234
      this.checkIfFormIsValid();
      if (!this.state.hasSignUpFailed) {
         //Very Important
         AuthenticationService.registerSuccessfulLogin(
            this.state.username,
            this.state.email,
            this.state.password,
            this.state.mobilenumber
         ).then(
            (response) => {
               window.alert(
                  "You account has been successfully created! You will be redirected to the Login page."
               );
               this.props.history.replace(`/login`);
            },
            (error) => {
               const resMessage =
                  (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                  error.message ||
                  error.toString();

               this.setState({
                  // hasSignUpFailed: true,
                  message: resMessage,
               });
            }
         );
         // .catch(
         //    window.alert(
         //       "There was an error :( Please Check your information / network."
         //    )
         // );

         // this.props.history.replace(`/home/${this.state.email}`);
      } else {
         console.log("Failed");
         this.setState({
            hasSignUpFailed: true,
         });
      }
   }

   render() {
      return (
         <div className="container-fluid" id="signupBox">
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
                                 Register Here!
                              </h3>
                              <h5 className="text-center text-danger">
                                 {this.state.message}
                              </h5>
                              {/* <form> */}
                              <div
                                 className={`form-label-group ${styles.formLabelGroup}`}
                              >
                                 <input
                                    type="email"
                                    id="email"
                                    className={"form-control border "}
                                    placeholder="Email address"
                                    required
                                    autoFocus
                                    name="email"
                                    value={this.state.email}
                                    onChange={(e) => this.handleInputChange(e)}
                                 />
                                 <label htmlFor="email">Email address</label>
                              </div>

                              <div
                                 className={`form-label-group ${styles.formLabelGroup}`}
                              >
                                 <input
                                    type="text"
                                    id="username"
                                    className="form-control"
                                    placeholder="Username"
                                    required
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
                                    type="text"
                                    id="mobilenumber"
                                    className="form-control"
                                    placeholder="?obile Number"
                                    required
                                    name="mobilenumber"
                                    value={this.state.mobilenumber}
                                    onChange={(e) => this.handleInputChange(e)}
                                 />
                                 <label htmlFor="mobilenumber">
                                    Mobile Number
                                 </label>
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

                              <div
                                 className={`form-label-group ${styles.formLabelGroup}`}
                              >
                                 <input
                                    type="password"
                                    id="confirmpassword"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    required
                                    name="confirmpassword"
                                    value={this.state.confirmpassword}
                                    onChange={(e) => this.handleInputChange(e)}
                                 />
                                 <label htmlFor="confirmpassword">
                                    Confirm Password
                                 </label>
                              </div>

                              <button
                                 id="submitButton"
                                 className={`btn btn-lg btn-primary btn-block ${styles.btnLogin} text-uppercase font-weight-bold mb-2`}
                                 onClick={() => this.loginClickedHandler()}
                              >
                                 Sign in
                              </button>
                              <div className="text-center">
                                 Already Registered on Mob Store?
                                 <span> </span>
                                 <Link
                                    className="small"
                                    to="/login"
                                    id="signinLink"
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

export default Signup;
