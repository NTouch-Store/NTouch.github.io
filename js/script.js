/* ==========================================
   N'TOUCH LUXURY E-COMMERCE - JAVASCRIPT
   Complete functionality with security & accessibility
   ========================================== */

/* ==========================================
   PRODUCT DATA
   10 example products for the N'TOUCH collection
   ========================================== */
const products = [
    {
        id: 1,
        name: "Planner Exécutif Premium",
        price: 3000,
        image: "images/Ntouch1.jpg",
        description: "Un planner élégant conçu pour les professionnels ambitieux. Organisez vos journées avec style.",
        badge: "Bestseller",
        features: [
            "Couverture en cuir véritable",
            "Pages datées pour 12 mois",
            "Papier premium 120g",
            "Format A5 élégant",
            "Fermeture élastique dorée"
        ]
    },
    {
        id: 2,
        name: "Carnet de Notes Luxe",
        price: 1800,
        image: "images/Ntouch2.jpg",
        description: "Carnet de notes au design minimaliste pour vos idées les plus précieuses.",
        features: [
            "Couverture rigide élégante",
            "200 pages lignées",
            "Papier sans acide",
            "Signet en tissu",
            "Format A5"
        ]
    },
    {
        id: 3,
        name: "Mini Carnet Pocket",
        price: 1800,
        image: "images/Ntouch3.jpg",
        description: "Compact et élégant, parfait pour vos déplacements quotidiens.",
        badge: "Nouveau",
        features: [
            "Format de poche pratique",
            "100 pages de qualité",
            "Reliure cousue main",
            "Couverture souple",
            "Plusieurs couleurs disponibles"
        ]
    },
    {
        id: 4,
        name: "Agenda Journalier 2025",
        price: 2800,
        image: "images/Ntouch4.jpg",
        description: "Planifiez chaque journée de 2025 avec précision et élégance.",
        features: [
            "Une page par jour",
            "Calendrier annuel",
            "Section notes mensuelles",
            "Papier ivoire premium",
            "Coins arrondis dorés"
        ]
    },
    {
        id: 5,
        name: "Carnet de Croquis Artiste",
        price: 3200,
        image: "images/Ntouch5.jpg",
        description: "Pour les créatifs qui cherchent qualité et esthétique.",
        features: [
            "Papier dessin 160g",
            "Pages blanches non lignées",
            "Couverture texturée",
            "Format carré unique",
            "150 pages épaisses"
        ]
    },
    {
        id: 6,
        name: "Set Papeterie Collection",
        price: 3000,
        image: "images/Ntouch6.jpg",
        description: "Un ensemble complet pour une expérience d'écriture luxueuse.",
        badge: "Pack",
        features: [
            "1 planner + 2 carnets",
            "Coffret cadeau premium",
            "Stylo N'TOUCH inclus",
            "Personnalisation offerte",
            "Économie de 2000 DA"
        ]
    },
    {
        id: 7,
        name: "Planner Hebdomadaire Minimaliste",
        price: 5800,
        image: "images/Ntouch7.jpg",
        description: "Design épuré pour une organisation hebdomadaire efficace.",
        features: [
            "Vue hebdomadaire claire",
            "52 semaines planifiées",
            "Design minimaliste",
            "Papier recyclé premium",
            "Reliure à spirale dorée"
        ]
    },
    {
        id: 8,
        name: "Journal Intime Personnel",
        price: 4200,
        image: "images/Ntouch8.jpg",
        description: "Un espace privé pour vos pensées et réflexions quotidiennes.",
        features: [
            "Fermeture à clé dorée",
            "300 pages lignées",
            "Citations inspirantes",
            "Papier anti-transparence",
            "Format intime A6"
        ]
    },
    {
        id: 9,
        name: "Carnet de Voyage Explorer",
        price: 4800,
        image: "images/Ntouch9.jpg",
        description: "Documentez vos aventures avec style et durabilité.",
        badge: "Édition limitée",
        features: [
            "Couverture résistante à l'eau",
            "Pages pour photos et notes",
            "Cartes géographiques intégrées",
            "Poche de rangement",
            "Format voyage optimisé"
        ]
    },
    {
        id: 10,
        name: "Planner Business Gold",
        price: 9800,
        image: "images/Ntouch9.jpg",
        description: "Le summum du luxe pour les entrepreneurs exigeants.",
        badge: "Premium",
        features: [
            "Détails dorés à chaud",
            "Cuir italien véritable",
            "Pages avec filigrane",
            "Section finances intégrée",
            "Garantie à vie"
        ]
    }
];

/* ==========================================
   SHOPPING CART STATE
   Persistent cart using localStorage
   ========================================== */
let cart = [];

// Load cart from localStorage on page load
function loadCart() {
    const savedCart = localStorage.getItem('ntouchCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartUI();
        } catch (error) {
            console.error('Error loading cart:', error);
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('ntouchCart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

/* ==========================================
   INPUT SANITIZATION FOR SECURITY
   Prevents XSS attacks
   ========================================== */
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/* ==========================================
   FORM VALIDATION
   Client-side validation for all forms
   ========================================== */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^(\+213|0)[0-9]{9}$/;
    return re.test(phone.replace(/\s/g, ''));
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

/* ==========================================
   PRODUCT DISPLAY
   Dynamically render products on page
   ========================================== */
function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${sanitizeInput(product.name)}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${sanitizeInput(product.badge)}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${sanitizeInput(product.name)}</h3>
                <p class="product-description">${sanitizeInput(product.description)}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toLocaleString()} DA</span>
                    <button class="product-cta" onclick="openProductModal(${product.id})">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================
   PRODUCT MODAL FUNCTIONALITY
   Show product details in modal
   ========================================== */
let currentProduct = null;

function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalProductImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const quantityInput = document.getElementById('quantity');
    
    // Set modal content
    modalImage.src = currentProduct.image;
    modalImage.alt = currentProduct.name;
    modalTitle.textContent = currentProduct.name;
    modalPrice.textContent = `${currentProduct.price.toLocaleString()} DA`;
    modalDescription.textContent = currentProduct.description;
    
    // Set features
    modalFeatures.innerHTML = currentProduct.features
        .map(feature => `<li>${sanitizeInput(feature)}</li>`)
        .join('');
    
    // Reset quantity
    quantityInput.value = 1;
    
    // Show modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('backdrop').classList.remove('active');
    document.body.style.overflow = '';
    currentProduct = null;
}

/* ==========================================
   QUANTITY CONTROLS
   ========================================== */
function updateQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value) || 1;
    let newValue = currentValue + change;
    
    // Keep within bounds
    if (newValue < 1) newValue = 1;
    if (newValue > 10) newValue = 10;
    
    quantityInput.value = newValue;
}

/* ==========================================
   SHOPPING CART FUNCTIONALITY
   ========================================== */
function addToCart() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    closeProductModal();
    openCart();
    
    // Show success feedback
    showNotification('Produit ajouté au panier !');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotal.textContent = '0 DA';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${sanitizeInput(item.name)}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${sanitizeInput(item.name)}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} DA</div>
                <div class="cart-item-quantity">Quantité: ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Retirer du panier">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toLocaleString()} DA`;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    if (!document.querySelector('.modal.active')) {
        document.getElementById('backdrop').classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* ==========================================
   ORDER FORM FUNCTIONALITY
   ========================================== */
function openOrderForm() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'error');
        return;
    }
    
    closeCart();
    
    // Populate order summary
    const orderSummary = document.getElementById('orderSummary');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    orderSummary.innerHTML = cart.map(item => `
        <div class="order-summary-item">
            <span>${sanitizeInput(item.name)} (x${item.quantity})</span>
            <span>${(item.price * item.quantity).toLocaleString()} DA</span>
        </div>
    `).join('') + `
        <div class="order-summary-total">
            <span>Total:</span>
            <span>${total.toLocaleString()} DA</span>
        </div>
    `;
    
    // Show order modal
    const modal = document.getElementById('orderModal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('backdrop').classList.remove('active');
    document.body.style.overflow = '';
}

function submitOrder(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        lastName: sanitizeInput(document.getElementById('lastName').value),
        firstName: sanitizeInput(document.getElementById('firstName').value),
        phone: sanitizeInput(document.getElementById('phone').value),
        address: sanitizeInput(document.getElementById('address').value),
        wilaya: sanitizeInput(document.getElementById('wilaya').value),
        comments: sanitizeInput(document.getElementById('comments').value)
    };
    
    // Validate required fields
    if (!validateRequired(formData.lastName) || 
        !validateRequired(formData.firstName) ||
        !validateRequired(formData.phone) ||
        !validateRequired(formData.address) ||
        !validateRequired(formData.wilaya)) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    // Validate phone
    if (!validatePhone(formData.phone)) {
        showNotification('Numéro de téléphone invalide', 'error');
        return;
    }
    
    // Prepare order data
    const orderData = {
        ...formData,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    // Simulate sending order (in production, this would be an API call)
    console.log('Order submitted:', orderData);
    
    // Simulate email sending to placeholder
    simulateEmailSending(orderData);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    
    // Close order modal
    closeOrderModal();
    
    // Show confirmation
    showConfirmation();
    
    // Reset form
    document.getElementById('orderForm').reset();
}

function simulateEmailSending(orderData) {
    // In production, this would send to a real email address
    const emailPlaceholder = 'XXX@WWW.ZZ';
    console.log(`Email would be sent to: ${emailPlaceholder}`);
    console.log('Order details:', JSON.stringify(orderData, null, 2));
}

/* ==========================================
   CONFIRMATION MODAL
   ========================================== */
function showConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('backdrop').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.getElementById('backdrop').classList.remove('active');
    document.body.style.overflow = '';
}

/* ==========================================
   CONTACT FORM
   ========================================== */
function submitContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: sanitizeInput(document.getElementById('contactName').value),
        email: sanitizeInput(document.getElementById('contactEmail').value),
        message: sanitizeInput(document.getElementById('contactMessage').value)
    };
    
    // Validate
    if (!validateRequired(formData.name) || 
        !validateRequired(formData.email) ||
        !validateRequired(formData.message)) {
        showNotification('Veuillez remplir tous les champs', 'error');
        return;
    }
    
    if (!validateEmail(formData.email)) {
        showNotification('Email invalide', 'error');
        return;
    }
    
    // Simulate sending (in production, would be API call)
    console.log('Contact form submitted:', formData);
    
    showNotification('Message envoyé avec succès !');
    document.getElementById('contactForm').reset();
}

/* ==========================================
   NOTIFICATION SYSTEM
   ========================================== */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${sanitizeInput(message)}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */
function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/* ==========================================
   SMOOTH SCROLLING FOR NAVIGATION
   ========================================== */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Scroll to target
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   HEADER SCROLL EFFECT
   ========================================== */
let lastScroll = 0;

function handleHeaderScroll() {
    const header = document.getElementById('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
}

/* ==========================================
   EVENT LISTENERS SETUP
   ========================================== */
function setupEventListeners() {
    // Cart buttons
    document.getElementById('cartBtn').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('checkoutBtn').addEventListener('click', openOrderForm);
    
    // Product modal
    document.getElementById('closeModal').addEventListener('click', closeProductModal);
    document.getElementById('modalOverlay').addEventListener('click', closeProductModal);
    document.getElementById('decreaseQty').addEventListener('click', () => updateQuantity(-1));
    document.getElementById('increaseQty').addEventListener('click', () => updateQuantity(1));
    document.getElementById('addToCartBtn').addEventListener('click', addToCart);
    
    // Order modal
    document.getElementById('closeOrderModal').addEventListener('click', closeOrderModal);
    document.getElementById('orderModalOverlay').addEventListener('click', closeOrderModal);
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
    
    // Confirmation modal
    document.getElementById('closeConfirmation').addEventListener('click', closeConfirmation);
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', submitContactForm);
    
    // Mobile menu
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    
    // Backdrop
    document.getElementById('backdrop').addEventListener('click', () => {
        closeCart();
        closeProductModal();
        closeOrderModal();
    });
    
    // Scroll event
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Keyboard accessibility - ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
            closeProductModal();
            closeOrderModal();
            closeConfirmation();
        }
    });
}

/* ==========================================
   INITIALIZATION
   Run when DOM is fully loaded
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    loadCart();
    
    // Display products
    displayProducts();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Setup smooth scrolling
    setupSmoothScroll();
    
    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('N\'TOUCH E-commerce initialized successfully');
});

/* ==========================================
   END OF SCRIPT
   ========================================== */
