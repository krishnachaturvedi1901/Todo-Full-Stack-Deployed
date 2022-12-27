const express=require('express')
const router=express.Router()

const {getAllTodos,getTodosById,updateTodoById,deleteTodobyId,addTodos}=require('../db/dbFunctions')

router.get('/todos',async(req,res)=>{
    const {
        page=1,pageLimit=2,status='',tag=''
    }=req.query

    const {todos,totalTodos}=await getAllTodos({page,pageLimit,status,tag})
    res.send({data:todos,totalTodos})
    console.log('Get the response for getAllTodos-todos fetched')
})
router.get('/todos/:todoID',async(req,res)=>{
    const id=req.params.todoID

    let todo=null;
    try {
       todo=await getTodosById(id)
    } catch (error) {
        console.log(err.message)
        return res.status(500).send({message:'Unexpected id/token send to db server run into error'})
    }
    if(todo){
        return res.send({data:todo})
    }
    else{
        return res.status(404).send({message:'Todo with given id does not exist'})
    }
})

router.post('/todos',async(req,res)=>{
    const todoData=req.body

    let todo=null
    try {
        todo=await addTodos(todoData)
    } catch (error) {
       console.log(error.message) 
       return res.status(500).send({
        message:'Server ran into error-might be u send todoData entries with wrong data type'
       })
    }
    return res.send({data:todo})
})

router.patch('/todos/:todoID',async(req,res)=>{
    const id=req.params.todoID
    const updatedTodo=req.body
    
    let todo=null
    try {
      todo=await updateTodoById(id,updatedTodo)
    } catch (error) {
        console.log(error.message) 
        return res.status(500).send({
         message:'Server ran into error-might be u send todoData entries with wrong data type or id not valid'
        })
     }
     if(todo){
        return res.send({data:todo})
     }
     else{
        return res.status(404).send({message:'Todo with given id does not exist to update'})
     }
})

router.delete('/todos/:todoID',async(req,res)=>{
     const id=req.params.todoID
     let todo=null
     try {
      todo=await deleteTodobyId(id)
     } catch (error) {
        console.log(error.message)
        return res.status(500).send({
            message:'Server ran into error-might be u send todoData entries with wrong data type or id not valid'
        })
     }
     if(todo){
        return res.send({data:todo})
     }
     else{
        return res.status(404).send({
            message:'Todo with given id does not exist to delete'
        })
     }
})

module.exports=router