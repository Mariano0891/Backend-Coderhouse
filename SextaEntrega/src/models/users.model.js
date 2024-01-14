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
    profile: String
})

const userModel = mongoose.model(collection,schema);

export default userModel;