class ProductManager {

    constructor (){
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        let totalProducts = this.products.length;
        
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
            id: ++totalProducts
        }

        this.products.push(product);

        return `Product ${title} added correctly`;
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (productId) => {
        const product = this.products.find (product => product.id == productId);

        if(product){
            return product;
        } else {
            return `Not found`;
        }
    }
}   

const productManager = new ProductManager();

console.log(productManager.addProduct('Filtro', 'Filtro de combustible', 300, 'aaaaaaaaaaa', 'BG5X9155AA', 10));

console.log(productManager.addProduct('Filtro primario', 'Filtro de aire', 400, 'aaaaaaaaaaa', 'RFA40', 10));

console.log(productManager.addProduct());

console.log(productManager.addProduct('Filtro secundario', 'Filtro de aire', 800, 'bbbbbbbb', 'RFA40', 12));

console.log(productManager.getProducts());

console.log(productManager.getProductById(2));

console.log(productManager.getProductById(5));

