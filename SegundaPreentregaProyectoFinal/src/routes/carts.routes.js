import { Router } from "express";
import CartManagerDB from "../dao/dbManagers/CartManagerDB.js"

const router = Router();
const cartManagerMongo = new CartManagerDB();

router.get('/', async (req, res)=>{
    const carts = await cartManagerMongo.getCarts()
    res.status(200).send({
        status:"success",
        carts: carts
    })
})

router.get('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    const response = await cartManager.getCartById(cid);
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
    const cart = await cartManagerMongo.addCart();
    res.status(200).send({
        status:"success",
        message: cart
    })
})

router.post('/:cid/product/:pid', async (req, res)=>{

    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const quantity = parseInt(req.body.quantity);

    const cart = await cartManagerMongo.addProductsToCart(cid, pid, quantity);

    res.status(200).send({
        status: "sucess",
        msg: cart
    });
    /*const response = await cartManager.addProductsToCart(cid, pid)
    if(response == 'Cart not found'){
        res.status(400).send({
            status:'error',
            message: response
        })
    }
    else if(response == 'Product not found'){
        res.status(400).send({
            status:'error',
            message: response
        })
    }
    res.status(200).send({
        status:"success",
        message: response
    })*/
})

/*router.put('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    res.send({
        status:"success",
        message:`Route put carts with ID: ${cid}`
    })
})

router.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    res.send({
        status:"success",
        message:`Route delete carts with ID: ${cid}`
    })
})*/

export {router as cartRouter}