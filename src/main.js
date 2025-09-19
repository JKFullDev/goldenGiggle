// src/main.js
import './styles/global.css';  // Estilos globales
import './styles/variables.css';  // Variables
import Header from './components/Header/Header.js';  // Componentes
import Home from './components/Home/Home.js';
import Products from './components/Products/Products.js';
import Sell from './components/Sell/Sell.js';
import Cart from './components/Cart/Cart.js';
import Footer from './components/Footer/Footer.js';
import { storageUtils } from './utils/storage.js';  // Utils
import { cartUtils } from './utils/cart.js';

// Router simple  /* Clase para manejar rutas */
class Router {
    constructor() {  // Constructor
        this.routes = {  // Mapa de rutas a componentes
            home: Home,
            buy: Products,
            sell: Sell,
            cart: Cart
        };
        this.currentView = null;  // Vista actual
        this.footer = null;  // Footer persistente
        this.init();  // Inicializa
    }

    init() {  // Inicialización

        storageUtils.setTheme(storageUtils.getTheme());  // Aplica tema guardado

        const header = Header();  // Crea header
        document.body.prepend(header);  // Inserta al inicio del body


        this.footer = Footer();  // Crea footer
        document.body.appendChild(this.footer);  // Al final


        this.navigate('home');  // Home por defecto

        // Escuchar eventos de navegación  
        document.addEventListener('click', (e) => {
            const routeElement = e.target.closest('[data-route]');  // Closest busca padre con data-route
            if (routeElement) {
                e.preventDefault();
                const route = routeElement.dataset.route;
                const params = routeElement.dataset.metal ? { metal: routeElement.dataset.metal } : {};  // Params opcional
                this.navigate(route, params);
            }

            // Botones del carrito
            const cartBtn = e.target.closest('[data-modal="cart"]');
            if (cartBtn) {
                e.preventDefault();
                this.navigate('cart');
            }
        });
    }

    async navigate(route, params = {}) {  // Función de navegación async
        // Limpiar vista anterior (excepto header y footer)
        if (this.currentView && this.currentView !== this.footer) {
            this.currentView.remove();  // Borra del DOM
        }

        try {
            // Obtener y renderizar nueva vista
            const ViewComponent = this.routes[route];
            if (ViewComponent) {
                this.currentView = await ViewComponent(params);  // Crea componente con params
                // Insertar antes del footer
                if (this.footer && this.footer.parentNode) {
                    this.footer.parentNode.insertBefore(this.currentView, this.footer);
                } else {
                    document.body.appendChild(this.currentView);
                }
            } else {
                // Vista por defecto
                this.currentView = await this.routes.home(params);
                if (this.footer && this.footer.parentNode) {
                    this.footer.parentNode.insertBefore(this.currentView, this.footer);
                } else {
                    document.body.appendChild(this.currentView);
                }
            }

            // Actualizar URL sin recargar  /* History API para SPA feel */
            const url = new URL(window.location);
            url.hash = `#${route}`;  // Agrega #ruta a URL
            window.history.pushState({}, '', url);  // Cambia URL sin reload

            // Scroll suave al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });  // Scroll top suave
        } catch (error) {
            console.error('Error navigating to route:', error);
            // Fallback a home
            this.currentView = await this.routes.home(params);
            document.body.appendChild(this.currentView);
        }
    }
}

// Inicializar aplicación 
document.addEventListener('DOMContentLoaded', () => {  // Cuando HTML cargado
    window.router = new Router();  // Crea router global
    // Evento para actualizar carrito
    window.dispatchEvent(new CustomEvent('cartUpdated'));  // Dispara evento inicial
});