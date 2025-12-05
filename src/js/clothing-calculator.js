// Clothing Calculator functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize clothing calculator
    const quantityInput = document.getElementById('product-quantity');
    const productTypeSelect = document.getElementById('product-type');
    const productCostInput = document.getElementById('product-cost');
    const totalProductCostInput = document.getElementById('total-product-cost');
    
    // Price matrix for different products and quantities
    const priceMatrix = {
        't-shirt': [
            { min: 10, max: 100, price: 600 },
            { min: 101, max: 300, price: 500 },
            { min: 301, max: 500, price: 450 },
            { min: 501, max: 1000, price: 370 },
            { min: 1001, max: Infinity, price: 300 }
        ],
        'hoodie': [
            { min: 10, max: 100, price: 1200 },
            { min: 101, max: 300, price: 1000 },
            { min: 301, max: 500, price: 900 },
            { min: 501, max: 1000, price: 800 },
            { min: 1001, max: Infinity, price: 700 }
        ],
        'sweatshirt': [
            { min: 10, max: 100, price: 1000 },
            { min: 101, max: 300, price: 850 },
            { min: 301, max: 500, price: 750 },
            { min: 501, max: 1000, price: 650 },
            { min: 1001, max: Infinity, price: 550 }
        ],
        'tank-top': [
            { min: 10, max: 100, price: 400 },
            { min: 101, max: 300, price: 350 },
            { min: 301, max: 500, price: 300 },
            { min: 501, max: 1000, price: 250 },
            { min: 1001, max: Infinity, price: 200 }
        ]
    };
    
    // Calculate product cost based on quantity and type
    function calculateProductCost() {
        const quantity = parseInt(quantityInput.value) || 0;
        const productType = productTypeSelect.value;
        
        if (quantity <= 0) {
            productCostInput.value = '0';
            totalProductCostInput.value = '0';
            return;
        }
        
        // Find the appropriate price tier
        const tiers = priceMatrix[productType];
        let unitPrice = 0;
        
        for (const tier of tiers) {
            if (quantity >= tier.min && quantity <= tier.max) {
                unitPrice = tier.price;
                break;
            }
        }
        
        // If quantity is above the highest tier, use the highest price
        if (unitPrice === 0 && quantity > 0) {
            unitPrice = tiers[tiers.length - 1].price;
        }
        
        const totalCost = unitPrice * quantity;
        
        productCostInput.value = unitPrice.toLocaleString('ru-RU') + ' ₽';
        totalProductCostInput.value = totalCost.toLocaleString('ru-RU') + ' ₽';
    }
    
    // Event listeners
    quantityInput.addEventListener('input', calculateProductCost);
    productTypeSelect.addEventListener('change', calculateProductCost);
    
    // Submit request button
    document.getElementById('submit-request').addEventListener('click', function() {
        submitRequest();
    });
    
    // Initial calculation
    calculateProductCost();
});

function submitRequest() {
    // Collect form data
    const formData = {
        productType: document.getElementById('product-type').value,
        fabricComposition: document.getElementById('fabric-composition').value,
        fabricWeight: document.getElementById('fabric-weight').value,
        productColor: document.getElementById('product-color').value,
        productSize: document.getElementById('product-size').value,
        quantity: document.getElementById('product-quantity').value,
        unitCost: document.getElementById('product-cost').value,
        totalCost: document.getElementById('total-product-cost').value
    };
    
    // In a real implementation, this would send the data to a server
    // For now, we'll just show an alert
    alert(`Запрос отправлен!\nТип изделия: ${formData.productType}\nКоличество: ${formData.quantity}\nОбщая стоимость: ${formData.totalCost}`);
    
    console.log('Request submitted:', formData);
    
    // Send to Telegram bot (will be handled by telegram-bot.js)
    sendToTelegramBot(formData);
}

// Function to send data to Telegram bot (will be implemented in telegram-bot.js)
function sendToTelegramBot(data) {
    // Placeholder - will be implemented in telegram-bot.js
    console.log('Sending to Telegram bot:', data);
}