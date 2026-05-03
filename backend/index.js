require('dotenv').config();

const jwt = require('jsonwebtoken');

const {auth} = require('./middlewares/Auth') ;

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

const {name,email,password} = req.body ;

    try{
        if(!email || !password){
            return res.status(400).json({message:"Please provide email and password"}) ;
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"}) ;
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"}) ;
        }
        console.log(user);
        const token = generateToken(user._id) ;
        res.status(200).json({
            id:user._id,
            name:user.name,
            email:user.email,    
            token
        })
    }catch(err){
        console.log(err.message) ;
    }

})

app.get('/me',auth,async(req,res)=>{

    res.status(200).json({message:'You are Authenticated ,This is the protected route'}) ;
    
})

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}


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