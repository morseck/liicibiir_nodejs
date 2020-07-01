"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (() => {
    //const db: string = "mongodb://<username>:<password>@mongo.mlab.com:<port>/<database_name>"
    const uri = "mongodb://localhost:27017/liicibiir";
    mongoose_1.default.connect(uri, (err) => {
        if (err)
            console.log(err);
        else
            console.log("Base de donnée Mongo connectée avec succes");
    });
    return mongoose_1.default;
})();
