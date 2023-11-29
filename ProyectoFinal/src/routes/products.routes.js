import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const path = "products.json";
const router = Router();
const productManager = new ProductManager(path);

router.get('/', async (req, res)=>{
    let limit = parseInt(req.query.limit);
    const products = await productManager.getProducts()
    
    if(!limit || limit <= 0){
        res.status(200).send({
            status:"succcess",
            products: products
        })
    }
    let limitResponse = products.slice(0,limit);
    res.status(200).send({
        status:"success",
        products: limitResponse
    })
})

router.get('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const response = await productManager.getProductById(pid);
    if(response !== `Not found`){
        res.status(200).send({
            status:"success",
            product: response
        })
    }
    res.status(400).send({
        status:"error",
        message: response
    })
    
})

router.post('/', async (req, res)=>{
    const productData = req.body;
    const response = await productManager.addProduct(productData);

    if(response == "All fields are required") {
        res.status(400).send({
            status:"error",
            message: response,
        })
    }
    if(response == `The code already exists`){
        res.status(400).send({
        status:"error",
        message:`The code ${productData.code} already exists`
        })
    }
    res.status(200).send({
    status:"success",
    message: response
    })
    
})

router.put('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const newData = req.body;
    const response = await productManager.updateProduct(pid, newData);
    
    if(response !== "Product not found"){
        res.status(200).send({
            status:"success",
            message: response
        })
    }
    res.status(400).send({
        status:"error",
        message: response
    })
})

router.delete('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const response = await productManager.deleteProduct(pid);
    if(response !== `Product not found`){
        res.status(200).send({
            status: "success",
            message: response
        })
    }
    res.status(400).send({
        status:"error",
        message:response
    })
})

export {router as productRouter}