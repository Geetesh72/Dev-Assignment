

const {readTodo,writeTodo} =require('../utils/fileHandler.js')

// GET /todos - list all todos
const getTodos = async (req,res)=>{
    const todos = await readTodo();
    res.json(todos);
}


// POST /todos - add a new todo

const addTodo = async(req,res)=>{
    const {task} = req.body;
    if(!task || task.trim()===''){
        return res.status(400).json({error:"Task is Required"})
    }

    const todos = await readTodo();
    const duplicate = todos.find(
        (t)=>t.task.trim().toLowerCase()===task.trim().toLowerCase()
    )

    if(duplicate){
        return res.status(409).json({error:"Task Already exits"})
    }

    todos.push({task,done:false});
    await writeTodo(todos);
    res.status(201).json({message:"Todo add succesfully.",task})

}


// put / todo/id

const updateTodo = async(req,res)=>{
    const {id} = req.param;
    const {task} = req.body;
    const todos = await readTodo();

    const index = parseInt(id) // if id in string we need to have it in int
    if(isNaN(index) || index<0 || index>=todos.length){
        return res.status(404).json({eror:"Invalid index"})

    }
    if (!task || task.trim() === "") {
        return res.status(400).json({ error: "Task is required." });
    }

    const oldTask = todos[index].task
    todos[index].task = oldTask
    await writeTodo(todos)
    
    res.json({
        message:"Todo updated successfully",
        from:oldTask,
        to:task
    })

}

const markTodoDone = async (req,res)=>{
    const {id} = req.param;
    const todos = await readTodo();
    const index = parseInt(id)

    if(isNaN(index || index<0 || index>=todos.length)){
        return res.status(404).json({error:"Invalid index"})
    }

    todos[index].done = true;
    await writeTodo(todos);
    res.json({ message: `Marked as done: "${todos[index].task}"` });
}

const deleteTodo = async(req,res)=>{
    const {id} = req.param;
    const todos = await readTodo();

    const index = parseInt(id)
     if (isNaN(index) || index < 0 || index >= todos.length) {
        return res.status(404).json({ error: "Invalid index." });
    }
    const removed = todos.splice(index,1);
    await writeTodo(todos);

    
    res.json({ message: `Deleted: "${removed[0].task}"` });

}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    markTodoDone,
    deleteTodo,
};