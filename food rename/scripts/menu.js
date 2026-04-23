// Menu page functionality
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', function() {
    const menuGrid = document.getElementById('menuGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Initial render
    renderMenuItems(menuItems, menuGrid);
    
    // Category filter event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const category = this.getAttribute('data-category');
            currentCategory = category;
            
            const filteredItems = category === 'all' 
                ? menuItems 
                : menuItems.filter(item => item.category === category);
            
            renderMenuItems(filteredItems, menuGrid);
        });
    });
});

// Render menu items
function renderMenuItems(items, container) {
    if (items.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; padding: 2rem;">No items found in this category.</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-name">${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <p class="menu-item-description">${item.description}</p>
                <div class="menu-item-footer">
                    <span class="menu-item-category">${item.category}</span>
                    <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to add to cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const item = menuItems.find(menuItem => menuItem.id === itemId);
            if (item) {
                addToCart(item);
            }
        });
    });
}
