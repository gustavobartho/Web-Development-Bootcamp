import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [userId, setUserId] = useState('');
  const [balance, setBalance] = useState('---');
  const [hasBalance, setHasBalance] = useState(false);

  const handleClick = async () => {
    try {
      const symbol = await token.getCoinSymbol();
      const userBalance = await token.balanceOf(Principal.fromText(userId));
      setBalance(`${userBalance.toLocaleString()} ${symbol}`);
      setHasBalance(true);
    } catch (err) {
      setBalance('');
      setHasBalance(false);
      return;
    }
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {hasBalance && <p>This account has a balance of {balance} { }.</p>}
    </div>
  );
}

export default Balance;
