import './App.css';
import Header from "./components/Header";
import Body from "./components/Body";
import {Provider} from "react-redux";

import store from './store';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Settings from "./components/Settings";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <Header />
                  <Switch>
                      <Route path="/settings">
                          <Settings />
                      </Route>
                      <Route path="/">
                          <Body />
                      </Route>
                  </Switch>
              </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
