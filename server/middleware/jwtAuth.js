//middleware to get execute before getUser
const JWT = require('jsonwebtoken')

//it has 3 components ,next is used to move executon to next part 
//when your job is done, and to ensure youre not stuck at a point
const jwtAuth = (req, res, next) => {
    //implementation
    //1. verify token
    //2. inject user info in req
    const token = (req.cookies && req.cookies.token) //tokens are stored in cookies

    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Not Authorized!"
        })
    }
    //if token exits
    try {
        //1. verify the token is valid or not
        // & if token is valid please extract the info and put into req
        const payload = JWT.verify(token,process.env.SECRET)//secret key is used to verify
        console.log(payload);
        
        //if this was valid ,punch the user info in req,.user
        req.user = payload

    } catch (error) {
        // console.log(`middleware error`)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
    next();
};

module.exports = jwtAuth;