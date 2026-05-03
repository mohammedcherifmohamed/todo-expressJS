require('dotenv').config();


const  express = require('express') ;
const cors = require('cors') ;

const {User} = require('./models/User');

const  todosRoutes = require('./routes/todosRoutes') ;

const app = express() ;
app.set('view engine', 'ejs');

const  connectDB = require('./db' );

connectDB() ;
const mongoose = require('mongoose');

const Article = require("./models/Article");


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



app.post('/register',async (req,res)=>{

    try{
        const {name,email,password} = req.body;
        const user = new User({
            name,email,password
        })
        await user.save();
        console.log(user);
        res.json({message:"User registered successfully"}) ;
    }catch(err){
        console.log(err.message) ;
    }


})

app.post('/login',async (req,res)=>{

    try{
        const {name,email,password} = req.body;
        const user = await User.findOne({email});
        console.log(user);
        res.json({message:"User logged in successfully"}) ;
    }catch(err){
        console.log(err.message) ;
    }


})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})