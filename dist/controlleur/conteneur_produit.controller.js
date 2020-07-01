"use strict";
/*
* Controlleur pour gerer les collection de type conteneur_produit
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conteneur_produit_model_1 = __importDefault(require("../modele/conteneur_produit.model"));
//import Conteneur from "../modele/conteneur.model";
exports.default = {
    indexConteneurProduit: (req, resp) => {
        conteneur_produit_model_1.default.find((err, conteneurproduits) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(conteneurproduits);
        });
    },
    createConteneurProduit: (req, resp) => {
        let contenurProduit = new conteneur_produit_model_1.default(req.body);
        contenurProduit.save(err => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(contenurProduit);
        });
    },
    showConteneurProduit: (req, resp) => {
        let numero = req.params.numero || '';
        const query = { "numero": numero.toString() };
        console.log("numero=" + numero);
        conteneur_produit_model_1.default.findOne({ "conteneur": { "numero": numero.toString() } })
            .then(result => {
            if (result)
                console.log("Document retrouvé avec succees: " + result);
            else
                console.log('Aucun document trouvé');
            resp.send(result);
        })
            .catch(err => {
            console.log("Echec erreur" + err);
            resp.send(err);
        });
    }
};
