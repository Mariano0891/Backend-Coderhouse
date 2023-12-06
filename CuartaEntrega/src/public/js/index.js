const socket = io();

document.addEventListener('DOMContentLoaded', ()=>{
    const addProductForm = document.getElementById('addProductForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const codeInput = document.getElementById('code');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');
    const categoryInput = document.getElementById('category');
    const productList = document.getElementById('productList');

    const submitForm = (event)=>{
        event.preventDefault();

        const title = titleInput.value;
        const description = descriptionInput.value;
        const code = codeInput.value;
        const price = priceInput.value;
        const stock = stockInput.value;
        const category = categoryInput;
        
        socketClient.emit('addProduct', {title, description, code, price, stock, category});
        addProductForm.reset();
    };

    addProductForm.addEventListener('submit', submitForm);

    socketClient.on('newProduct', (productData)=>{
        console.log(productData);
        const listItem = document.createElement(ul);
        listItem.textContent += `Name: ${this.title}, Description: ${this.description}, Code: ${this.code}, Price: ${this.price}, Stock: ${this.stock}, Category: ${this.category}`,
        productList.appendChild(listItem);
    });
})

