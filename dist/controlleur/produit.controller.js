"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import mongoose from "mongoose";
const produit_model_1 = __importDefault(require("../modele/produit.model"));
exports.default = {
    //afficher tous les produits
    indexProduit: (req, resp) => {
        produit_model_1.default.find((err, operarions) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operarions);
        });
    },
    //listes de nom de produit disponible
    produitNomDisponible: (req, resp) => {
        produit_model_1.default.find({ disponible: true }, { nom: 1 }, (err, operarions) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operarions);
        });
    },
    //recuperer le nombre total d'operation
    totalProduit: (req, resp) => {
        produit_model_1.default.find({}, { _id: 1 }, (err, produit) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(({ "total": produit.length.toString() }));
        });
    },
    //Regroupement des produit en fonction de leur disponibilite
    goupeDisponibiliteProduit: (req, resp) => {
        produit_model_1.default.aggregate([
            {
                $group: {
                    _id: '$disponible',
                    count: { $sum: 1 }
                }
            }
        ]).exec((err, produit) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(produit);
        });
    },
    //creer un produit
    createProduit: (req, resp) => {
        let produit = new produit_model_1.default(req.body);
        produit.save(err => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(produit);
        });
    },
    //Consulter un produit
    showProduit: (req, resp) => {
        produit_model_1.default.findById(req.params.id, (err, produit) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(produit);
        });
    },
    //Mettre à jour un produit
    updateProduit: (req, resp) => {
        produit_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, produit) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(produit);
        });
    },
    //Supprimer un produit
    deleteProduit: (req, resp) => {
        produit_model_1.default.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send("Produit supprimer avec succes");
        });
    },
    //systeme de pagination des produits
    pProduit: (req, resp) => {
        let page = req.query.page;
        let sizeTemp = req.query.size;
        let p = parseInt(page || '1');
        let size = parseInt(sizeTemp || '5');
        //resp.send("Conteneur");
        produit_model_1.default.paginate({}, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(result);
        });
    },
    //recherche un produit avec son nom + systeeme de pagination
    produitSearch: (req, resp) => {
        let page = req.query.page || '1';
        let sizeTemp = req.query.size || '5';
        let keyword = req.query.kw || ''; // la chaine qu'on veut rechercher
        console.log("page: " + page);
        console.log("size: " + sizeTemp);
        console.log("keyword: " + keyword);
        let p = parseInt(page);
        let size = parseInt(sizeTemp);
        //resp.send("Conteneur");
        produit_model_1.default.paginate({ nom: { $regex: ".*(?i)" + keyword + ".*" } }, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(result);
        });
    }
};
