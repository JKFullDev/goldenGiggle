import './Products.css';
import { getProducts } from '../../utils/api.js';
import { cartUtils } from '../../utils/cart.js';
import Swal from 'sweetalert2';

const Products = (params = {}) => {
    const metal = params.metal || 'XAU'; // Por defecto oro
    const productsMain = document.createElement('main');  //Se crea el main
    productsMain.className = 'products';
    productsMain.id = 'products';

    const renderProducts = async () => {  //Render async
        try {
            const products = await getProducts(metal);    //Obtiene lista 
            const metalName = metal === 'XAU' ? 'Gold' : 'Silver';   //Nombre completo
            const currentPrice = products[0].pricePerGram * 31.1035; // Precio por oz con comisión

            productsMain.innerHTML = `
                <section class="products__header">
                    <div class="container">
                        <h2 class="products__title">${metalName} Bullion</h2>
                        <div class="products__price">
                            <h3>Current ${metalName} Price</h3>
                            <div class="price">$${currentPrice.toFixed(2)} Per Oz. (incl. commission)</div>
                        </div>
                        <button class="btn btn--secondary back-btn" data-route="home">← Back to Home</button>
                    </div>
                </section>

                <section class="products__list">
                    <div class="container">
                        <div class="products__grid" id="products-grid">
                            ${products.map((product, index) => `
                                <article class="product-card fade-in-up stagger-${index}" data-product-id="${product.id}">
                                    <div class="product-card__image">
                                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                                    </div>
                                    <div class="product-card__content">
                                        <h3 class="product-card__title">${product.name}</h3>
                                        <p class="product-card__weight">${product.weight}g</p>
                                        <div class="product-card__price">${product.priceFormatted}</div>
                                        <button class="btn btn--primary add-to-cart" data-product-id="${product.id}">
                                            Add to Cart
                                        </button>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;

            // Event listeners
            productsMain.querySelector('[data-route="home"]').addEventListener('click', (e) => {   //Boton para volver a inicio
                e.preventDefault();
                window.router.navigate('home');
            });

            productsMain.querySelectorAll('.add-to-cart').forEach(btn => {  //Cada boton de añadir al carrito
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.productId;     //Id del boton
                    const product = products.find(p => p.id === productId);  //Encuentra producto
                    cartUtils.addToCart(product);   //Añade al carrito

                    Swal.fire({   //Alerta éxito
                        icon: 'success',
                        title: 'Added to Cart!',
                        text: `${product.name} has been added to your cart.`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                });
            });
        } catch (error) {  //Si no se pueden cargar los productos se informa al usuario para que vuelva más tarde
            console.error('Error loading products:', error);
            productsMain.innerHTML = `
                <section class="products__header">
                    <div class="container">
                        <h2 class="products__title">Products</h2>
                        <div class="error-message">
                            <p>Error loading products. Please try again later.</p>
                        </div>
                        <button class="btn btn--secondary back-btn" data-route="home">← Back to Home</button>
                    </div>
                </section>
            `;
        }
    };

    renderProducts();

    return productsMain;
};

export default Products;