const mongoose=require('mongoose')

const TodoSchema=new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    tag:String,
    status:String
},{
    timestamps:true
})

const Todos=mongoose.model('todos',TodoSchema)

async function getAllTodos({page,pageLimit,status,tag}){
    let limit=Number(pageLimit)
    let skip=Number(pageLimit)*(Number(page)-1)
    const totalTodos=await Todos.find().count()
    const todos=await Todos.find(
        status&&tag?{status:status,tag:tag}:
        status?{status:status}:
        tag?{tag:tag}:{}
        ).skip(skip).limit(limit)
    return {todos,totalTodos}
    
}

async function getTodosById(id){
    return Todos.findById(id)
}

async function addTodos(todoData){
    let todo=await Todos.create(todoData)
    todo=await Todos.findById(todo._id)
    return todo
}

async function deleteTodobyId(id){
    let todo=await Todos.findById(id)
    if(todo){
        await todo.delete()
        todo=todo.toJSON()
        return todo
    }
    else{ return null }
}
async function updateTodoById(id,todoData){
    let todo=await Todos.findById(id)

    if(todo){
        for(const[key,value] of Object.entries(todoData)){
            todo[key]=value
        }
        await todo.save()
        todo=todo.toJSON()
        return todo
    }
    else{
        return null
    }
}

module.exports={
    Todos,getAllTodos,getTodosById,updateTodoById,deleteTodobyId,addTodos
}