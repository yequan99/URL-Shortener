import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'
import { TiArrowBack } from 'react-icons/ti'

export default function Register() {

    const navigate = useNavigate()

    return (
        <>
            <div className="mt-4 ml-4 cursor-pointer" onClick={() => navigate("/login")}>
                <TiArrowBack />
            </div>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="text-3xl font-extrabold pb-8">Sign up to URL Shortener</div>
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                    <div className="flex flex-col justify-center items-center px-6 py-4">
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
                                <Button variant="contained" sx={{ width: 200 }} onClick={() => navigate("/")}>Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}