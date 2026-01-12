// src/components/Footer/Footer.js
import './Footer.css';

const Footer = () => {
    const footer = document.createElement('footer');
    footer.className = 'footer';

    footer.innerHTML = `
        <div class="footer__container">
            <div class="footer__section">
                <h3 class="footer__title">Golden Giggle</h3>
                <p id="desc">Your trusted source for premium gold and silver bullion. <br>Secure, transparent, and reliable.</p>
            </div>
            
            <div class="footer__section">
                <h4 class="footer__subtitle">Quick Links</h4>
                <ul class="footer__links">
                    <li><a href="#" data-route="home">Home</a></li>
                    <li><a href="#" data-route="buy">Buy</a></li>
                    <li><a href="#" data-route="sell">Sell</a></li>
                </ul>
            </div>
            
            <div class="footer__section">
                <h4 class="footer__subtitle">Contact</h4>
                <p>info@goldengiggle.com</p>
                <p>+1 (555) 123-4567</p>
            </div>
            
            <div class="footer__section">
                <h4 class="footer__subtitle">Legal</h4>
                <ul class="footer__links">
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="https://es.vecteezy.com/">PNGs by Vecteezy</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer__bottom">
            <p>&copy; ${new Date().getFullYear()} Juan Carlos Alonso Hernando. All rights reserved.</p>
        </div>
    `;

    // Event listeners para enlaces
    footer.querySelectorAll('[data-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();  //Evitamos que el navegador cambie de página y no se refresque toda la web
            const route = e.target.dataset.route;  //Saca la ruta del data-route
            window.router.navigate(route);  //LLama al router para cambiar la vista sin recargar la página
        });
    });

    return footer;
};

export default Footer;