import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import "../assets/stylesheets/main.scss"
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import ShowsList from "./ShowsList.js"
import NewShowForm from "./NewShowForm.js"
import TVDetailsPage from "./TVDetailsPage";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  let userId
  if (currentUser) {
    userId = currentUser.id
  }
  
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/shows" component={ShowsList} />
        <Route exact path="/shows/new" component={NewShowForm} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/shows/:id">
          <TVDetailsPage userId={userId}/>
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);