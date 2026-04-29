const express = require("express") ;

import cors from 'cors';
import todoRoutes from './routes/todosRoutes.js';

const app = express() ;

app.use(cors());
app.use(express.json()) ;


app.use("/todos",todosRoutes)
app.get("/",(req,res)=>{
    res.send("Welcome In Home Page")
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})