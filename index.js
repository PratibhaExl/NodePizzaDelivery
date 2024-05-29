
import express from 'express';
import AuthRoutes from './routes/AuthRoutes.js';
import ProdRoutes from './routes/ProductRoutes.js';
import ProfileRoutes from './routes/ProfileRoutes.js';
import ChangePassRoutes from './routes/PasswordRoutes.js';

import dbconnection from './db_connection.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT=6677;
const app=express();
dbconnection();
app.use(express.json());//parse all body request 
app.use(express.static('assets'));
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//http://localhost:6677/api/v1/auth/signin
app.use("/api/v1/auth",AuthRoutes);
app.use("/api/v1/products",ProdRoutes);
app.use("/api/v1/profile",ProfileRoutes);
app.use("/api/v1/profile",ChangePassRoutes);



app.use((req,res)=>{
    res.status(404).json({"msg":"Not Found"})
 })
app.listen(PORT,(err)=>
{
    if(err) throw err;
    console.log(`Server work on ${PORT}`)
})

