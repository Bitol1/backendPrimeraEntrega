const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.path = path.join(__dirname, '../data/products.json');
    }

    getProducts() {
        return fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path, 'utf-8')) : [];
    }

    getProductById(id) {
        return this.getProducts().find(p => p.id == id);
    }

    addProduct(product) {
        const products = this.getProducts();
        const newProduct = { id: products.length + 1, ...product };
        products.push(newProduct);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    updateProduct(id, updates) {
        let products = this.getProducts();
        const index = products.findIndex(p => p.id == id);
        if (index === -1) return null;
        products[index] = { ...products[index], ...updates, id: products[index].id };
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        return products[index];
    }

    deleteProduct(id) {
        let products = this.getProducts();
        const filteredProducts = products.filter(p => p.id != id);
        if (products.length === filteredProducts.length) return null;
        fs.writeFileSync(this.path, JSON.stringify(filteredProducts, null, 2));
        return true;
    }
}

module.exports = ProductManager;