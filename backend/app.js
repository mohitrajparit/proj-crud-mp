const express=require('express');
const app=express();
const tasks=require('./routes/tasks')
const connectDB = require('./db/connect');
require('dotenv').config();
const cors=require('cors');
//middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(cors())
//routes
app.use('/api/v1/tasks',tasks);
const port=process.env.port || 5000;
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(5000,(req,res)=>{
            console.log("`App is listening on port 5000")
        })
    }   
    catch(error){
        console.log(error);
    }
}
start();