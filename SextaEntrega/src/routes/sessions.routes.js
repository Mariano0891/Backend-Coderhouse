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
        role : false
    }
    let result = await userModel.create(user);
    res.send({
        status:"success",
        message: "user registered"
    })
})

router.post("/login")


export default router;