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
                resp.status(200).send(conteneurs);
        });
    },
    //listes de numero des conteneurs disponibles
    conteneurNumeroDisponible: (req, resp) => {
        conteneur_model_1.default.find({ disponible: true }, { numero: 1 }, (err, operarions) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operarions);
        });
    },
    //recuperer le nombre total d'operation
    totalConteneur: (req, resp) => {
        conteneur_model_1.default.find({}, { _id: 1 }, (err, conteneur) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(({ "total": conteneur.length.toString() }));
        });
    },
    //Regroupement des conteneur en fonction de leur disponibilite
    goupeDisponibiliteConteneur: (req, resp) => {
        conteneur_model_1.default.aggregate([
            {
                $group: {
                    _id: '$disponible',
                    count: { $sum: 1 }
                }
            }
        ]).exec((err, conteneur) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(conteneur);
        });
    },
    //creer un produit
    createConteneur: (req, resp) => {
        let contenur = new conteneur_model_1.default(req.body);
        contenur.save(err => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(contenur);
        });
    },
    showConteneur: (req, resp) => {
        conteneur_model_1.default.findById(req.params.id, (err, conteneur) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(conteneur);
        });
    },
    updateConteneur: (req, resp) => {
        conteneur_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, conteneur) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(conteneur);
        });
    },
    deleteConteneur: (req, resp) => {
        conteneur_model_1.default.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send("Conteneur supprimer avec succes");
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
                resp.status(200).send(result);
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
                resp.status(200).send(result);
        });
    }
};
