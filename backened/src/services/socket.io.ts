import { io } from "..";

interface ChatMessage {
  message: string;
  room: string;
}
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (room) => {
    console.log("User joined room:", room);
  });

  socket.on("send_message", (data: ChatMessage) => {
    console.log("User sent message:", data);
    socket.to(data.room).emit("receive_message", {
      message: data.message,
      sender: socket.id,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
