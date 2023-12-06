import fs from "fs";
import path from "path";
import __dirname from "../utils.js";
import ProductManager from "../managers/ProductManager.js";

const productPath = "products.json";
const productManager = new ProductManager(productPath);

export default class CartManager {
    constructor(pathFile) {
    this.path = path.join(__dirname,`/files/${pathFile}`);
    }

    getCarts = async ()=> {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(data);
            this.carts = carts;
            return this.carts
        }else{
            return []
        }
    }

    addCart = async () => {
        let carts = await this.getCarts();

        let nextAvailableId = 0;

        let newestCart = [];

        if (carts.length === 0){
        nextAvailableId = 1
        } else {
            newestCart = carts.reduce((cartA, cartB) => {
            return cartB.id > cartA.id ? cartB : cartA;
            });
            nextAvailableId = newestCart.id + 1;
        };        
        let cart = {
            id: nextAvailableId,
            products: [],
        }
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts,null,'\t'));
        return `cart ${cart.id} created correctly`;
    }

    getCartById = async (cartId) => {
        const carts = await this.getCarts();
        const cart = carts.find (cart => cart.id == cartId);

        if(cart){
            return cart;
        }else{
            return `Not found`
        }
    }

    addProductsToCart = async(cid, pid) =>{
        const product = await productManager.getProductById(pid);
        const cart = await this.getCartById(cid);
        if(cart == "Not found"){
            return `Cart not found`
        }
        else if (product == "Not found"){
            return `Product not found`
        }
        const productIndex = cart.products.findIndex(p => p.product === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1});
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts,null,'\t'));
        return `Product added to cart`
    }
}
