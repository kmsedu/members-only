import mongoose from "mongoose";
import { Types } from "mongoose";

const Schema = mongoose.Schema;

interface IMessage extends mongoose.Document {
    title: string;
    timestamp: Date;
    message: string;
    author: Types.ObjectId;
}

const messageSchema = new Schema<IMessage>({
    title: { type: String, require: true },
    timestamp: { type: Date, default: new Date() },
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
});

messageSchema.virtual("pretty_date").get(function () {
    const date = this.timestamp;
    const formatter = new Intl.DateTimeFormat("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return formatter.format(date);
});

const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Message };
