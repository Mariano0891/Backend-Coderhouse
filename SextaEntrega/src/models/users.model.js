import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    name: String,
    lastName: String,
    mail: { 
        type: String, 
        unique: true 
    },
    age: Number,
    password: String,
    //adminStatus: Boolean
})

const userModel = mongoose.model(collection,schema);

export default userModel;