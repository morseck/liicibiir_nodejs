import Operation from '../modele/operation.model';
import {Request, Response} from "express";

import Conteneur from "../modele/conteneur.model";

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


async function conteneurVerification(item: any) {
let isAccept: boolean = true;
   isAccept = await Conteneur.findOne({"numero" : item.numero.toString()})
        .then(result=>{
            if (result) {
                let tabProduit = item.produit || [];
                for (let itemProduit of tabProduit){
                    let resultproduit  =  valideProduit(itemProduit.nom.toString())
                    resultproduit.then(resultProduit=>{
                        console.log('resultproduit', resultProduit)
                        if(resultProduit === false){
                            return isAccept = false;
                        }
                    }).catch(err=>{
                        console.log("errProduit", err)
                        return isAccept = false
                    })
                }//Fin for produit
                return isAccept
            }
            else {
                console.log('Aucun conteneur trouvé pour numero: '+item.numero.toString());
                return isAccept = false;
                //resp.status(404).send("Pas de conteneur numero: "+item.numero.toString());
            }
        })
        .catch(err=> {
            console.log("Echec erreur "+err);
            //resp.status(500).send(err);
            return isAccept = false;
        });

   return isAccept
}



async function valideProduit(nomPorduit: string) {
    let result: boolean = false;
    result = await Produit.findOne({"nom": nomPorduit})
        .wtimeout(2000)
        .then(resultProduit=>{
            if (resultProduit){
                return result = true
            }else{
                return result = false
            }
        }).catch(err=> {
        console.log("Echec erreur Produit"+err);
        return result = false;
    });
    return result
}



//Methode async pour verifier l'existence d'un produit au niveau de base de donnees
async function valideProduitOne(nomProduit: string): Promise<any> {
    //let result: boolean = false;
    return new Promise((resolve, reject)=>{
        Produit.findOne({"nom": nomProduit})
            .then(resultProduit=>{
                if (resultProduit){
                    resolve(true)
                }else{
                    resolve(false)
                    stop()
                }
            }).catch(err=> {
            console.log("Echec erreur Conteneur"+err);
            resolve(false)
            stop()
        });
    })

}


//Methode async pour verifier l'existence d'un conteneur au neiveau de la base de donnees
async function valideConteneurOne(numeroConteneur: string): Promise<any> {
    let promiseConteneur = new Promise((resolve, reject)=>{
        Conteneur.findOne({"numero": numeroConteneur})
            .wtimeout(2000)
            .then(resultConteneur=>{
                if (resultConteneur){
                    resolve(true)
                }else{
                    resolve(false)
                    stop()
                }
            }).catch(err=> {
            console.log("Echec erreur Conteneur"+err);
            resolve(false)
            stop()
        });
    })

    return promiseConteneur
}


//Methode async qui renvoie un promise resolve==true si tout est ok resolve===false si un produit ou un conteneur n'est pas enregistrer
async function valideOperation(req: Request): Promise<any>{
    let tabConteneur = req.body.operation.conteneur;
    let promise = await new Promise((resolve1, reject1) => {
        for (let i=0; i < tabConteneur.length; i++) {
            console.log("i=",i)
            new Promise((resolve, reject) => {
                valideConteneurOne( tabConteneur[i].numero.toString()).then(resultConteneur=>{
                    if (resultConteneur){
                        let tabProduit = tabConteneur[i].produit;
                        for(let j = 0; j < tabProduit.length; j++){
                            new Promise(resolve2 => {
                                valideProduitOne(tabProduit[j].nom.toString()).then(resultProduit=>{
                                    if (resultProduit){
                                        if((i+1 === tabConteneur.length) && (j+1 ===tabProduit.length)) {
                                            //resolve2(true)
                                            //resolve(true);
                                            resolve1(true);

                                        }
                                    }
                                    else {//resolve2(true);resolve(false);
                                    resolve1(false);
                                        stop()}
                                })
                            })
                        }
                    }
                    else{resolve(false); resolve1(false);
                    stop()}
                })
            }).catch((error)=>{
                console.log(error)
                resolve1(false);
            });

        }//Fin boucle for conteneur
    })
    return promise;
    //return
}





export default {

    //Listes toutes les operations
    indexOperation: (req:Request, resp: Response)=>{
        Operation.find((err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.status(200).send(operations);
        });
    },

    //Liste de toutes les operations contenant specifique _id, created_at et mode_operation
    indexHistoriqueOperationAll: (req:Request, resp: Response)=>{
        Operation.find({},{created_at:1, mode_operation:1},(err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.status(200).send(operations);
        });
    },

    //recuperer le nombre total d'operation
    totalOperation: (req:Request, resp: Response)=>{
        Operation.find({}, {_id: 1},(err, operation)=>{
            if (err)  resp.status(500).send(err);
            else resp.status(200).send(({"total": operation.length.toString()}));
        });
    },

    //Listes les opération rentrante
    indexOperationEntrante: (req:Request, resp: Response)=>{
        Operation.find({"mode_operation": true},{created_at: 1, mode_operation: 1},(err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.status(200).send(operations);
        });
    },

    //Listes les opérations sortantes
    indexOperationSortante: (req:Request, resp: Response)=>{
        Operation.find({"mode_operation": false},{created_at: 1, mode_operation: 1},(err, operations)=>{
            if (err)  resp.status(500).send(err);
            else  resp.status(200).send(operations);
        });
    },

    //Methode pour creer par post une operation entrante
    createOperationEntrante:(req: Request, resp: Response)=>{
        let mode_opereation = req.body.mode_operation === true ? true : req.body.mode_operation.toString() === 'entrante' ? true : false;
        if (mode_opereation){
            valideOperation(req).then(resul=>{
                if (resul===true) {
                    let operation = new Operation(req.body);
                    operation.save(err=>{
                        if(err) resp.status(500).send(err);
                        else resp.status(200).send(operation);
                    });
                }
                else  resp.status(500).send('Operation non valide, verifiez les conteneurs et les produits')
            })
        }else{
            resp.status(500).send('Seules les operations entrantes sont autorisées dans cette partie')
        }

        //return
    },

    //Consulter une opérations
    showOperation: (req: Request, resp: Response)=>{
        Operation.findById(req.params.id, (err, operation)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(operation);
        });
    },

    //Mettre à jour une operation
    updateOperation: (req: Request, resp: Response)=>{
        Operation.findByIdAndUpdate(req.params.id,req.body, (err, operation)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send(operation);
        });
    },

    //Supprimer une opération
    deleteOperation: (req: Request, resp: Response)=>{
        Operation.findByIdAndDelete(req.params.id,(err)=>{
            if (err) resp.status(500).send(err);
            else resp.status(200).send("Operation supprimer avec succes");
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
            else resp.status(200).send(result);
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
            else resp.status(200).send(result);
        });
    }
}