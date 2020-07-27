/*
* Controlleur pour gerer les collection de type conteneur_produit
 */

import ConteneurProduit from '../modele/conteneur_produit.model'
import {Request, Response} from "express";
import Produit from '../modele/produit.model';
//import Conteneur from "../modele/conteneur.model";
import asycLab from 'async';
export default {

    //Voir la liste des conteneur et leur contenus
    indexConteneurProduit:(req: Request, resp: Response)=>{
        ConteneurProduit.find((err, conteneurproduits)=>{
            if (err) resp.status(500).send(err);
            else resp.send(conteneurproduits);
        });
    },
    //Insérer un  des produits dans un conteneur
    createConteneurProduit:(req:Request, resp: Response)=>{
        let contenurProduit = new ConteneurProduit(req.body);
        console.log("req.body ="+req.body);
        /*contenurProduit.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(contenurProduit);
        })*/

        for(let item of req.body.produit){
                /*asycLab.waterfall([
                    function(done: any){
                        Produit.findOne({"nom" : item.nom.toString()})
                            .then(produitFound=>{
                                done(null, produitFound);
                            })
                            .catch(err=>resp.status(500).json({"error":"Impossible de verifier le produit"}
                            ));
                    },
                    function (produitFound: any, done: any) {
                        if (produitFound){}
                        else resp.status(404).json({'error': 'Produit non trouvé'});
                    },

                ]);//fin waterfall
                */

            Produit.findOne({"nom" : item.nom.toString()})
                .then(result=>{
                    if (result) console.log("Document retrouvé avec succees: "+item.nom.toString());
                    else {
                        console.log('Aucun produit trouvé pour: '+item.nom.toString());
                        //throw new Error('User Name cannot be empty');
                       return resp.status(500).send("Pas de produit de nom: "+item.nom.toString());
                    }
                })
                .catch(err=> {console.log("Echec erreur"+err)
                  return resp.send(err);
                });
        }
        return resp.status(200).send(req.body.produit.length.toString());
    },
    //Voir les details dans un conteneur
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