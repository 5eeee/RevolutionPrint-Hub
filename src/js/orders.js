// Orders functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for "Накрутить" buttons (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-danger') && e.target.textContent.includes('Накрутить')) {
            inflateOrder(e.target);
        }
    });
});

function inflateOrder(button) {
    // Get the row containing the button
    const row = button.closest('tr');
    
    // Get the current price element
    const priceCell = row.cells[4]; // Price is in the 5th column (index 4)
    const currentPriceText = priceCell.textContent;
    
    // Extract the numeric value from the price (remove " ₽" and any spaces)
    const currentPrice = parseInt(currentPriceText.replace(/[^\d]/g, ''));
    
    // Calculate new price (add 10% as an example inflation)
    const inflationRate = 0.10; // 10% inflation
    const newPrice = Math.round(currentPrice * (1 + inflationRate));
    
    // Update the price in the table
    priceCell.textContent = newPrice.toLocaleString('ru-RU') + ' ₽';
    
    // Show fireworks animation
    showFireworks();
    
    // Add visual feedback
    priceCell.style.color = 'red';
    priceCell.style.fontWeight = 'bold';
    
    // After a short delay, return to normal
    setTimeout(() => {
        priceCell.style.color = '';
        priceCell.style.fontWeight = '';
    }, 2000);
    
    console.log(`Order inflated from ${currentPrice} to ${newPrice}`);
}

function showFireworks() {
    const container = document.getElementById('fireworks-container');
    container.style.display = 'block';
    
    // Create multiple fireworks
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createFirework(container);
        }, i * 100);
    }
    
    // Hide after animation
    setTimeout(() => {
        container.innerHTML = '';
        container.style.display = 'none';
    }, 3000);
}

function createFirework(container) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // Random position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    
    firework.style.left = startX + 'px';
    firework.style.top = startY + 'px';
    
    // Random color
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(firework);
    
    // Animate the firework
    const endX = startX + (Math.random() - 0.5) * 200;
    const endY = startY - 100 - Math.random() * 200;
    
    const animation = firework.animate([
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
    });
    
    // After the animation, remove the element
    animation.onfinish = () => {
        firework.remove();
    };
}