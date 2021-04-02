import axios from "axios";
import authHeader from "../components/helper/auth-header";

const API_URL = "http://localhost:8080/";

class CartService {
   retrieveAllCartElements() {
      return axios.get(API_URL + "cart", { headers: authHeader() });
      // return axios.get(`http://localhost:8080/api/team72/products`);
   }

   addToCart(cartItemId) {
      return axios.delete(
         API_URL + "cart/delete/" + cartItemId,
         { headers: authHeader() }
         // {
         //    headers: authHeader(),
         // },
         // {
         //    cartItemId: cartItemId,
         // }
      );
      // return axios.get(`http://localhost:8080/api/team72/products`);
   }
}

export default new CartService();
