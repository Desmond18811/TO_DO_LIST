import Todo from '../models/Todo.js';

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        res.status(200).json(todo);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const createTodo = async(req, res) => {
    try {
        const {title, description} = req.body;
        if(!title) {
            return res.status(400).json({message: 'Title required'});
        }
        const todo = new Todo({
            title,
            description: description || ''
        });
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const updateTodo = async(req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if(!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        if(req.body.title) todo.title = req.body.title;
        if(req.body.description) todo.description = req.body.description;
        if(req.body.completed !== undefined) todo.completed = req.body.completed;

        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({message: 'Todo not found'});
        }
        await todo.deleteOne();
        res.status(200).json({message: 'Todo deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};