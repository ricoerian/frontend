import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const OauthCallback = () =>{
    const navigate = useNavigate()
    useEffect(() => {
        navigate('https://auth-golang-production-8253.up.railway.app/oauth/google/callback')
    }, [navigate]);
    return <p>Callback...</p>
}

export default OauthCallback