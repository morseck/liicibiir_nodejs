"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
/**
 * Model operation entrante
 */
let operationSchema = new mongoose_1.default.Schema({
    operation: {
        type: [{
                conteneur: {
                    type: {
                        numero: String,
                        produit: {
                            type: [{ nom: String, quantite: Number }]
                        }
                    }
                }
            }],
        required: true
    },
    mode_operation: { type: Boolean, required: true },
    created_at: { type: Date, required: true, default: new Date() }
});
operationSchema.plugin(mongoose_paginate_1.default);
const Operation = mongoose_1.default.model("Operation", operationSchema);
exports.default = Operation;
