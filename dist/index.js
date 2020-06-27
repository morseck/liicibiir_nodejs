"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
const uri = "mongo/127.0.1:27017/liicibiir";
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
    resp.send("Conteneur");
});
app.listen(8085, () => {
    console.log("serveur démaré");
});
