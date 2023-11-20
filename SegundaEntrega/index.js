import ProductManager from "./managers/ProductManager.js";

const manager = new ProductManager();

const env = async () => {

    //Primera prueba de getProducts
    let firstconsult = await manager.getProducts();
    console.log(firstconsult);

    //Se agregan todos los productos
    let firstAdd = await manager.addProduct('Filtro', 'Filtro de combustible', 300, 'aaaaaaaaaaa', 'BG5X9155AA', 10);
    console.log(firstAdd);
    let secondAdd = await manager.addProduct('Filtro primario', 'Filtro de aire', 400, 'aaaaaaaaaaa', 'RFA40', 10);
    console.log(secondAdd);
    let thirdAdd = await manager.addProduct('Filtro secundario', 'Filtro de aire', 800, 'bbbbbbbb', 'RFA46', 12);
    console.log(thirdAdd);
    
    //Consulta para verificacion del archivo luego de las cargas anteriores
    let secondConsult = await manager.getProducts();
    console.log(secondConsult);
    
    //Pruebas de getProductById, la primera es para generar un error
    /*let wrongConsultById = await manager.getProductById(5);
    console.log(wrongConsultById);
    
    let correctConsultById = await manager.getProductById(2);
    console.log(correctConsultById);*/
    
    //Prueba de updateProduct y posterior consulta para corroborar el cambio realizado
    /*let update = await manager.updateProduct(3, {code: 'RFA38'});
    console.log(update);
    
    let newConsultById = await manager.getProductById(3);
    console.log(newConsultById);*/

    //Pruebas de deleteProduct. La primera sera rechazada por no existir el producto.
    /*let firstDelete = await manager.deleteProduct(4);
    console.log(firstDelete);
    
    let secondDelete = await manager.deleteProduct(2);
    console.log(secondDelete);*/

    //Nueva adicion para verificar que no se repita el ID asignado al nuevo producto
    /*let fourthAdd = await manager.addProduct('Filtro gasoil', 'Filtro de trampa de agua', 1200, 'dddddddddd', 'BH4X9N074AA', 24);
    console.log(fourthAdd);*/

    //Ultima consulta para verificar los cambios realizados.
    /*let lastConsult = await manager.getProducts();
    console.log(lastConsult);*/
}

env()