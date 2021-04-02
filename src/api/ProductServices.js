import axios from "axios";
import authHeader from "../components/helper/auth-header";

const API_URL = "http://localhost:8080/";

class ProductService {
   retrieveAllProducts() {
      return axios.get(API_URL + "home", { headers: authHeader() });
      // return axios.get(`http://localhost:8080/api/team72/products`);
   }

   addToCart(userId, productId, productName, quantity, price, isCheckedOut) {
      return axios.post(
         API_URL + "home/" + productId,
         {
            userId: userId,
            productId: productId,
            productName: productName,
            quantity: quantity,
            price: price,
            isCheckedOut: isCheckedOut,
         },
         { headers: authHeader() }
      );
      // return axios.get(`http://localhost:8080/api/team72/products`);
   }
}

export default new ProductService();
