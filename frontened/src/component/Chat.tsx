import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Your backend socket server URL

const ChatApp = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Example: fetch users from backend REST API
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      // Append message if from or to the selected user
      if (
        message.from === selectedUser ||
        message.to === selectedUser ||
        selectedUser === null
      ) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => socket.off("message");
  }, [selectedUser]);

  // When user is clicked, load chat history from backend
  const selectUser = (userId) => {
    setSelectedUser(userId);
    fetch(`http://localhost:5000/messages/${userId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  // Send message using socket.io
  const sendMessage = () => {
    if (input.trim() && selectedUser) {
      const message = {
        from: "me", // Replace with logged in user id
        to: selectedUser,
        content: input,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, message]);
      setInput("");
    }
  };

  return (
    <div style={{ display: "flex", height: "80vh" }}>
      <div
        style={{
          width: "30%",
          borderRight: "1px solid gray",
          overflowY: "auto",
        }}
      >
        <h3>Users</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user._id}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor:
                  selectedUser === user._id ? "#e0e0e0" : "white",
              }}
              onClick={() => selectUser(user._id)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h3>Chat {selectedUser || "Select a user"}</h3>
        <div
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            borderBottom: "1px solid gray",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: "5px 0",
                textAlign: msg.from === "me" ? "right" : "left",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  backgroundColor: msg.from === "me" ? "#0084ff" : "#e5e5ea",
                  color: msg.from === "me" ? "white" : "black",
                }}
              >
                {msg.content}
              </div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        {selectedUser && (
          <div style={{ display: "flex", padding: "10px" }}>
            <input
              style={{ flex: 1, padding: "8px" }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
            />
            <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
