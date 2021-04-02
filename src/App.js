// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import CartDetail from "./components/CartDetail/CartDetail";
import CheckOut from "./components/CheckOut/CheckOut";
import AuthenticatedRoute from "./components/helper/AuthenticatedRoute";
import ErrorComponent from "./components/helper/errorComponent/ErrorComponent";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               <Route path="/" exact component={Login} />
               <Route path="/login" exact component={Login} />
               <Route path="/signup" exact component={Signup} />
               <AuthenticatedRoute path="/home" exact component={Home} />
               <AuthenticatedRoute
                  path="/detail"
                  exact
                  component={CartDetail}
               />
               <AuthenticatedRoute path="/cart" exact component={Cart} />
               <AuthenticatedRoute
                  path="/checkout"
                  exact
                  component={CheckOut}
               />
               <AuthenticatedRoute path="/logout" exact component={Login} />
               <Route component={ErrorComponent} />
            </Switch>
         </Router>
      </div>
   );
}

export default App;
