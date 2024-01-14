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
        profile : 'User'
    }
    let result = await userModel.create(user);
    res.status(200).send({
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
        age: user.age,
        profile: user.profile
    }
    
    res.status(200).send({
        status:"sucess",
        payload: req.session.user,
        message: "Successful login",
    })
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).send({
                status: 'error',
                message:'Error in log out.'
            })
        }
        res.redirect('/login')
    })
})
export default router;