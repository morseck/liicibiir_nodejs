"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const conteneur_model_1 = __importDefault(require("./conteneur.model"));
const produit_model_1 = __importDefault(require("./produit.model"));
let produitQuantiteModel = new mongoose_1.default.Schema({
    produit: { type: produit_model_1.default },
    quantite: { type: Number }
});
produitQuantiteModel.plugin(mongoose_paginate_1.default);
let ProduitQuantiteModel = mongoose_1.default.model("ProduitQuantite", produitQuantiteModel);
let conteneurProduitSchema = new mongoose_1.default.Schema({
    contenenur: { type: conteneur_model_1.default },
    produit: { type: [ProduitQuantiteModel] },
    created_at: { type: Date, required: true, default: new Date() },
    disponible: { type: Boolean, required: true, default: true },
});
conteneurProduitSchema.plugin(mongoose_paginate_1.default);
const ConteneurProduit = mongoose_1.default.model("Conteneur", conteneurProduitSchema);
exports.default = ConteneurProduit;
