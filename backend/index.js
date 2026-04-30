

const  express = require('express') ;
const cors = require('cors') ;
const  todosRoutes = require('./routes/todosRoutes') ;

const app = express() ;

const mongoose = require('mongoose');

const {Article} = require("./models/Article");


mongoose.connect('mongodb://mohamed:mohamed123@ac-vpdlzzn-shard-00-00.jmriatw.mongodb.net:27017,ac-vpdlzzn-shard-00-01.jmriatw.mongodb.net:27017,ac-vpdlzzn-shard-00-02.jmriatw.mongodb.net:27017/?ssl=true&replicaSet=atlas-1448pw-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{

    console.log("Connected to MongoDB");

}).catch((err)=>{
    console.log(err.message);
})

app.use(cors());
app.use(express.json()) ;


app.use("/todos",todosRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})