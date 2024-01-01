import fs from 'fs';
import path from "path";
import __dirname from "../../utils.js";

export default class ProductManagerDB {
    
    constructor (pathFile){
        this.products = [];
        this.path = path.join(__dirname,`/files/${pathFile}`);
    }    
      
    getProducts = async ()=> {
        
    }
    
    addProduct = async (productData) => {
        
    }

    getProductById = async (productId) => {
        
    }

    updateProduct = async (productId, newData) => {
        
    }

    deleteProduct = async (productId) => {
        
    }
}