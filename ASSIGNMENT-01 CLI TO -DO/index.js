const fs = require('fs').promises
const {Command} = require('commander')
const {existsSync} = require('fs')
const program = new Command();

const todo_file = 'todos.json'

async function readTodo(){
    if(!existsSync(todo_file))return [];
    const data = await fs.readFile(todo_file,'utf-8');
    const todo =  JSON.parse(data);
    return todo;
}

async function writeTodo(todos) {
    await fs.writeFile(todo_file,JSON.stringify(todos,null,4))
}


program
    .name("todo")
    .description('Filesystem based todo CLI')
    .version('3.0.0')


program 
    .command("add")
    .description('Add a new Todo')
    .argument('<task>','Task description')
    .action (async(task)=>{
        const todos = await readTodo();
        const duplicate = todos.find(todo=>todo.task.trim().toLowerCase()===task.trim().toLowerCase())

        if(duplicate){
            console.log("Task already exits");
            return
        }
        else{
            todos.push({task,done:false});
            await writeTodo(todos);
            console.log(`Added::${task}`);
            

        }
    })

program
    .command('delete')
    .description('Delete a todo by index')
    .argument('index','Index of todo to delete')
    .action(async(index)=>{
        const todos = await readTodo()
        if(index<0 || index>=todos.length){
            console.log("Invalid index");
            return;
        }
        const removed = todos.splice(index,1);
        await writeTodo(todos);
        console.log(`Delete: ${removed[0].task}`);
    })
// done

program
    .command('done')
    .description('Mark to do is done')
    .argument('index','Coresponding indexed todo is done')
    .action(async(index)=>{
        const todos = await readTodo();
        if(index<0 || index>=todos.length)
        {
            console.log("Invalid Index");
            return
        }
        todos[index].done = true
        await writeTodo(todos)
        console.log(`Marked Done ${todos[index].task}`);
        
    })

program
    .command('edit')
    .description('Edit a todo task')
    .argument('index','Provide index that have to delete')
    .argument('task','task that will edited')
    .action(async(index,newtask)=>{
        const todos = await readTodo()
        if(index<0 || index>=todos.length)
        {
            console.log("Invalid index");
            return
        }
        const oldTask = todos[index].task;
        todos[index].task = newtask
        await writeTodo(todos);
        console.log(`Edited: "${oldTask}"-> "${newtask}"`);
        
    })


// List 
program
    .command('list')
    .description('List all todos')
    // no argument required cause it return all todo 
    .action(async()=>{
        const todos = await readTodo();
        if(todos.length==0){
            console.log('No todo Found');
            
        } 
        for(let i = 0;i<todos.length;i++){
            const status = todos[i].done?"Well Done":"Its nice try"
            console.log(`${i}.${status} -> ${todos[i].task}`);
            
        }
    })


program.parse()    