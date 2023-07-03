import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App(props) {
  const { loggedInPrincipal } = props;

  return (
    <div id="screen">
      <Header />
      <Faucet userPrincipal={loggedInPrincipal} />
      <Balance />
      <Transfer />
    </div>
  );
}

export default App;