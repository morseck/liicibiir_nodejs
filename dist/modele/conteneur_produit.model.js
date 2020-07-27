"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model ou collection qui decris les produit qui se trouve dans un conteneur
 */
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let conteneurProduitSchema = new mongoose_1.default.Schema({
    conteneur: { type: { id: String, numero: String } },
    produit: { type: [{ id: String, nom: String, quantite: Number }] },
    created_at: { type: Date, required: true, default: new Date() },
    disponible: { type: Boolean, required: true, default: true },
});
conteneurProduitSchema.plugin(mongoose_paginate_1.default);
const ConteneurProduit = mongoose_1.default.model("ConteneurProduit", conteneurProduitSchema);
exports.default = ConteneurProduit;
