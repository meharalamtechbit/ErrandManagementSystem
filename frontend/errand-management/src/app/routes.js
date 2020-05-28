import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Errands from "../app/modules/errand";

const routes = () => (
  <React.Fragment>
    <Router>
      <Switch>
        <Route exact path="/" component={Errands}></Route>
      </Switch>
    </Router>
  </React.Fragment>
);

export default routes;
