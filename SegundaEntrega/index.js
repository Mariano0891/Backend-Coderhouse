import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager();

const env = async () => {

    let firstconsult = await console.log(manager.getProducts());
    console.log(firstconsult);
    let product = ('Filtro', 'Filtro de combustible', 300, 'aaaaaaaaaaa', 'BG5X9155AA', 10)

    let firstAdd = await console.log(manager.addProduct(product));
    console.log(firstAdd);

}

env()