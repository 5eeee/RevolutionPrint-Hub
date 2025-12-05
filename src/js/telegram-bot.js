// Telegram Bot Integration
const TELEGRAM_BOT_TOKEN = '8128397217:AAGzNT7FfATcBqTIHwuyMjVbE2NMfB4i3bg';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID'; // This should be replaced with the actual chat ID

// Function to send message to Telegram bot
async function sendToTelegram(message) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID, // In a real implementation, this would be the actual chat ID
                text: message,
                parse_mode: 'HTML'
            })
        });
        
        const result = await response.json();
        console.log('Telegram message sent:', result);
        return result;
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        return null;
    }
}

// Enhanced function to send formatted order notifications
function sendOrderNotification(orderData) {
    // In a real implementation, we would use a proper chat ID
    // For now, we'll log the message that would be sent
    const message = `
🔔 <b>Новый заказ оформлен!</b> 🔔

📝 <b>Детали заказа:</b>
• Тип изделия: ${orderData.productType || 'N/A'}
• Состав ткани: ${orderData.fabricComposition || 'N/A'}
• Граммовка: ${orderData.fabricWeight || 'N/A'} г/м²
• Цвет: ${orderData.productColor || 'N/A'}
• Размер: ${orderData.productSize || 'N/A'}
• Количество: ${orderData.quantity || 'N/A'} шт.
• Стоимость за единицу: ${orderData.unitCost || 'N/A'}
• Общая стоимость: ${orderData.totalCost || 'N/A'}

⏰ Время заказа: ${new Date().toLocaleString('ru-RU')}
    `;
    
    console.log('Would send to Telegram:', message);
    
    // In a real implementation, uncomment the following line:
    // return sendToTelegram(message);
}

// Function to send DTF calculator notifications
function sendDTFCalculationNotification(calculationData) {
    const message = `
📊 <b>Новый расчет DTF:</b>

📏 Общая площадь: ${calculationData.totalArea || 'N/A'} см²
📐 Итоговый метраж: ${calculationData.totalMeters || 'N/A'} м
💸 Стоимость печати: ${calculationData.printCost || 'N/A'}
💳 Стоимость переносов: ${calculationData.transferCost || 'N/A'}

⏰ Время расчета: ${new Date().toLocaleString('ru-RU')}
    `;
    
    console.log('Would send DTF calculation to Telegram:', message);
}

// Listen for form submissions and send notifications
document.addEventListener('DOMContentLoaded', function() {
    // Listen for clothing request submissions
    document.addEventListener('click', function(e) {
        if (e.target.id === 'submit-request') {
            // We'll be notified from clothing-calculator.js when submitRequest is called
        }
    });
    
    // Listen for DTF calculation changes
    setInterval(() => {
        // In a real implementation, we might want to send periodic updates
        // or send updates when calculations change significantly
    }, 30000); // Every 30 seconds
});

// Expose the function globally so it can be called from other files
window.sendToTelegramBot = function(data) {
    if (data.productType) {
        // This is a clothing order
        sendOrderNotification(data);
    } else {
        // This might be a DTF calculation or other data
        console.log('Received data for Telegram bot:', data);
    }
};

// Function to handle status updates
function sendStatusUpdate(orderId, status, additionalInfo = '') {
    const message = `
📋 <b>Обновление статуса заказа #${orderId}</b>

📊 Новый статус: <b>${status}</b>

${additionalInfo ? `📝 Дополнительная информация: ${additionalInfo}` : ''}

⏰ Время обновления: ${new Date().toLocaleString('ru-RU')}
    `;
    
    console.log('Would send status update to Telegram:', message);
}

// Function to handle production task updates
function sendProductionTaskNotification(taskData) {
    const message = `
🏭 <b>Обновление задачи производства</b>

📋 Задача: ${taskData.taskName || 'N/A'}
🏭 Производство: ${taskData.productionName || 'N/A'}
📊 Статус: ${taskData.status || 'N/A'}

${taskData.description ? `📝 Описание: ${taskData.description}` : ''}

⏰ Время обновления: ${new Date().toLocaleString('ru-RU')}
    `;
    
    console.log('Would send production task update to Telegram:', message);
}

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendToTelegram,
        sendOrderNotification,
        sendDTFCalculationNotification,
        sendStatusUpdate,
        sendProductionTaskNotification
    };
}