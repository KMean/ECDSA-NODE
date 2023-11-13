## Alchemy University - My Solution for Week 1 

The primary goal of this project is to familiarize ourselves with public key cryptography, specifically focusing on the process of digitally signing a message and having a server verify (recover your address) to confirm that the message has been authenticated by the corresponding private key.

For this project, I utilized the ethereum-cryptography library (ethereum/js-ethereum-cryptography), as recommended in the course, to create some private and public key pairs for experimentation. Keep in mind that these keys are purely for mock purposes (NEVER EVER EXPOSE YOUR REAL PRIVATE KEYS ONLINE!!!). Here are some example key pairs you can use to experiment with:

Private key 1: 1e4e707334cebca68580b6b8188c8a005308451286f35eda00dc4261c5c89514

Public key 1: 024d555bb3df1ba565d5456e664fed385e097478bf9c49ddea68043df35d821a7c

Private key 2: 9deb336de1c87465a16202fc7c3b1490bce10cfcdc389d6890d435c290d9af7e

Public key 2: 02cfe73ebd8776af5381f1c64deab8ceb286e07dadf55108a389c83df0169eadf1

Private key 3: a3dd1396b0cf26635990ac171cfed8b8af7e5ce1e5a0017259d3e8ccbe27d736

Public key 3: 03c0ba6e6f07eecadb1ce5114ddea458309c6a4b49d0e9cca312b40b51908fe2e5

Feel free to use these public-private pairs for testing.

Instead of integrating a signature field into the Wallet or Transfer components, I decided to create a new Sign component. This component is triggered when a user clicks on "transfer", more closely simulating a real-world scenario. After the private key is used to sign the message, it is sent to the server, which then verifies the signature.

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
