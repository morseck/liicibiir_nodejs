//import mongoose from "mongoose";
import Produit from "../modele/produit.model";
import {Request, Response} from "express";


export default {

    //afficher tous les produits
    indexProduit: (req:Request, resp: Response)=>{
        Produit.find((err, conteneurs)=>{
            if (err)  resp.status(500).send(err);
            else  resp.send(conteneurs);
        });
    }
    ,

    //creer un produit
    createProduit: (req:Request, resp: Response)=>{
        let produit = new Produit(req.body);
        produit.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(produit);
        })
    },

    //Consulter un produit
    showProduit: (req: Request, resp: Response)=>{
        Produit.findById(req.params.id, (err, produit)=>{
            if (err) resp.status(500).send(err);
            else resp.send(produit);
        });
    },

    //Mettre à jour un produit
    updateProduit: (req: Request, resp: Response)=>{
        Produit.findByIdAndUpdate(req.params.id,req.body, (err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("produit mis à jour avec succes");
        });
    },

    //Supprimer un produit
    deleteProduit: (req: Request, resp: Response)=>{
        Produit.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("Produit supprimer avec succes");
        });
    },

    //systeme de pagination des produits
    pProduit: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string;
        let sizeTemp: string = req.query.size as string;

        let p:number = parseInt(page || '1');
        let size:number = parseInt(sizeTemp || '5');
        //resp.send("Conteneur");
        Produit.paginate({},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    },

    //recherche un produit avec son nom + systeeme de pagination
    produitSearch: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string || '1';
        let sizeTemp: string = req.query.size as string || '5';
        let keyword: string = req.query.kw as string || ''; // la chaine qu'on veut rechercher
        console.log("page: " +page );
        console.log("size: " +sizeTemp );
        console.log("keyword: " +keyword );


        let p:number = parseInt(page);
        let size:number = parseInt(sizeTemp);
        //resp.send("Conteneur");
        Produit.paginate({nom:{$regex: ".*(?i)"+keyword+".*"}},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    }
}