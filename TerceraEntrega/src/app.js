import express from "express";
import ProductManager from "./ProductManager.js";

const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
})

const productManager = new ProductManager();

app.get('/products', async (req,res)=>{
    let limit = parseInt(req.query.limit);
    const products = await productManager.getProducts();
    if(!limit || limit <= 0) return res.send({products})
    let limitResponse = products.slice(0,limit);
    return res.send({limitResponse});
})

app.get('/products/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    return res.send({product})
})