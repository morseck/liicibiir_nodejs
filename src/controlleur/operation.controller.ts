import Operation from '../modele/operation.model';
import {Request, Response} from "express";
import Conteneur from "../modele/conteneur.model";
import asyncLab from 'async';
import Produit from "../modele/produit.model";
import {isAwaitExpression} from "@babel/types";

/*
* CONTROLLEUR POUR GERER LES OPERATION
 */

/*function createForm (req: Request): any{
    //let response:boolean = '' || true;
    let tabConteneur = req.body.operation.conteneur || [];
    for(let item of tabConteneur){
        //Methode verifier l'existance du conteneur
        Conteneur.findOne({"numero" : item.numero.toString()})
            .then(result=>{
                return true;
                console.log('je elese1');
                let indexProduit : number= 0;
                if (result) {
                    console.log("Document retrouvé avec succees: "+item.numero.toString());
                    for (let itemProduit of item.produit){
                        indexProduit++;
                        Produit.findOne({"nom": itemProduit.nom.toString()})
                            .then(resultProduit=>{
                                if (resultProduit){
                                    return false;
                                    console.log('je elese2');
                                }else{
                                    console.log('je elese3');
                                    return false;
                                    //resp.send('pas de produit correspondant');
                                }
                            }).catch(err=> {
                            console.log("Echec erreur Produit"+err);
                            return false;
                            //resp.send(err);
                        })
                    }
                    //console.log('conteneur produit final='+isSucces);

                }
                else {
                    console.log('Aucun conteneur trouvé pour numero: '+item.numero.toString());
                   // resp.status(500).send("Pas de conteneur numero: "+item.numero.toString());
                    return false;
                }
            })
            .catch(err=> {
                console.log("Echec erreur "+err);
               // resp.send(err);
      //          return response = false;
            });
    }//Fin boucle for
//return response;
}*/



export default {

    //Listes toutes les operations
    indexOperation: (req:Request, resp: Response)=>{
        Operation.find((err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.send(operations);
        });
    },

    //Listes les opération rentrante
    indexOperationRentrante: (req:Request, resp: Response)=>{
        Operation.find({"mode_operation": true},(err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.send(operations);
        });
    },

    //Listes les opérations sortantes
    indexOperationSortante: (req:Request, resp: Response)=>{
        Operation.find({"mode_operation": false},(err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.send(operations);
        });
    },

    //Faire ou poster une opération
createOperation: (req:Request, resp: Response)=>{
        let modeOperation: Boolean = req.body.mode_operation;
        //let nombreConteneur: Number = req.body.operation.conteneur.length.toString() || 0;
        let tabConteneur = req.body.operation.conteneur || [];
        let nombreConteneur: number = parseInt(tabConteneur.length.toString());
        //taille = taille-1;
        console.log("nombreConteneur="+nombreConteneur);
        //Verification existantance des conteneurs

    let indexConteneur : number= 0;
    let isSucces = false;

        if (modeOperation == true){
            //operation entrante
            for(let item of tabConteneur){
                //let indexProduit: number = 0;

                //Methode verifier l'existance du conteneur
                 Conteneur.findOne({"numero" : item.numero.toString()})
                    .then(result=>{
                        if (result) {
                            console.log("Document retrouvé avec succees: "+item.numero.toString());
                           // console.log("tabproduit="+tabProduit.length.toString());
                            let indexProduit : number= 0;
                            let tabProduit = item.produit || [];
                            for (let itemProduit of tabProduit){
                                Produit.findOne({"nom": itemProduit.nom.toString()})
                                    .wtimeout(2000)
                                    .then(resultProduit=>{
                                        if (resultProduit){
                                            console.log("indexConteneur="+indexConteneur);
                                            console.log("indexProduit="+tabProduit.toString());
                                            isSucces = true;
                                            if ((indexConteneur==nombreConteneur )){
                                                let indexProduitCurrent: number= parseInt(item.produit.length.toString());
                                                if ((indexProduit == tabProduit.length)){
                               //                     resp.status(200).send('okkkkk');
                                                    console.log("object1="+resultProduit.toObject().nom.toString());
                                                    console.log("object2="+itemProduit.nom.toString());
                                                }
                                            }
                                        }else{
                                            resp.status(404).send('pas de produit correspondant');
                                        }
                                    }).catch(err=> {
                                    console.log("Echec erreur Produit"+err);
                                    resp.status(500).send(err);
                                });
                                indexProduit++;
                            }//Fin for produit
                            console.log('conteneur produit final='+isSucces);

                        }
                        else {
                            console.log('Aucun conteneur trouvé pour numero: '+item.numero.toString());
                            resp.status(404).send("Pas de conteneur numero: "+item.numero.toString());
                        }
                    })
                    .catch(err=> {
                        console.log("Echec erreur "+err);
                        resp.status(500).send(err);
                    });
                indexConteneur++;
            }//Fin boucle for conteneur
            /*let testt = await createForm(req);
            resp.send(testt);
            console.log("testt="+testt);*/

        }
        else if(modeOperation == false){ //operation sortante

        }
        else{}


    //!conteneurExist ? resp.send('En dehors boucle for '+conteneurExist): resp.send('En dehors boucle for '+ conteneurExist) ;
    //resp.send(req.body.operation.conteneur.length.toString());
    /*let operation = new Operation(req.body);
    operation.save(err=>{
            if(err) resp.status(500).send(err);
            else resp.send(operation);
        })*/
    },

    //Consulter une opérations
    showOperation: (req: Request, resp: Response)=>{
        Operation.findById(req.params.id, (err, operation)=>{
            if (err) resp.status(500).send(err);
            else resp.send(operation);
        });
    },

    //Mettre à jour une operation
    updateOperation: (req: Request, resp: Response)=>{
        Operation.findByIdAndUpdate(req.params.id,req.body, (err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("Opération mise à jour avec succes");
        });
    },

    //Supprimer une opération
    deleteOperation: (req: Request, resp: Response)=>{
        Operation.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.send("Operation supprimer avec succes");
        });
    },

    //systeme de pagination des operations
    pOperation: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string;
        let sizeTemp: string = req.query.size as string;

        let p:number = parseInt(page || '1');
        let size:number = parseInt(sizeTemp || '5');
        //resp.send("Conteneur");
        Operation.paginate({},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    },

    //recherche une opération avec sa date + systeeme de pagination
    operationSearch: (req: Request, resp: Response)=>{
        let page: string = req.query.page as string || '1';
        let sizeTemp: string = req.query.size as string || '5';
        let keyword: string = req.query.kw as string || ''; // la chaine qu'on veut rechercher
        console.log("page: " +page );
        console.log("size: " +sizeTemp );
        console.log("keyword: " +keyword );


        let p:number = parseInt(page);
        let size:number = parseInt(sizeTemp);
        //resp.send("Conteneur");
        Operation.paginate({created_at: keyword},{page: p, limit: size}, (err, result)=>{
            if (err) resp.status(500).send(err);
            else resp.send(result);
        });
    }
}