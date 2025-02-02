import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WebSocketExample() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const receivedToken = event.data;
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);

      navigate("/dashboard");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [navigate]);

  return token;
}
