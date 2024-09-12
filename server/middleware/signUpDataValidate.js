const signUpDataValidate = (req,res,next)=>{
    const {name,username,password,email,bio} = req.body

    if(!name || !username || !password || !email || !bio){
        res.status(400).json({
            success:false,
            message:"all fields are required!!"
        })
    }

    next();
}

module.exports = signUpDataValidate