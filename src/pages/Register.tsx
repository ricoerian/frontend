import { useEffect, useState } from "react";
import { Input, Button, Card, message, Flex } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../middleware/Api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate, token]);

  const handleRegister = async () => {
    try {
      await axios.post(`${API_BASE_URL}/register`, { username, password });
      message.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600">
      <Card className="w-96 p-5 shadow-xl rounded-2xl">
        <Flex vertical gap={10}>
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type="primary" block onClick={handleRegister}>Register</Button>
            <p>Sudah punya akun? <Link to="/" className="hover:text-blue-400">Masuk disini!</Link></p>
        </Flex>
      </Card>
    </div>
  );
}
