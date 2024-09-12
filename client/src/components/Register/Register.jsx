import { useState } from "react"
import axios from "axios"
import { toast } from 'react-hot-toast'
import { useNavigate , Link} from "react-router-dom"
import './Register.css'


function Register() {

    const navigate = useNavigate()
    const [data, setData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        bio: ''
    })

    const RegisterUser = async (e) => {
        e.preventDefault();
        const { name, email, username, password, bio } = data;
        try {
            const { data } = await axios.post('/signup', {
                name, email, username, password, bio
            })
            if (data.error) {
                toast.error(data.error)
            }
            else {
                setData({});
                toast.success('register success')
                navigate('/login')

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="signup-box">
                <div>
                    <h1>Instagram Signup</h1>
                </div>
                <div>
                    <form onSubmit={RegisterUser} className="signup-form">
                        {/* <label>Name</label> */}
                        <input type="text" placeholder="Enter user name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

                        {/* <label>Username</label> */}
                        <input type="text" placeholder="Enter desired username" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />

                        {/* <label >email</label> */}
                        <input type="email" placeholder="Enter user email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

                        {/* <label>Password</label> */}
                        <input type="password" placeholder="Enter user password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

                        {/* <label>Bio</label> */}
                        <input type="text" placeholder="Enter user Bio" value={data.bio} onChange={(e) => setData({ ...data, bio: e.target.value })} />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="login">Have an account ?<Link to={'/login'}><span>Log in</span></Link> </div>
        </>
    )
}
export default Register