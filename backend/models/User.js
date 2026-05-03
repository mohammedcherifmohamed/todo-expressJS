const mongoose = require('mongoose');

const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true,
    },

    email :{
        type:String ,
        unique:true,
        required:true,
    } ,
    password :String,
},{timestamps:true});



userSchema.pre('save',async function(next){

    if(!this.isModified('password')) return next();

    try{
        const salt = await bycrypt.genSalt(10);
        const hash = await bycrypt.hash(this.password,salt);
        this.password = hash ;
        next();
    }catch(err){
        console.log(err.message) ;
        //  return next(err); 
    }


});

const model =  mongoose.model('User',userSchema);

exports.User = model ;

