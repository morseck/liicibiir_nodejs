import express from "express";
import produitControlleur from './controlleur/produit.controller';
import conteneurControlleur from './controlleur/conteneur.controller';
import * as bodyParser from "body-parser";

//les constantes
const produitRoutePrefix:string = "/produit";
const conteneurRoutePrefix: string = "/conteneur";
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



    return apiRouter;
})();