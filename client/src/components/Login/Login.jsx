import { useState } from "react"
import { toast } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

import './Login.css'

function Login() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const loginUser = async (e) => {
        e.preventDefault()
        const { username, password } = data
        try {
            const { data } = await axios.post('/login', {
                username, password
            })

            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('login success')
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            // toast.error(data.error)
        }

    }

    return (
        <>
            <div className="main">
                <div className="login-header"><h1>Instagram login</h1></div>
                <div className="form">
                    <form onSubmit={loginUser} className="login-form">
                        {/* <label></label> */}
                        <input type="text" placeholder="Enter username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />

                        {/* <label>Password</label> */}
                        <input type="password" placeholder="Enter user password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div className="forget-pass">Forgot Password? </div>
                <div className="or-container">
                    <span className="or-line"></span>
                    <span className="or-text">OR</span>
                    <span className="or-line"></span>
                </div>
            </div>
            <div className="signup">Don't have an account ?<Link to={'/signup'}><span>Sign up</span></Link> </div>
        </>
    )

}
export default Login
