import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let conteneurSchema = new mongoose.Schema({
    numero: {type: String, required:true, unique:true},
    taille: {type: Number},
    disponible: {type: Boolean, required: true, default: true},
    created_at: {type: Date, required:true, default: new Date()},
});

conteneurSchema.plugin(mongoosePaginate);

const Conteneur = mongoose.model("Conteneur", conteneurSchema);

export default Conteneur;
