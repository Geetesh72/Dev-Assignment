const express = require('express')
const todoRoutes = require('./routes/todoRoutes')

const app = express();

const PORT = 3000;
//middlerware
app.use(express.json());
// Routes
app.use('/todos', todoRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})
