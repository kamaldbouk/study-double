import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./authPages/LoginPage/LoginPage";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import Dashboard from "./Dashboard/Dashboard";
import AlertNotification from "./shared/components/AlertNotification";
import Home from "./Home/Home";
import Explore from "./Explore/Explore";
import PublicProfile from "./Profile/PublicProfile";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to='/home' />
          </Route>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/profile/:id"> 
            <PublicProfile />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
