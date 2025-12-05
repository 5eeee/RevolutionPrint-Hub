// Main application file
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabLinks = document.querySelectorAll('a[data-tab]');
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected tab content
            document.getElementById(tabId).style.display = 'block';
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Initialize active tab
    document.getElementById('dtf-calculator').style.display = 'block';
    
    // Generate KP button
    document.getElementById('generate-kp').addEventListener('click', function() {
        generateKP();
    });
});

// Function to generate Commercial Proposal
function generateKP() {
    // Get current date and time
    const now = new Date();
    const dateTime = now.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    alert(`Коммерческое предложение сформировано\nДата и время: ${dateTime}`);
    
    // In a real implementation, this would generate a PDF
    // For now, we'll just show an alert
    console.log('Generating Commercial Proposal with date:', dateTime);
}