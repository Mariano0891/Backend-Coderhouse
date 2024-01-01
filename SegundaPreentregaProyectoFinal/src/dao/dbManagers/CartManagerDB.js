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
    
    getCartById = async (cartId) => {
        
        const cart = await cartsModel.find({_id:cartId});
        return cart;
    }

    addCart = async () => {
        
        const cart = await cartsModel.create({});
        return cart;

    }


    addProductsToCart = async(cartId, productId, quantity) => {

        const cart = await cartsModel.findOne({_id:cartId});
        if(!cart){
            return {
                status:"error",
                msg: `Cart with ID ${cartId} does not exist.`
            }
        };
        const product = await productsModel.findOne({_id:cartId});
        if (!product){
            return {
                status:"error",
                msg:`The product with id "${productId}" does not exist.`
            }
        }   
        let productsInCart = cart.products;
        const indexProduct = productsInCart.findIndex((product)=> products.product == productId);
        if (indexProduct == -1){
            const newProduct ={
                product: productId,
                quantity: quantity
            }    
            productsInCart.push(newProduct);
        }else{
            productsInCart[indexProduct].quantity += 1;
        }
        await cart.save();
        return {
            status: "success",
            msg: `Product ID ${productId} successfully added to cart.`
        }        
    }
}
