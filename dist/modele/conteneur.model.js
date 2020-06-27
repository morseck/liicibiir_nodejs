"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let conteneurSchema = new mongoose_1.default.Schema({
    //title: {type: String},
    numero: { type: String, required: true, unique: true },
    taille: { type: Number },
    disponible: { type: Boolean, required: true, default: true },
    created_at: { type: Date, required: true, default: new Date() },
});
conteneurSchema.plugin(mongoose_paginate_1.default);
const Conteneur = mongoose_1.default.model("Conteneur", conteneurSchema);
exports.default = Conteneur;
