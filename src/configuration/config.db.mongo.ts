import mongoose from "mongoose";

export default (()=>{
    const uri:string = "mongodb://localhost:27017/liicibiir";
    mongoose.connect(uri, (err)=>{
        if (err) console.log(err);
        else console.log("Base de donnée Mongo connectée avec succes");
    });
    return mongoose;
})();