import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const path = "products.json";
const router = Router();
const productManager = new ProductManager(path);

router.get("/", async (req, res)=>{
    const products = await productManager.getProducts();
    res.render('home', {products: products})
})

router.get("/realtimeproducts", async (req, res)=>{
    const products = await productManager.getProducts();
    res.render("realtimeproducts", {products: products})
})

export {router as viewsRouter};