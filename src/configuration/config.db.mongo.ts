import mongoose from "mongoose";

export default (()=>{
    //const db: string = "mongodb://<username>:<password>@mongo.mlab.com:<port>/<database_name>"
    const uri:string = "mongodb://localhost:27017/liicibiir";
    mongoose.connect(uri, (err)=>{
        if (err) console.log(err);
        else console.log("Base de donnée Mongo connectée avec succes");
    });
    return mongoose;
})();