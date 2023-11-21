import fs from 'fs';

export default class ProductManager {
    
    constructor (){
        this.products = [];
        this.path = './files/products.json';
    }    
      
    getProducts = async ()=> {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            this.products = products;
            return this.products
        }else{
            return []
        }
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const products = await this.getProducts();

        let nextAvailableId = 0;

        let newestProduct = [];

        if (products.length === 0){
        nextAvailableId = 1
        } else {
            newestProduct = products.reduce((productA, productB) => {
            return productB.id > productA.id ? productB : productA;
            });
            nextAvailableId = newestProduct.id + 1;
        };
        
        const productCode = this.products.find(product => product.code == code);

        if(!title || !description || !price || !thumbnail || !code || !stock){
            return 'All fields are required';
        }
        if(productCode) {
            return `The code ${code} already exists`; 
        }
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: nextAvailableId
        }

        this.products.push(product);

        await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
        return `Product ${title} added correctly`;

    }

    getProductById = async (productId) => {
        const products = await this.getProducts();
        const product = products.find (product => product.id == productId);

        if(product){
            return product;
        }else{
            return `Not found`
        }
    }

    updateProduct = async (productId, newData) => {
        this.products = await this.getProducts();
        let product = await this.getProductById(productId);
        if(product !== "Not found"){
            this.products = this.products.map(prod => prod.id === productId ? {...prod, ...newData} : prod);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products,null,'\t'))
            const product = this.products.find (product => product.id == productId);
            return `Product ${product.title} updated correctly`;
        }else{
            return `Product not found`
        }
    }

    deleteProduct = async (productId) => {
        let products = await this.getProducts();
        let product = await this.getProductById(productId);       
        if(product !== "Not found"){
            products = products.filter(prod => prod.id !== productId);
            await fs.promises.writeFile(this.path, JSON.stringify(products,null,'\t'))
            return `Product deleted correctly`;
        }else{
            return `Product not found`
        }
    }
}
