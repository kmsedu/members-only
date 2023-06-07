import mongoose from "mongoose";

const Schema = mongoose.Schema;

export enum MemberStatus {
    STANDARD,
    MEMBER,
    ADMIN,
}

export interface IUser extends mongoose.Document {
    first_name: string;
    second_name: string;
    username: string;
    password: string;
    member_status: MemberStatus;
}

const userSchema = new Schema<IUser>({
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    member_status: { type: Number, required: true },
});

userSchema.virtual("full_name").get(function () {
    let firstName: string | undefined = this.first_name;
    let secondName: string | undefined = this.second_name;

    if (firstName === undefined) {
        firstName = "";
    }

    if (secondName === undefined) {
        secondName = "";
    }

    return `${firstName} ${secondName}`;
});

const userModel = mongoose.model<IUser>("User", userSchema);

export { userModel as User };
