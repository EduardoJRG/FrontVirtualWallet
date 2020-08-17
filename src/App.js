import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/CreateAccount/Register";
import MainApp from "./containers/MainApp/MainApp";

export let setGlobalState = () => {};
export let globalState = {};

const initalState = {
  userData: {
    documento: "",
    correo: "",
    celular: "",
    idSession: "",
    token: "",
    saldo: 0,
    recarga: "",
  },
  openConsult: false,
  openPayment: false,
  openRecharge: false,
};

const LoginOptimized = React.memo((props) => <Login {...props} />);
const MainAppOptimized = React.memo((props) => <MainApp {...props} />);

function App() {
  [globalState, setGlobalState] = useState(initalState);
  return (
    <div>
      <Switch>
        <Route path="/register" component={Register} />
        <Route
          path="/home"
          component={MainAppOptimized}
          userData={globalState}
        />
        <Route
          path="/login"
          component={LoginOptimized}
          userData={globalState}
        />
        <Route
          path="/"
          exact
          component={LoginOptimized}
          userData={globalState}
        />
      </Switch>
    </div>
  );
}

export default App;
