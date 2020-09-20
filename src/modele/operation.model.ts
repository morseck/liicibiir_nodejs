import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

/**
 * Model operation entrante
 */

let operationSchema = new mongoose.Schema({
    operation: {
        type: [{
            conteneur:{
                type:{
                    numero:String,
                    produit: {
                        type:[{
                            nom:String,
                            quantite:Number,
                            calibre: String
                        }]
                    }
                }
            }
        }],
        required: true
    },
    mode_operation: {type: Boolean, required:true},//ModeOpeartion : true=operation entrante & false=operation sortante
    created_at: {type: Date, required: true, default: new Date()}
});
operationSchema.plugin(mongoosePaginate);
const Operation = mongoose.model("Operation", operationSchema);
export default Operation;
