// src/components/Cart/Cart.js
import './Cart.css';
import { cartUtils } from '../../utils/cart.js';
import Swal from 'sweetalert2';

const Cart = () => {
    const cartMain = document.createElement('main');
    cartMain.className = 'cart';
    cartMain.id = 'cart';

    const renderCart = () => {   // función render (se llama múltiples veces para updates)
        const cartItems = cartUtils.getCart();  //Obtiene items
        const total = cartUtils.getTotal();  //Total

        if (cartItems.length === 0) {   //Si el carrito está vacío se muestra lo siguiente
            cartMain.innerHTML = `
                <section class="cart__empty">
                    <div class="container">
                        <h2 class="cart__title">Your Cart is Empty</h2>
                        <p class="cart__subtitle">Add some precious metals to get started.</p>
                        <button class="btn btn--primary" data-route="buy">Start Shopping</button>
                    </div>
                </section>
            `;
        } else {    //Por el contrario si tiene items se muestra esto
            cartMain.innerHTML = `
                <section class="cart__header">
                    <div class="container">
                        <h2 class="cart__title">Shopping Cart</h2>
                        <div class="cart__summary">
                            <span>Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                            <span class="cart__total">Total: $${total.toFixed(2)}</span>
                        </div>
                    </div>
                </section>

                <section class="cart__items">
                    <div class="container">
                        <div class="cart__list">
                            ${cartItems.map(item => `
                                <article class="cart-item" data-product-id="${item.id}">
                                    <div class="cart-item__image">
                                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                                    </div>
                                    <div class="cart-item__details">
                                        <h3 class="cart-item__name">${item.name}</h3>
                                        <p class="cart-item__price">$${item.price.toFixed(2)} each</p>
                                    </div>
                                    <div class="cart-item__quantity">
                                        <button class="qty-btn qty-minus" data-product-id="${item.id}">-</button>
                                        <span class="qty-value">${item.quantity}</span>
                                        <button class="qty-btn qty-plus" data-product-id="${item.id}">+</button>
                                    </div>
                                    <div class="cart-item__subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
                                    <button class="cart-item__remove" data-product-id="${item.id}">Remove</button>
                                </article>
                            `).join('')}
                        </div>
                        
                        <div class="cart__actions">
                            <button class="btn btn--secondary clear-cart" id="clear-cart">Clear Cart</button>
                            <button class="btn btn--primary checkout-btn" id="checkout">Proceed to Checkout</button>
                        </div>
                    </div>
                </section>
            `;
        }

        // Event listeners comunes
        cartMain.querySelectorAll('[data-route]').forEach(link => {    //Routing
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.target.dataset.route;
                window.router.navigate(route);
            });
        });

        if (cartItems.length > 0) {  // Si no está vacío, agrega listeners específicos
            // Quantity controls
            cartMain.querySelectorAll('.qty-plus').forEach(btn => {  //boton de añadir cantidad de un objeto ya existente en el carrito (+)
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.productId;
                    cartUtils.updateQuantity(productId, cartUtils.getCart().find(item => item.id === productId).quantity + 1);
                    renderCart(); // Re-render
                });
            });

            cartMain.querySelectorAll('.qty-minus').forEach(btn => {    //boton de quitar cantidad de un objeto ya existente en el carrito (-)
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.productId;
                    cartUtils.updateQuantity(productId, cartUtils.getCart().find(item => item.id === productId).quantity - 1);
                    renderCart(); // Re-render
                });
            });

            // Remove items
            cartMain.querySelectorAll('.cart-item__remove').forEach(btn => {    //boton de eliminar toda cantidad un objeto ya existente en el carrito (remove)
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.productId;
                    Swal.fire({
                        title: 'Remove Item?',
                        text: 'Are you sure you want to remove this from your cart?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, remove it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            cartUtils.removeFromCart(productId);
                            renderCart(); // Re-render
                        }
                    });
                });
            });

            // Clear cart
            cartMain.querySelector('#clear-cart').addEventListener('click', () => {
                Swal.fire({   //Confirmación para vaciar carrito completamente
                    title: 'Clear Cart?',
                    text: 'This will remove all items from your cart.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, clear it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        cartUtils.clearCart();
                        renderCart(); // Re-render
                    }
                });
            });

            // Checkout (simulado)
            cartMain.querySelector('#checkout').addEventListener('click', () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed!',
                    html: `
                        <p>Thank you for your purchase!</p>
                        <p>Total: <strong>$${total.toFixed(2)}</strong></p>
                        <p>We'll process your order shortly.</p>
                    `,
                    confirmButtonText: 'Continue Shopping'
                }).then(() => {
                    cartUtils.clearCart();
                    window.router.navigate('home');
                });
            });
        }
    };

    renderCart();

    return cartMain;
};

export default Cart;