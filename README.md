# Aphelion

**Aphelion** is a multi-functional Discord.js bot designed with a wide range of features, commands, and advanced mathematical algorithms. Whether you're managing a server, analyzing games, or exploring math tools, Aphelion brings it all into one extensible package.

---

## Features

- **Game Analysis & Tools**  
  Includes built-in support for classic games like:
  - Connect Four (`connect4.json`)
  - Tic Tac Toe (`ttt.json`)
  - Wordle (`wordle.json`)

- **Advanced Math Utilities**  
  Located in the `commands/Math/` directory, these modules include:
  - Pseudorandom number generation
  - Square roots, cube roots, and root simplification
  - Factorization and common factors
  - Equation solving (including quadratic formulas)
  - Calculating digits of π
  - Coordinate geometry (distance, midpoint, slope)

- **Data Handling & Analysis**
  JSON, TXT, and CSV files (e.g., `bjdata.csv`, `bjdata.txt`, `invisusers.json`) are used for logging, configuration, and custom data parsing.

- ⚙️ **Custom Configuration**
  Easily adjustable settings via `config.json`, `settings.json`, and other structured files.

---

## 📁 Project Structure (Simplified)

```
aphelion-main/
├── index.js                # Main bot entry point
├── package.json            # Node.js metadata and dependencies
├── commands/Math/          # Core mathematical command modules
├── *.json                  # Game data, config, invis users, etc.
├── exports.js              # Exports or utilities
├── Procfile                # Heroku deployment config
└── .gitignore              # Git exclusions
```

---

## 🧠 Technologies Used

- **Node.js**
- **Discord.js**
- JSON, CSV for data files
- Custom math algorithms and utility modules

---

## 🧮 Math Commands Highlights

Each command in `commands/Math/` can be invoked by users to perform quick and accurate mathematical computations, such as:

- `quadform` – Solve quadratic equations
- `fibonacci` – Generate numbers of the Fibonacci sequence
- `factors` - Calculate factors of a number using efficient algorithms
- `simplifyfraction` – Simplify fractions
- `repeatingtofrac` – Convert repeating decimals to fractions  
- `pi` – Return digits of π
- ... and many more.

---
