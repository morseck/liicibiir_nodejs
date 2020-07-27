"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let produitSchema = new mongoose_1.default.Schema({
    nom: { type: String, required: true, unique: true },
    quantite: { type: Number, required: true, default: 0 },
    disponible: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
});
produitSchema.plugin(mongoose_paginate_1.default);
const Produit = mongoose_1.default.model("Produit", produitSchema);
exports.default = Produit;
