"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const produit_controller_1 = __importDefault(require("./controlleur/produit.controller"));
const conteneur_controller_1 = __importDefault(require("./controlleur/conteneur.controller"));
const conteneur_produit_controller_1 = __importDefault(require("./controlleur/conteneur_produit.controller"));
const operation_controller_1 = __importDefault(require("./controlleur/operation.controller"));
//les constantes
const produitRoutePrefix = "/produit";
const conteneurRoutePrefix = "/conteneur";
const operationRoutePrefix = "/operation";
//const appTemp = express();
//les middemwares
//appTemp.use(bodyParser.json());
exports.default = (() => {
    let apiRouter = express_1.default.Router();
    /**********************************  PRODUITS ROUTES  ********************************************************/
    apiRouter.route(produitRoutePrefix).get(produit_controller_1.default.indexProduit); //lister les produits
    apiRouter.route(produitRoutePrefix).post(produit_controller_1.default.createProduit); //creer un produit
    apiRouter.route(produitRoutePrefix + "/disponible").get(produit_controller_1.default.produitNomDisponible); //lister les nom des produits disponible
    apiRouter.route(produitRoutePrefix + "/total").get(produit_controller_1.default.totalProduit); //recuperer le nombre total de produit
    apiRouter.route(produitRoutePrefix + "/count").get(produit_controller_1.default.goupeDisponibiliteProduit); //recuperer le nombre total de produit
    apiRouter.route(produitRoutePrefix + '/:id').get(produit_controller_1.default.showProduit); //consulter un produit
    apiRouter.route(produitRoutePrefix + '/:id').put(produit_controller_1.default.updateProduit); //Mettre à jour un produit
    apiRouter.route(produitRoutePrefix + '/:id').delete(produit_controller_1.default.deleteProduit); //Supprimer un produit
    apiRouter.route("/pProduit").get(produit_controller_1.default.pProduit); //pagination des produit
    //Get http://127.0.0.1:8085/pProduit?page=1&size=2
    apiRouter.route("/produitSearch").get(produit_controller_1.default.produitSearch); //rechercher un produit avec pagination
    //Get http://127.0.0.1:8085/produitSearch?kw=sardine&page=1&size=2
    /**********************************  CONTENEURS ROUTES  ********************************************************/
    apiRouter.route(conteneurRoutePrefix).get(conteneur_controller_1.default.indexConteneur); //lister les conteneurs
    apiRouter.route(conteneurRoutePrefix).post(conteneur_controller_1.default.createConteneur); //creer un conteneur
    apiRouter.route(conteneurRoutePrefix + '/disponible').get(conteneur_controller_1.default.conteneurNumeroDisponible); //lister numero des conteneurs disponible
    apiRouter.route(conteneurRoutePrefix + '/total').get(conteneur_controller_1.default.totalConteneur); //recuperer le nombre total de conteneur
    apiRouter.route(conteneurRoutePrefix + '/count').get(conteneur_controller_1.default.goupeDisponibiliteConteneur); //Regroupement des produit en fonction de leur disponibilite
    apiRouter.route(conteneurRoutePrefix + '/:id').get(conteneur_controller_1.default.showConteneur); //consulter un conteneur
    apiRouter.route(conteneurRoutePrefix + '/:id').put(conteneur_controller_1.default.updateConteneur); //Mettre à jour un conteneur
    apiRouter.route(conteneurRoutePrefix + '/:id').delete(conteneur_controller_1.default.deleteConteneur); //Supprimer un conteneur
    //Get http://127.0.0.1:8085/pConteneur?page=1&size=2
    apiRouter.route("/pConteneur").get(conteneur_controller_1.default.pconteneur); //pagination des conteneur
    //Get http://127.0.0.1:8085/conteneurSearch?kw=sardine&page=1&size=2
    apiRouter.route("/conteneurSearch").get(conteneur_controller_1.default.conteneursearch); //rechercher un conteneur avec pagination
    /**********************************  CONTENEURS_PRODUITS ROUTES  ********************************************************/
    apiRouter.route('/conteneurproduit/').get(conteneur_produit_controller_1.default.indexConteneurProduit); //consulter tous les conteneurProduit
    apiRouter.route('/conteneurproduit/').post(conteneur_produit_controller_1.default.createConteneurProduit); //Poster un conteneurProduit
    apiRouter.route('/conteneurproduit/:numero').get(conteneur_produit_controller_1.default.showConteneurProduit); //Details dans un conteneur
    /**********************************  OPEREATIONS ROUTES  ********************************************************/
    apiRouter.route(operationRoutePrefix).get(operation_controller_1.default.indexOperation); //Lister toutes les opérations
    apiRouter.route(operationRoutePrefix + "/all").get(operation_controller_1.default.indexHistoriqueOperationAll); //Lister toutes les opérations pour historique
    apiRouter.route(operationRoutePrefix + "/total").get(operation_controller_1.default.totalOperation); // recuperer le nombre de total d'operation
    apiRouter.route(operationRoutePrefix + "/entrante").get(operation_controller_1.default.indexOperationEntrante); //Lister toutes les opérations rentrantes
    apiRouter.route(operationRoutePrefix + "/sortante").get(operation_controller_1.default.indexOperationSortante); //Lister toutes les opérations sortantes
    apiRouter.route(operationRoutePrefix + '/entrante').post(operation_controller_1.default.createOperationEntrante); //Poster ou creer ou faire une operation entrante
    //w apiRouter.route(operationRoutePrefix+"/test").post(operationControlleur.createTest);//Poster ou creer ou faire une operation
    apiRouter.route(operationRoutePrefix + "/:id").get(operation_controller_1.default.showOperation); //consulter une opération
    apiRouter.route(operationRoutePrefix + "/:id").put(operation_controller_1.default.updateOperation); //mettre à jour une opération
    apiRouter.route(operationRoutePrefix + "/:id").delete(operation_controller_1.default.deleteOperation); // supprimer une operation
    //Get http://127.0.0.1:8085/pOperation?page=1&size=2
    apiRouter.route("/pOperation").get(operation_controller_1.default.pOperation); //Pagination des opération
    //Get http://127.0.0.1:8085/operationSearch?kw=Date&page=1&size=2
    apiRouter.route("/operationSearch").get(operation_controller_1.default.operationSearch); //recherche une operation selon la date avec une systeme de pagination
    return apiRouter;
})();
