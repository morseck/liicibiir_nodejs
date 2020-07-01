/*
* Controlleur pour gerer les collection de type conteneur_produit
 */

import ConteneurProduit from '../modele/conteneur_produit.model'
import {Request, Response} from "express";
//import Conteneur from "../modele/conteneur.model";

export default {

    indexConteneurProduit:(req: Request, resp: Response)=>{
        ConteneurProduit.find((err, conteneurproduits)=>{
            if (err) resp.status(500).send(err);
            else resp.send(conteneurproduits);
        });
    },
    createConteneurProduit:(req:Request, resp: Response)=>{
        let contenurProduit = new ConteneurProduit(req.body);
        contenurProduit.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(contenurProduit);
        })
    },
    showConteneurProduit: (req: Request, resp: Response)=>{
        let numero:string= req.params.numero as string || '';
        const query = {"numero":numero.toString()};
        console.log("numero="+numero);
        ConteneurProduit.findOne({"conteneur": {"numero" : numero.toString()}})
            .then(result=>{
                if (result) console.log("Document retrouvé avec succees: "+result);
                else console.log('Aucun document trouvé');
                resp.send(result);
            })
            .catch(err=> {console.log("Echec erreur"+err)
                resp.send(err);
            });
    }
}