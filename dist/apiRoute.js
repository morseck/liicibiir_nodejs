"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produit_controller_1 = __importDefault(require("./controlleur/produit.controller"));
const conteneur_controller_1 = __importDefault(require("./controlleur/conteneur.controller"));
//les constantes
const produitRoutePrefix = "/produit";
const conteneurRoutePrefix = "/conteneur";
//const appTemp = express();
//les middemwares
//appTemp.use(bodyParser.json());
exports.default = (() => {
    let apiRouter = express_1.default.Router();
    /**********************************  PRODUITS ROUTES  ********************************************************/
    apiRouter.route(produitRoutePrefix).get(produit_controller_1.default.indexProduit); //lister les produits
    apiRouter.route(produitRoutePrefix).post(produit_controller_1.default.createProduit); //creer un produit
    apiRouter.route(produitRoutePrefix + '/:id').get(produit_controller_1.default.showProduit); //consulter un produit
    apiRouter.route(produitRoutePrefix + '/:id').put(produit_controller_1.default.updateProduit); //Mettre à jour un produit
    apiRouter.route(produitRoutePrefix + '/:id').delete(produit_controller_1.default.deleteProduit); //Supprimer un produit
    //Get http://127.0.0.1:8085/pProduit?page=1&size=2
    apiRouter.route("/pProduit").get(produit_controller_1.default.pProduit); //pagination des produit
    //Get http://127.0.0.1:8085/produitSearch?kw=sardine&page=1&size=2
    apiRouter.route("/produitSearch").get(produit_controller_1.default.produitSearch); //rechercher un produit avec pagination
    /**********************************  CONTENEURS ROUTES  ********************************************************/
    apiRouter.route(conteneurRoutePrefix).get(conteneur_controller_1.default.indexConteneur); //lister les conteneurs
    apiRouter.route(conteneurRoutePrefix).post(conteneur_controller_1.default.createConteneur); //creer un conteneur
    apiRouter.route(conteneurRoutePrefix + '/:id').get(conteneur_controller_1.default.showConteneur); //consulter un conteneur
    apiRouter.route(conteneurRoutePrefix + '/:id').put(conteneur_controller_1.default.updateConteneur); //Mettre à jour un conteneur
    apiRouter.route(conteneurRoutePrefix + '/:id').delete(conteneur_controller_1.default.deleteConteneur); //Supprimer un conteneur
    //Get http://127.0.0.1:8085/pConteneur?page=1&size=2
    apiRouter.route("/pConteneur").get(conteneur_controller_1.default.pconteneur); //pagination des conteneur
    //Get http://127.0.0.1:8085/conteneurSearch?kw=sardine&page=1&size=2
    apiRouter.route("/conteneurSearch").get(conteneur_controller_1.default.conteneursearch); //rechercher un conteneur avec pagination
    return apiRouter;
})();
