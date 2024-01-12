import { Router } from "express";
import userModel from "../models/users.model.js";

const router = Router();

router.post("/register", async (req,res)=>{
    const { name, lastName, mail, age, password} = req.body;

    const exists = await userModel.findOne({mail});
    if(exists){
        return res.status(409)
        .send({
            status:"error",
            message: "User already registered"
        })
    }
    const user = {
        name,
        lastName,
        mail,
        age,
        password,
        adminStatus : false
    }
    let result = await userModel.create(user);
    res.send({
        status:"success",
        message: "user registered"
    })
})

router.post("/login", async (req,res)=>{
    const {mail, password} = req.body;
    const user = await userModel.findOne({mail, password});

    if(!user){
        return res.status(401).send({
            status:"error",
            message: "Invalid email or password."
        })
    }
    req.session.user ={
        name: user.name,
        lastName: user.lastName,
        mail: user.mail,
        age: user.age
    }
    
    res.send({
        status:"sucess",
        payload: req.session.user,
        message: "Successful login",
    })
})

export default router;