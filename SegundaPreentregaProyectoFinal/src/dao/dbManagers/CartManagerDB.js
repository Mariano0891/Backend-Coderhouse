import cartsModel from "../models/cart.models.js"
import productsModel from "../models/products.models.js";

//import __dirname from "../utils.js";
//import ProductManager from "../managers/ProductManager.js";

//const productPath = "products.json";
//const productManager = new ProductManager(productPath);

export default class CartManagerDB {

    getCarts = async ()=> {
        
        const carts = await cartsModel.find();
        return carts;

    }
    
    getCartById = async (cid) => {
        
        const cart = await cartsModel.find({_id:cid});
        return cart;
    }

    addCart = async () => {
        
        const cart = await cartsModel.create({});
        return cart;

    }


    addProductsToCart = async(cid, pid, quantity) => {

        const cart = await cartsModel.findOne({_id:cid});
        if(!cart){
            return {
                status:"error",
                msg: `Cart with ID ${cid} does not exist.`
            }
        };
        const product = await productsModel.findOne({_id:pid});
        if (!product){
            return {
                status:"error",
                msg:`The product with id "${pid}" does not exist.`
            }
        }   
        let productsInCart = cart.products;
        const indexProduct = productsInCart.findIndex((product)=> products.product == pid);
        if (indexProduct == -1){
            const newProduct ={
                product: pid,
                quantity: quantity
            }    
            productsInCart.push(newProduct);
        }else{
            productsInCart[indexProduct].quantity += quantity;
        }
        await cart.save();
        return cart;        
    }
}
