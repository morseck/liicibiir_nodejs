import {Request, Response} from "express";
import Conteneur from "../modele/conteneur.model";

export default {
    indexConteneur: (req: Request, resp: Response)=>{
        Conteneur.find((err, conteneurs)=>{
            if (err) resp.status(500).send(err);
            else resp.send(conteneurs);
        });
    },
    //creer un produit
    createConteneur: (req:Request, resp: Response)=>{
        let contenur = new Conteneur(req.body);
        contenur.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(contenur);
        })
    },
    showConteneur: (req: Request, resp: Response)=>{
        Conteneur.findById(req.params.id, (err, conteneur)=>{
            if (err) resp.status(500).send(err);
            else resp.send(conteneur);
        });
    },

    updateConteneur: (req: Request, resp: Response)=>{
        Conteneur.findByIdAndUpdate(req.params.id,req.body, (err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("Conteneur mis à jour avec succes");
        });
    },

    deleteConteneur: (req: Request, resp: Response)=>{
        Conteneur.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("Conteneur supprimer avec succes");
        });
    },

    pconteneur: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string;
        let sizeTemp: string = req.query.size as string;
        console.log("page: " +page );
        console.log("size: " +sizeTemp );

        let p:number = parseInt(page || '1');
        let size:number = parseInt(sizeTemp || '5');

        Conteneur.paginate({},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    },
    conteneursearch: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string || '1';
        let sizeTemp: string = req.query.size as string || '5';
        let keyword: string = req.query.kw as string || ''; // la chaine qu'on veut rechercher
        console.log("page: " +page );
        console.log("size: " +sizeTemp );
        console.log("keyword: " +keyword );

        let p:number = parseInt(page);
        let size:number = parseInt(sizeTemp);

        Conteneur.paginate({numero:{$regex: ".*(?i)"+keyword+".*"}},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    }
}