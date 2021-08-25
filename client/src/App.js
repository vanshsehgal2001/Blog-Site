import { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Alert from "./components/Alert";
import setToken from "./utils/setToken";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";
import ViewProfile from "./components/ViewProfile";
import Bloggers from "./components/Bloggers";
import AddEducation from "./components/AddEducation";
import AddExperience from "./components/AddExperience";

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/createprofile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/editprofile" component={EditProfile} />
            <PrivateRoute exact path="/profile/:id" component={ViewProfile} />
            <Route exact path="/bloggers" component={Bloggers} />
            <PrivateRoute exact path="/addeducation" component={AddEducation} />
            <PrivateRoute
              exact
              path="/addexperience"
              component={AddExperience}
            />
          </Switch>
          <Footer />
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;
