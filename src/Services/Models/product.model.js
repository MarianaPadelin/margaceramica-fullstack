import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  thumbnails: [{ type: String }],
  owner: { type: String, default: "admin"}
});



//plugin de paginate
productSchema.plugin(mongoosePaginate)

//el model tiene como parámetros la colección de la data base y el schema
const productModel = model("products", productSchema);

export { productModel };