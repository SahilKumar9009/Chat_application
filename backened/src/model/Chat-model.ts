import { Document, Schema, model } from "mongoose";

const ChatSchema = new Schema({
  name: String,
  description: String,
  owner: String,
  members: [String],
  messages: [
    {
      message: String,
      sender: String,
      time: String,
    },
  ],
  createdAt: Date,
});

const Chat = model<Document>("Chat", ChatSchema);
export default Chat;
