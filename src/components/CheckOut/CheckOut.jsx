import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import NumberFormat from "react-number-format";
// import TextField from "material-ui/TextField";

// import styles from "./CheckOut.module.css";
import UserNav from "../UserNav/UserNav";
import AuthenticationService from "../helper/AuthenticationService";

const numberFormat = (value) => {
   return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
   }).format(value);
};

const truncate = (str) => {
   return str.length > 10 ? str.substring(0, 10) + "..." : str;
};

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
   },
   button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
   },
   actionsContainer: {
      marginBottom: theme.spacing(2),
   },
   resetContainer: {
      padding: theme.spacing(3),
   },
}));

function getSteps() {
   return ["USER INFORMATION", "DELIVERY ADDRESS", "PAYMENT"];
}

const CheckOut = (props) => {
   let location = useLocation();

   const classes = useStyles();
   const [activeStep, setActiveStep] = React.useState(0);
   const steps = getSteps();

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleReset = () => {
      setActiveStep(0);
   };

   function limit(val, max) {
      if (val.length === 1 && val[0] > max[0]) {
         val = "0" + val;
      }

      if (val.length === 2) {
         if (Number(val) === 0) {
            val = "01";

            //this can happen when user paste number
         } else if (val > max) {
            val = max;
         }
      }

      return val;
   }

   function cardExpiry(val) {
      let month = limit(val.substring(0, 2), "12");
      let year = val.substring(2, 4);

      return month + (year.length ? "/" + year : "");
   }

   return (
      <>
         <UserNav />
         <div className="row">
            <div className="col-md-7 offset-md-1 pl-5 pt-5">
               <div className={classes.root}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                     {steps.map((label, index) => (
                        <Step key={label}>
                           <StepLabel>{label}</StepLabel>
                           <StepContent>
                              {index === 0 ? (
                                 <div>
                                    <span className="text-primary px-3 font-italic h5">
                                       {
                                          AuthenticationService.getCurrentUser()
                                             .username
                                       }
                                    </span>
                                    <br />
                                    <span className="text-primary px-3 font-italic h5">
                                       {
                                          AuthenticationService.getCurrentUser()
                                             .email
                                       }
                                    </span>
                                 </div>
                              ) : index === 1 ? (
                                 <div>
                                    <div className="form-group">
                                       <label htmlFor="inputAddress">
                                          Address
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          id="inputAddress"
                                          placeholder="1234 Main St"
                                       />
                                    </div>
                                    <div className="form-group">
                                       <label htmlFor="inputAddress2">
                                          Address 2
                                       </label>
                                       <input
                                          type="text"
                                          className="form-control"
                                          id="inputAddress2"
                                          placeholder="Apartment, studio, or floor"
                                       />
                                    </div>
                                    <div className="form-row">
                                       <div className="form-group col-md-6">
                                          <label htmlFor="inputCity">
                                             City
                                          </label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             id="inputCity"
                                          />
                                       </div>
                                       <div className="form-group col-md-4">
                                          <label htmlFor="inputState">
                                             State
                                          </label>
                                          <select
                                             id="inputState"
                                             className="form-control"
                                          >
                                             <option selected>Choose...</option>
                                             <option>...</option>
                                          </select>
                                       </div>
                                       <div className="form-group col-md-2">
                                          <label htmlFor="inputZip">Zip</label>
                                          <input
                                             type="text"
                                             className="form-control"
                                             id="inputZip"
                                          />
                                       </div>
                                    </div>
                                    <div className="form-group">
                                       <div className="form-check">
                                          <input
                                             className="form-check-input"
                                             type="checkbox"
                                             id="gridCheck"
                                          />
                                          <label
                                             className="form-check-label"
                                             htmlFor="gridCheck"
                                          >
                                             Save My Address
                                          </label>
                                       </div>
                                    </div>
                                 </div>
                              ) : index === 2 ? (
                                 <div className="container">
                                    <div className="row">
                                       <div className="col-md-3 ">
                                          Card Number
                                       </div>
                                       <div className="col-md-6 ">
                                          <NumberFormat
                                             className="border border-primary text-center"
                                             placeholder="#### #### #### ####"
                                             format="#### #### #### ####"
                                             mask="#"
                                          />
                                       </div>
                                    </div>
                                    <div className="row mt-3">
                                       <div className="col-md-3">
                                          Card Expiry
                                       </div>
                                       <div className="col-md-6 ">
                                          <NumberFormat
                                             className="border border-primary text-center"
                                             placeholder="##/##"
                                             format={cardExpiry}
                                             mask="#"
                                          />
                                       </div>
                                    </div>
                                    <div className="row mt-3">
                                       <div className="col-md-3">CVV</div>
                                       <div className="col-md-6 ">
                                          <NumberFormat
                                             className="border border-primary text-center"
                                             placeholder="###"
                                             // customInput={TextField}
                                             format="###"
                                             mask="X"
                                          />
                                       </div>
                                    </div>
                                 </div>
                              ) : (
                                 "Sorry"
                              )}

                              <div className={classes.actionsContainer}>
                                 <div>
                                    <Button
                                       disabled={activeStep === 0}
                                       onClick={handleBack}
                                       className={classes.button}
                                    >
                                       Back
                                    </Button>
                                    <Button
                                       variant="contained"
                                       // color="primary"
                                       onClick={handleNext}
                                       className={classes.button}
                                    >
                                       {activeStep === steps.length - 1
                                          ? "Finish"
                                          : "Next"}
                                    </Button>
                                 </div>
                              </div>
                           </StepContent>
                        </Step>
                     ))}
                  </Stepper>
                  {activeStep === steps.length && (
                     <Paper
                        square
                        elevation={0}
                        className={classes.resetContainer}
                     >
                        <Typography>
                           {/* All steps completed - you&apos;re finished */}
                           Information Update Succesfull !
                        </Typography>
                        <Button
                           onClick={handleReset}
                           className={classes.button}
                           color="primary"
                        >
                           Order Now!
                        </Button>
                     </Paper>
                  )}
               </div>
            </div>
            <div className="col-3 mt-5">
               <div
                  className="card border-secondary mb-3"
                  style={{ maxWidth: "24rem" }}
               >
                  <div className="card-header">ORDER SUMMARY</div>
                  <div className="card-body text-secondary">
                     <h5 className="card-title">
                        TOTAL:: {numberFormat(location.totalPrice.toFixed(2))}
                     </h5>
                     <div className="card-text">
                        {/* {console.log(location.cartElements)} */}
                        <ul className="list-group mt-4">
                           {location.cartElements.map((elt) => (
                              <li
                                 key={elt.id}
                                 className="list-group-item d-flex justify-content-between align-items-center"
                              >
                                 {truncate(elt.productName)}
                                 <span className="text-primary">
                                    {numberFormat(elt.price)} * {elt.quantity}
                                 </span>
                                 <span className="badge badge-primary badge-pill">
                                    {numberFormat(elt.price * elt.quantity)}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default CheckOut;
