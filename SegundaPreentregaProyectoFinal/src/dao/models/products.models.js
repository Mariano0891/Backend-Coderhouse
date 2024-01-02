import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    descrription:{
        type:String,
        require: true
    },
    code:{
        type: String,
        require: true,
        unique:true
    },
    price:{
        type: Number,
        require: true
    },
    status:{
        type: Boolean,
        default: true
    },
    stock:{
        type:Number,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    thumbnail:{
        type: String,
        default: []
    }
})

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model("products", productSchema);

export default productsModel;
