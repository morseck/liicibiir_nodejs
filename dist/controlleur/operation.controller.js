"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const operation_model_1 = __importDefault(require("../modele/operation.model"));
const conteneur_model_1 = __importDefault(require("../modele/conteneur.model"));
const produit_model_1 = __importDefault(require("../modele/produit.model"));
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
function conteneurVerification(item) {
    return __awaiter(this, void 0, void 0, function* () {
        let isAccept = true;
        isAccept = yield conteneur_model_1.default.findOne({ "numero": item.numero.toString() })
            .then(result => {
            if (result) {
                let tabProduit = item.produit || [];
                for (let itemProduit of tabProduit) {
                    let resultproduit = valideProduit(itemProduit.nom.toString());
                    resultproduit.then(resultProduit => {
                        console.log('resultproduit', resultProduit);
                        if (resultProduit === false) {
                            return isAccept = false;
                        }
                    }).catch(err => {
                        console.log("errProduit", err);
                        return isAccept = false;
                    });
                } //Fin for produit
                return isAccept;
            }
            else {
                console.log('Aucun conteneur trouvé pour numero: ' + item.numero.toString());
                return isAccept = false;
                //resp.status(404).send("Pas de conteneur numero: "+item.numero.toString());
            }
        })
            .catch(err => {
            console.log("Echec erreur " + err);
            //resp.status(500).send(err);
            return isAccept = false;
        });
        return isAccept;
    });
}
function valideProduit(nomPorduit) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = false;
        result = yield produit_model_1.default.findOne({ "nom": nomPorduit })
            .wtimeout(2000)
            .then(resultProduit => {
            if (resultProduit) {
                return result = true;
            }
            else {
                //resp.status(404).send('pas de produit correspondant');
                return result = false;
            }
        }).catch(err => {
            console.log("Echec erreur Produit" + err);
            return result = false;
        });
        return result;
    });
}
//Methode async pour verifier l'existence d'un produit au niveau de base de donnees
function valideProduitOne(nomProduit) {
    return __awaiter(this, void 0, void 0, function* () {
        //let result: boolean = false;
        return new Promise((resolve, reject) => {
            produit_model_1.default.findOne({ "nom": nomProduit })
                .then(resultProduit => {
                if (resultProduit) {
                    resolve(true);
                }
                else {
                    //resp.status(404).send('pas de produit correspondant');
                    //return result = false
                    resolve(false);
                    stop();
                }
            }).catch(err => {
                console.log("Echec erreur Conteneur" + err);
                //return result = false;
                resolve(false);
                stop();
            });
        });
    });
}
//Methode async pour verifier l'existence d'un conteneur au neiveau de la base de donnees
function valideConteneurOne(numeroConteneur) {
    return __awaiter(this, void 0, void 0, function* () {
        //let result: boolean = false;
        let promiseConteneur = new Promise((resolve, reject) => {
            conteneur_model_1.default.findOne({ "numero": numeroConteneur })
                .wtimeout(2000)
                .then(resultConteneur => {
                if (resultConteneur) {
                    //return result = true
                    resolve(true);
                }
                else {
                    //resp.status(404).send('pas de produit correspondant');
                    //return result = false
                    resolve(false);
                    stop();
                }
            }).catch(err => {
                console.log("Echec erreur Conteneur" + err);
                //return result = false;
                resolve(false);
                stop();
            });
        });
        return promiseConteneur;
    });
}
//Methode async qui renvoie un promise resolve==true si tout est ok resolve===false si un produit ou un conteneur n'est pas enregistrer
function valideOperation(req) {
    return __awaiter(this, void 0, void 0, function* () {
        let tabConteneur = req.body.operation.conteneur;
        let promise = yield new Promise((resolve1, reject1) => {
            for (let i = 0; i < tabConteneur.length; i++) {
                console.log("i=", i);
                new Promise((resolve, reject) => {
                    valideConteneurOne(tabConteneur[i].numero.toString()).then(resultConteneur => {
                        if (resultConteneur) {
                            let tabProduit = tabConteneur[i].produit;
                            for (let j = 0; j < tabProduit.length; j++) {
                                new Promise(resolve2 => {
                                    valideProduitOne(tabProduit[j].nom.toString()).then(resultProduit => {
                                        if (resultProduit) {
                                            if ((i + 1 === tabConteneur.length) && (j + 1 === tabProduit.length)) {
                                                console.log("testtt");
                                                //resolve2(true)
                                                //resolve(true);
                                                resolve1(true);
                                            }
                                        }
                                        else { //resolve2(true);resolve(false);
                                            resolve1(false);
                                            stop();
                                        }
                                    });
                                });
                            }
                        }
                        else {
                            resolve(false);
                            resolve1(false);
                            stop();
                        }
                    });
                }).catch((error) => {
                    console.log(error);
                    resolve1(false);
                });
            } //Fin boucle for conteneur
        });
        return promise;
        //return
    });
}
exports.default = {
    //Listes toutes les operations
    indexOperation: (req, resp) => {
        operation_model_1.default.find((err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operations);
        });
    },
    //Liste de toutes les operations contenant specifique _id, created_at et mode_operation
    indexHistoriqueOperationAll: (req, resp) => {
        operation_model_1.default.find({}, { created_at: 1, mode_operation: 1 }, (err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operations);
        });
    },
    //recuperer le nombre total d'operation
    totalOperation: (req, resp) => {
        operation_model_1.default.find({}, { _id: 1 }, (err, operation) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(({ "total": operation.length.toString() }));
        });
    },
    //Listes les opération rentrante
    indexOperationEntrante: (req, resp) => {
        operation_model_1.default.find({ "mode_operation": true }, { created_at: 1, mode_operation: 1 }, (err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operations);
        });
    },
    //Listes les opérations sortantes
    indexOperationSortante: (req, resp) => {
        operation_model_1.default.find({ "mode_operation": false }, { created_at: 1, mode_operation: 1 }, (err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operations);
        });
    },
    //Methode pour creer par post une operation entrante
    createOperationEntrante: (req, resp) => {
        let mode_opereation = req.body.mode_operation === true ? true : req.body.mode_operation.toString() === 'entrante' ? true : false;
        if (mode_opereation) {
            valideOperation(req).then(resul => {
                if (resul === true) {
                    let operation = new operation_model_1.default(req.body);
                    operation.save(err => {
                        if (err)
                            resp.status(500).send(err);
                        else
                            resp.status(200).send(operation);
                    });
                }
                else
                    resp.status(500).send('Operation non valide, verifiez les conteneurs et les produits');
            });
        }
        else {
            resp.status(500).send('Seules les operations entrantes sont autorisées dans cette partie');
        }
        //return
    },
    //Consulter une opérations
    showOperation: (req, resp) => {
        operation_model_1.default.findById(req.params.id, (err, operation) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operation);
        });
    },
    //Mettre à jour une operation
    updateOperation: (req, resp) => {
        operation_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err, operation) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(operation);
        });
    },
    //Supprimer une opération
    deleteOperation: (req, resp) => {
        operation_model_1.default.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send("Operation supprimer avec succes");
        });
    },
    //systeme de pagination des operations
    pOperation: (req, resp) => {
        let page = req.query.page;
        let sizeTemp = req.query.size;
        let p = parseInt(page || '1');
        let size = parseInt(sizeTemp || '5');
        //resp.send("Conteneur");
        operation_model_1.default.paginate({}, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(result);
        });
    },
    //recherche une opération avec sa date + systeeme de pagination
    operationSearch: (req, resp) => {
        let page = req.query.page || '1';
        let sizeTemp = req.query.size || '5';
        let keyword = req.query.kw || ''; // la chaine qu'on veut rechercher
        console.log("page: " + page);
        console.log("size: " + sizeTemp);
        console.log("keyword: " + keyword);
        let p = parseInt(page);
        let size = parseInt(sizeTemp);
        //resp.send("Conteneur");
        operation_model_1.default.paginate({ created_at: keyword }, { page: p, limit: size }, (err, result) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.status(200).send(result);
        });
    }
};
