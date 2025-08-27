import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: String,
  sender: String,
  time: String,
});

const Message = mongoose.model<mongoose.Document>("Message", messageSchema);

export default Message;
