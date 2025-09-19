// src/components/Header/Header.js
import './Header.css';
import { storageUtils } from '../../utils/storage.js';
import Swal from 'sweetalert2';

const Header = () => {  //Funcion que retorna elemento Header
    const header = document.createElement('header');
    header.className = 'header';

    const isLoggedIn = storageUtils.isLoggedIn();  //Verifica 'login'
    const user = storageUtils.getUser();  //Obtiene usuario si existe

    header.innerHTML = `
        <div class="header__container">
            <div class="header__logo">
                <h1 class="logo">
                    <a href="#" class="logo__link" data-route="home">Golden Giggle</a>  
                </h1>
            </div>
            
            <nav class="nav">
                <ul class="nav__list">
                    <li class="nav__item">
                        <a href="#" class="nav__link" data-route="home">Home</a>
                    </li>
                    <li class="nav__item">
                        <a href="#" class="nav__link" data-route="buy">Buy</a>
                    </li>
                    <li class="nav__item">
                        <a href="#" class="nav__link" data-route="sell">Sell</a>
                    </li>
                </ul>
            </nav>
            
            <div class="header__actions">
                <button class="btn btn--icon cart-btn" data-modal="cart" title="Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart2" viewBox="0 0 16 16">
                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
                    </svg>
                    <span class="cart__badge" style="display: none;">0</span>
                </button>
                
                ${isLoggedIn ? `
                    <div class="user-menu">
                        <span class="user-greeting">Hi, ${user.name}</span>
                        <button class="btn btn--secondary logout-btn" data-action="logout">Logout</button>
                    </div>
                ` : `
                    <button class="btn btn--secondary login-btn" data-action="login">Login</button>
                `}
                
                <button class="theme-toggle btn btn--icon" data-action="toggle-theme" title="Toggle theme">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9m0-2c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10m0 18.18c3.45 0 6.36-2.91 6.36-6.18S15.45 6.18 12 6.18 5.64 9.09 5.64 12 8.55 18.18 12 18.18z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;

    // Event listeners
    header.querySelectorAll('[data-route]').forEach(link => {   // Selecciona todos los enlaces con data-route
        link.addEventListener('click', (e) => {  //Agrega clik listener a cada uno
            e.preventDefault();
            const route = e.target.dataset.route;  //obtiene la ruta del data-attribute
            window.router.navigate(route);  //Llama al router global
        });
    });

    header.querySelector('[data-action="login"]')?.addEventListener('click', () => {
        Swal.fire({   //Lanza pop-up con SweertAlert
            title: 'Login',
            input: 'email',   //Input tipo email
            inputLabel: 'Enter your email',
            inputPlaceholder: 'you@example.com',
            showCancelButton: true,   //Muestra botón cancelar
            confirmButtonText: 'Login',  //Texto que se muestra en el botón de confirmar
            inputValidator: (value) => {    //valida el input y si no es válido muestra mensaje de error
                if (!value || !value.includes('@')) {
                    return 'Please enter a valid email!';
                }
            }
        }).then((result) => {    //Promesa de Swal
            if (result.isConfirmed) {  //Si es confirmado, se lleva a cabo el 'login' y se recarga la página
                storageUtils.login(result.value);
                window.location.reload();
            }
        });
    });

    header.querySelector('[data-action="logout"]')?.addEventListener('click', () => {  //Se selecciona el elemento del header con el data-action de logout que será el boton Logout
        storageUtils.logout();  //Se realiza el metodo logout de storageUtils
        window.location.reload();  //Se recarga la página
    });

    header.querySelector('[data-action="toggle-theme"]')?.addEventListener('click', () => { //Se selecciona el elemento del header con el data-action de cambiar tema
        storageUtils.toggleTheme();    //Se realiza el método de cambiar tema de storageUtils
    });

    // Actualizar badge del carrito
    const updateCartBadge = () => {
        const cartBadge = header.querySelector('.cart__badge');
        const cart = JSON.parse(localStorage.getItem('golden-giggle-cart') || '[]');  //Se obtiene el carrito
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);  //Obtiene el total de productos en el carrito

        if (totalItems > 0) {  //Si hay items se muestra un número según la cantidad que haya
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'inline';
        } else { //De lo contrario no se muestra nada
            cartBadge.style.display = 'none';
        }

    };
    let badgeInterval = setInterval(updateCartBadge, 500); // Actualiza cada medio segundo

    updateCartBadge();
    window.addEventListener('cartUpdated', updateCartBadge);

    return header;  // Retorna el elemento para insertar en DOM
};

export default Header; // Exporta como default para imports fáciles