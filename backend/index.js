

const  express = require('express') ;
const cors = require('cors') ;
const  todosRoutes = require('./routes/todosRoutes') ;

const app = express() ;

app.use(cors());
app.use(express.json()) ;


app.use("/todos",todosRoutes)

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})