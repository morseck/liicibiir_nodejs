//Les imports
import express, {Request, Response} from "express";
//import mongoose from "mongoose";
//import Conteneur from "./modele/conteneur.model";

import * as bodyParser from "body-parser";
import apiRouter from "./apiRoute";
import dbMongo from "./configuration/config.db.mongo"

//Appel à la base de données
dbMongo;

//Les constantes
const app = express();
/*
const uri = "mongodb://localhost:27017/liicibiir";
mongoose.connect(uri, (err)=>{
    if (err) console.log(err);
    else console.log("Base de donnée Mongo connectée avec succes");
});
*/

//Les middlewares
app.use(bodyParser.json());

//ROUTES DE TOUS  LES APIS
app.use('/api/', apiRouter);

app.get("/", (req, resp)=>{
    resp.send("Hello express Liici Biir");
});

app.listen(8085, ()=>{
    console.log("serveur démaré");
});

