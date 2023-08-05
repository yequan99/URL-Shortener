import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UrlData from '../api/UrlDataAPI'

export default function Dashboard() {

    const navigate = useNavigate()

    useEffect(() => {
        const getUrlData = async () => {
            const token = localStorage.getItem("token")
            const userID = localStorage.getItem("userID")
            const response = await UrlData(userID, token)
            if (response.status === 401) {
                navigate('/login')
            }
        }
        getUrlData()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            Home Page
        </div>
    )
}