import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import CoinSearchPage from "../CoinSearchPage/CoinSearchPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import OopsPage from "../OopsPage/OopsPage";
import Hamburger from "../Hamburger/Hamburger";
import CoinDetails from "../CoinDetails/CoinDetails";
import ModifyPage from "../ModifyPage/ModifyPage";
import Disclaimer from "../Disclaimer/Disclaimer";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    console.log(`

    Thanks for checking out Magic Beans
    You have no idea how much it means
    Don't mind that silly 403
    Just log on in and trade with me!

    
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$               $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$                   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$!                      $$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$  $$$$$$$$$$  $$$$$$$!                         $$$$$$$$  $$$$$$$$$$$  $$$$
$$$$.  $      $   $$$$$$$          0      0        !$$$$$$$  '$/  /  $' .$$$$$
$$$$$. !   i  i .$$$$$$$$                           $$$$$$$$. i  i  /! .$$$$$$
$$$$$$    -- --.$$$$$$$$$                           $$$$$$$$$.--'--'   $$$$$$$
$$$$$$L         $$$$$^^$$                           $$^^$$$$$'        J$$$$$$$
$$$$$$$.   .'   ""~   $$$                           $$$   ~""   .   .$$$$$$$$$
$$$$$$$$.  ;      .e$$$$$!    $$.             .$$  !$$$$$e,      ;  .$$$$$$$$$
$$$$$$$$$   .$$$$$$$$$$$$!     $$$.         .$$$   $$$$$$$$$$$$.'   $$$$$$$$$$
$$$$$$$$    .$$$$$$$$$$$$$!     $$ $$$$$$$$'$$    !$$$$$$$$$$$$$.    $$$$$$$$$
$$$$$$$     $$$$$$$$$$$$$$$$.     $    $$    $   .$$$$$$$$$$$$$$$$     $$$$$$$
                                 $    $$    $
                                 $.   $$   .$
                                  $        $'
                                   $$$$$$$$'
    `)
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/disclaimer" />

          <Route exact path="/disclaimer">
            <Disclaimer />
          </Route>

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows CoinSearchPage else shows LoginPage
            // UPDATED used to be info page
            exact
            path="/search"
          >
            <CoinSearchPage />
          </ProtectedRoute>

          <ProtectedRoute
            //let's try one from scratch...
            exact
            path="/coin-details/:id"
          >
            <CoinDetails />
          </ProtectedRoute>

          <ProtectedRoute
            //let's try one from scratch...
            exact
            path="/modify/:id/:name/:held"
          >
            <ModifyPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {
              user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the Landing page
                <LoginPage />
              ) //updated Changed to bypass landing page - now landing HERE
            }
          </Route>

          <Route exact path="/hamburger">
            <Hamburger />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            {/* <h1><img src="/images/magic-beans-logo.png" width="180px"/></h1> */}
            <OopsPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
