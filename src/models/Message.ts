import mongoose from "mongoose";
import { Types } from "mongoose";

const Schema = mongoose.Schema;

interface MessageInterface {
  title: string;
  timestamp: Date;
  message: string;
  author: Types.ObjectId;
}

const messageSchema = new Schema<MessageInterface>({
  title: { type: String, require: true },
  timestamp: { type: Date, default: new Date() },
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model<MessageInterface>("Message", messageSchema);

export { Message };
