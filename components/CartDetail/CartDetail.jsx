import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";
import styles from "./CartDetail.module.css";
import ReactImageMagnify from "react-image-magnify";
import UserNav from "../UserNav/UserNav";
import ProductServices from "../../api/ProductServices";
import AuthenticationService from "../helper/AuthenticationService";

function CartDetail() {
   const [qte, setQte] = useState();
   let location = useLocation();
   useEffect(() => {
      setQte(location.state.quantity);
   }, [location.state.quantity]);

   const numberFormat = (value) => {
      return new Intl.NumberFormat("en-IN", {
         style: "currency",
         currency: "INR",
      }).format(value);
   };

   // console.log(location.state);
   // let qte = location.state.quantity;
   return (
      <div className="details">
         <UserNav />
         <div className="container-fluid">
            <div className="row">
               <div className="col-lg-3  col-md-3 col-sm-12">
                  <div className="row mt-5 mr-4 ml-5">
                     <div
                        className={`card  ${styles.image__cards} `}
                        style={{}}
                     >
                        <ReactImageMagnify
                           enlargedImageContainerStyle={{
                              border: "1px solid black",
                              backgroundColor: "white",
                              imageClassName: "mx-auto d-block",
                           }}
                           {...{
                              smallImage: {
                                 alt: "Wristwatch by Ted Baker London",
                                 isFluidWidth: true,
                                 src: location.state.imageUrl,
                                 // srcSet: this.srcSet,
                                 sizes:
                                    "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                              },
                              largeImage: {
                                 src: location.state.imageUrl,
                                 width: 1200,
                                 height: 1800,
                              },
                              enlargedImageContainerDimensions: {
                                 width: "400%",
                                 height: "200%",
                              },
                           }}
                        />
                     </div>
                  </div>
                  <div className="row mt-3 mr-4 mb-2 ml-5">
                     <div
                        className="extra___items card w-100 p-5"
                        style={{ border: "none" }}
                     >
                        <div className="row justify-content-center text-primary">
                           <h4 className={"h1 " + styles.itemss}>
                              <span className={styles.items}>
                                 {/* {location.state.productBrand} */}
                                 {numberFormat(location.state.price.toFixed(2))}
                              </span>
                           </h4>
                        </div>
                        <hr />
                        <div className="row justify-content-center text-secondary">
                           <h4 className={"" + styles.itemss}>
                              <span className={styles.items}>{qte} left</span>
                           </h4>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-9 col-md-9 col-sm-15">
                  <div className="row mt-5 ml-5 ">
                     <div className="card w-100 mb-2 mr-5 p-5">
                        <div
                           className="card mt-5 p-3"
                           style={{ border: "none" }}
                        >
                           <div className="row text-primary ml-2 mt-2 ">
                              <h4 className={styles.item__s}>
                                 <span className={styles.items}>
                                    {location.state.productBrand}
                                 </span>
                              </h4>
                           </div>
                        </div>
                        <div className="card mt-3  p-3">
                           <div className="row ml-2 mt-2">
                              <h5 className={styles.item__s}>
                                 <span className={styles.items}>
                                    {location.state.productName}
                                 </span>
                              </h5>
                           </div>
                        </div>
                        <div
                           className="card  mt-3 p-3"
                           style={{ border: "none" }}
                        >
                           <div className="row ml-2 ">
                              <p className={styles.item__s}>
                                 <span className={styles.items}>
                                    {location.state.description.toString()}
                                 </span>
                              </p>
                           </div>
                        </div>

                        <div className="row   ">
                           <div className={`card ${styles.cards} w-100  p-5`}>
                              <div className="row mt-2 ">
                                 <div className="col-6">
                                    <button
                                       disabled={qte > 0 ? false : true}
                                       className="btn btn-md btn-outline-primary  w-100"
                                       onClick={() => {
                                          return qte > 0
                                             ? ProductServices.addToCart(
                                                  AuthenticationService.getCurrentUser()
                                                     .id,
                                                  location.state.id,
                                                  location.state.productName,
                                                  1,
                                                  location.state.price,
                                                  0
                                               )
                                                  .then((response) => {
                                                     setQte(
                                                        (state) => state - 1
                                                     );
                                                     window.alert(
                                                        "Successfully Added to the Cart!"
                                                     );
                                                  })
                                                  .catch((error) =>
                                                     console.log("err", error)
                                                  )
                                             : window.alert(
                                                  "Sorry, This product is no more available!"
                                               );
                                       }}
                                    >
                                       Add to Cart
                                    </button>
                                 </div>
                                 <div className="col-6">
                                    <Link
                                       to={{
                                          pathname: "/checkout",
                                          cartElements: [
                                             {
                                                id: location.state.id,
                                                productName:
                                                   location.state.productName,
                                                price: location.state.price,
                                                quantity: 1,
                                             },
                                          ],
                                          totalPrice: location.state.price,
                                       }}
                                       className="btn btn-md btn-outline-success w-100"
                                       disabled={qte > 0 ? false : true}
                                    >
                                       Place Order
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CartDetail;
