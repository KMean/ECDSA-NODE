// Transfer.js
import { useState } from 'react';
import Sign from './Sign';
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isSigning, setIsSigning] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const handleTransferClick = () => {
    // Show the Sign component to sign the transaction
    setIsSigning(true);
  };

  const handleSign = async (signature, message) => {
    setIsSigning(false);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount, 10),
        recipient,
        signature,
        message
      });
      setBalance(balance);
    } catch (ex) {
      console.log(ex);
      alert(ex.response?.data?.message || 'Error during transaction');
    }
  };

  return (
    <div>
      {!isSigning ? (
        <form className="container transfer" onSubmit={(e) => e.preventDefault()}>
          <h1>Send Transaction</h1>
          
          <label>
            Send Amount
            <input
              placeholder="1, 2, 3..."
              value={sendAmount}
              onChange={setValue(setSendAmount)}
            />
          </label>

          <label>
            Recipient
            <input
              placeholder="Type an address..."
              value={recipient}
              onChange={setValue(setRecipient)}
            />
          </label>

          <button onClick={handleTransferClick} className="button">Transfer</button>
        </form>
      ) : (
        <Sign sender={address} amount={sendAmount} recipient={recipient} onSign={handleSign} />
      )}
    </div>
  );
}

export default Transfer;
