const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.path = path.join(__dirname, '../data/carts.json');
    }

    getCarts() {
        return fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path, 'utf-8')) : [];
    }

    getCartById(id) {
        return this.getCarts().find(c => c.id == id);
    }

    createCart() {
        const carts = this.getCarts();
        const newCart = { id: carts.length + 1, products: [] };
        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
        return newCart;
    }

    addProductToCart(cartId, productId) {
        let carts = this.getCarts();
        let cart = carts.find(c => c.id == cartId);
        if (!cart) return null;
        let product = cart.products.find(p => p.product == productId);
        if (product) {
            product.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
        return cart;
    }
}

module.exports = CartManager;