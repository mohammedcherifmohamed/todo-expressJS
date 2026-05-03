const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

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
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password,salt);
        this.password = hash ;
        next();
    }catch(err){
        console.log(err.message) ;
        //  return next(err); 
    }
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const model =  mongoose.model('User',userSchema);

exports.User = model ;

