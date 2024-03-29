import { Router } from "express";
import userModel from "../models/users.model.js";
import { createHash, validatePassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/register", passport.authenticate("register", {failureRedirect:"/api/sessions/failregister"}),
async (req,res) => {
    res.status(200).send({
        status:"success",
        message: "user registered"
    })
},
router.get("/failregister", async (req,res)=>{
    console.log("Registration failed");
    return res.status(400).send({
        status:"error",
        message: "Registration failed"
    })
})
)

router.post("/login", passport.authenticate("login", {failureRedirect:"/api/sessions/faillogin"}),
async (req,res) => {
    if(!req.user){
        return res.status(401).send({
            status:"error",
            message: "Invalid email or password"
        })
    }
    req.session.user = {
        name: req.user.name,
        lastName: req.user.lastName,
        mail: req.user.mail,
        age: req.user.age,
        profile: req.user.profile
    }
    res.status(200).send({
        status:"sucess",
        payload: req.user,
        message: "Successful login",
    })
}
)

router.get("/faillogin", (req,res)=>{
    return res.status(400).send({
        status:"error",
        message: "Login failed"
    })
})

router.get('/github', passport.authenticate("github", {scope:['user:mail']}), async (req,res)=>{});

router.get('/githubcallback', passport.authenticate("github", {failureRedirect:'/login'}), async (req,res)=>{
    req.session.user = req.user;
    res.redirect('/')
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

router.post("/resetPassword", async (req,res)=>{
    const {mail,password} = req.body;
    if(!mail || !password){
        return res.status(400).send({
            status:"error",
            message: "Missing data"
        })
    }
    const user = await userModel.findOne({mail});
    if(!user){
        return res.status(400).send({
            status:"error",
            message: "User does not exist"
        })
    }
    const newHashPassword = createHash(password);

    await userModel.updateOne({_id:user._id},{$set:{password:newHashPassword}});
    res.status(200).send({
        status:"sucess",
        message: "The password has been reseted"
    })
})

export default router;