import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserNav from "../UserNav/UserNav";
import Typed from "react-typed";
import styles from "./Home.module.css";

import ProductService from "../../api/ProductServices";
import AuthenticationService from "../helper/AuthenticationService";

export class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         products: [],
      };
      this.truncate = this.truncate.bind(this);
      this.numberFormat = this.numberFormat.bind(this);
   }

   truncate(str) {
      return str.length > 14 ? str.substring(0, 12) + "..." : str;
   }

   numberFormat(value) {
      return new Intl.NumberFormat("en-IN", {
         style: "currency",
         currency: "INR",
      }).format(value);
   }

   componentDidMount() {
      ProductService.retrieveAllProducts().then((response) => {
         // console.log(this.props.match.params);
         this.setState({
            products: response.data,
         });
      });
   }

   render() {
      let textLines = [
         `Welcome to <span style='color: rgb(0, 191, 166);'>Mob Store</span> dear <span style='color: rgb(0, 191, 166);'>${
            AuthenticationService.getCurrentUser().username
         }</span>!`,
         `Find Mobile Phones and more that suits you!`,
      ];
      return (
         <div className="Home">
            <UserNav />
            <div className="navbar__hero">
               <div
                  className="jumbotron jumbotron-fluid"
                  style={{ backgroundColor: "#f7ffff" }}
               >
                  <div className="container">
                     {/* <h1 class="display-5">Welcome Back!</h1> */}

                     <div className={`text-center h2 ${styles.typed}`}>
                        <Typed
                           strings={textLines}
                           typeSpeed={70}
                           backSpeed={60}
                           loop
                        />
                     </div>
                  </div>
               </div>
            </div>

            <div id="mobileHomeBody" className="container-fluid">
               <center>
                  <div className="row">
                     {this.state.products.map((product) => (
                        <div
                           key={product.id}
                           className="col-lg-2 col-md-3 col-sm-4 my-5"
                        >
                           <ProductCard
                              id={product.id}
                              image={product.imageUrl}
                              name={this.truncate(product.productName)}
                              price={this.numberFormat(
                                 product.price.toFixed(2)
                              )}
                              productObject={product}
                           />
                        </div>
                     ))}
                  </div>
               </center>
            </div>
         </div>
      );
   }
}

function ProductCard({ id, image, name, price, productObject }) {
   return (
      <div className="card" style={{ width: "100%", maxHeight: 500 }}>
         <img
            className="card-img-top mt-2 mb-1 p-4 mx-auto d-block"
            src={image}
            alt=""
            width="200"
            height="300"
         />
         <hr />
         <div className="card-body">
            <div className="row">
               <h5 className="card-title col-12 font-weight-bolder">{name}</h5>
            </div>
            <div className="row">
               <p className="card-text col-12 my-1 font-weight-bolder">
                  {price}
               </p>
            </div>
            <div className="row">
               <Link
                  // href={`www.goo.com` + id}
                  to={{
                     pathname: "/detail",
                     state: productObject,
                  }}
                  className="btn w-100 col-12"
                  style={{
                     backgroundColor: "rgb(0, 191, 166)",
                     color: "#fff",
                  }}
               >
                  Details
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Home;
