

const  express = require('express') ;
const cors = require('cors') ;
const  todosRoutes = require('./routes/todosRoutes') ;

const app = express() ;
app.set('view engine', 'ejs');
const mongoose = require('mongoose');

const Article = require("./models/Article");


mongoose.connect('mongodb://mohamed:mohamed123@ac-vpdlzzn-shard-00-00.jmriatw.mongodb.net:27017,ac-vpdlzzn-shard-00-01.jmriatw.mongodb.net:27017,ac-vpdlzzn-shard-00-02.jmriatw.mongodb.net:27017/?ssl=true&replicaSet=atlas-1448pw-shard-0&authSource=admin&appName=Cluster0')
.then(()=>{

    console.log("Connected to MongoDB");

}).catch((err)=>{
    console.log(err.message);
})

app.use(cors());
app.use(express.json()) ;


app.use("/todos",todosRoutes)

app.post('/article',async (req,res)=>{
    try{

        const NewArticle = new Article();
        NewArticle.title = "Does Ai will replace human in the future?" ;
        NewArticle.description = "In this article we will discuss about the future of Ai and its impact on human life." ;
        NewArticle.likes = 29 ;
        await NewArticle.save() ;

        res.json(NewArticle) ;
        console.log("   Article created successfully") ;

    }catch(err){    
    
        console.log(err.message) ;
        res.status(500).json({message:err.message})

    }
})
 

app.get('/articles',async(req,res)=>{

    try{

        const articles = await Article.find();

        console.log(articles) ;
        res.render('articles.ejs' , {allArticles:articles});
    }catch(err){
        console.log(err.message) ;
    }
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})