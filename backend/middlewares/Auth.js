
const jwt = require('jsonwebtoken');
const {User} = require('../models/User') ;

const auth = async(req,res,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try{
            const token = req.header('Authorization').replace('Bearer',' ').trim();
            
            const decoded = jwt.verify(token,env.process.JWT_SECRET) ; 
            
            req.user = await User.findById(decoded.id).select('-password');

            return next();
            
        }catch(err){
            console.log(err.message) ;
            res.status(500).json({message:err.message})
        }
    }
    return res.status(401).json({message:"Not Authorized"});
}

module.exports = { auth };
