# Aphelion

**Aphelion** is a multi-functional Discord.js bot designed with a wide range of features, commands, and advanced mathematical algorithms. Whether you're managing a server, analyzing games, or exploring math tools, Aphelion brings it all into one package.

---

## Features

- **Utility Commands**  
  Aphelion includes a variety of utility commands to improve interactivity, diagnostics, moderation, and fun. Some highlights include:

  • `userinfo`, `serverinfo` – View Discord user and server stats  
  • `stats`, `ping`, `servers` – Server/bot/user diagnostics  
  • `clear`, `echo` – Useful moderation tools  
  • `avatar`, `stopwatch`, `grades`, `callsign` – Fun, yet functional tools  
  • `eval` – Live JS evaluation (dev-only, secure carefully)  
  • `salad` – Input and analyze Salad crypto mining data to determine profits  
  • … and many more!

- **Advanced Math Utilities**  
  It also includes a variety of mathematical algorithms and commands, including:

  • `pseudorandom` – Pseudorandom number generator using binary bitwise XOR operations  
  • `factors` – Calculate factors of numbers using efficient algorithms  
  • `root` – Calculate _n_th root of numbers  
  • `quadform` – Calculate roots of quadratic functions  
  • `fibonacci` – Generate numbers of the Fibonacci sequence  
  • `expressions` – Solve expressions following order of operations  
  • `pi` – Calculate digits of π using efficient algorithms  
  • … and many more.

- **Data Handling & Analysis**  
  JSON, TXT, and CSV files (e.g., `bjdata.csv`, `bjdata.txt`, `invisusers.json`) are used for logging, configuration, and custom data parsing.

- **Custom Configuration**  
  Easily adjustable settings via `config.json`.

---

## Technologies Used

- **Node.js**
- **Discord.js**
- JSON, CSV for data files
- Custom math algorithms and utility modules

---

## Installation

```bash
# Clone the repo
git clone https://github.com/krishs505/aphelion.git
cd aphelion

# Install dependencies
npm install
```

---

## ▶Usage

Create your `dev-config.json` with your Discord bot token and other settings, then start the bot:

```bash
node index.js
```

---
