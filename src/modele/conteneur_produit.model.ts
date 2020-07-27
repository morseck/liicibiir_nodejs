/**
 * Model ou collection qui decris les produit qui se trouve dans un conteneur
 */
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let conteneurProduitSchema = new mongoose.Schema({
    conteneur: {type: {id:String, numero:String}},
    produit: {type:[{id:String, nom:String, quantite:Number}]},
    created_at: {type: Date, required:true, default: new Date()},
    disponible: {type: Boolean, required: true, default: true},
});

conteneurProduitSchema.plugin(mongoosePaginate);

const ConteneurProduit = mongoose.model("ConteneurProduit", conteneurProduitSchema);

export default ConteneurProduit;
