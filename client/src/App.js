import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/search";
import Saved from "./pages/saved";
//import Nav from "./components/Nav";


function App() {
  return (
    <Router>
    <div>
      <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route component={Search} />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
