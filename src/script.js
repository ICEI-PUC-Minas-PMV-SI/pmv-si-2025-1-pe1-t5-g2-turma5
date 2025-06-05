// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you could add logic to show/hide different content sections
            const tabName = this.getAttribute('data-tab');
            console.log(`Switched to tab: ${tabName}`);
        });
    });
    
    // Genre tag functionality
    const genreTags = document.querySelectorAll('.genre-tag');
    
    genreTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Toggle active class
            this.classList.toggle('active');
        });
    });
    
    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.action-btn.favorite');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle favorite state
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Edit button functionality
    const editButtons = document.querySelectorAll('.action-btn.edit');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Edit book clicked');
            // Here you would implement edit functionality
        });
    });
    
    // Delete button functionality
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (confirm('Tem certeza que deseja remover este livro?')) {
                const bookCard = this.closest('.book-card');
                bookCard.style.transform = 'scale(0)';
                bookCard.style.opacity = '0';
                
                setTimeout(() => {
                    bookCard.remove();
                }, 300);
            }
        });
    });
    
    // Add book button functionality
    const addBookButton = document.querySelector('.btn-primary');
    
    if (addBookButton) {
        addBookButton.addEventListener('click', function() {
            console.log('Add book clicked');
            // Here you would implement add book functionality
            // Could open a modal or navigate to an add book form
        });
    }
    
    // Edit profile button functionality
    const editProfileButton = document.querySelector('.btn-secondary');
    
    if (editProfileButton) {
        editProfileButton.addEventListener('click', function() {
            console.log('Edit profile clicked');
            // Here you would implement edit profile functionality
        });
    }
    
    // Profile avatar edit functionality
    const editAvatarButton = document.querySelector('.edit-profile-btn');
    
    if (editAvatarButton) {
        editAvatarButton.addEventListener('click', function() {
            console.log('Edit avatar clicked');
            // Here you would implement avatar upload functionality
        });
    }
    
    // Smooth scrolling for internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Book card hover effects
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Reading stats animation on page load
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateNumbers() {
        statNumbers.forEach(stat => {
            const finalNumber = parseInt(stat.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 20;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    stat.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentNumber);
                }
            }, 50);
        });
    }
    
    // Trigger animation after a short delay
    setTimeout(animateNumbers, 500);
    
    // Search functionality (placeholder)
    function searchBooks(query) {
        const bookCards = document.querySelectorAll('.book-card');
        const searchTerm = query.toLowerCase();
        
        bookCards.forEach(card => {
            const title = card.querySelector('.book-title').textContent.toLowerCase();
            const author = card.querySelector('.book-author').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || author.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Lazy loading for book covers (if needed)
    const bookCovers = document.querySelectorAll('.book-cover img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    bookCovers.forEach(img => {
        imageObserver.observe(img);
    });
});

// Utility functions
function updateReadingStats() {
    // This would be called when books are added/removed/status changed
    const finishedBooks = document.querySelectorAll('.book-status.finished').length;
    const favoriteBooks = document.querySelectorAll('.action-btn.favorite.active').length;
    
    document.querySelector('.stat-item:first-child .stat-number').textContent = finishedBooks;
    document.querySelector('.stat-item:nth-child(2) .stat-number').textContent = favoriteBooks;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: hsl(var(--primary-blue));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Local storage functions for persisting data
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        return null;
    }
}

// Initialize app
function initializeApp() {
    // Load user preferences
    const savedGenres = loadFromLocalStorage('selectedGenres');
    if (savedGenres) {
        const genreTags = document.querySelectorAll('.genre-tag');
        genreTags.forEach(tag => {
            if (savedGenres.includes(tag.textContent)) {
                tag.classList.add('active');
            }
        });
    }
    
    // Load favorite books
    const favoriteBooks = loadFromLocalStorage('favoriteBooks');
    if (favoriteBooks) {
        const favoriteButtons = document.querySelectorAll('.action-btn.favorite');
        favoriteButtons.forEach((button, index) => {
            if (favoriteBooks.includes(index)) {
                button.classList.add('active');
                const icon = button.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        });
    }
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
