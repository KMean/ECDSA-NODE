const express = require("express");
const cors = require("cors");
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const app = express();
const port = 3042;

// Middleware
app.use(cors());
app.use(express.json());

// Sample balances using public keys as keys
const balances = {
  "024d555bb3df1ba565d5456e664fed385e097478bf9c49ddea68043df35d821a7c": 100,
  "02cfe73ebd8776af5381f1c64deab8ceb286e07dadf55108a389c83df0169eadf1": 50,
  "03c0ba6e6f07eecadb1ce5114ddea458309c6a4b49d0e9cca312b40b51908fe2e5": 75,
};

// Helper function to set initial balance if address is not in the balances object
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

// Route to get balance of an address
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, message } = req.body;

  const messageHash = keccak256(utf8ToBytes(message));

  // Convert the sender address (public key) to Uint8Array
  const senderPublicKey = Uint8Array.from(Buffer.from(sender, 'hex'));

  // Convert BigInt signature components to Uint8Array
  const r = Buffer.from(signature.r.padStart(64, '0'), 'hex');
  const s = Buffer.from(signature.s.padStart(64, '0'), 'hex');

  // Reconstruct the signature for verification
  const signatureBuffer = Buffer.concat([r, s]);

  // Verify the signature
  const isValidSignature = secp256k1.verify(
    signatureBuffer, 
    messageHash, 
    senderPublicKey
  );

  if (!isValidSignature) {
    return res.status(401).send({ message: "Invalid signature" });
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!balances[sender] || balances[sender] < amount) {
    return res.status(400).send({ message: "Not enough funds" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    return res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
