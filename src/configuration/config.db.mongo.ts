import mongoose from "mongoose";

export default (()=>{
    //const uri: string=  "mongodb+srv://morseck:touba2014@cluster0.dbrhz.mongodb.net/liicibiir?retryWrites=true&w=majority";
    const uri:string = "mongodb://localhost:27017/liicibiir";
    console.log('uri='+uri);
    mongoose.connect(uri, (err)=>{
        if (err) console.log(err);
        else console.log("Base de donnée Mongo connectée avec succes");
    });
    return mongoose;
})();