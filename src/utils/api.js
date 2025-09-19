// src/utils/api.js
const API_BASE = 'https://api.gold-api.com/price';

export const getMetalPrice = async (metalSymbol) => {
    try {
        const response = await fetch(`${API_BASE}/${metalSymbol}`);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return {
            name: data.name,
            price: parseFloat(data.price),
            priceFormatted: `$${data.price} Per Oz.`,
            updatedAt: data.updatedAt,
            symbol: metalSymbol
        };
    } catch (error) {
        console.error('Error fetching metal price:', error);
        throw error;
    }
};

export const getProducts = async (metal) => {
    const priceData = await getMetalPrice(metal);
    const commission = 200;
    const finalPricePerOz = priceData.price + commission;

    // Pesos disponibles en gramos (1 oz = 31.1035 gramos)
    const weights = [1, 5, 10, 25, 50, 100, 250, 500, 1000];

    return weights.map(weight => ({
        id: `${metal.toLowerCase()}-${weight}`,
        name: `${metal === 'XAU' ? 'Gold' : 'Silver'} Ingot`,
        weight,
        pricePerGram: finalPricePerOz / 31.1035,
        price: (finalPricePerOz / 31.1035) * weight,
        priceFormatted: `$${(finalPricePerOz / 31.1035 * weight).toFixed(2)}`,
        metal,
        image: metal === 'XAU' ? './assets/gold-ingot.jpg' : './assets/silver-ingot.jpg'
    }));
};