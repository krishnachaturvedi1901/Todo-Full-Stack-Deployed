const express=require('express')
const app=express()
const connect=require('./db/connect')

const todoRouter=require('./routes/todos.routes')

app.use(express.json())
app.use(todoRouter)

const port=Number(process.argv[2])||5001


connect().then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening to http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log('Cant start server due to failed db connection')
})