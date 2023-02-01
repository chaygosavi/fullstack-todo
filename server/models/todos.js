import { model, Schema } from "mongoose";

const TodoSchema = new Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Todo", TodoSchema);
