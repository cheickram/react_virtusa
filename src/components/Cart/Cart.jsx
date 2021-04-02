import React, { Component } from "react";
import { Link } from "react-router-dom";
import CartServices from "../../api/CartServices";
import AuthenticationService from "../helper/AuthenticationService";
import UserNav from "../UserNav/UserNav";
import styles from "./Cart.module.css";

const numberFormat = (value) => {
   return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
   }).format(value);
};

export class Cart extends Component {
   constructor(props) {
      super(props);
      this.state = {
         cartsElements: [],
         total: 0,
      };
   }

   renderProduct(product) {
      return (
         <tr key={product.id}>
            <td>{product.productName}</td>
            <td>{product.quantity}</td>
            <td>{numberFormat(product.price)}</td>
            <td>
               {numberFormat((product.quantity * product.price).toFixed(2))}
            </td>
            <td>
               <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => {
                     CartServices.addToCart(product.id).then((response) => {
                        let newCartElements = this.state.cartsElements.filter(
                           (product) => product.id !== response.data.id
                        );
                        let total = 0;
                        newCartElements.map(
                           (elt) => (total += elt.quantity * elt.price)
                        );
                        this.setState((prevState) => {
                           return {
                              cartsElements: newCartElements,
                              total: total,
                           };
                        });
                     });
                  }}
               >
                  <i className="far fa-trash-alt"></i>
               </button>
            </td>
         </tr>
      );
   }

   getTotalPrice() {
      let total = 0;
      this.state.cartsElements.map((elt) => {
         total += elt.quantity * elt.price;
      });
      return total;
   }

   componentDidMount() {
      CartServices.retrieveAllCartElements()
         .then((response) => {
            // console.log(this.props.match.params);
            let cartsElements = response.data.filter(
               (element) =>
                  Number(element.userId) ===
                  Number(AuthenticationService.getCurrentUser().id)
            );

            this.setState({
               cartsElements,
            });
         })
         .then((response) => {
            this.setState({
               total: this.getTotalPrice(),
            });
         });
   }

   render() {
      return (
         <>
            <UserNav />
            <div className="container text-center h3 mt-3">
               Total:: {numberFormat(this.state.total.toFixed(2))}
            </div>
            <div id="mobileCartBody" className="mx-5">
               <div className="container-fluid  mt-4">
                  <table className="table table-hover text-center">
                     <thead bgcolor="#00BFA6">
                        <tr
                           style={{ color: "white" }}
                           className={`h5 ${styles.thFont}`}
                        >
                           <th scope="col">Product Name</th>
                           <th scope="col">Quantity</th>
                           <th scope="col">Price</th>
                           <th scope="col">Total</th>
                           <th scope="col"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {this.state.cartsElements.map((element) =>
                           this.renderProduct(element)
                        )}
                     </tbody>
                  </table>
                  <div className="row">
                     <div className="col-md-2 offset-md-5">
                        <center>
                           <Link
                              className={`btn w-100 ${styles.orderBtn}`}
                              to={{
                                 pathname: "/checkout",
                                 cartElements: this.state.cartsElements,
                                 totalPrice: this.state.total,
                              }}
                           >
                              Place Order
                           </Link>
                        </center>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

export default Cart;
