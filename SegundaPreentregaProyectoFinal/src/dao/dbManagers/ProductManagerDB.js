import productsModel from "../models/products.models.js";

export default class ProductManagerDB {
      
    getProducts = async (options)=> {
        
        const products = await productsModel.paginate(
            {
                //filter
            },
            {
                options
            }
        );
        
        return products;
    }
    
    addProduct = async (productData) => {
        
    }

    getProductById = async (pid) => {
        
        const product = await productsModel.findOne({_id_id});
        return {
            status : "success",
            msg: product
        }

    }

    updateProduct = async (pid, newData) => {
        
    }

    deleteProduct = async (pid) => {
        
    }
}