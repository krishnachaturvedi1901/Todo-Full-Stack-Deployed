const mongoose=require('mongoose')
require('dotenv').config();
const USERNAME=process.env.USERNAME_MONGODB
const PASSWORD=process.env.PASSWORD_MONGODB
async function connect(){

    const DB=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.bqgh28s.mongodb.net/todosdb?retryWrites=true&w=majority`
    mongoose.connect(DB).then(()=>{
        console.log('Connected to DB.')
    }).catch((err)=>{
        console.log('Error in connection to db',err)
    })
    

}
module.exports=connect