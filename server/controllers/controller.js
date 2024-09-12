const userModel = require('../model/userSchema.js')
const bcrypt = require('bcrypt')
// const JWT =require('jsonwebtoken')
exports.home = (req, res) => {
    res.send("<h1>Home response</h1>")
}

exports.signUp = async (req, res) => {
    // const {name,username,email,password,bio} = req.body;
    try {
        const userInfo = userModel(req.body)
        const result = await userInfo.save()
        console.log(userInfo)
        return res.status(200).json({
            success: true,
            data: result
        })


    } catch (error) {
        if (error.code === 11000) {
            console.log(error);

            res.status(400).json({
                success: false,
                message: 'duplicate entry'
            })
        }
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    //making a varibale and store user id from somewhere
    //req.user takes user information using middleWare
    const userId = req.user.id
    try {
        const user = await userModel.findById(userId).select('-password')
        console.log(user);

        return res.status(200).json({
            success: true,
            message: 'authentication succesfull',
            user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel
            .findOne({ username })
            .select('+password')

        // if(!user || await bcrypt.compare(user.password,password)){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Invalid credentials"
        //     })
        // }

        if (!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //token
        const token = user.jwtToken()
        user.password = undefined

        //cookieOption
        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        //set a cookie
        console.log(user);

        res.cookie("token", token, cookieOptions)
        res.status(200).json({
            success: true,
            message: 'login Success!!'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

exports.logout = (req, res) => {
    try {
        const cookieOptions = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOptions)
        return res.status(200).json({
            success: true,
            message: "logged out!!"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

