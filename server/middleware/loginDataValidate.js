const loginDataValidate = (req,res,next)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({
            success:false,
            message:"every field is required"
        })
    }
    next();
}

module.exports = loginDataValidate