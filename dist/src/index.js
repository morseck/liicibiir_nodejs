"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const conteneur_model_1 = __importDefault(require("../modele/conteneur.model"));
const app = express_1.default();
const uri = "mongodb://localhost:27017/liicibiir";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Base de donnée Mongo connectée avec succes");
});
app.get("/", (req, resp) => {
    resp.send("Hello express Liici Biir");
});
app.get("/conteneurs", (req, resp) => {
    //resp.send("Conteneur");
    conteneur_model_1.default.find((err, conteneurs) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(conteneurs);
    });
});
app.listen(8085, () => {
    console.log("serveur démaré");
});
