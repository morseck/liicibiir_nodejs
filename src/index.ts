//Les imports
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Conteneur from "./modele/conteneur.model";
import * as bodyParser from "body-parser";
import apiRouter from "./apiRoute";



//Les constantes
const app = express();

const uri = "mongodb://localhost:27017/liicibiir";
mongoose.connect(uri, (err)=>{
    if (err) console.log(err);
    else console.log("Base de donnée Mongo connectée avec succes");
});
//Les middlewares
app.use(bodyParser.json());

app.use('/api/', apiRouter);

app.get("/", (req, resp)=>{
    resp.send("Hello express Liici Biir");
});

//recuperer tous les conteneur
app.get("/conteneurs", (req, resp)=>{
    Conteneur.find((err, conteneurs)=>{
        if (err) resp.status(500).send(err);
        else resp.send(conteneurs);
    });
});


//poster un conteneur
app.post("/conteneurs", (req, resp)=>{
    let conteneur = new Conteneur(req.body);
    conteneur.save(err=>{
        if(err) resp.status(500).send(err);
        else resp.send(conteneur);
    })
});

//recuperer un conteneur
app.get("/conteneurs/:id", (req, resp)=>{
    //resp.send("Conteneur");
    Conteneur.findById(req.params.id, (err, conteneur)=>{
        if (err) resp.status(500).send(err);
        else resp.send(conteneur);
    });
});

//update un conteneur
app.put("/conteneurs/:id", (req, resp)=>{
    Conteneur.findByIdAndUpdate(req.params.id,req.body, (err)=>{
        if (err) resp.status(500).send(err);
        else resp.send("Conteneur mis à jour avec succes");
    });
});

//supprimer un conteneur
app.delete("/conteneurs/:id", (req, resp)=>{
    Conteneur.findByIdAndDelete(req.params.id,(err)=>{
        if (err) resp.status(500).send(err);
        else resp.send("Conteneur supprimer avec succes");
    });
});

//recherche avec pagination un conteneur
app.get("/pconteneurs", (req: Request, resp: Response)=>{
    let page: string = req.query.page as string;
    let sizeTemp: string = req.query.size as string;
    console.log("page: " +page );
    console.log("size: " +sizeTemp );

    let p:number = parseInt(page || '1');
    let size:number = parseInt(sizeTemp || '5');
    //resp.send("Conteneur");
    Conteneur.paginate({},{page: p, limit: size}, (err, result)=>{
        if (err) resp.status(500).send(err);
        else resp.send(result);
    });
});

//recherche selon le titre ou numero
//Get http://127.0.0.1:8085/conteneursearch?kw=01page=1&size=2
app.get("/conteneursearch", (req: Request, resp: Response)=>{
    let page: string = req.query.page as string || '1';
    let sizeTemp: string = req.query.size as string || '5';
    let keyword: string = req.query.kw as string || ''; // la chaine qu'on veut rechercher
    console.log("page: " +page );
    console.log("size: " +sizeTemp );
    console.log("keyword: " +keyword );


    let p:number = parseInt(page);
    let size:number = parseInt(sizeTemp);
    //resp.send("Conteneur");
    Conteneur.paginate({numero:{$regex: ".*(?i)"+keyword+".*"}},{page: p, limit: size}, (err, result)=>{
        if (err) resp.status(500).send(err);
        else resp.send(result);
    });
});


app.listen(8085, ()=>{
    console.log("serveur démaré");
});

