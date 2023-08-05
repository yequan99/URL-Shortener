import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

import UserLogin from '../api/LoginAPI'
import { UserLoginCredentials } from '../type/struct'

export default function Login() {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<UserLoginCredentials>({ username: "", password: ""})
    const [invalid, setInvalid] = useState<boolean>(false)

    const Login = async (e: FormEvent) => {
        const response = await UserLogin(credentials)
        if (response.status !== 200) {
            setInvalid(true)
        } else {
            // Storing JWT Token
            console.log("Token:", response.data.token)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userID', response.data.userID)
            navigate("/")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        setInvalid(false)
    }

    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="text-3xl font-extrabold pb-8">Welcome to URL Shortener!</div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="flex flex-col justify-center items-center px-6 py-4">
                    <div className="font-bold text-xl mb-2">Sign in to your account</div>
                    <form>
                        <div className="py-2">
                            <TextField
                                sx={{ width: 200 }}
                                label="Username"
                                size="small"
                                type="text"
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-2">
                            <TextField
                                sx={{ width: 200 }}
                                label="Password"
                                size="small"
                                type="password"
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-2">
                            <Button variant="contained" sx={{ width: 200 }} onClick={Login}>Login</Button>
                        </div>
                        <div className={`text-red-600 text-sm ${invalid === true ? "" : "hidden"}`}>
                            Invalid Username/Password!
                        </div>
                    </form>
                    <div className="flex flex-row py-2 text-sm">
                        <p className="pr-1">Don't have an account yet?</p>
                        <button className="text-blue-500 underline" onClick={() => navigate("/register")}>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}