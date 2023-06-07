import mongoose from "mongoose";
import { Types } from "mongoose";

const Schema = mongoose.Schema;

interface MessageShape {
    title: string;
    timestamp: Date;
    message: string;
    author: Types.ObjectId;
}

const messageSchema = new Schema<MessageShape>({
    title: { type: String, require: true },
    timestamp: { type: Date, default: new Date() },
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Message = mongoose.model<MessageShape>("Message", messageSchema);

export { Message };
