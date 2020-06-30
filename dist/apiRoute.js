"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produit_controller_1 = __importDefault(require("./controlleur/produit.controller"));
//les constantes
//const appTemp = express();
//les middemwares
//appTemp.use(bodyParser.json());
exports.default = (() => {
    let apiRouter = express_1.default.Router();
    //Produits Routes
    let produitRoutePrefix = "/produit";
    apiRouter.route(produitRoutePrefix).get(produit_controller_1.default.index); //lister les produits
    apiRouter.route(produitRoutePrefix).post(produit_controller_1.default.create); //creer un produit
    apiRouter.route(produitRoutePrefix + '/:id').get(produit_controller_1.default.show); //consulter un produit
    apiRouter.route(produitRoutePrefix + '/:id').put(produit_controller_1.default.update); //Mettre à jour un produit
    apiRouter.route(produitRoutePrefix + '/:id').delete(produit_controller_1.default.delete); //Supprimer un produit
    //Get http://127.0.0.1:8085/pProduit?page=1&size=2
    apiRouter.route("/pProduit").get(produit_controller_1.default.pProduit); //pagination des produit
    //Get http://127.0.0.1:8085/produitSearch?kw=sardine&page=1&size=2
    apiRouter.route("/produitSearch").get(produit_controller_1.default.produitSearch); //rechercher un produit avec pagination
    return apiRouter;
})();
