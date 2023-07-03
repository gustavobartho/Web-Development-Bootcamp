import React, { useEffect, useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";


function Faucet(props) {
  const { userPrincipal } = props;
  const [buttonActive, setButtonActive] = useState(false);
  const [canClaim, setCanClaim] = useState(true);

  useEffect(async () => {
    const canRequest = await token.canRequest();
    setCanClaim(canRequest);
    setButtonActive(canRequest);
  }, []);

  async function handleClick(event) {
    setButtonActive(false);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      }
    });

    await authCanister.payOut();
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to {userPrincipal}.</label>
      <p className="trade-buttons">
        <button
          id="btn-payout"
          onClick={handleClick}
          disabled={!buttonActive}
        >
          {canClaim ? 'min dê papai' : 'cê já tem'}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
