import { useEffect } from "react"

const OauthCallback = () => {
    useEffect(() => {
        window.location.href = 'https://auth-golang-production-8253.up.railway.app/oauth/google/callback';
    }, []);
    
    return <p>Callback...</p>
}

export default OauthCallback
