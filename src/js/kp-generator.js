// Commercial Proposal (KP) Generator
document.addEventListener('DOMContentLoaded', function() {
    // Override the main generateKP function from main.js
    window.generateKP = function() {
        // Get current date and time
        const now = new Date();
        const dateTime = now.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Collect all relevant data from the page
        const kpData = {
            dateTime: dateTime,
            dtfData: getDTFCalculatorData(),
            clothingData: getClothingCalculatorData(),
            totalCost: calculateTotalCost()
        };
        
        // Generate the commercial proposal
        generateCommercialProposal(kpData);
    };
});

function getDTFCalculatorData() {
    const dtfData = {
        totalArea: document.getElementById('total-area').value,
        totalMeters: document.getElementById('total-meters').value,
        printCost: document.getElementById('print-cost').value,
        transferCost: document.getElementById('transfer-cost').value
    };
    
    return dtfData;
}

function getClothingCalculatorData() {
    const clothingData = {
        productType: document.getElementById('product-type').value,
        fabricComposition: document.getElementById('fabric-composition').value,
        fabricWeight: document.getElementById('fabric-weight').value,
        productColor: document.getElementById('product-color').value,
        productSize: document.getElementById('product-size').value,
        quantity: document.getElementById('product-quantity').value,
        unitCost: document.getElementById('product-cost').value,
        totalCost: document.getElementById('total-product-cost').value
    };
    
    return clothingData;
}

function calculateTotalCost() {
    // Extract numeric values from the cost fields and sum them up
    const printCostText = document.getElementById('print-cost').value;
    const transferCostText = document.getElementById('transfer-cost').value;
    const clothingTotalText = document.getElementById('total-product-cost').value;
    
    const printCost = parseFloat(printCostText.replace(/[^\d]/g, '')) || 0;
    const transferCost = parseFloat(transferCostText.replace(/[^\d]/g, '')) || 0;
    const clothingTotal = parseFloat(clothingTotalText.replace(/[^\d]/g, '')) || 0;
    
    const total = printCost + transferCost + clothingTotal;
    return total.toLocaleString('ru-RU') + ' ₽';
}

function generateCommercialProposal(data) {
    // In a real implementation, this would generate a PDF
    // For now, we'll show an alert with the data
    
    const proposalText = `
КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ
Дата и время формирования: ${data.dateTime}

РАСЧЕТ DTF ПЕЧАТИ:
- Общая площадь: ${data.dtfData.totalArea} см²
- Итоговый метраж: ${data.dtfData.totalMeters} м
- Стоимость печати: ${data.dtfData.printCost}
- Стоимость переносов: ${data.dtfData.transferCost}

РАСЧЕТ ИЗДЕЛИЙ:
- Тип изделия: ${data.clothingData.productType}
- Состав ткани: ${data.clothingData.fabricComposition}
- Граммовка: ${data.clothingData.fabricWeight} г/м²
- Цвет: ${data.clothingData.productColor}
- Размер: ${data.clothingData.productSize}
- Количество: ${data.clothingData.quantity} шт.
- Общая стоимость изделий: ${data.clothingData.totalCost}

ОБЩАЯ СТОИМОСТЬ: ${calculateTotalCost()}
    `;
    
    alert(proposalText);
    
    console.log('Commercial Proposal generated:', data);
    
    // In a real implementation, we would use a library like jsPDF to generate a PDF
    // generatePDF(proposalText);
}

// Function to generate PDF (placeholder implementation)
function generatePDF(content) {
    // This would use a library like jsPDF to create an actual PDF
    // For now, this is just a placeholder
    
    console.log('PDF generation would happen here with content:', content);
    
    // Example of what would be done with jsPDF:
    /*
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text(content, 10, 10);
    doc.save(`KP_${new Date().toISOString().slice(0, 10)}.pdf`);
    */
}

// Enhanced function to collect all data for the KP
function collectAllDataForKP() {
    const allData = {
        dtfCalculations: [],
        clothingCalculations: [],
        orders: [],
        productions: []
    };
    
    // Collect DTF print blocks data
    document.querySelectorAll('.print-block').forEach(block => {
        const blockData = {
            width: block.querySelector('.print-width').value,
            height: block.querySelector('.print-height').value,
            quantity: block.querySelector('.print-quantity').value,
            area: block.querySelector('.print-area').value,
            transferType: block.querySelector('input[name^="transfer-type-"]:checked').value
        };
        allData.dtfCalculations.push(blockData);
    });
    
    // Add to the global data
    allData.summary = {
        totalArea: document.getElementById('total-area').value,
        totalMeters: document.getElementById('total-meters').value,
        printCost: document.getElementById('print-cost').value,
        transferCost: document.getElementById('transfer-cost').value,
        totalCost: calculateTotalCost()
    };
    
    return allData;
}