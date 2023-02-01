import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    select: false,
  },
  hashedPassword: {
    type: String,
    required: true,
    select: false,
  },
});

export default model("User", userSchema);
