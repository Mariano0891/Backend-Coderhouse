import { Router } from "express";
import ProductManagerDB from "../dao/dbManagers/ProductManagerDB.js";

const router = Router();
const productManagerDB = new ProductManagerDB();

router.get('/', async (req, res)=>{
    try{

        const {limit, page, sort, category, price} = req.query
        const options = {
            limit: limit ?? 10,
            page: page ?? 1,
            sort: {price: sort === "asc" ? 1 : -1},
            lean: true,
        }
        const products = await productManagerDB.getProducts()
        
        if(products.hasPrevPage){
            products.prevLink = "---LINK---"
        }
        if(products.hasNextPage){
            products.nextLink = "---LINK---"
        }

        res.status(200).send({
            status: "success",
            msg: products
        })
        
    }catch (error) {
        console.log(error);
    }

    //let limit = parseInt(req.query.limit);
    /*if(!limit || limit <= 0){
        res.status(200).send({
            status:"succcess",
            products: products
        })
    }
    let limitResponse = products.slice(0,limit);
    res.status(200).send({
        status:"success",
        products: limitResponse
    })*/
})

router.get('/:pid', async (req, res)=>{
    const pid = parseInt(req.params.pid);
    const response = await productManagerDB.getProductById(pid);
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
    const response = await productManagerDB.addProduct(productData);

    if(response == "All fields are required") {
        res.status(400).send({
            status:"error",
            message: response,
        })
    }
    else if(response == `The code already exists`){
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
    const response = await productManagerDB.updateProduct(pid, newData);
    
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
    const response = await ProductManagerDB.deleteProduct(pid);
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