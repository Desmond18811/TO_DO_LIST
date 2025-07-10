import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true,
        default:''
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo