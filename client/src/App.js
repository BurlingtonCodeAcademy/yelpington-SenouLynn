import logo from "./logo.svg";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Info from "./components/Info";


//Logo with nav on the side, map/resto change on click
function App() {
  return (
    <div id="landing-page">
      <div>
        <h1 id="logo">Yelpington</h1>
        <BrowserRouter>
          <div id="home-grid">
            <Nav />
            <Switch id="switch">
              <Route exact path="/" component={Home} />
              <Route path="/restaurant/:place" component={Info} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
