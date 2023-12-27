const socket = io();

document.addEventListener('DOMContentLoaded', ()=>{
    const addProductForm = document.getElementById('addProductForm');
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const codeInput = document.getElementById("code");
    const priceInput = document.getElementById("price");
    const stockInput = document.getElementById("stock");
    const categoryInput = document.getElementById("category");
    const productList = document.getElementById("productList");

     const submitForm = (event)=>{
        event.preventDefault();
        const title = titleInput.value;
        const description = descriptionInput.value;
        const code = codeInput.value;
        const price = priceInput.value;
        const stock = stockInput.value;
        const category = categoryInput.value;
        
        socket.emit('addProduct', {title, description, code, price, stock, category});
        console.log({title, description, code, price, stock, category});
        addProductForm.reset();
    };

    addProductForm.addEventListener('submit', submitForm);

    socket.on('newProduct', (productData)=>{
        console.log(productData);
        const listItem = document.createElement('li');
        listItem.textContent += `Name: ${productData.title}, Description: ${productData.description}, Code: ${productData.code}, Price: ${productData.price}, Stock: ${productData.stock}, Category: ${productData.category}`;
        productList.appendChild(listItem);
        listItem.appendChild(productTitle);
    });
})

