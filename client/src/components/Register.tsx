import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Alert, CircularProgress } from '@mui/material'
import { TiArrowBack } from 'react-icons/ti'

import UserRegistration from '../api/RegisterAPI'
import { UserLoginCredentials } from '../type/struct'

export default function Register() {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<UserLoginCredentials>({ username: "", password: ""})
    const [invalid, setInvalid] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)

    const Register = async (e: FormEvent) => {
        const response = await UserRegistration(credentials)
        if (response.status !== 200) {
            setInvalid(true)
        } else {
            setSuccess(true)
            setTimeout(() => navigate("/login"), 3000)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        setInvalid(false)
    }

    return (
        <>
            <div className="mt-4 ml-4 cursor-pointer" onClick={() => navigate("/login")}>
                <TiArrowBack />
            </div>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="text-3xl font-extrabold pb-8">Sign up to URL Shortener</div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <div className="flex flex-col justify-center items-center px-6 py-4">
                        <form>
                            <div className="py-2">
                                <TextField
                                    label="Username"
                                    size="small"
                                    type="text"
                                    name="username"
                                    sx={{ width: 200 }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <TextField
                                    label="Password"
                                    size="small"
                                    type="password"
                                    name="password"
                                    sx={{ width: 200 }}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="py-2">
                                <Button variant="contained" sx={{ width: 200 }} onClick={Register}>Register</Button>
                            </div>
                            <div className={`text-red-600 text-sm ${invalid === true ? "" : "hidden"}`}>
                                Username taken
                            </div>
                        </form>
                    </div>
                </div>
                <div className={`pt-4 ${success === true ? "" : "hidden"}`}>
                    <Alert severity="success">
                        <div className="flex flex-row">
                            <p className="pr-4">Account registered! Redirecting you to login page</p>
                            <CircularProgress color="success" size="1rem" />
                        </div>
                    </Alert>
                </div>
            </div>
        </>
    )
}