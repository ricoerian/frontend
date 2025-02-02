import { useNavigate } from "react-router-dom"

const OauthCallback = () =>{
    const navigate = useNavigate()
    navigate('https://auth-golang-production-8253.up.railway.app/oauth/google/callback')
    return <p>OatuhCallback</p>
}

export default OauthCallback