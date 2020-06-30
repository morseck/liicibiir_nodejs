"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conteneur_model_1 = __importDefault(require("../modele/conteneur.model"));
exports.default = {
    indexConteneur: (req, resp) => {
        conteneur_model_1.default.find((err, conteneurs) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(conteneurs);
        });
    },
    //creer un produit
    createConteneur: (req, resp) => {
        let contenur = new conteneur_model_1.default(req.body);
        contenur.save(err => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(contenur);
        });
    },
    showConteneur: (req, resp) => {
        conteneur_model_1.default.findById(req.params.id, (err, conteneur) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(conteneur);
        });
    },
    updateConteneur: (req, resp) => {
        conteneur_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Conteneur mis à jour avec succes");
        });
    },
    deleteConteneur: (req, resp) => {
        conteneur_model_1.default.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Conteneur supprimer avec succes");
        });
    },
    pconteneur: (req, resp) => {
        let page = req.query.page;
        let sizeTemp = req.query.size;
        console.log("page: " + page);
        console.log("size: " + sizeTemp);
        let p = parseInt(page || '1');
        let size = parseInt(sizeTemp || '5');
        conteneur_model_1.default.paginate({}, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(result);
        });
    },
    conteneursearch: (req, resp) => {
        let page = req.query.page || '1';
        let sizeTemp = req.query.size || '5';
        let keyword = req.query.kw || ''; // la chaine qu'on veut rechercher
        console.log("page: " + page);
        console.log("size: " + sizeTemp);
        console.log("keyword: " + keyword);
        let p = parseInt(page);
        let size = parseInt(sizeTemp);
        conteneur_model_1.default.paginate({ numero: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(result);
        });
    }
};
