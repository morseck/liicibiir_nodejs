import express from "express";
import produitControlleur from './controlleur/produit.controller';
import conteneurControlleur from './controlleur/conteneur.controller';
import conteneurProduitControlleur from './controlleur/conteneur_produit.controller';
import operationControlleur from './controlleur/operation.controller';
import * as bodyParser from "body-parser";


//les constantes
const produitRoutePrefix:string = "/produit";
const conteneurRoutePrefix: string = "/conteneur";
const operationRoutePrefix: string = "/operation";
//const appTemp = express();

//les middemwares
//appTemp.use(bodyParser.json());

export default (()=>{
    let apiRouter = express.Router();

    /**********************************  PRODUITS ROUTES  ********************************************************/
    apiRouter.route(produitRoutePrefix).get(produitControlleur.indexProduit); //lister les produits
    apiRouter.route(produitRoutePrefix).post(produitControlleur.createProduit); //creer un produit
    apiRouter.route(produitRoutePrefix+'/:id').get(produitControlleur.showProduit);//consulter un produit
    apiRouter.route(produitRoutePrefix+'/:id').put(produitControlleur.updateProduit);//Mettre à jour un produit
    apiRouter.route(produitRoutePrefix+'/:id').delete(produitControlleur.deleteProduit);//Supprimer un produit
    //Get http://127.0.0.1:8085/pProduit?page=1&size=2
    apiRouter.route("/pProduit").get(produitControlleur.pProduit);//pagination des produit
    //Get http://127.0.0.1:8085/produitSearch?kw=sardine&page=1&size=2
    apiRouter.route("/produitSearch").get(produitControlleur.produitSearch);//rechercher un produit avec pagination


    /**********************************  CONTENEURS ROUTES  ********************************************************/
    apiRouter.route(conteneurRoutePrefix).get(conteneurControlleur.indexConteneur); //lister les conteneurs
    apiRouter.route(conteneurRoutePrefix).post(conteneurControlleur.createConteneur); //creer un conteneur
    apiRouter.route(conteneurRoutePrefix+'/:id').get(conteneurControlleur.showConteneur);//consulter un conteneur
    apiRouter.route(conteneurRoutePrefix+'/:id').put(conteneurControlleur.updateConteneur);//Mettre à jour un conteneur
    apiRouter.route(conteneurRoutePrefix+'/:id').delete(conteneurControlleur.deleteConteneur);//Supprimer un conteneur
    //Get http://127.0.0.1:8085/pConteneur?page=1&size=2
    apiRouter.route("/pConteneur").get(conteneurControlleur.pconteneur);//pagination des conteneur
    //Get http://127.0.0.1:8085/conteneurSearch?kw=sardine&page=1&size=2
    apiRouter.route("/conteneurSearch").get(conteneurControlleur.conteneursearch);//rechercher un conteneur avec pagination

    /**********************************  CONTENEURS_PRODUITS ROUTES  ********************************************************/
    apiRouter.route('/conteneurproduit/').get(conteneurProduitControlleur.indexConteneurProduit);//consulter tous les conteneurProduit
    apiRouter.route('/conteneurproduit/').post(conteneurProduitControlleur.createConteneurProduit);//Poster un conteneurProduit
    apiRouter.route('/conteneurproduit/:numero').get(conteneurProduitControlleur.showConteneurProduit);//Details dans un conteneur

    /**********************************  OPEREATIONS ROUTES  ********************************************************/
    apiRouter.route(operationRoutePrefix).get(operationControlleur.indexOperation); //Lister toutes les opérations
    apiRouter.route(operationRoutePrefix+"/rentrante").get(operationControlleur.indexOperationRentrante); //Lister toutes les opérations rentrantes
    apiRouter.route(operationRoutePrefix+"/sortante").get(operationControlleur.indexOperationSortante); //Lister toutes les opérations sortantes
    apiRouter.route(operationRoutePrefix).post(operationControlleur.createOperation);//Poster ou creer ou faire une operation
    apiRouter.route(operationRoutePrefix+"/:id").get(operationControlleur.showOperation);//consulter une opération
    apiRouter.route(operationRoutePrefix+"/:id").put(operationControlleur.updateOperation); //mettre à jour une opération
    apiRouter.route(operationRoutePrefix+"/:id").delete(operationControlleur.deleteOperation); // supprimer une operation
    //Get http://127.0.0.1:8085/pOperation?page=1&size=2
    apiRouter.route("/pOperation").get(operationControlleur.pOperation);//Pagination des opération
    //Get http://127.0.0.1:8085/operationSearch?kw=Date&page=1&size=2
    apiRouter.route("/operationSearch").get(operationControlleur.operationSearch);//recherche une operation selon la date avec une systeme de pagination

    return apiRouter;
})();