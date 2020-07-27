"use strict";
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
exports.default = {
    //Listes toutes les operations
    indexOperation: (req, resp) => {
        operation_model_1.default.find((err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(operations);
        });
    },
    //Listes les opération rentrante
    indexOperationRentrante: (req, resp) => {
        operation_model_1.default.find({ "mode_operation": true }, (err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(operations);
        });
    },
    //Listes les opérations sortantes
    indexOperationSortante: (req, resp) => {
        operation_model_1.default.find({ "mode_operation": false }, (err, operations) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(operations);
        });
    },
    //Faire ou poster une opération
    createOperation: (req, resp) => {
        let modeOperation = req.body.mode_operation;
        //let nombreConteneur: Number = req.body.operation.conteneur.length.toString() || 0;
        let tabConteneur = req.body.operation.conteneur || [];
        let nombreConteneur = parseInt(tabConteneur.length.toString());
        //taille = taille-1;
        console.log("nombreConteneur=" + nombreConteneur);
        //Verification existantance des conteneurs
        let indexConteneur = 0;
        let isSucces = false;
        if (modeOperation == true) {
            //operation entrante
            for (let item of tabConteneur) {
                //let indexProduit: number = 0;
                //Methode verifier l'existance du conteneur
                conteneur_model_1.default.findOne({ "numero": item.numero.toString() })
                    .then(result => {
                    if (result) {
                        console.log("Document retrouvé avec succees: " + item.numero.toString());
                        // console.log("tabproduit="+tabProduit.length.toString());
                        let indexProduit = 0;
                        let tabProduit = item.produit || [];
                        for (let itemProduit of tabProduit) {
                            produit_model_1.default.findOne({ "nom": itemProduit.nom.toString() })
                                .wtimeout(2000)
                                .then(resultProduit => {
                                if (resultProduit) {
                                    console.log("indexConteneur=" + indexConteneur);
                                    console.log("indexProduit=" + tabProduit.toString());
                                    isSucces = true;
                                    if ((indexConteneur == nombreConteneur)) {
                                        let indexProduitCurrent = parseInt(item.produit.length.toString());
                                        if ((indexProduit == tabProduit.length)) {
                                            //                     resp.status(200).send('okkkkk');
                                            console.log("object1=" + resultProduit.toObject().nom.toString());
                                            console.log("object2=" + itemProduit.nom.toString());
                                        }
                                    }
                                }
                                else {
                                    resp.status(404).send('pas de produit correspondant');
                                }
                            }).catch(err => {
                                console.log("Echec erreur Produit" + err);
                                resp.status(500).send(err);
                            });
                            indexProduit++;
                        } //Fin for produit
                        console.log('conteneur produit final=' + isSucces);
                    }
                    else {
                        console.log('Aucun conteneur trouvé pour numero: ' + item.numero.toString());
                        resp.status(404).send("Pas de conteneur numero: " + item.numero.toString());
                    }
                })
                    .catch(err => {
                    console.log("Echec erreur " + err);
                    resp.status(500).send(err);
                });
                indexConteneur++;
            } //Fin boucle for conteneur
            /*let testt = await createForm(req);
            resp.send(testt);
            console.log("testt="+testt);*/
        }
        else if (modeOperation == false) { //operation sortante
        }
        else { }
        //!conteneurExist ? resp.send('En dehors boucle for '+conteneurExist): resp.send('En dehors boucle for '+ conteneurExist) ;
        //resp.send(req.body.operation.conteneur.length.toString());
        /*let operation = new Operation(req.body);
        operation.save(err=>{
                if(err) resp.status(500).send(err);
                else resp.send(operation);
            })*/
    },
    //Consulter une opérations
    showOperation: (req, resp) => {
        operation_model_1.default.findById(req.params.id, (err, operation) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send(operation);
        });
    },
    //Mettre à jour une operation
    updateOperation: (req, resp) => {
        operation_model_1.default.findByIdAndUpdate(req.params.id, req.body, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Opération mise à jour avec succes");
        });
    },
    //Supprimer une opération
    deleteOperation: (req, resp) => {
        operation_model_1.default.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                resp.status(500).send(err);
            else
                resp.send("Operation supprimer avec succes");
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
                resp.send(result);
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
                resp.send(result);
        });
    }
};
