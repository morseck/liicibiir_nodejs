"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Les imports
const express_1 = __importDefault(require("express"));
//import mongoose from "mongoose";
//import Conteneur from "./modele/conteneur.model";
const bodyParser = __importStar(require("body-parser"));
const apiRoute_1 = __importDefault(require("./apiRoute"));
const config_db_mongo_1 = __importDefault(require("./configuration/config.db.mongo"));
const cors_1 = __importDefault(require("cors"));
//Appel à la base de données
config_db_mongo_1.default;
//Les constantes
const app = express_1.default();
/*
const uri = "mongodb://localhost:27017/liicibiir";
mongoose.connect(uri, (err)=>{
    if (err) console.log(err);
    else console.log("Base de donnée Mongo connectée avec succes");
});
*/
const corsOptions = {
    origin: "*"
};
//Les middlewares
app.use(bodyParser.json());
app.use(cors_1.default());
//ROUTES DE TOUS  LES APIS
app.use('/api/', apiRoute_1.default);
app.get("/", (req, resp) => {
    resp.send("Hello express Liici Biir");
});
app.listen(8085, () => {
    console.log("serveur démaré au port 8085");
});
