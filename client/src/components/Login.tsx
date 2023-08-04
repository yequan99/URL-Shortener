import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import urlshortenerLogo from '../assets/urlshortener.png'

export default function Login() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex justify-center items-center w-[50%] bg-blue-600">
                <img className="w-[80%]" src={urlshortenerLogo} alt="logo" />
            </div>
            <div className="flex justify-center items-center w-[50%]">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="flex flex-col justify-center items-center px-6 py-4">
                        <div className="font-bold text-xl mb-2">Sign in to your account</div>
                        <form>
                            <div className="py-2">
                                <TextField
                                    label="Username"
                                    size="small"
                                    type="text"
                                    name="Username"
                                    sx={{ width: 200 }}
                                />
                            </div>
                            <div className="py-2">
                                <TextField
                                    label="Password"
                                    size="small"
                                    type="password"
                                    name="Password"
                                    sx={{ width: 200 }}
                                />
                            </div>
                            <div className="py-2">
                                <Button variant="contained" sx={{ width: 200 }}>Login</Button>
                            </div>
                        </form>
                        <div className="flex flex-row py-2 text-sm">
                            <p className="pr-1">Don't have an account yet?</p>
                            <button className="text-blue-500 underline" onClick={() => navigate("/register")}>Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}