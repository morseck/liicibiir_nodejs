import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let produitSchema = new mongoose.Schema({
    nom: {type: String, required:true, unique:true},
    disponible: {type: Boolean, required: true, default: true},
    created_at: {type: Date, required:true, default: new Date()},
    updated_at: {type: Date, required:true, default: new Date()},
});

produitSchema.plugin(mongoosePaginate);

const Produit = mongoose.model("Produit", produitSchema);

export default Produit;
