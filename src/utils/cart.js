//Exporta un objeto con métodos
export const cartUtils = {
    getCart() {   //obtiene  carrito del localStorage
        return JSON.parse(localStorage.getItem('golden-giggle-cart') || '[]');  // JSON.parse convierte string a array.
    },

    addToCart(product, quantity = 1) {  // Agrega producto (quantity por defecto 1)
        const cart = this.getCart();  //Obtiene carrito actual
        const existingItem = cart.find(item => item.id === product.id); //Comprueba si ya existe el objeto en el carrito actual (find devuelve el primero que coincida)

        if (existingItem) {  //Si existe, suma cantida
            existingItem.quantity += quantity;
        } else {  //Si no existe, agrega uno nuevo
            cart.push({ ...product, quantity }); //... product copia el objeto + quantity
        }

        localStorage.setItem('golden-giggle-cart', JSON.stringify(cart));  //Se actualiza el carrito en localStorage (convertido a string)
        return cart;
    },

    removeFromCart(productId) {  //Elimina producto por id
        const cart = this.getCart().filter(item => item.id !== productId);  // Filter crea nuevo array sin el ítem que se desea borrar
        localStorage.setItem('golden-giggle-cart', JSON.stringify(cart));  //Se actualiza el carrito a la array (convertida a string) que ya no tiene el objeto
        return cart;
    },

    updateQuantity(productId, quantity) {  //Actualiza la cantidad de un producto
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);  //Comprueba que ese item esté en el carrito

        if (item) {  //Si existe, se actualiza en base a la cantidad deseada
            item.quantity = quantity;
            if (item.quantity <= 0) {  //Si la cantidad es <= 0, se elimina el item 
                return this.removeFromCart(productId);
            }
        }

        localStorage.setItem('golden-giggle-cart', JSON.stringify(cart));
        return cart;
    },

    getTotal() {  //Calcula el precio total de la compra
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);  // 'cart.reduce' suma precios * cantidades (0 inicial)
    },

    clearCart() { //Limpia todo el carrito
        localStorage.removeItem('golden-giggle-cart');  //Borra la clave
        return [];
    }
};