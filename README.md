# decentralized_voting_system

1. Vishal Panchal - 884467812 - vishal.panchal@csu.fullerton.edu
2. Adarsh Pakala - 884436049 - adarsh.pakala@csu.fullerton.edu

Project Link:
https://github.com/Vishal2504/decentralized_voting_system

Project:
Created this project from scratch

Dscription:

The Decentralized Voting System built on the Ethereum blockchain offers a secure, transparent, and tamper-resistant platform for conducting elections. It allows users to vote remotely while preserving anonymity and safeguarding against fraud. By leveraging blockchain technology, the system ensures integrity and trust in the electoral process.

Features
 - Secure voter authentication and access control using JWT (JSON Web Tokens).
 - Immutable and transparent vote recording powered by the Ethereum blockchain.
 - Eliminates intermediaries to enable a fully trustless and decentralized voting process.
 - Admin dashboard for managing candidates, configuring voting timelines, and tracking results.
 - User-friendly interface allowing voters to easily cast their votes and view candidate details.


## Installation & Setup Guide

Follow the steps below to run the **Decentralized Voting System** on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Vishal2504/decentralized_voting_system.git
cd decentralized_voting_system
```

### 2. Install Ganache

* Download and install **[Ganache](https://trufflesuite.com/ganache/)**.
* Create a new workspace named `development`.
* In the Truffle projects section, click **ADD PROJECT** and select the `truffle-config.js` file from the root of the repo.

### 3. Set Up MetaMask

* Install the **[MetaMask browser extension](https://metamask.io/)**.
* Create a wallet or use an existing one.
* Import accounts from Ganache into MetaMask.
* Add a custom network in MetaMask:

  * **Network Name**: Localhost 7575
  * **RPC URL**: `http://localhost:7545`
  * **Chain ID**: `1337`
  * **Currency Symbol**: `ETH`

### 4. Set Up MySQL

* Open **MySQL**.
* Create a new database named `voter_db`:

```sql
CREATE DATABASE voter_db;
```

* Inside the database, create a `voters` table:

```sql
CREATE TABLE voters (
    voter_id VARCHAR(36) PRIMARY KEY NOT NULL,
    role ENUM('admin', 'user') NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

* Insert some test voter records.

### 📦 5. Install Node and Python Dependencies

* **Install Truffle globally**:

```bash
npm install -g truffle
```

* **Install Node.js dependencies**:

```bash
npm install
```

* **Install Python dependencies**:

```bash
pip install fastapi mysql-connector-python pydantic python-dotenv uvicorn uvicorn[standard] PyJWT
```

---

## 🧪 Running the Project

> ⚠️ **Make sure to update your MySQL credentials in** `./Database_API/.env`.

### ▶️ 1. Start Ganache

* Launch **Ganache** and open the `development` workspace.

### 🔨 2. Compile Smart Contracts

```bash
truffle console
compile
.exit
```

### 📦 3. Bundle Frontend Files Using Browserify

```bash
browserify ./src/js/app.js -o ./src/dist/app.bundle.js
```

### 🌐 4. Start the Node Server

```bash
node index.js
```

### 🛡 5. Start the Database API with FastAPI

```bash
cd Database_API
uvicorn main:app --reload --host 127.0.0.1
```

### 📤 6. Deploy Smart Contracts

```bash
truffle migrate
```

---

## Done!

Your decentralized voting system is now live at:

> http://localhost:8080/

