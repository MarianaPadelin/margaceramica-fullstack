import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true, default: 1 },
      total: Number
    },
  ],
});



const cartModel = model("cart", cartSchema);

export { cartModel };
