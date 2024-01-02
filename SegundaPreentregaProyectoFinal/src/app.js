import express from "express";
import { cartRouter } from "./routes/carts.routes.js";
import { productRouter } from "./routes/products.routes.js";
import mongoose from "mongoose";

const MONGO = `mongodb+srv://mariano0891:ABnD65QAhBbqzUOU@cluster0.y6ftgvv.mongodb.net/PFMariano`;
const connection = mongoose.connect(MONGO);

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);