// src/components/Home/Home.js - VERSIÓN SIN ANIME.JS
import './Home.css';
import { getMetalPrice } from '../../utils/api.js';
import dayjs from 'dayjs';

const Home = () => {
    const home = document.createElement('main');
    home.className = 'home';
    home.id = 'home';

    const renderHome = async () => {
        try {
            const [goldPrice, silverPrice] = await Promise.all([  //Hasta que no hayan terminado las dos peticiones y se hayan guardado los resultados en goldPrice y silverPrice, no se continua
                getMetalPrice('XAU'),  //Obtenemos precio del oro
                getMetalPrice('XAG') //Obtenemos precio de la plata
            ]);

            //Formateamos fechas con dayjs para que sean más agradables a la vista
            const formattedGoldDate = dayjs(goldPrice.updatedAt, 'MMM DD, YYYY [at] h:mm A').format('YYYY-MM-DD HH:mm');
            const formattedSilverDate = dayjs(silverPrice.updatedAt, 'MMM DD, YYYY [at] h:mm A').format('YYYY-MM-DD HH:mm');

            home.innerHTML = `
                <section class="hero">
                    <div class="hero__container">
                        <div class="hero__content">
                            <h2 class="hero__title">Welcome to Golden Giggle</h2>
                            <p class="hero__subtitle">Premium Gold and Silver Bullion</p>
                            <div class="hero__prices">
                                <div class="price-card">
                                    <h3>Gold Price</h3>
                                    <div class="price">${goldPrice.priceFormatted}</div>
                                    <small>Last Updated: ${formattedGoldDate}</small>
                                </div>
                                <div class="price-card">
                                    <h3>Silver Price</h3>
                                    <div class="price">${silverPrice.priceFormatted}</div>
                                    <small>Last Updated: ${formattedSilverDate}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="ingots">
                    <div class="ingots__container">
                        <h2 class="section-title">Choose Your Precious Metal</h2>
                        <div class="ingots__grid">
                            <article class="ingot-card fade-in-up" data-route="buy" data-metal="XAU">
                                <div class="ingot-card__image">
                                    <img src="/assets/gold-ingot.jpg" alt="Gold Ingot" loading="lazy">
                                </div>
                                <div class="ingot-card__content">
                                    <h3 class="ingot-card__title">Gold Bullion</h3>
                                    <p class="ingot-card__description">Premium gold ingots from 1g to 1kg</p>
                                    <div class="ingot-card__price">
                                        Starting at $${(goldPrice.price / 31.1035).toFixed(2)}/g
                                    </div>
                                    <button class="btn btn--primary ingot-card__cta">Explore Gold</button>
                                </div>
                            </article>
                            
                            <article class="ingot-card fade-in-up stagger-1" data-route="buy" data-metal="XAG">
                                <div class="ingot-card__image">
                                    <img src="/assets/silver-ingot.jpg" alt="Silver Ingot" loading="lazy">
                                </div>
                                <div class="ingot-card__content">
                                    <h3 class="ingot-card__title">Silver Bullion</h3>
                                    <p class="ingot-card__description">Quality silver ingots from 1g to 1kg</p>
                                    <div class="ingot-card__price">
                                        Starting at $${(silverPrice.price / 31.1035).toFixed(2)}/g
                                    </div>
                                    <button class="btn btn--primary ingot-card__cta">Explore Silver</button>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>
            `;

            // Event listeners para navegación
            home.querySelectorAll('[data-route="buy"]').forEach(card => {  //Al hacer click sobre la carta de x item, nos redigirá a la página con todos los productos de ese item
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    const metal = e.currentTarget.dataset.metal;
                    window.router.navigate('buy', { metal });
                });
            });
        } catch (error) {   //En caso de que haya un error al cargar la api, no se mostrarán los productos sino un mensaje para que vuelva más tarde
            console.error('Error loading home:', error);
            home.innerHTML = `
                <section class="hero">
                    <div class="hero__container">
                        <div class="hero__content">
                            <h2 class="hero__title">Welcome to Golden Giggle</h2>
                            <p class="hero__subtitle">Premium Gold and Silver Bullion</p>
                            <div class="hero__prices">
                                <div class="price-card error">
                                    <h3>Gold Price</h3>
                                    <div class="price">Unavailable</div>
                                    <small>Error loading prices</small>
                                </div>
                                <div class="price-card error">
                                    <h3>Silver Price</h3>
                                    <div class="price">Unavailable</div>
                                    <small>Error loading prices</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            `;
        }
    };

    renderHome();

    return home;
};

export default Home;