# 📝 Filesystem-based Todo CLI

A simple command-line application to manage your todos directly from the terminal.  
Built using **Node.js** and the **Commander.js** library.

---

## ⚙️ Features

- ✅ Add a new todo
- 🗑️ Delete a todo by index
- ✏️ Edit a todo by index
- ✅ Mark a todo as done
- 📋 List all todos
- 🚫 Prevent duplicate tasks
- 💾 Data is stored in a local `todos.json` file (not committed to Git)

---

## 🧰 Technologies Used

- **Node.js** for scripting
- **Commander.js** for CLI command handling
- **fs/promises** and `fs.existsSync` for file operations

---

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Geetesh72/todo-cli.git
   cd todo-cli
2 **Install dependencies**
   npm install
3 Run The CLI   
 node index.js <command> [arguments]


How commander is used and why
🔹 What is Commander?
Commander.js is a lightweight, powerful library for building CLI applications in Node.js.
It simplifies the process of:

    Defining commands

    Parsing arguments

    Displaying help menus

🔧 How it works in this project

/*
    const { Command } = require('commander');
const program = new Command();

program
  .name("todo")
  .description("Filesystem based todo CLI")
  .version("3.0.0");

program
  .command("add")
  .argument("<task>")
  .action((task) => {
    // logic here
  });

program.parse();

*/

 Why use Commander?
Makes CLI interfaces easy to structure

Handles command arguments, help output, version info automatically

Cleaner and more scalable than manually parsing process.argv

FILE STUCTURE

todo-cli/
├── index.js          # Main CLI logic
├── package.json      # Dependencies
├── .gitignore        # Ignores node_modules and todos.json
└── todos.json        # Dynamic todo storage (auto-created)
