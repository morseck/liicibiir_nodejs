//import mongoose from "mongoose";
import Produit from "../modele/produit.model";
import {Request, Response} from "express";


export default {

    //afficher tous les produits
    indexProduit: (req:Request, resp: Response)=>{
        Produit.find((err, operarions)=>{
            if (err)  resp.status(500).send(err);
            else  resp.status(200).send(operarions);
        });
    },

    //listes de nom de produit disponible
    produitNomDisponible: (req:Request, resp: Response)=>{
        Produit.find({disponible:true},{nom: 1},(err, operarions)=>{
            if (err)  resp.status(500).send(err);
            else resp.status(200).send(operarions);
        });
    },

    //recuperer le nombre total d'operation
    totalProduit: (req:Request, resp: Response)=>{
        Produit.find({}, {_id: 1},(err, produit)=>{
            if (err)  resp.status(500).send(err);
            else resp.status(200).send(({"total": produit.length.toString()}));
        });
    },

    //Regroupement des produit en fonction de leur disponibilite
    goupeDisponibiliteProduit: (req: Request, resp: Response)=>{
        Produit.aggregate([
            {
                $group: {
                    _id: '$disponible',
                    count: { $sum: 1 }
                }
            }
        ]).exec((err, produit)=>{
            if (err) resp.status(500).send(err)
            else resp.status(200).send(produit)
        });
    },


    //creer un produit
    createProduit: (req:Request, resp: Response)=>{
        let produit = new Produit(req.body);
        produit.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.status(200).send(produit);
        })
    },

    //Consulter un produit
    showProduit: (req: Request, resp: Response)=>{
        Produit.findById(req.params.id, (err, produit)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(produit);
        });
    },

    //Mettre à jour un produit
    updateProduit: (req: Request, resp: Response)=>{
        Produit.findByIdAndUpdate(req.params.id,req.body, (err, produit)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(produit);
        });
    },

    //Supprimer un produit
    deleteProduit: (req: Request, resp: Response)=>{
        Produit.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send("Produit supprimer avec succes");
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