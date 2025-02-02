import { useEffect, useState } from "react";
import { Input, Button, Card, message, Flex } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../middleware/Api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
      message.success("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      message.error("Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
  
    window.open(
      `${API_BASE_URL}/oauth/google/login`,
      "Google Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  
    window.addEventListener("message", (event) => {
      if (event.origin !== API_BASE_URL) return;
  
      if (event.data.token) {
        localStorage.setItem("token", event.data.token);
        message.success("Login successful!");
        navigate("/dashboard");
      }
    }, { once: true });
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <Card className="w-96 p-5 shadow-xl rounded-2xl">
        <Flex vertical gap={10}>
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" block onClick={handleLogin}>Login</Button>
            <Button block onClick={handleGoogleLogin}>Login with Google <GoogleOutlined /></Button>
            <p>Belum punya akun? <Link to="/register" className="hover:text-blue-400">Daftar disini!</Link></p>
        </Flex>
      </Card>
    </div>
  );
}
