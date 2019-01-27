import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Index from "./components/index.component";
import TaskView from "./components/TaskView";
import constants from "./components/constants";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar">
            <Link to={"/"} className="navbar-brand">
              {constants.TODO_LIST_APP}
            </Link>
          </nav>
          <br />
          <Switch>
            <Route path="/taskview/:id" component={TaskView} />
            <Route path="/" component={Index} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
