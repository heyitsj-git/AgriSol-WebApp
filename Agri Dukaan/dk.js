let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    alert(`${productName} added to cart.`);
    displayCart();
}

function displayCart() {
    let cartItems = document.getElementById('cart-items');
    let totalPrice = 0;
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">❌</button></p>`;
        totalPrice += item.price;
    });

    document.getElementById('total-price').textContent = `₹${totalPrice}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

function openPaymentModal() {
    document.getElementById('payment-modal').style.display = 'block';
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function processPayment() {
    let name = document.getElementById('customer-name').value;
    let address = document.getElementById('customer-address').value;
    let pincode = document.getElementById('customer-pincode').value;
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    if (!name || !address || !pincode) {
        alert('Please fill all details!');
        return;
    }

    alert(`Payment successful! Total amount: ₹${totalPrice}`);
    generateInvoice(name, address, pincode);
    cart = [];
    displayCart();
    closePaymentModal();
}

function generateInvoice(name, address, pincode) {
    let invoiceDetails = document.getElementById('invoice-details');
    let invoiceHTML = `<h3>Invoice</h3>`;
    invoiceHTML += `<p>Name: ${name}</p>`;
    invoiceHTML += `<p>Address: ${address}</p>`;
    invoiceHTML += `<p>Pincode: ${pincode}</p>`;
    invoiceHTML += `<h4>Items Purchased:</h4>`;
    
    cart.forEach(item => {
        invoiceHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });

    invoiceHTML += `<p><strong>Total Price: ₹${cart.reduce((sum, item) => sum + item.price, 0)}</strong></p>`;
    invoiceDetails.innerHTML = invoiceHTML;
}

function downloadInvoice() {
    let invoiceContent = document.getElementById('invoice-details').innerHTML;
    let blob = new Blob([invoiceContent], { type: 'text/html' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'invoice.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
