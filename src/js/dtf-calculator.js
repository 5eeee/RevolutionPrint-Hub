// DTF Calculator functionality
let printBlockCounter = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Add print block button
    document.getElementById('add-print-block').addEventListener('click', addPrintBlock);
    
    // Initial calculation
    updateCalculations();
    
    // Event delegation for print block inputs
    document.getElementById('print-blocks-container').addEventListener('input', function(e) {
        if (e.target.classList.contains('print-width') || 
            e.target.classList.contains('print-height') || 
            e.target.classList.contains('print-quantity')) {
            updatePrintBlockArea(e.target.closest('.print-block'));
            updateCalculations();
        }
    });
    
    // Event delegation for transfer type changes
    document.getElementById('print-blocks-container').addEventListener('change', function(e) {
        if (e.target.name && e.target.name.startsWith('transfer-type')) {
            updateCalculations();
        }
    });
    
    // Event delegation for print type changes
    document.querySelector('input[name="print-type"]').addEventListener('change', updateCalculations);
    
    // Initial update
    updateCalculations();
});

function addPrintBlock() {
    printBlockCounter++;
    
    const container = document.getElementById('print-blocks-container');
    const newBlock = document.createElement('div');
    newBlock.className = 'print-block card mb-3';
    newBlock.setAttribute('data-block-id', printBlockCounter);
    
    newBlock.innerHTML = `
        <div class="card-body">
            <div class="d-flex justify-content-end mb-2">
                <button class="btn btn-sm btn-danger remove-block" type="button">×</button>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label class="form-label">Ширина (см)</label>
                    <input type="number" class="form-control print-width" min="1" step="0.1" value="10">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Высота (см)</label>
                    <input type="number" class="form-control print-height" min="1" step="0.1" value="10">
                </div>
                <div class="col-md-2">
                    <label class="form-label">Количество</label>
                    <input type="number" class="form-control print-quantity" min="1" value="1">
                </div>
                <div class="col-md-4">
                    <label class="form-label">Площадь (см²)</label>
                    <input type="text" class="form-control print-area" readonly value="100">
                </div>
            </div>
            
            <div class="mt-3">
                <label class="form-label">Сложность переноса</label>
                <div class="btn-group" role="group">
                    <input type="radio" class="btn-check" name="transfer-type-${printBlockCounter}" id="easy-${printBlockCounter}" value="easy" checked>
                    <label class="btn btn-outline-primary" for="easy-${printBlockCounter}">Лёгкий перенос</label>
                    
                    <input type="radio" class="btn-check" name="transfer-type-${printBlockCounter}" id="complex-${printBlockCounter}" value="complex">
                    <label class="btn btn-outline-primary" for="complex-${printBlockCounter}">Сложный перенос</label>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newBlock);
    
    // Add event listener for remove button
    newBlock.querySelector('.remove-block').addEventListener('click', function() {
        newBlock.remove();
        updateCalculations();
    });
    
    // Update area for new block
    updatePrintBlockArea(newBlock);
    updateCalculations();
}

function updatePrintBlockArea(block) {
    const widthInput = block.querySelector('.print-width');
    const heightInput = block.querySelector('.print-height');
    const quantityInput = block.querySelector('.print-quantity');
    const areaInput = block.querySelector('.print-area');
    
    const width = parseFloat(widthInput.value) || 0;
    const height = parseFloat(heightInput.value) || 0;
    const quantity = parseInt(quantityInput.value) || 0;
    
    const area = width * height * quantity;
    areaInput.value = area.toFixed(2);
}

function updateCalculations() {
    // Calculate total area
    let totalArea = 0;
    const areaInputs = document.querySelectorAll('.print-area');
    areaInputs.forEach(input => {
        totalArea += parseFloat(input.value) || 0;
    });
    
    // Convert to meters (cm² to m²)
    const totalMeters = totalArea / 10000;
    
    // Update print type factor
    const printType = document.querySelector('input[name="print-type"]:checked').value;
    const printTypeFactor = printType === 'double' ? 2 : 1;
    const adjustedMeters = totalMeters * printTypeFactor;
    
    // Update fields
    document.getElementById('total-area').value = totalArea.toFixed(2);
    document.getElementById('total-meters').value = adjustedMeters.toFixed(2);
    
    // Calculate print cost based on meterage pricing
    const printCost = calculatePrintCost(adjustedMeters);
    document.getElementById('print-cost').value = printCost.toLocaleString('ru-RU') + ' ₽';
    
    // Calculate transfer cost
    const transferCost = calculateTransferCost();
    document.getElementById('transfer-cost').value = transferCost.toLocaleString('ru-RU') + ' ₽';
}

function calculatePrintCost(meters) {
    // Pricing table based on requirements
    if (meters <= 5) return meters * 1100;
    if (meters <= 10) return meters * 1000;
    if (meters <= 30) return meters * 900;
    if (meters <= 50) return meters * 850;
    if (meters <= 100) return meters * 800;
    return meters * 750;
}

function calculateTransferCost() {
    // Count easy and complex transfers
    let easyCount = 0;
    let complexCount = 0;
    
    const transferRadios = document.querySelectorAll('input[type="radio"][name^="transfer-type-"]:checked');
    transferRadios.forEach(radio => {
        const block = radio.closest('.print-block');
        const quantity = parseInt(block.querySelector('.print-quantity').value) || 0;
        
        if (radio.value === 'easy') {
            easyCount += quantity;
        } else {
            complexCount += quantity;
        }
    });
    
    // Cost per transfer (these values are placeholders - adjust as needed)
    const easyTransferCost = 50;  // 50 rubles per easy transfer
    const complexTransferCost = 100;  // 100 rubles per complex transfer
    
    return (easyCount * easyTransferCost) + (complexCount * complexTransferCost);
}

// Initialize remove buttons for existing blocks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.print-block').forEach(block => {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-sm btn-danger remove-block';
        removeBtn.type = 'button';
        removeBtn.innerHTML = '×';
        removeBtn.style.marginLeft = 'auto';
        
        const header = block.querySelector('.card-body > div.d-flex');
        if (!header) {
            const newHeader = document.createElement('div');
            newHeader.className = 'd-flex justify-content-end mb-2';
            newHeader.appendChild(removeBtn);
            block.querySelector('.card-body').prepend(newHeader);
        }
        
        removeBtn.addEventListener('click', function() {
            block.remove();
            updateCalculations();
        });
    });
});