import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";
// const API_URL = "http://localhost:8080/api/auth/";

class AuthenticationService {
   // registerSuccessfulLogin(email, password) {
   //    // console.log("registerSuccessfulLogin");
   //    sessionStorage.setItem("authenticatedUser", email);
   // }
   registerSuccessfulLogin(username, email, password, mobilenumber) {
      return axios.post(API_URL + "signup", {
         username,
         email,
         password,
         mobilenumber,
      });
   }

   login(username, password) {
      return axios
         .post(API_URL + "signin", {
            username,
            password,
         })
         .then((response) => {
            if (response.data.accessToken) {
               localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
         });
   }

   logout() {
      localStorage.removeItem("user");
   }

   getCurrentUser() {
      return JSON.parse(localStorage.getItem("user"));
   }

   // logout() {
   //    sessionStorage.removeItem("authenticatedUser");
   // }

   isUserLoggedIn() {
      let user = localStorage.getItem("user");
      if (user === null) return false;
      return true;
   }

   // getLoggedInDataSet() {
   //    let user = localStorage.getItem("user");
   //    if (user === null) return "";
   //    return user;
   // }
}

export default new AuthenticationService();
