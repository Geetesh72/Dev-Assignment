const express = require('express')

const router = express.Router();

const {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    markTodoDone
} = require('../controllers/todoController')


router.get('/',getTodos)
router.post('/',addTodo)
router.put('/:id',updateTodo)
router.patch('/:id/done',markTodoDone)
router.delete('/:id',deleteTodo)

module.exports = router;