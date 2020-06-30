import express from "express";
import produitControlleur from './controlleur/produit.controller';
import * as bodyParser from "body-parser";

//les constantes
//const appTemp = express();

//les middemwares
//appTemp.use(bodyParser.json());

export default (()=>{
    let apiRouter = express.Router();

    //Produits Routes
    let produitRoutePrefix:string = "/produit";
    apiRouter.route(produitRoutePrefix).get(produitControlleur.index); //lister les produits
    apiRouter.route(produitRoutePrefix).post(produitControlleur.create); //creer un produit
    apiRouter.route(produitRoutePrefix+'/:id').get(produitControlleur.show);//consulter un produit
    apiRouter.route(produitRoutePrefix+'/:id').put(produitControlleur.update);//Mettre à jour un produit
    apiRouter.route(produitRoutePrefix+'/:id').delete(produitControlleur.delete);//Supprimer un produit
    //Get http://127.0.0.1:8085/pProduit?page=1&size=2
    apiRouter.route("/pProduit").get(produitControlleur.pProduit);//pagination des produit
    //Get http://127.0.0.1:8085/produitSearch?kw=sardine&page=1&size=2
    apiRouter.route("/produitSearch").get(produitControlleur.produitSearch);//rechercher un produit avec pagination


    return apiRouter;
})();