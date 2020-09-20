import {Request, Response} from "express";
import Conteneur from "../modele/conteneur.model";

export default {
    indexConteneur: (req: Request, resp: Response)=>{
        Conteneur.find((err, conteneurs)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(conteneurs);
        });
    },

    //listes de numero des conteneurs disponibles
    conteneurNumeroDisponible: (req:Request, resp: Response)=>{
        Conteneur.find({disponible:true},{numero: 1},(err, operarions)=>{
            if (err)  resp.status(500).send(err);
            else resp.status(200).send(operarions);
        });
    },
    //recuperer le nombre total d'operation
    totalConteneur: (req:Request, resp: Response)=>{
        Conteneur.find({}, {_id: 1},(err, conteneur)=>{
            if (err)  resp.status(500).send(err);
            else resp.status(200).send(({"total": conteneur.length.toString()}));
        });
    },

    //Regroupement des conteneur en fonction de leur disponibilite
    goupeDisponibiliteConteneur: (req: Request, resp: Response)=>{
        Conteneur.aggregate([
            {
                $group: {
                    _id: '$disponible',
                    count: { $sum: 1 }
                }
            }

        ]).exec((err, conteneur)=>{
            if (err) resp.status(500).send(err)
            else resp.status(200).send(conteneur)
        });
    },
    //creer un produit
    createConteneur: (req:Request, resp: Response)=>{
        let contenur = new Conteneur(req.body);
        contenur.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.status(200).send(contenur);
        })
    },
    showConteneur: (req: Request, resp: Response)=>{
        Conteneur.findById(req.params.id, (err, conteneur)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(conteneur);
        });
    },

    updateConteneur: (req: Request, resp: Response)=>{
        Conteneur.findByIdAndUpdate(req.params.id,req.body, (err, conteneur)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(conteneur);
        });
    },

    deleteConteneur: (req: Request, resp: Response)=>{
        Conteneur.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send("Conteneur supprimer avec succes");
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
            else resp.status(200).send(result);
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
            else resp.status(200).send(result);
        });
    }
}