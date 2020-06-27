import express from  "express";
import mongoose from "mongoose";
const app = express();

const uri = "mongo/127.0.1:27017/liicibiir";
mongoose.connect(uri, (err)=>{
    if (err) console.log(err);
    else console.log("Base de donnée Mongo connectée avec succes");
});

app.get("/", (req, resp)=>{
    resp.send("Hello express Liici Biir");
});

app.get("/conteneurs", (req, resp)=>{
    resp.send("Conteneur");
});


app.listen(8085, ()=>{
    console.log("serveur démaré");
});

