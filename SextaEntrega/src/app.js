import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";

import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/sessions.routes.js";

const MONGO = `mongodb+srv://mariano0891:ABnD65QAhBbqzUOU@cluster0.y6ftgvv.mongodb.net/PFMariano`;
const app = express();

const connection = mongoose.connect(MONGO);

const PORT = 8080;
const httpServer = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    store: new MongoStore({
        mongoUrl: MONGO,
        ttl:3600
    }),
    secret:"CoderSecret",
    resave:false,
    saveUninitialized: false
}));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);
