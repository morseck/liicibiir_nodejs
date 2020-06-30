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
const mongoose_1 = __importDefault(require("mongoose"));
const conteneur_model_1 = __importDefault(require("./modele/conteneur.model"));
const bodyParser = __importStar(require("body-parser"));
const apiRoute_1 = __importDefault(require("./apiRoute"));
//Les constantes
const app = express_1.default();
const uri = "mongodb://localhost:27017/liicibiir";
mongoose_1.default.connect(uri, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Base de donnée Mongo connectée avec succes");
});
//Les middlewares
app.use(bodyParser.json());
app.use('/api/', apiRoute_1.default);
app.get("/", (req, resp) => {
    resp.send("Hello express Liici Biir");
});
//recuperer tous les conteneur
app.get("/conteneurs", (req, resp) => {
    conteneur_model_1.default.find((err, conteneurs) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(conteneurs);
    });
});
//poster un conteneur
app.post("/conteneurs", (req, resp) => {
    let conteneur = new conteneur_model_1.default(req.body);
    conteneur.save(err => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(conteneur);
    });
});
//recuperer un conteneur
app.get("/conteneurs/:id", (req, resp) => {
    //resp.send("Conteneur");
    conteneur_model_1.default.findById(req.params.id, (err, conteneur) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(conteneur);
    });
});
//update un conteneur
app.put("/conteneurs/:id", (req, resp) => {
    conteneur_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Conteneur mis à jour avec succes");
    });
});
//supprimer un conteneur
app.delete("/conteneurs/:id", (req, resp) => {
    conteneur_model_1.default.findByIdAndDelete(req.params.id, (err) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send("Conteneur supprimer avec succes");
    });
});
//recherche avec pagination un conteneur
app.get("/pconteneurs", (req, resp) => {
    let page = req.query.page;
    let sizeTemp = req.query.size;
    console.log("page: " + page);
    console.log("size: " + sizeTemp);
    let p = parseInt(page || '1');
    let size = parseInt(sizeTemp || '5');
    //resp.send("Conteneur");
    conteneur_model_1.default.paginate({}, { page: p, limit: size }, (err, result) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(result);
    });
});
//recherche selon le titre ou numero
//Get http://127.0.0.1:8085/conteneursearch?kw=01page=1&size=2
app.get("/conteneursearch", (req, resp) => {
    let page = req.query.page || '1';
    let sizeTemp = req.query.size || '5';
    let keyword = req.query.kw || ''; // la chaine qu'on veut rechercher
    console.log("page: " + page);
    console.log("size: " + sizeTemp);
    console.log("keyword: " + keyword);
    let p = parseInt(page);
    let size = parseInt(sizeTemp);
    //resp.send("Conteneur");
    conteneur_model_1.default.paginate({ numero: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, result) => {
        if (err)
            resp.status(500).send(err);
        else
            resp.send(result);
    });
});
app.listen(8085, () => {
    console.log("serveur démaré");
});
