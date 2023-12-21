const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto según tus preferencias

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
    try {
        await productManager.loadProductsFromFile();

        let limit = parseInt(req.query.limit);

        if (!limit || isNaN(limit)) {
            res.json(productManager.getProducts());
        } else {
            res.json(productManager.getProducts().slice(0, limit));
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        await productManager.loadProductsFromFile();

        const productId = parseInt(req.params.pid);
        const product = productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});