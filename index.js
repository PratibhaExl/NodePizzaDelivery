import express from 'express';
import AuthRoutes from './routes/AuthRoutes.js';
import ProdRoutes from './routes/ProductRoutes.js';
import dbconnection from './db_connection.js';
import cors from 'cors';
const PORT=6677;
const app=express();
dbconnection();
app.use(express.json());//parse all body request 
app.use(express.static('assets'));
app.use(cors());
//importing routes

//http://localhost:6677/api/v1/auth/signin
app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/products",ProdRoutes);
app.use((req,res)=>{
    res.status(404).json({"msg":"Not Found"})
 })
app.listen(PORT,(err)=>
{
    if(err) throw err;
    console.log(`Server work on ${PORT}`)
})