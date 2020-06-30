import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import conteneurModel from './conteneur.model';
import produitModel from './produit.model';
let produitQuantiteModel = new mongoose.Schema({
   produit: {type: produitModel},
   quantite: {type: Number}
});
produitQuantiteModel.plugin(mongoosePaginate);
let ProduitQuantiteModel = mongoose.model("ProduitQuantite", produitQuantiteModel);

let conteneurProduitSchema = new mongoose.Schema({
    contenenur: {type: conteneurModel},
    produit: {type: [ProduitQuantiteModel]},
    created_at: {type: Date, required:true, default: new Date()},
    disponible: {type: Boolean, required: true, default: true},
});

conteneurProduitSchema.plugin(mongoosePaginate);

const ConteneurProduit = mongoose.model("Conteneur", conteneurProduitSchema);

export default ConteneurProduit;
