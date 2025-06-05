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

// Profile management system
let currentProfile = null;
let books = [];
let readingStats = {
    totalBooks: 0,
    readBooks: 0,
    favoriteBooks: 0,
    currentlyReading: 0
};

// Profile functions
function getCurrentProfile() {
    const activeProfileId = localStorage.getItem('tolendo_active_profile');
    if (!activeProfileId) {
        // Redirect to login if no active profile
        window.location.href = 'login.html';
        return null;
    }
    
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profile = profiles.find(p => p.id === activeProfileId);
    
    if (!profile) {
        // Profile not found, redirect to login
        localStorage.removeItem('tolendo_active_profile');
        window.location.href = 'login.html';
        return null;
    }
    
    return profile;
}

function saveCurrentProfile() {
    if (!currentProfile) return;
    
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    
    if (profileIndex !== -1) {
        // Update profile data
        currentProfile.library = books;
        currentProfile.stats = readingStats;
        currentProfile.lastAccess = new Date().toISOString();
        
        profiles[profileIndex] = currentProfile;
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
    }
}

function exportProfileData() {
    if (!currentProfile) {
        showNotification('Nenhum perfil carregado para exportar!', 'error');
        return;
    }
    
    // Update current profile with latest data before export
    saveCurrentProfile();
    
    const exportData = {
        profile: currentProfile,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProfile.name.replace(/\s+/g, '_')}_perfil_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Dados do perfil exportados com sucesso!', 'success');
}

function importProfileData() {
    const fileInput = document.getElementById('importFile');
    if (fileInput) {
        fileInput.click();
    }
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    if (file.type !== 'application/json') {
        showNotification('Por favor, selecione um arquivo JSON válido!', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);
            
            // Validate import data structure
            if (!importData.profile || !importData.profile.id) {
                showNotification('Arquivo JSON inválido! Estrutura de perfil não encontrada.', 'error');
                return;
            }
            
            // Confirm import
            if (confirm(`Importar dados do perfil "${importData.profile.name}"?\n\nIsto sobrescreverá seus dados atuais!`)) {
                // Update current profile with imported data
                const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
                const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
                
                if (profileIndex !== -1) {
                    // Preserve current profile ID and user credentials
                    const preservedData = {
                        id: currentProfile.id,
                        email: currentProfile.email,
                        username: currentProfile.username,
                        password: currentProfile.password
                    };
                    
                    // Merge imported data with preserved data
                    const updatedProfile = {
                        ...importData.profile,
                        ...preservedData,
                        lastAccess: new Date().toISOString()
                    };
                    
                    profiles[profileIndex] = updatedProfile;
                    currentProfile = updatedProfile;
                    
                    // Save updated profiles
                    localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
                    
                    // Update UI
                    updateProfileUI();
                    renderBooks();
                    
                    showNotification('Dados importados com sucesso!', 'success');
                } else {
                    showNotification('Erro ao importar: perfil atual não encontrado!', 'error');
                }
            }
        } catch (error) {
            console.error('Error importing profile data:', error);
            showNotification('Erro ao ler arquivo JSON. Verifique se o arquivo está correto.', 'error');
        }
        
        // Clear file input
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

function logoutUser() {
    if (confirm('Tem certeza que deseja sair?')) {
        saveCurrentProfile();
        localStorage.removeItem('tolendo_active_profile');
        window.location.href = 'login.html';
    }
}

// Local storage functions for persisting data
function saveToLocalStorage(key, data) {
    const currentProfile = getCurrentProfile();
    if (!currentProfile) return;
    
    try {
        // Save data specific to current user
        const userKey = `${currentProfile.id}_${key}`;
        localStorage.setItem(userKey, JSON.stringify(data));
        
        // Update the profile's data if it's book-related
        if (key === 'userBooks') {
            updateProfileLibrary(data);
        }
        
        saveCurrentProfile(); // Save to profile as well
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    const currentProfile = getCurrentProfile();
    if (!currentProfile) return null;
    
    try {
        // Load data specific to current user
        const userKey = `${currentProfile.id}_${key}`;
        const data = localStorage.getItem(userKey);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        return null;
    }
}

// Initialize app
function initializeApp() {
    // Load current profile
    currentProfile = getCurrentProfile();
    if (!currentProfile) return;
    
    // Load profile data
    books = currentProfile.library || [];
    readingStats = currentProfile.stats || {
        totalBooks: 0,
        readBooks: 0,
        favoriteBooks: 0,
        currentlyReading: 0
    };
    
    // Update profile info in UI
    updateProfileUI();
    updateReadingStats();
    
    // Load user preferences
    const savedGenres = currentProfile.selectedGenres || [];
    if (savedGenres.length > 0) {
        const genreTags = document.querySelectorAll('.genre-tag');
        genreTags.forEach(tag => {
            if (savedGenres.includes(tag.textContent)) {
                tag.classList.add('active');
            }
        });
    }
    
    // Render books if any
    if (books.length > 0) {
        renderBooks();
    }
}

function updateProfileUI() {
    if (!currentProfile) return;
    
    // Update profile name
    const profileNameEl = document.querySelector('.profile-name');
    if (profileNameEl) {
        profileNameEl.textContent = currentProfile.name;
    }
    
    // Update profile username
    const profileUsernameEl = document.querySelector('.profile-username');
    if (profileUsernameEl) {
        profileUsernameEl.textContent = `@${currentProfile.name.toLowerCase().replace(/\s+/g, '')}`;
    }
    
    // Update profile avatar
    const profileAvatarEl = document.querySelector('.profile-avatar');
    if (profileAvatarEl && currentProfile.profileImage) {
        profileAvatarEl.style.backgroundImage = `url(${currentProfile.profileImage})`;
        profileAvatarEl.style.backgroundSize = 'cover';
        profileAvatarEl.style.backgroundPosition = 'center';
        profileAvatarEl.textContent = '';
    } else if (profileAvatarEl) {
        profileAvatarEl.textContent = currentProfile.avatar || currentProfile.name.charAt(0).toUpperCase();
        profileAvatarEl.style.backgroundImage = 'none';
    }
}

function renderBooks() {
    // This function would render books in the library
    // Implementation depends on your current book rendering logic
    console.log('Rendering books for profile:', currentProfile.name);
}

// Add logout functionality to header
function addLogoutButton() {
    const header = document.querySelector('header');
    if (header && !document.querySelector('.logout-btn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'logout-btn';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        logoutBtn.title = 'Sair';
        logoutBtn.onclick = logoutUser;
        logoutBtn.style.cssText = `
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 8px;
            border-radius: 4px;
            transition: background 0.3s;
        `;
        logoutBtn.addEventListener('mouseover', function() {
            this.style.background = 'rgba(255,255,255,0.1)';
        });
        logoutBtn.addEventListener('mouseout', function() {
            this.style.background = 'none';
        });
        header.appendChild(logoutBtn);
    }
}

function updateProfileLibrary(books) {
    const currentProfile = getCurrentProfile();
    if (!currentProfile) return;
    
    // Update the profile's library in the profiles array
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    
    if (profileIndex !== -1) {
        profiles[profileIndex].library = books;
        profiles[profileIndex].stats = calculateUserStats(books);
        profiles[profileIndex].lastAccess = new Date().toISOString();
        
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
    }
}

function calculateUserStats(books) {
    const stats = {
        totalBooks: books.length,
        readBooks: books.filter(book => book.status === 'Finalizado').length,
        currentlyReading: books.filter(book => book.status === 'Lendo').length,
        favoriteBooks: books.filter(book => book.favorite).length
    };
    return stats;
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    addLogoutButton();
});
