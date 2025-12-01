import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://your-render-backend-url.onrender.com");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chat App</h2>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          padding: 10,
          overflowY: "scroll",
          marginBottom: 10
        }}
      >
        {chat.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message"
        style={{ width: "70%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: "8px 12px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
