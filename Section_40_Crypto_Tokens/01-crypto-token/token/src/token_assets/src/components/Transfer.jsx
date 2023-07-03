import React, { useState } from "react";
import { canisterId, createActor } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [recipientId, setRecipientId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [onTransfer, setOnTransfer] = useState(false)
  const [resultMessage, setResultMessage] = useState('');

  async function handleClick() {
    if (!recipientId.length || !transferAmount.length) return;

    const amount = Number(transferAmount);
    if (amount <= 0) return;

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      }
    });

    setOnTransfer(true);
    const result = await token.transfer(Principal.fromText(recipientId), amount);
    setResultMessage(result)
    setOnTransfer(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                onChange={(e) => setRecipientId(e.target.value)}
                value={recipientId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                onChange={(e) => setTransferAmount(e.target.value)}
                value={transferAmount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button
            id="btn-transfer"
            onClick={handleClick}
            disabled={onTransfer}
          >
            Transfer
          </button>
        </p>
        <p>{resultMessage}</p>
      </div>
    </div>
  );
}

export default Transfer;
