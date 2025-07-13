const fs = require('fs').promises
const {existsSync} = require('fs')

const todo_file = 'todos.json'


async function readTodo() {
    if(!existsSync(todo_file))return [];
    const data = await fs.readFile(todo_file,'utf-8');
    return JSON.parse(data);
}


async function writeTodo(todos) {
    await fs.writeFile(todo_file,JSON.stringify(todos,null,4));

    
}

module.exports ={readTodo,writeTodo};


