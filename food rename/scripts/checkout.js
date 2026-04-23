// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!requireAuth()) {
        return;
    }
    
    // Check if cart is empty
    const cart = getCart();
    if (cart.length === 0) {
        alert('Your cart is empty!');
        window.location.href = 'menu.html';
        return;
    }
    
    // Render order summary
    renderCheckoutSummary();
    
    // Handle form submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        // Pre-fill email with current user's email
        const currentUser = getCurrentUser();
        if (currentUser) {
            document.getElementById('email').value = currentUser.email;
        }
        
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleCheckout();
        });
    }
});

// Render checkout summary
function renderCheckoutSummary() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkoutItems');
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <div>
                <div class="checkout-item-name">${item.name}</div>
                <div class="checkout-item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
    `).join('');
    
    // Update summary totals
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const delivery = 5.00;
    const total = subtotal + tax + delivery;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('delivery').textContent = `$${delivery.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Handle checkout
function handleCheckout() {
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        cardNumber: document.getElementById('cardNumber').value,
        expiry: document.getElementById('expiry').value,
        cvv: document.getElementById('cvv').value,
        notes: document.getElementById('notes').value,
    };
    
    // Validate form (basic validation)
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert('Please fill in all payment information');
        return;
    }
    
    // Generate order number
    const orderNumber = 'FH' + Date.now().toString().slice(-8);
    
    // Store order (for confirmation page)
    sessionStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        items: getCart(),
        total: calculateTotal(),
        customerInfo: formData,
        timestamp: new Date().toISOString()
    }));
    
    // Clear cart
    clearCart();
    
    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

// Calculate total
function calculateTotal() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const delivery = 5.00;
    return subtotal + tax + delivery;
}
