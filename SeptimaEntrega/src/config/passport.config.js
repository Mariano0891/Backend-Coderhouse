import passport from "passport";
import local from "passport-local";
import userModel from "../models/users.model.js";
import { createHash, validatePassword } from "../utils.js";

const LocalStrategy = local.Strategy;

const inicializePassport = () => {
    passport.use("register", new LocalStrategy(
    {passReqToCallback:true, usernameField:"mail"},
    async ( req, username, password, done) => {
        const { name, lastName, mail, age } = req.body;
        try{
            let user = await userModel.findOne({mail:username});
            if(user){
                console.log("User already registered");
                return done(null,false)
            }
            const newUser = {
                name,
                lastName,
                mail,
                age,
                password: createHash(password),
                profile : 'User'
            }
            const result = await userModel.create(newUser);
            return done (null,result);
        }catch (error){
            return done(error)
        }
    }));

    passport.use("login", new LocalStrategy(
        {usernameField:"mail"},
    async(username, password, done)=>{
        try {
            const user = await userModel.findOne({mail:username})
            if(!user){
                return done(null, false);
            }else if(validatePassword(password, user)){
                return done(null, false);
            }
            return done(null,user)
        } catch (error) {
            return done (error);
        }
    }));
    
    passport.serializeUser((user,done)=>{
        done(null,user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id);
        done(null,user);
    });
}

export default inicializePassport;