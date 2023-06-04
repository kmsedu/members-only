import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface UserInterface {
  first_name: string;
  second_name: string;
  username: string;
  member_status: string;
}

const userSchema = new Schema<UserInterface>({
  first_name: { type: String, required: true },
  second_name: { type: String, required: true },
  username: { type: String, required: true },
  member_status: { type: String, required: true },
});

userSchema.virtual("full_name").get(function () {
  let firstName: string | undefined = this.first_name;
  let secondName: string | undefined = this.second_name;

  if (firstName === "" || firstName === undefined) {
    firstName = "";
  }

  if (secondName === "" || secondName === undefined) {
    secondName = "";
  }

  return `${firstName} ${secondName}`;
});

const User = mongoose.model<UserInterface>("User", userSchema);

export { User };
