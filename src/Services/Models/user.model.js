import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String },
  rol: {
    type: String,
    default: "user",
    enum: ["user", "admin", "premium"],
  },

  cart: { _id: { type: Schema.Types.ObjectId, ref: "carts" } },

  loggedBy: { type: String, required: false },

  documents: [
    {
      name: { type: String },
      reference: { type: String },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["docsUploaded", "docsNotUploaded"],
    default: "docsNotUploaded",
  },

  last_connection: { type: Date, default: Date.now },
});

const userModel = model("users", userSchema);
export { userModel };
