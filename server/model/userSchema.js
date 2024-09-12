const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const userModel = new mongoose.Schema({
    name: {
        type:String
    },
    username:{
        type:String,
        unique:true,
    },
    email:{
        type:String
    },
    password:{
        type:String,
        select:false,
    },
    bio:{
        type:String
    },
    // avatar:{}
},{
    timestamps:true
})
//encrypting password
userModel.pre("save",async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    return next();
})

userModel.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this._id,email:this.email,username:this.username},
            process.env.SECRET,
            { expiresIn: '24h' })
    }
}

module.exports = new mongoose.model('insta',userModel)