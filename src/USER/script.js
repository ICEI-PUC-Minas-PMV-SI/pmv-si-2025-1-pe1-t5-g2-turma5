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
    
    // Note: Button functionality is handled by onclick attributes in HTML and proper event listeners below
    
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
    console.log('=== INÍCIO updateReadingStats ===');
    
    if (!currentProfile) {
        console.log('Nenhum perfil ativo encontrado');
        return;
    }
    
    // Use the new calculateUserStats function
    const stats = calculateUserStats();
    console.log('Estatísticas calculadas:', stats);
    
    // Update UI elements using specific IDs (only 3 counters)
    const finishedElement = document.getElementById('finishedBooksCount');
    const favoritesElement = document.getElementById('favoriteBooksCount');
    const currentlyReadingElement = document.getElementById('currentlyReadingCount');
    
    if (finishedElement) finishedElement.textContent = stats.finishedBooks;
    if (favoritesElement) favoritesElement.textContent = stats.favoriteBooks;
    if (currentlyReadingElement) currentlyReadingElement.textContent = stats.currentlyReading;
    
    console.log('Livros lidos atualizados:', stats.finishedBooks);
    console.log('Favoritos atualizados:', stats.favoriteBooks);
    console.log('Lendo agora atualizados:', stats.currentlyReading);
    
    // Save stats to profile for persistence
    currentProfile.stats = stats;
    saveCurrentProfile();
    console.log('Estatísticas salvas no perfil');
    
    // Update sidebar with currently reading books
    updateSidebarCurrentlyReading();
    
    console.log('=== FIM updateReadingStats ===');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Define solid colors for each type
    let backgroundColor, textColor, borderColor;
    
    switch (type) {
        case 'success':
            backgroundColor = '#2ECC71';
            textColor = 'white';
            borderColor = '#27AE60';
            break;
        case 'error':
            backgroundColor = '#E74C3C';
            textColor = 'white';
            borderColor = '#C0392B';
            break;
        case 'warning':
            backgroundColor = '#F39C12';
            textColor = 'white';
            borderColor = '#E67E22';
            break;
        case 'info':
        default:
            backgroundColor = '#3498DB';
            textColor = 'white';
            borderColor = '#2980B9';
            break;
    }
    
    // Style the notification with solid colors
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: ${textColor};
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border-left: 4px solid ${borderColor};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        min-width: 300px;
        max-width: 400px;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
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
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
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
    
    console.log('Loading profile with ID:', activeProfileId);
    
    // ALWAYS load from the profiles array to ensure correct user data
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    console.log('Available profiles in localStorage:', profiles.length);
    const profile = profiles.find(p => p.id === activeProfileId);
    
    if (!profile) {
        // Profile not found, redirect to login
        console.error('Profile not found for ID:', activeProfileId);
        localStorage.removeItem('tolendo_active_profile');
        window.location.href = 'login.html';
        return null;
    }
    
    console.log('Found profile:', profile.name);
    console.log('Raw bookRefs from localStorage:', profile.bookRefs);
    
    // Migrate legacy profiles to include profileImage if missing
    if (profile.profileImage === undefined) {
        console.log('Migrating profile to include profileImage field');
        profile.profileImage = null;
    }
    
    // Initialize bookRefs with standardized hyphenated keys
    if (!profile.bookRefs || typeof profile.bookRefs !== 'object') {
        console.log('Initializing standardized bookRefs structure');
        profile.bookRefs = {
            'want-to-read': [],
            'currently-reading': [],
            'finished-books': [],
            'favorites': []
        };
    } else {
        // Migrate old camelCase keys to hyphenated keys if needed
        const oldKeys = ['wantToRead', 'currentlyReading', 'finished'];
        const newKeys = ['want-to-read', 'currently-reading', 'finished-books'];
        
        for (let i = 0; i < oldKeys.length; i++) {
            if (profile.bookRefs[oldKeys[i]] && !profile.bookRefs[newKeys[i]]) {
                console.log(`Migrating ${oldKeys[i]} to ${newKeys[i]}`);
                profile.bookRefs[newKeys[i]] = profile.bookRefs[oldKeys[i]];
                delete profile.bookRefs[oldKeys[i]];
            }
        }
        
        // Ensure all required keys exist
        const requiredKeys = ['want-to-read', 'currently-reading', 'finished-books', 'favorites'];
        requiredKeys.forEach(key => {
            if (!Array.isArray(profile.bookRefs[key])) {
                profile.bookRefs[key] = [];
            }
        });
        
        console.log('BookRefs structure validated and migrated if needed');
    }
    
    // Check if migration is needed from profileBooks to bookRefs
    const totalRefsCount = Object.values(profile.bookRefs).reduce((sum, arr) => sum + arr.length, 0);
    if (totalRefsCount === 0) {
        const profileBooksKey = `${profile.id}_profileBooks`;
        const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
        
        if (profileBooks.length > 0) {
            console.log(`Migrating ${profileBooks.length} books from profileBooks to bookRefs`);
            
            profileBooks.forEach(book => {
                if (book.status && profile.bookRefs[book.status]) {
                    if (!profile.bookRefs[book.status].includes(book.id)) {
                        profile.bookRefs[book.status].push(book.id);
                        console.log(`Migrated book ${book.id} (${book.title}) to ${book.status}`);
                    }
                }
            });
            
            // Save the updated profile immediately
            const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
            const profileIndex = profiles.findIndex(p => p.id === profile.id);
            if (profileIndex !== -1) {
                profiles[profileIndex] = profile;
                localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
                console.log('Migration completed and profile saved');
            }
        }
    }
    
    console.log('Final profile bookRefs:', JSON.stringify(profile.bookRefs, null, 2));
    
    return profile;
}

function saveCurrentProfile() {
    if (!currentProfile) {
        console.error('No currentProfile to save!');
        return;
    }
    
    console.log('=== SAVING CURRENT PROFILE ===');
    console.log('Profile ID:', currentProfile.id);
    console.log('BookRefs before save:', JSON.stringify(currentProfile.bookRefs, null, 2));
    
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    console.log('Total profiles in localStorage:', profiles.length);
    
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    console.log('Profile index found:', profileIndex);
    
    if (profileIndex !== -1) {
        // Update timestamp and preserve all data
        currentProfile.lastAccess = new Date().toISOString();
        
        // Create a deep copy to avoid reference issues
        profiles[profileIndex] = JSON.parse(JSON.stringify(currentProfile));
        
        // Save ONLY to the main profiles array - single source of truth
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
        
        // Clean up old profile data that might cause conflicts
        localStorage.removeItem('user_profile');
        localStorage.removeItem('currentProfile');
        
        console.log('Profile saved successfully to tolendo_profiles');
        console.log('Saved bookRefs:', JSON.stringify(profiles[profileIndex].bookRefs, null, 2));
        
        // Immediate verification
        const verification = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
        const savedProfile = verification.find(p => p.id === currentProfile.id);
        
        if (savedProfile && savedProfile.bookRefs) {
            console.log('✅ Save verification passed');
            console.log('Verified bookRefs from profiles:', JSON.stringify(savedProfile.bookRefs, null, 2));
        } else {
            console.error('❌ Save verification FAILED!');
        }
    } else {
        console.error('Profile not found in profiles array!');
        console.log('Available profile IDs:', profiles.map(p => p.id));
    }
}

// Função para adicionar livro a uma lista específica
function adicionarLivroALista(livroId, lista) {
    console.log(`=== ADICIONANDO LIVRO À LISTA ===`);
    console.log(`Livro ID: ${livroId}, Lista: ${lista}`);
    
    if (!currentProfile) {
        console.error('Nenhum perfil ativo encontrado');
        return false;
    }
    
    // Initialize bookRefs safely if it doesn't exist or is incomplete
    if (!currentProfile.bookRefs || typeof currentProfile.bookRefs !== 'object') {
        console.log('Initializing bookRefs structure');
        currentProfile.bookRefs = {
            'want-to-read': [],
            'currently-reading': [],
            'finished-books': [],
            'favorites': []
        };
    }
    
    // Ensure all required arrays exist
    const requiredKeys = ['want-to-read', 'currently-reading', 'finished-books', 'favorites'];
    requiredKeys.forEach(key => {
        if (!Array.isArray(currentProfile.bookRefs[key])) {
            currentProfile.bookRefs[key] = [];
        }
    });
    
    // Normalize list name to match our standardized bookRefs structure
    let targetList;
    
    switch (lista) {
        case 'want-to-read':
        case 'wantToRead':
        case 'quero-ler':
            targetList = 'want-to-read';
            break;
        case 'currently-reading':
        case 'currentlyReading':
        case 'lendo-agora':
            targetList = 'currently-reading';
            break;
        case 'finished-books':
        case 'finished':
        case 'lidos':
            targetList = 'finished-books';
            break;
        case 'favorites':
        case 'favoritos':
            targetList = 'favorites';
            break;
        default:
            console.error('Lista não reconhecida:', lista);
            return false;
    }
    
    // Check if book is already in this list
    if (currentProfile.bookRefs[targetList].includes(livroId)) {
        console.log('Livro já existe na lista');
        return false;
    }
    
    // Add book to the target list
    currentProfile.bookRefs[targetList].push(livroId);
    console.log(`Livro adicionado à lista ${targetList}`);
    console.log(`Lista ${targetList} agora tem:`, currentProfile.bookRefs[targetList]);
    
    // Save profile safely
    saveCurrentProfile();
    console.log('Perfil salvo após adicionar livro');
    
    // Update interface
    renderBooksFromRefs();
    updateReadingStats();
    updateSidebarCurrentlyReading();
    
    return true;
}

// Função para remover livro de uma lista específica
function removerLivroDaLista(livroId, lista) {
    console.log(`=== REMOVENDO LIVRO DA LISTA ===`);
    console.log(`Livro ID: ${livroId}, Lista: ${lista}`);
    
    if (!currentProfile || !currentProfile.bookRefs) {
        console.error('Profile ou bookRefs não encontrado');
        return false;
    }
    
    // Encontrar e remover o livro da lista
    const index = currentProfile.bookRefs[lista].indexOf(livroId);
    if (index > -1) {
        currentProfile.bookRefs[lista].splice(index, 1);
        console.log(`Livro removido da lista ${lista}`);
        
        // Salvar o perfil
        saveCurrentProfile();
        console.log('Perfil salvo após remover livro');
        
        // Atualizar a interface
        renderBooksFromRefs();
        updateReadingStats();
        updateSidebarCurrentlyReading();
        
        return true;
    }
    
    console.log('Livro não encontrado na lista');
    return false;
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
    // Using global currentProfile variable
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

function initializeCentralLibrary() {
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    
    if (biblioteca.length === 0) {
        console.log('Initializing central library with sample books...');
        
        const sampleBooks = [
            {
                id: 'book_dom_casmurro',
                title: 'Dom Casmurro',
                author: 'Machado de Assis',
                genre: 'Literatura Brasileira',
                description: 'Romance que narra a história de Bentinho e sua paixão por Capitu.',
                cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"%3E%3Crect width="120" height="180" fill="%234A90E2"/%3E%3Ctext x="60" y="30" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold"%3EDom Casmurro%3C/text%3E%3Ctext x="60" y="160" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EMachado de Assis%3C/text%3E%3C/svg%3E',
                isbn: '978-8535902773',
                pages: 256,
                publisher: 'Companhia das Letras',
                publishedDate: '1899',
                language: 'Português',
                addedDate: new Date().toISOString()
            },
            {
                id: 'book_o_cortico',
                title: 'O Cortiço',
                author: 'Aluísio Azevedo',
                genre: 'Realismo',
                description: 'Romance naturalista que retrata a vida em um cortiço no Rio de Janeiro.',
                cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"%3E%3Crect width="120" height="180" fill="%23FF6B35"/%3E%3Ctext x="60" y="30" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold"%3EO Cortiço%3C/text%3E%3Ctext x="60" y="160" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EAluísio Azevedo%3C/text%3E%3C/svg%3E',
                isbn: '978-8508133024',
                pages: 304,
                publisher: 'Editora Ática',
                publishedDate: '1890',
                language: 'Português',
                addedDate: new Date().toISOString()
            },
            {
                id: 'book_1984',
                title: '1984',
                author: 'George Orwell',
                genre: 'Ficção Científica',
                description: 'Distopia sobre um regime totalitário que controla todos os aspectos da vida.',
                cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"%3E%3Crect width="120" height="180" fill="%23333333"/%3E%3Ctext x="60" y="90" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold"%3E1984%3C/text%3E%3Ctext x="60" y="160" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EGeorge Orwell%3C/text%3E%3C/svg%3E',
                isbn: '978-0451524935',
                pages: 328,
                publisher: 'Signet Classics',
                publishedDate: '1949',
                language: 'Português',
                addedDate: new Date().toISOString()
            },
            {
                id: 'book_harry_potter',
                title: 'Harry Potter e a Pedra Filosofal',
                author: 'J.K. Rowling',
                genre: 'Fantasia',
                description: 'A história de um jovem bruxo e suas aventuras em Hogwarts.',
                cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"%3E%3Crect width="120" height="180" fill="%237B68EE"/%3E%3Ctext x="60" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold"%3EHarry Potter%3C/text%3E%3Ctext x="60" y="40" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3Ee a Pedra%3C/text%3E%3Ctext x="60" y="55" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EFilosofal%3C/text%3E%3Ctext x="60" y="160" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EJ.K. Rowling%3C/text%3E%3C/svg%3E',
                isbn: '978-8532511010',
                pages: 264,
                publisher: 'Rocco',
                publishedDate: '1997',
                language: 'Português',
                addedDate: new Date().toISOString()
            },
            {
                id: 'book_pride_prejudice',
                title: 'Orgulho e Preconceito',
                author: 'Jane Austen',
                genre: 'Romance',
                description: 'Romance clássico sobre Elizabeth Bennet e Mr. Darcy.',
                cover: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"%3E%3Crect width="120" height="180" fill="%23DA70D6"/%3E%3Ctext x="60" y="25" text-anchor="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold"%3EOrgulho e%3C/text%3E%3Ctext x="60" y="40" text-anchor="middle" fill="white" font-family="Arial" font-size="9" font-weight="bold"%3EPreconceito%3C/text%3E%3Ctext x="60" y="160" text-anchor="middle" fill="white" font-family="Arial" font-size="8"%3EJane Austen%3C/text%3E%3C/svg%3E',
                isbn: '978-8525406958',
                pages: 424,
                publisher: 'Globo Livros',
                publishedDate: '1813',
                language: 'Português',
                addedDate: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('biblioteca_livros', JSON.stringify(sampleBooks));
        console.log(`Added ${sampleBooks.length} sample books to central library`);
    }
}

function cleanupUserData() {
    if (!currentProfile) return;
    
    console.log('=== CLEANING USER DATA ===');
    
    // FORCE RESET: Clear all book-related data for clean start
    currentProfile.bookRefs = {
        'want-to-read': [],
        'currently-reading': [],
        'finished-books': [],
        'favorites': []
    };
    
    // Clear user's specific library completely
    const userLibraryKey = `${currentProfile.id}_biblioteca`;
    localStorage.setItem(userLibraryKey, JSON.stringify([]));
    
    // Clear any old library references
    if (currentProfile.library) delete currentProfile.library;
    if (currentProfile.books) delete currentProfile.books;
    if (currentProfile.currentlyReading) delete currentProfile.currentlyReading;
    if (currentProfile.favorites) delete currentProfile.favorites;
    
    // Reset stats
    currentProfile.stats = {
        totalBooks: 0,
        finishedBooks: 0,
        favoriteBooks: 0,
        currentlyReading: 0
    };
    
    saveCurrentProfile();
    console.log('User data completely reset for clean start');
}

// Initialize app
function cleanupOldProfileData() {
    console.log('=== CLEANING UP OLD PROFILE DATA ===');
    
    // Remove old profile storage keys that might cause conflicts
    localStorage.removeItem('user_profile');
    localStorage.removeItem('currentProfile');
    
    // Remove old global review storage that might show reviews from other users
    localStorage.removeItem('biblioteca_resenhas');
    
    console.log('Old profile data and global reviews cleaned up');
}

function initializeApp() {
    console.log('=== INITIALIZING APP ===');
    
    // Clean up old profile data first
    cleanupOldProfileData();
    
    // Initialize central library if empty
    initializeCentralLibrary();
    
    // Load current profile with forced refresh from localStorage
    currentProfile = getCurrentProfile();
    if (!currentProfile) return;
    
    console.log('Active profile loaded:', currentProfile.name);
    console.log('Profile bookRefs on init:', JSON.stringify(currentProfile.bookRefs, null, 2));
    
    // Verify currentProfile has the latest data from localStorage
    console.log('Current profile bookRefs:', JSON.stringify(currentProfile.bookRefs, null, 2));
    
    // Clean up any inconsistent data
    cleanupUserData();
    
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
    updateAboutSection();
    
    // Load user preferences including favorite genres
    const savedGenres = currentProfile.selectedGenres || [];
    if (savedGenres.length > 0) {
        const genreTags = document.querySelectorAll('.genre-tag');
        genreTags.forEach(tag => {
            if (savedGenres.includes(tag.textContent)) {
                tag.classList.add('active');
            }
        });
    }
    
    // Load favorite genres from new system
    setTimeout(() => {
        loadFavoriteGenres();
        
        // Update statistics after everything is loaded
        updateReadingStats();
        
        // Render books from bookRefs system with fresh profile data
        console.log('=== CALLING renderBooksFromRefs ON PAGE LOAD ===');
        console.log('Final bookRefs before rendering:', JSON.stringify(currentProfile.bookRefs, null, 2));
        renderBooksFromRefs();
        
        // Update sidebar with currently reading books
        updateSidebarCurrentlyReading();
        
        // Load reviews
        loadAndRenderReviews();
    }, 100);
}

function updateProfileUI() {
    console.log('=== UPDATE PROFILE UI ===');
    if (!currentProfile) {
        console.log('No current profile, returning');
        return;
    }
    
    console.log('Current profile:', currentProfile.name);
    console.log('Profile has image:', currentProfile.profileImage ? 'yes' : 'no');
    
    // Update profile name
    const profileNameEl = document.querySelector('.profile-name');
    if (profileNameEl) {
        profileNameEl.textContent = currentProfile.name;
        console.log('Updated profile name');
    }
    
    // Update profile username
    const profileUsernameEl = document.querySelector('.profile-username');
    if (profileUsernameEl) {
        profileUsernameEl.textContent = `@${currentProfile.name.toLowerCase().replace(/\s+/g, '')}`;
        console.log('Updated profile username');
    }
    
    // Update profile avatar
    const profileAvatarImg = document.querySelector('#profileAvatar');
    console.log('Profile avatar element found:', profileAvatarImg ? 'yes' : 'no');
    
    if (profileAvatarImg) {
        if (currentProfile.profileImage) {
            console.log('Setting profile image, length:', currentProfile.profileImage.length);
            console.log('Image data preview:', currentProfile.profileImage.substring(0, 50) + '...');
            profileAvatarImg.src = currentProfile.profileImage;
            console.log('Profile avatar src updated');
        } else {
            console.log('No profile image, using default SVG');
            // Use default avatar SVG
            profileAvatarImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Ccircle cx='70' cy='70' r='70' fill='%23e9ecef'/%3E%3Ccircle cx='70' cy='55' r='25' fill='%236c757d'/%3E%3Cellipse cx='70' cy='110' rx='35' ry='25' fill='%236c757d'/%3E%3C/svg%3E";
        }
    } else {
        console.error('Profile avatar element not found!');
    }
    
    console.log('=== END UPDATE PROFILE UI ===');
}

function updateSidebarCurrentlyReading() {
    console.log('=== INÍCIO updateSidebarCurrentlyReading ===');
    
    if (!currentProfile) {
        console.log('Nenhum perfil ativo');
        return;
    }
    
    const sidebarContainer = document.querySelector('.sidebar-currently-reading .books-list');
    if (!sidebarContainer) {
        console.log('Container do sidebar não encontrado');
        return;
    }
    
    // Get currently reading books from new system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    const currentlyReadingBooks = profileBooks.filter(book => book.status === 'currently-reading');
    
    console.log('Livros sendo lidos encontrados:', currentlyReadingBooks.length);
    
    if (currentlyReadingBooks.length === 0) {
        sidebarContainer.innerHTML = '<p class="no-books">Nenhum livro sendo lido no momento</p>';
        console.log('Nenhum livro em leitura para exibir');
        return;
    }
    
    // Get book data from central library to ensure we have all details
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    
    sidebarContainer.innerHTML = '';
    
    currentlyReadingBooks.forEach(profileBook => {
        // Get complete book data from central library
        const fullBook = biblioteca.find(book => book.id === profileBook.id) || profileBook;
        
        const bookElement = document.createElement('div');
        bookElement.className = 'reading-book-item';
        bookElement.setAttribute('data-book-id', fullBook.id);
        
        // Use multiple possible cover properties
        const coverUrl = fullBook.coverUrl || fullBook.cover || fullBook.coverImage || fullBook.cover_image || '';
        
        bookElement.innerHTML = `
            <div class="book-cover-small">
                <img src="${coverUrl}" alt="${fullBook.title}" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                     onload="this.nextElementSibling.style.display='none';">
                <div class="book-placeholder-small">
                    <i class="fas fa-book"></i>
                </div>
            </div>
            <div class="book-details">
                <h4 class="book-title-small">${fullBook.title}</h4>
                <p class="book-author-small">${fullBook.author}</p>
                <div class="book-progress">
                    <i class="fas fa-bookmark"></i>
                    <span>Lendo</span>
                </div>
            </div>

        `;
        
        sidebarContainer.appendChild(bookElement);
        console.log(`Livro adicionado ao sidebar: ${fullBook.title} com capa: ${coverUrl}`);
    });
    
    console.log('=== FIM updateSidebarCurrentlyReading ===');
}

function loadFavoriteGenres() {
    console.log('=== LOADING FAVORITE GENRES ===');
    
    if (!currentProfile) {
        console.log('Nenhum perfil ativo');
        return;
    }
    
    const container = document.getElementById('genreTags');
    if (!container) {
        console.log('Container de gêneros não encontrado');
        return;
    }
    
    // Get favorite genres from profile
    const favoriteGenres = currentProfile.favoriteGenres || [];
    console.log('Gêneros favoritos do perfil:', favoriteGenres);
    
    // Clear container except for add button
    const addButton = container.querySelector('.genre-add-btn');
    container.innerHTML = '';
    
    // Add favorite genres
    favoriteGenres.forEach(genre => {
        const genreElement = document.createElement('span');
        genreElement.className = 'genre-tag';
        genreElement.textContent = genre;
        genreElement.title = 'Clique para remover';
        genreElement.style.display = 'inline-block';
        
        // Add click handler to remove genre
        genreElement.addEventListener('click', function() {
            removeGenre(genre);
        });
        
        container.appendChild(genreElement);
        console.log(`Gênero adicionado ao DOM: ${genre}`);
    });
    
    // Re-add the add button
    if (addButton) {
        container.appendChild(addButton);
    } else {
        const newAddButton = document.createElement('button');
        newAddButton.className = 'genre-add-btn';
        newAddButton.onclick = () => openGenreModal();
        newAddButton.title = 'Adicionar gênero favorito';
        newAddButton.innerHTML = '<i class="fas fa-plus"></i>';
        container.appendChild(newAddButton);
    }
    
    console.log('Gêneros carregados com sucesso');
}

function openGenreModal() {
    console.log('=== OPENING GENRE MODAL ===');
    
    const modal = document.getElementById('genreModal');
    if (!modal) {
        console.log('Modal não encontrado, criando...');
        createGenreModal();
        return;
    }
    
    console.log('Modal encontrado:', modal);
    
    // Clear previous selections
    const options = modal.querySelectorAll('.genre-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark current favorites as selected
    const currentGenres = currentProfile.favoriteGenres || [];
    console.log('Gêneros favoritos atuais:', currentGenres);
    
    options.forEach(option => {
        if (currentGenres.includes(option.textContent)) {
            option.classList.add('selected');
        }
    });
    
    console.log(`Opções de gênero encontradas: ${options.length}`);
    
    modal.style.display = 'flex';
    console.log('Modal ativado');
}

function createGenreModal() {
    const modalHTML = `
        <div id="genreModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        ">
            <div style="
                background: white;
                border-radius: 12px;
                padding: 2rem;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                position: relative;
                animation: modalSlideIn 0.3s ease-out;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #ddd;
                ">
                    <h3 style="color: #1C3D6A; font-size: 1.5rem; margin: 0;">Escolha seus gêneros favoritos (máximo 5)</h3>
                    <span onclick="closeGenreModal()" style="
                        background: none;
                        border: none;
                        font-size: 2rem;
                        color: #666;
                        cursor: pointer;
                        padding: 0;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        transition: all 0.3s ease;
                    ">&times;</span>
                </div>
                <div style="
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 1rem;
                    margin-bottom: 2rem;
                " class="genre-options">
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Romance</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Ficção Científica</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Fantasia</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Mistério</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Thriller</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Drama</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Biografia</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">História</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Autoajuda</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Clássico</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Aventura</div>
                    <div class="genre-option" onclick="toggleGenreSelection(this)" style="
                        padding: 1rem;
                        border: 2px solid #7FAAD1;
                        border-radius: 8px;
                        text-align: center;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: white;
                        color: #333;
                        font-weight: 500;
                    ">Terror</div>
                </div>
                <div style="
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid #ddd;
                ">
                    <button onclick="closeGenreModal()" style="
                        padding: 0.75rem 1.5rem;
                        border: 1px solid #7FAAD1;
                        border-radius: 6px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: #F5F9FF;
                        color: #1C3D6A;
                    ">Cancelar</button>
                    <button onclick="saveSelectedGenres()" style="
                        padding: 0.75rem 1.5rem;
                        border: none;
                        border-radius: 6px;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        background: #1C3D6A;
                        color: white;
                    ">Salvar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add hover effects via JavaScript
    const genreOptions = document.querySelectorAll('.genre-option');
    genreOptions.forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.borderColor = '#1C3D6A';
            this.style.background = '#F5F9FF';
            this.style.transform = 'translateY(-2px)';
        });
        
        option.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.borderColor = '#7FAAD1';
                this.style.background = 'white';
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    openGenreModal();
}

function toggleGenreSelection(element) {
    console.log('=== TOGGLE GENRE SELECTION ===');
    console.log('Opção clicada:', element.textContent);
    
    const selectedOptions = document.querySelectorAll('.genre-option.selected');
    
    if (element.classList.contains('selected')) {
        console.log('Removendo seleção');
        element.classList.remove('selected');
        // Reset to default style
        element.style.background = 'white';
        element.style.borderColor = '#7FAAD1';
        element.style.color = '#333';
    } else if (selectedOptions.length < 5) {
        console.log('Adicionando seleção');
        element.classList.add('selected');
        // Apply selected style
        element.style.background = '#1C3D6A';
        element.style.borderColor = '#1C3D6A';
        element.style.color = 'white';
    } else {
        showNotification('Você pode selecionar no máximo 5 gêneros!', 'error');
        return;
    }
    
    const newSelectedCount = document.querySelectorAll('.genre-option.selected').length;
    console.log('Gêneros selecionados agora:', newSelectedCount);
}

function saveSelectedGenres() {
    console.log('=== SAVING SELECTED GENRES ===');
    
    const selectedOptions = document.querySelectorAll('.genre-option.selected');
    console.log('Opções selecionadas:', selectedOptions.length);
    
    const selectedGenres = Array.from(selectedOptions).map(option => option.textContent);
    console.log('Gêneros selecionados:', selectedGenres);
    
    if (!currentProfile) {
        console.log('Nenhum perfil ativo');
        return;
    }
    
    currentProfile.favoriteGenres = selectedGenres;
    
    // Save to localStorage
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    
    if (profileIndex !== -1) {
        profiles[profileIndex] = currentProfile;
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
        console.log('Perfil salvo com gêneros:', profiles[profileIndex]);
    }
    
    // Update UI
    loadFavoriteGenres();
    
    // Close modal
    closeGenreModal();
    
    showNotification('Gêneros favoritos salvos com sucesso!', 'success');
}

function removeGenre(genreToRemove) {
    if (!currentProfile) return;
    
    currentProfile.favoriteGenres = currentProfile.favoriteGenres.filter(genre => genre !== genreToRemove);
    
    // Save to localStorage
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    
    if (profileIndex !== -1) {
        profiles[profileIndex] = currentProfile;
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
    }
    
    // Update UI
    loadFavoriteGenres();
    
    showNotification(`Gênero "${genreToRemove}" removido!`, 'success');
}

function closeGenreModal() {
    const modal = document.getElementById('genreModal');
    if (modal) {
        modal.remove();
    }
}

// Avatar upload functions - Updated
function triggerAvatarUpload() {
    console.log('triggerAvatarUpload called');
    const fileInput = document.getElementById('avatarInput');
    if (fileInput) {
        fileInput.click();
    } else {
        console.error('Avatar input not found');
    }
}

function handleAvatarUpload(event) {
    console.log('=== AVATAR UPLOAD STARTED ===');
    const file = event.target.files[0];
    if (!file) {
        console.log('No file selected');
        return;
    }

    console.log('File selected:', file.name, 'Type:', file.type, 'Size:', file.size);

    // Simple validation
    if (!file.type.includes('image')) {
        showNotification('Por favor, selecione uma imagem!', 'error');
        return;
    }

    // Check file size (max 2MB for better performance)
    if (file.size > 2 * 1024 * 1024) {
        showNotification('A imagem deve ter no máximo 2MB!', 'error');
        return;
    }

    console.log('Starting file read...');

    const reader = new FileReader();
    
    reader.onload = function(e) {
        console.log('=== AVATAR UPLOAD SUCCESS ===');
        const imageDataUrl = e.target.result;
        console.log('Image loaded, size:', imageDataUrl.length, 'bytes');
        
        if (!currentProfile) {
            console.error('No current profile available');
            showNotification('Erro: perfil não encontrado', 'error');
            return;
        }
        
        console.log('Updating profile for:', currentProfile.name);
        
        // Update profile image
        currentProfile.profileImage = imageDataUrl;
        
        // Immediately update the avatar display
        const avatarElement = document.getElementById('profileAvatar');
        if (avatarElement) {
            avatarElement.src = imageDataUrl;
            console.log('Avatar image updated in UI');
        } else {
            console.error('Avatar element not found!');
        }
        
        // Save the profile
        console.log('Saving profile with new image...');
        saveCurrentProfile();
        
        console.log('=== AVATAR UPLOAD COMPLETE ===');
        showNotification('Foto de perfil atualizada!', 'success');
    };
    
    reader.onerror = function(error) {
        console.error('Error reading file:', error);
        showNotification('Erro ao processar a imagem. Tente novamente.', 'error');
    };
    
    reader.readAsDataURL(file);
}

function renderBooksFromRefs() {
    console.log('=== RENDERING BOOKS FROM REFS ===');
    
    const profile = getCurrentProfile();
    if (!profile) {
        console.log('No profile found');
        return;
    }

    // Ensure bookRefs structure exists
    if (!profile.bookRefs) {
        profile.bookRefs = {
            'want-to-read': [],
            'currently-reading': [],
            'finished-books': [],
            'favorites': []
        };
    }

    // Load existing books from profileBooks system for migration
    const profileBooksKey = `${profile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    console.log(`Profile books (${profileBooksKey}) has`, profileBooks.length, 'entries');
    
    // Migrate existing profileBooks to bookRefs if bookRefs is empty
    const totalRefsCount = Object.values(profile.bookRefs).reduce((sum, arr) => sum + arr.length, 0);
    if (totalRefsCount === 0 && profileBooks.length > 0) {
        console.log('Migrating existing profile books to bookRefs structure');
        
        profileBooks.forEach(book => {
            if (book.status && profile.bookRefs[book.status]) {
                if (!profile.bookRefs[book.status].includes(book.id)) {
                    profile.bookRefs[book.status].push(book.id);
                    console.log(`Migrated book ${book.id} to ${book.status}`);
                }
            }
        });
        
        // Save the migrated bookRefs
        saveCurrentProfile();
    }
    
    console.log('Final profile bookRefs:', JSON.stringify(profile.bookRefs, null, 2));
    
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    console.log('Central library has', biblioteca.length, 'books');
    console.log('Final profile bookRefs:', JSON.stringify(profile.bookRefs, null, 2));
    // Map bookRefs keys to container IDs in HTML - using standardized hyphenated keys
    const seções = {
        'finished-books': 'finishedBooksContainer',
        'currently-reading': 'currentlyReadingContainer', 
        'favorites': 'favoriteBooksContainer',
        'want-to-read': 'wantToReadContainer'
    };

    Object.entries(seções).forEach(([refKey, containerId]) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log(`Container ${containerId} not found in DOM`);
            return;
        }

        const bookIds = profile.bookRefs[refKey] || [];
        console.log(`Container ${containerId}: Looking for ${bookIds.length} books with IDs:`, bookIds);
        
        const books = bookIds.map(id => {
            const book = biblioteca.find(book => book.id === id);
            console.log(`Book ID ${id}:`, book ? `Found "${book.title}"` : 'NOT FOUND');
            return book;
        }).filter(Boolean);

        console.log(`Container ${containerId}: Found ${books.length} valid books`);

        if (books.length === 0) {
            container.innerHTML = '';
            console.log(`Container ${containerId}: No books to display`);
            return;
        }

        container.innerHTML = books.map(book => `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-cover-wrapper">
                    <img src="${book.cover || '/default-book-cover.jpg'}" alt="${book.title}" class="book-cover" 
                         onerror="this.src='/default-book-cover.jpg'">
                    <div class="book-overlay">
                        <button class="action-btn favorite ${refKey === 'favorites' ? 'active' : ''}" 
                                onclick="toggleBookFavorite('${book.id}')" title="Favoritar">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn edit" onclick="openBookEditModal('${book.id}', '${refKey}')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn remove" onclick="removeBookFromSection('${book.id}', '${refKey}')" title="Remover">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-author">${book.author}</p>
                    ${book.year ? `<p class="book-year">${book.year}</p>` : ''}
                    <div class="book-rating">
                        ${'⭐'.repeat(Math.floor(book.rating || 0))}
                        ${book.rating ? `<span class="rating-text">${book.rating}/5</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log(`Container ${containerId}: Rendered ${books.length} books successfully`);
    });
    
    console.log('=== BOOKS RENDERING COMPLETE ===');
}

// Backward compatibility - keep old function name
function renderBooks() {
    renderBooksFromRefs();
}

function renderBooksInSection(sectionId, books) {
    console.log(`=== RENDERING SECTION: ${sectionId} ===`);
    console.log(`Books to render: ${books.length}`);
    
    const section = document.getElementById(sectionId);
    if (!section) {
        console.error(`Section ${sectionId} not found`);
        return;
    }
    
    const container = section.querySelector('.books-grid');
    if (!container) {
        console.error(`Books grid not found in section ${sectionId}`);
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Handle empty state
    const emptyState = section.querySelector('.empty-state');
    if (books.length === 0) {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
        container.style.display = 'none';
    } else {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        container.style.display = 'grid';
        
        books.forEach(book => {
            const bookCard = createBookCard(book, sectionId);
            container.appendChild(bookCard);
        });
    }
    
    console.log(`Rendered ${books.length} books in section ${sectionId}`);
}

function createBookCard(book, sectionId) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-book-id', book.id);
    
    // Get book data from central library to ensure we have all details including cover
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const fullBook = biblioteca.find(b => b.id === book.id) || book;
    
    // Create proper cover URL with fallback
    const coverUrl = fullBook.cover && fullBook.cover.trim() !== "" 
        ? fullBook.cover 
        : `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"><rect width="120" height="180" fill="#cccccc"/><text x="60" y="90" text-anchor="middle" fill="#666" font-family="Arial" font-size="14" font-weight="bold">${fullBook.title}</text><text x="60" y="160" text-anchor="middle" fill="#666" font-family="Arial" font-size="10">${fullBook.author}</text></svg>`)}`;
    
    card.innerHTML = `
        <div class="book-cover">
            <img src="${coverUrl}" alt="${fullBook.title}">
        </div>
        <div class="book-info">
            <h3 class="book-title">${fullBook.title}</h3>
            <p class="book-author">${fullBook.author}</p>
            <div class="book-actions">
                <button class="btn-action" onclick="openBookEditModal('${book.id}', '${sectionId}')" title="Editar livro">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action" onclick="removeBookFromSection('${book.id}', '${sectionId}')" title="Remover">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function moveBookToSection(bookId, currentSection) {
    console.log(`Moving book ${bookId} from ${currentSection}`);
    
    const sections = ['want-to-read', 'currently-reading', 'finished-books', 'favorites'];
    const sectionNames = {
        'want-to-read': 'Quero Ler',
        'currently-reading': 'Lendo Atualmente', 
        'finished-books': 'Finalizados',
        'favorites': 'Favoritos'
    };
    
    // Create modal for section selection
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Mover para qual seção?</h3>
            <div class="section-options">
                ${sections.map(section => 
                    section !== currentSection ? 
                    `<button class="section-btn" onclick="confirmMoveBook('${bookId}', '${currentSection}', '${section}')">${sectionNames[section]}</button>` 
                    : ''
                ).join('')}
            </div>
            <button class="btn-cancel" onclick="closeMoveModal()">Cancelar</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function confirmMoveBook(bookId, fromSection, toSection) {
    console.log(`Confirming move: ${bookId} from ${fromSection} to ${toSection}`);
    
    // Using global currentProfile variable
    if (!currentProfile || !currentProfile.bookRefs) return;
    
    // Remove from current section
    const fromArray = currentProfile.bookRefs[fromSection];
    if (fromArray) {
        const index = fromArray.indexOf(bookId);
        if (index > -1) {
            fromArray.splice(index, 1);
        }
    }
    
    // Add to new section
    if (!currentProfile.bookRefs[toSection]) {
        currentProfile.bookRefs[toSection] = [];
    }
    currentProfile.bookRefs[toSection].push(bookId);
    
    // Save and refresh
    saveCurrentProfile();
    renderBooks();
    updateReadingStats();
    closeMoveModal();
    
    showNotification('Livro movido com sucesso!', 'success');
}

function removeBookFromSection(bookId, sectionId) {
    console.log(`=== REMOVING BOOK ${bookId} FROM SECTION ${sectionId} ===`);
    
    // Using global currentProfile variable
    if (!currentProfile || !currentProfile.bookRefs) {
        console.log('No profile or bookRefs found');
        showNotification('Erro: perfil não encontrado!', 'error');
        return;
    }
    
    // Confirmar exclusão
    if (!confirm('Tem certeza que deseja remover este livro da sua biblioteca?')) {
        return;
    }
    
    const userId = currentProfile.id;
    console.log(`User ID: ${userId}`);
    
    // 1. Remove das referências de todas as seções
    let removed = false;
    Object.keys(currentProfile.bookRefs).forEach(section => {
        const bookArray = currentProfile.bookRefs[section];
        if (Array.isArray(bookArray)) {
            const index = bookArray.indexOf(bookId);
            if (index > -1) {
                bookArray.splice(index, 1);
                console.log(`Book ${bookId} removed from section ${section}`);
                removed = true;
            }
        }
    });
    
    if (!removed) {
        console.log(`Book ${bookId} not found in any section`);
        showNotification('Livro não encontrado nas suas seções!', 'error');
        return;
    }
    
    // 2. Remove da biblioteca específica do usuário
    const userLibraryKey = `${userId}_biblioteca`;
    console.log(`Loading user library: ${userLibraryKey}`);
    const userLibrary = loadFromLocalStorage(userLibraryKey) || [];
    console.log(`User library before removal:`, userLibrary.length, 'books');
    
    const updatedLibrary = userLibrary.filter(book => book.id !== bookId);
    console.log(`User library after removal:`, updatedLibrary.length, 'books');
    
    saveToLocalStorage(userLibraryKey, updatedLibrary);
    console.log(`Book ${bookId} removed from user library ${userLibraryKey}`);
    
    // 3. Salva perfil atualizado
    saveCurrentProfile();
    console.log('Profile saved successfully');
    
    // 4. Atualiza interface
    renderBooks();
    updateReadingStats();
    console.log('=== BOOK REMOVAL COMPLETED ===');
    
    showNotification('Livro removido com sucesso da sua biblioteca!', 'success');
}

function closeMoveModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function openAddBookModal() {
    console.log('Add book clicked');
    
    // Remove any existing modal
    const existingModal = document.getElementById('addBookModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="addBookModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        ">
            <div class="modal-content" style="
                background: white;
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            ">
                <div class="modal-header" style="
                    padding: 1.5rem;
                    border-bottom: 1px solid #e0e6ed;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <h2 style="margin: 0; color: #1C3D6A;">Adicionar Livro à Biblioteca</h2>
                    <button onclick="closeAddBookModal()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #666;
                        padding: 0.5rem;
                        border-radius: 4px;
                    ">&times;</button>
                </div>
                
                <div class="modal-body" style="padding: 1.5rem;">
                    <div id="catalogBooksGrid" style="
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                        gap: 1rem;
                        margin-bottom: 1.5rem;
                    ">
                        <!-- Books will be loaded here -->
                    </div>
                    
                    <div style="text-align: center; padding: 1rem; border-top: 1px solid #e0e6ed;">
                        <button onclick="redirectToCadastro()" style="
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 6px;
                            cursor: pointer;
                            font-weight: 500;
                        ">
                            <i class="fas fa-plus"></i> Cadastrar Novo Livro
                        </button>
                    </div>
                </div>
                
                <div class="modal-footer" style="
                    padding: 1.5rem;
                    border-top: 1px solid #e0e6ed;
                    text-align: center;
                ">
                    <button onclick="closeAddBookModal()" style="
                        background: #f8f9fa;
                        color: #666;
                        border: 1px solid #ddd;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listener to close modal when clicking outside
    setTimeout(() => {
        const addBookModal = document.getElementById('addBookModal');
        if (addBookModal) {
            addBookModal.addEventListener('click', (e) => {
                if (e.target === addBookModal) {
                    closeAddBookModal();
                }
            });
        }
    }, 100);
    
    // Load books from catalog
    loadCatalogBooks();
}

function closeAddBookModal() {
    const modal = document.getElementById('addBookModal');
    if (modal) {
        modal.remove();
    }
    
    // Ensure scroll is restored
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Additional safety check for scroll restoration
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 100);
}

function loadCatalogBooks() {
    console.log('=== LOADING CATALOG BOOKS ===');
    
    // Ensure central library is initialized
    initializeCentralLibrary();
    
    const loadingState = document.getElementById('catalogLoadingState');
    const booksGrid = document.getElementById('catalogBooksGrid');
    const emptyState = document.getElementById('catalogEmptyState');
    
    // Show loading state
    if (loadingState) loadingState.style.display = 'block';
    if (booksGrid) booksGrid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
    
    try {
        // Get books from central library (re-check after initialization)
        const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
        console.log('Found books in library after initialization:', biblioteca.length);
        console.log('Books data:', biblioteca);
        
        setTimeout(() => {
            if (loadingState) loadingState.style.display = 'none';
            
            if (biblioteca.length === 0) {
                console.log('No books found, showing empty state');
                if (emptyState) emptyState.style.display = 'block';
            } else {
                console.log('Rendering books grid');
                if (booksGrid) {
                    booksGrid.style.display = 'grid';
                    renderCatalogBooks(biblioteca);
                }
            }
        }, 300);
    } catch (error) {
        console.error('Error loading catalog books:', error);
        if (loadingState) loadingState.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
    }
}

function renderCatalogBooks(books) {
    console.log('=== RENDERING CATALOG BOOKS ===');
    const booksGrid = document.getElementById('catalogBooksGrid');
    if (!booksGrid) {
        console.error('Books grid element not found');
        return;
    }
    
    console.log('Rendering', books.length, 'books');
    booksGrid.innerHTML = '';
    
    if (books.length === 0) {
        booksGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1 / -1;">Nenhum livro disponível</p>';
        return;
    }
    
    books.forEach(book => {
        try {
            console.log('Creating card for book:', book.title);
            const bookCard = createCatalogBookCard(book);
            booksGrid.innerHTML += bookCard;
        } catch (error) {
            console.error('Error creating card for book:', book.title, error);
        }
    });
    
    console.log('Books rendered successfully');
}

function createCatalogBookCard(book) {
    if (!book) {
        console.error('Book object is null or undefined');
        return '<div style="color: red;">Erro: Livro inválido</div>';
    }
    
    const title = String(book.title || 'Sem título');
    const author = String(book.author || 'Autor desconhecido');
    const bookId = String(book.id || book._id || `book_${Date.now()}`);
    const coverUrl = book.coverUrl || book.cover || book.coverImage || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 120"%3E%3Crect width="80" height="120" fill="%23e9ecef"/%3E%3Ctext x="40" y="60" text-anchor="middle" font-size="8" fill="%236c757d"%3ESem Capa%3C/text%3E%3C/svg%3E';
    
    return `
        <div onclick="selectBookToAdd('${bookId.replace(/'/g, "\\'")}'); return false;" style="
            border: 1px solid #e0e6ed;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
            margin-bottom: 1rem;
        ">
            <img src="${coverUrl}" alt="${title}" style="
                width: 80px;
                height: 120px;
                object-fit: cover;
                border-radius: 4px;
                margin-bottom: 0.5rem;
                display: block;
                margin-left: auto;
                margin-right: auto;
            " onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 80 120\\"%3E%3Crect width=\\"80\\" height=\\"120\\" fill=\\"%23e9ecef\\"/%3E%3Ctext x=\\"40\\" y=\\"60\\" text-anchor=\\"middle\\" font-size=\\"8\\" fill=\\"%236c757d\\"%3ESem Capa%3C/text%3E%3C/svg%3E';">
            <div style="
                font-size: 0.9rem;
                font-weight: 600;
                color: #1C3D6A;
                margin-bottom: 0.25rem;
                line-height: 1.2;
            ">${title}</div>
            <div style="
                font-size: 0.8rem;
                color: #666;
            ">${author}</div>
        </div>
    `;
}

function selectBookToAdd(bookId) {
    console.log('=== SELECTING BOOK TO ADD ===');
    console.log('Book ID:', bookId);
    
    // Using global currentProfile variable
    if (!currentProfile) {
        showNotification('Perfil não encontrado!', 'error');
        return;
    }
    
    // Find the book in global catalog
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        showNotification('Livro não encontrado!', 'error');
        return;
    }
    
    console.log('Found book:', book.title);
    
    // Check if book already exists in user's bookRefs (not in library storage)
    const existsInSections = Object.values(currentProfile.bookRefs || {}).some(bookArray => 
        Array.isArray(bookArray) && bookArray.includes(bookId)
    );
    
    if (existsInSections) {
        showNotification('Este livro já está na sua biblioteca!', 'warning');
        return;
    }
    
    console.log('Book not in user library, proceeding to selection');
    
    // Close the catalog modal first
    closeAddBookModal();
    
    // Open book selection modal to choose section
    showBookSelectionModal(book);
}

function filterCatalogBooks(searchTerm) {
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const filteredBooks = biblioteca.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    renderCatalogBooks(filteredBooks);
    
    const emptyState = document.getElementById('catalogEmptyState');
    const booksGrid = document.getElementById('catalogBooksGrid');
    
    if (filteredBooks.length === 0 && searchTerm) {
        if (booksGrid) booksGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (booksGrid) booksGrid.style.display = 'grid';
    }
}

function redirectToCadastro() {
    window.location.href = 'cadastro.html';
}

function showBookSelectionModal(book) {
    console.log('Showing book selection modal for:', book.title);
    
    // Close the add book modal first
    closeAddBookModal();
    
    const modalHTML = `
        <div class="modal-overlay" id="bookSelectionModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
        ">
            <div class="modal-content" style="
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                position: relative;
            ">
                <div class="modal-header" style="
                    padding: 1.5rem;
                    border-bottom: 1px solid #e0e6ed;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <h2 style="margin: 0; color: #1C3D6A;">Adicionar "${book.title}" à sua biblioteca</h2>
                    <button onclick="closeBookSelectionModal()" style="
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                        color: #666;
                        padding: 0.5rem;
                    ">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body" style="padding: 1.5rem;">
                    <div class="book-preview" style="
                        display: flex;
                        gap: 1rem;
                        margin-bottom: 1.5rem;
                        padding: 1rem;
                        background: #f8f9fa;
                        border-radius: 8px;
                    ">
                        <div class="book-cover-preview" style="
                            width: 80px;
                            height: 120px;
                            flex-shrink: 0;
                        ">
                            <img src="${book.cover && book.cover.trim() !== "" ? book.cover : `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="120" viewBox="0 0 80 120"><rect width="80" height="120" fill="#e9ecef"/><text x="40" y="60" text-anchor="middle" fill="#6c757d" font-family="Arial" font-size="10" font-weight="bold">${book.title}</text></svg>`)}`}" 
                                 alt="${book.title}" 
                                 style="
                                     width: 100%;
                                     height: 100%;
                                     object-fit: cover;
                                     border-radius: 4px;
                                 "
                                 onerror="this.src='https://via.placeholder.com/120x180/e9ecef/6c757d?text=Sem+Capa'">
                        </div>
                        <div class="book-details" style="
                            flex: 1;
                            line-height: 1.6;
                            color: #333;
                        ">
                            <strong style="color: #1C3D6A;">Título:</strong> ${book.title}<br>
                            <strong style="color: #1C3D6A;">Autor:</strong> ${book.author}<br>
                            ${book.genre ? `<strong style="color: #1C3D6A;">Gênero:</strong> ${book.genre}<br>` : ''}
                            ${book.year ? `<strong style="color: #1C3D6A;">Ano:</strong> ${book.year}` : ''}
                        </div>
                    </div>
                    
                    <div class="status-selection" style="margin-bottom: 1.5rem;">
                        <h3 style="
                            margin-bottom: 1rem;
                            color: #1C3D6A;
                            font-size: 1rem;
                        ">Em qual seção você quer adicionar este livro?</h3>
                        
                        <div class="status-options" style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                            gap: 1rem;
                        ">
                            <div class="status-option" data-status="want-to-read" style="
                                padding: 1rem;
                                border: 2px solid #e0e6ed;
                                border-radius: 8px;
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: white;
                                user-select: none;
                            ">
                                <i class="fas fa-bookmark" style="
                                    font-size: 1.5rem;
                                    margin-bottom: 0.5rem;
                                    color: #7FAAD1;
                                "></i>
                                <div style="font-weight: 500;">Quero Ler</div>
                            </div>
                            
                            <div class="status-option" data-status="currently-reading" style="
                                padding: 1rem;
                                border: 2px solid #e0e6ed;
                                border-radius: 8px;
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: white;
                                user-select: none;
                            ">
                                <i class="fas fa-book-open" style="
                                    font-size: 1.5rem;
                                    margin-bottom: 0.5rem;
                                    color: #28a745;
                                "></i>
                                <div style="font-weight: 500;">Lendo Agora</div>
                            </div>
                            
                            <div class="status-option" data-status="finished-books" style="
                                padding: 1rem;
                                border: 2px solid #e0e6ed;
                                border-radius: 8px;
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: white;
                                user-select: none;
                            ">
                                <i class="fas fa-check-circle" style="
                                    font-size: 1.5rem;
                                    margin-bottom: 0.5rem;
                                    color: #dc3545;
                                "></i>
                                <div style="font-weight: 500;">Finalizados</div>
                            </div>
                            
                            <div class="status-option" data-status="favorites" style="
                                padding: 1rem;
                                border: 2px solid #e0e6ed;
                                border-radius: 8px;
                                text-align: center;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: white;
                                user-select: none;
                            ">
                                <i class="fas fa-heart" style="
                                    font-size: 1.5rem;
                                    margin-bottom: 0.5rem;
                                    color: #e83e8c;
                                "></i>
                                <div style="font-weight: 500;">Favoritos</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-footer" style="
                    padding: 1.5rem;
                    border-top: 1px solid #e0e6ed;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <button onclick="closeBookSelectionModal()" style="
                        background: #f8f9fa;
                        color: #666;
                        border: 1px solid #ddd;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: pointer;
                    ">Cancelar</button>
                    <button id="confirmAddBook" data-book-id="${book.id}" disabled style="
                        background: #ccc;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 6px;
                        cursor: not-allowed;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-plus"></i> Adicionar à Biblioteca
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners to status options
    setTimeout(() => {
        const statusOptions = document.querySelectorAll('.status-option');
        const confirmButton = document.getElementById('confirmAddBook');
        
        console.log('Setting up status option listeners, found:', statusOptions.length);
        console.log('Confirm button found:', !!confirmButton);
        
        statusOptions.forEach((option, index) => {
            console.log(`Setting up option ${index}:`, option.dataset.status);
            
            option.addEventListener('click', function() {
                console.log('Status option clicked:', this.dataset.status);
                
                // Remove previous selection
                statusOptions.forEach(opt => {
                    opt.style.borderColor = '#e0e6ed';
                    opt.style.background = 'white';
                    opt.classList.remove('selected');
                });
                
                // Add selection to clicked option
                this.style.borderColor = '#1C3D6A';
                this.style.background = '#f0f7ff';
                this.classList.add('selected');
                
                // Update global variable
                selectedBookStatus = this.dataset.status;
                console.log('Global selectedBookStatus set to:', selectedBookStatus);
                
                confirmButton.disabled = false;
                confirmButton.style.background = '#1C3D6A';
                confirmButton.style.cursor = 'pointer';
            });
            
            option.addEventListener('mouseenter', function() {
                if (!this.classList.contains('selected')) {
                    this.style.borderColor = '#7FAAD1';
                    this.style.background = '#f8f9fa';
                }
            });
            
            option.addEventListener('mouseleave', function() {
                if (!this.classList.contains('selected')) {
                    this.style.borderColor = '#e0e6ed';
                    this.style.background = 'white';
                }
            });
        });
        
        // Set up confirm button event listener to override onclick
        if (confirmButton) {
            // Remove any existing onclick to prevent conflicts
            confirmButton.removeAttribute('onclick');
            
            // Add proper event listener
            confirmButton.addEventListener('click', function() {
                const bookId = this.dataset.bookId;
                console.log('Confirm button clicked for book ID:', bookId);
                console.log('Selected status:', selectedBookStatus);
                
                if (bookId && selectedBookStatus) {
                    confirmBookSelection(bookId);
                } else {
                    showNotification('Selecione uma seção primeiro!', 'error');
                }
            });
            console.log('Confirm button event listener set up');
        }
    }, 100);
}

function closeBookSelectionModal() {
    const modal = document.getElementById('bookSelectionModal');
    if (modal) {
        modal.remove();
    }
    
    // Ensure scroll is restored
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    // Reset selection state to prevent conflicts
    selectedBookStatus = null;
    selectedBookId = null;
    window.processingBookSelection = false;
    
    // Additional safety check for scroll restoration
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 100);
    
    console.log('Book selection modal closed and state reset');
}

// Global variable to store selected status
let selectedBookStatus = null;

function confirmBookSelection(bookId) {
    console.log('=== CONFIRM BOOK SELECTION ===');
    console.log('Book ID:', bookId);
    console.log('Selected status:', selectedBookStatus);
    
    // Prevent duplicate calls by checking if we're already processing
    if (window.processingBookSelection) {
        console.log('Already processing book selection, ignoring duplicate call');
        return;
    }
    
    // Set processing flag
    window.processingBookSelection = true;
    
    if (!bookId) {
        console.error('Missing book ID!');
        showNotification('Erro: ID do livro não encontrado!', 'error');
        window.processingBookSelection = false;
        return;
    }
    
    if (!selectedBookStatus) {
        console.error('No section selected!');
        showNotification('Por favor, selecione uma seção antes de adicionar!', 'error');
        window.processingBookSelection = false;
        return;
    }
    
    // Using global currentProfile variable
    if (!currentProfile) {
        console.error('No current profile found!');
        showNotification('Perfil não encontrado!', 'error');
        window.processingBookSelection = false;
        return;
    }
    
    console.log('Current profile:', currentProfile.name);
    
    // Get book from global library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        showNotification('Livro não encontrado na biblioteca!', 'error');
        window.processingBookSelection = false;
        return;
    }
    
    console.log('Found book in global library:', book.title);
    
    // Initialize bookRefs if not exists
    if (!currentProfile.bookRefs) {
        currentProfile.bookRefs = {
            wantToRead: [],
            currentlyReading: [],
            finished: [],
            favorites: []
        };
        console.log('BookRefs initialized with correct keys');
    }
    
    // Initialize user library if not exists
    const userLibraryKey = `${currentProfile.id}_biblioteca`;
    let userLibrary = JSON.parse(localStorage.getItem(userLibraryKey) || '[]');
    console.log(`User library key: ${userLibraryKey}`);
    console.log(`User library before addition:`, userLibrary.length, 'books');
    
    // Check if book is already in user's library
    const existingBookIndex = userLibrary.findIndex(b => b.id === bookId);
    if (existingBookIndex === -1) {
        // Add book to user's library
        const bookCopy = {...book};
        userLibrary.push(bookCopy);
        localStorage.setItem(userLibraryKey, JSON.stringify(userLibrary));
        console.log('Book added to user library:', bookCopy.title);
        console.log(`User library after addition:`, userLibrary.length, 'books');
    } else {
        console.log('Book already exists in user library');
    }
    
    // Map selectedBookStatus to correct bookRefs keys
    const statusMap = {
        'want-to-read': 'wantToRead',
        'currently-reading': 'currentlyReading', 
        'finished-books': 'finished',
        'favorites': 'favorites'
    };
    
    const correctSection = statusMap[selectedBookStatus];
    if (!correctSection) {
        showNotification('Seção inválida!', 'error');
        return;
    }
    
    console.log(`Mapping ${selectedBookStatus} to ${correctSection}`);
    
    // Check if book is already in this section
    if (currentProfile.bookRefs[correctSection] && currentProfile.bookRefs[correctSection].includes(bookId)) {
        showNotification('Este livro já está nesta seção!', 'warning');
        closeBookSelectionModal();
        return;
    }
    
    // Remove book from other sections if it exists
    Object.keys(currentProfile.bookRefs).forEach(section => {
        if (currentProfile.bookRefs[section] && currentProfile.bookRefs[section].includes(bookId)) {
            removerLivroDaLista(bookId, section);
            console.log(`Removed book from section: ${section}`);
        }
    });
    
    // Use new persistence system
    const success = saveBookToProfile(book, selectedBookStatus);
    
    if (!success) {
        showNotification('Erro ao adicionar livro à seção!', 'error');
        window.processingBookSelection = false;
        return;
    }
    
    // Render book in its section immediately
    renderBookInSection({ ...book, status: selectedBookStatus });
    
    console.log(`Book successfully added to section: ${selectedBookStatus}`);
    
    // Store the section name BEFORE any operations that might reset variables
    const sectionNames = {
        'want-to-read': 'Quero Ler',
        'currently-reading': 'Lendo Agora', 
        'finished-books': 'Finalizados',
        'favorites': 'Favoritos'
    };
    
    const sectionDisplayName = sectionNames[selectedBookStatus] || selectedBookStatus || 'seção desconhecida';
    console.log('Section display name:', sectionDisplayName, 'for status:', selectedBookStatus);
    
    // Show notification BEFORE closing modal and resetting variables
    showNotification(`"${book.title}" adicionado à seção "${sectionDisplayName}"!`, 'success');
    
    // Update stats and close modal
    updateReadingStats();
    closeBookSelectionModal();
    
    // Reset state variables and clear processing flag
    selectedBookStatus = null;
    selectedBookId = null;
    window.processingBookSelection = false;
    
    console.log('Book selection completed and state reset');
}

// Event listener for adding books to sections (critical for bookRefs functionality)
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-section')) {
        const section = e.target.dataset.section;
        const bookId = e.target.dataset.bookId;

        console.log(`Adding book ${bookId} to section ${section}`);

        const profile = getCurrentProfile();
        if (!profile.bookRefs) profile.bookRefs = {};
        if (!profile.bookRefs[section]) profile.bookRefs[section] = [];

        if (!profile.bookRefs[section].includes(bookId)) {
            profile.bookRefs[section].push(bookId);
            saveCurrentProfile();
            renderBooksFromRefs(); // Update visually
            showNotification('Livro adicionado ao perfil!', 'success');
            console.log(`Book ${bookId} added to section ${section}`);
        } else {
            showNotification('Esse livro já está nessa seção.', 'info');
            console.log(`Book ${bookId} already in section ${section}`);
        }
    }
});

// Functions for book actions
function toggleBookFavorite(bookId) {
    console.log('=== TOGGLING BOOK FAVORITE ===');
    console.log('Book ID:', bookId);
    
    if (!currentProfile) {
        console.error('No current profile found');
        return;
    }
    
    // Get book from central library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        console.error('Book not found in central library');
        showNotification('Livro não encontrado', 'error');
        return;
    }
    
    // Get current book from profile books
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    let profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    const existingBookIndex = profileBooks.findIndex(b => b.id === bookId);
    
    if (existingBookIndex === -1) {
        console.log('Book not in profile, cannot toggle favorite');
        showNotification('Adicione o livro ao perfil primeiro', 'warning');
        return;
    }
    
    // Check if book already has a favorite copy
    const favoriteBookIndex = profileBooks.findIndex(b => b.id === bookId && b.status === 'favorites');
    const hasFavoriteCopy = favoriteBookIndex !== -1;
    
    if (hasFavoriteCopy) {
        // Remove favorite copy, keep original in its section
        profileBooks.splice(favoriteBookIndex, 1);
        showNotification('Livro removido dos favoritos', 'info');
        console.log('Favorite copy removed, original book remains in its section');
    } else {
        // Add favorite copy while keeping original
        const currentBook = profileBooks[existingBookIndex];
        const favoriteCopy = {
            ...currentBook,
            status: 'favorites',
            addedAt: new Date().toISOString()
        };
        profileBooks.push(favoriteCopy);
        showNotification('Livro adicionado aos favoritos', 'success');
        console.log('Favorite copy added, original book remains in its section');
    }
    
    // Save updated profile books
    localStorage.setItem(profileBooksKey, JSON.stringify(profileBooks));
    
    // Re-load and render all books
    loadProfileBooks();
    updateReadingStats();
    
    console.log('=== FAVORITE TOGGLE COMPLETE ===');
}

function moveBookToSection(bookId, currentSection) {
    console.log('Moving book:', bookId, 'from section:', currentSection);
    
    // Create modal for section selection
    const modalHTML = `
        <div class="modal-overlay" id="moveBookModal" onclick="closeMoveModal()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 500px;">
                <div class="modal-header">
                    <h2>Mover Livro</h2>
                    <button class="close-btn" onclick="closeMoveModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Para qual seção você quer mover este livro?</p>
                    <div class="section-options" style="display: grid; gap: 1rem; margin-top: 1rem;">
                        ${currentSection !== 'want-to-read' ? `
                            <button class="section-option-btn" onclick="confirmMoveBook('${bookId}', '${currentSection}', 'want-to-read')">
                                <i class="fas fa-bookmark"></i> Quero Ler
                            </button>
                        ` : ''}
                        ${currentSection !== 'currently-reading' ? `
                            <button class="section-option-btn" onclick="confirmMoveBook('${bookId}', '${currentSection}', 'currently-reading')">
                                <i class="fas fa-book-open"></i> Lendo Agora
                            </button>
                        ` : ''}
                        ${currentSection !== 'finished-books' ? `
                            <button class="section-option-btn" onclick="confirmMoveBook('${bookId}', '${currentSection}', 'finished-books')">
                                <i class="fas fa-check-circle"></i> Finalizados
                            </button>
                        ` : ''}
                        ${currentSection !== 'favorites' ? `
                            <button class="section-option-btn" onclick="confirmMoveBook('${bookId}', '${currentSection}', 'favorites')">
                                <i class="fas fa-heart"></i> Favoritos
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function confirmMoveBook(bookId, fromSection, toSection) {
    console.log('Moving book from', fromSection, 'to', toSection);
    
    if (!currentProfile || !currentProfile.bookRefs) return;
    
    // Remove from current section
    if (currentProfile.bookRefs[fromSection]) {
        const index = currentProfile.bookRefs[fromSection].indexOf(bookId);
        if (index > -1) {
            currentProfile.bookRefs[fromSection].splice(index, 1);
        }
    }
    
    // Add to new section
    if (!currentProfile.bookRefs[toSection]) {
        currentProfile.bookRefs[toSection] = [];
    }
    if (!currentProfile.bookRefs[toSection].includes(bookId)) {
        currentProfile.bookRefs[toSection].push(bookId);
    }
    
    saveCurrentProfile();
    renderBooksFromRefs();
    updateReadingStats();
    updateSidebarCurrentlyReading();
    
    closeMoveModal();
    showNotification(`Livro movido para ${getSectionName(toSection)}`, 'success');
}

function removeBookFromSection(bookId, sectionId) {
    console.log('Removing book from section:', bookId, sectionId);
    
    if (!currentProfile || !currentProfile.bookRefs) return;
    
    if (confirm('Tem certeza que deseja remover este livro da sua biblioteca?')) {
        // Remove from current section
        if (currentProfile.bookRefs[sectionId]) {
            const index = currentProfile.bookRefs[sectionId].indexOf(bookId);
            if (index > -1) {
                currentProfile.bookRefs[sectionId].splice(index, 1);
            }
        }
        
        saveCurrentProfile();
        renderBooksFromRefs();
        updateReadingStats();
        updateSidebarCurrentlyReading();
        
        showNotification('Livro removido da biblioteca', 'info');
    }
}

function closeMoveModal() {
    const modal = document.getElementById('moveBookModal');
    if (modal) {
        modal.remove();
    }
}

function getSectionName(sectionId) {
    const sectionNames = {
        'want-to-read': 'Quero Ler',
        'currently-reading': 'Lendo Agora',
        'finished-books': 'Lidos',
        'favorites': 'Favoritos'
    };
    return sectionNames[sectionId] || sectionId;
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
    // Using global currentProfile variable
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

function calculateUserStats() {
    console.log('=== CALCULATING USER STATS ===');
    
    if (!currentProfile) {
        console.log('No current profile found');
        return {
            totalBooks: 0,
            finishedBooks: 0,
            favoriteBooks: 0,
            currentlyReading: 0
        };
    }
    
    // Get books from new system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    console.log('Profile books found:', profileBooks.length);
    
    const stats = {
        totalBooks: 0,
        finishedBooks: 0,
        favoriteBooks: 0,
        currentlyReading: 0
    };
    
    // Count books by status (excluding favorites duplicates)
    const uniqueBooks = new Set();
    profileBooks.forEach(book => {
        // Don't count favorites as separate books for total
        if (book.status !== 'favorites') {
            uniqueBooks.add(book.id);
        }
        
        // Count by status
        switch (book.status) {
            case 'finished-books':
                stats.finishedBooks++;
                break;
            case 'currently-reading':
                stats.currentlyReading++;
                break;
            case 'favorites':
                stats.favoriteBooks++;
                break;
        }
    });
    
    stats.totalBooks = uniqueBooks.size;
    
    console.log('Calculated stats:', stats);
    return stats;
}

// Global function to load and render reviews
window.loadAndRenderReviews = function() {
    console.log('=== INÍCIO loadAndRenderReviews ===');
    const container = document.getElementById('reviewsContainer');
    if (!container || !currentProfile) {
        console.log('Container ou currentProfile não encontrado');
        return;
    }

    container.innerHTML = '';
    let reviews = [];

    const reviewKey = `${currentProfile.id}_reviews`;

    const userReviewData = localStorage.getItem(reviewKey);
    console.log(`Buscando resenhas específicas do usuário em ${reviewKey}:`, userReviewData);
    
    if (!userReviewData) {
        console.log('Nenhuma resenha encontrada para este perfil.');
        renderEmptyReviewState(container);
        return;
    }

    try {
        reviews = JSON.parse(userReviewData);
        console.log('Resenhas carregadas para o perfil atual:', reviews.length);
    } catch (e) {
        console.error('Erro ao carregar resenhas:', e);
        renderEmptyReviewState(container);
        return;
    }

    if (!Array.isArray(reviews) || reviews.length === 0) {
        renderEmptyReviewState(container);
        return;
    }

    const totalReviewsEl = document.getElementById('totalReviews');
    if (totalReviewsEl) totalReviewsEl.textContent = reviews.length;

    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const livrosDoUsuario = biblioteca.filter(l => l.profileId === currentProfile.id);
    console.log('Livros do usuário na biblioteca:', livrosDoUsuario);

    reviews.forEach(review => {
        const book = livrosDoUsuario.find(b => b.id === review.bookId);
        const stars = '⭐'.repeat(parseInt(review.rating || 0));

        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <h4 class="review-title">${review.title}</h4>
            <p class="review-book"><strong>Livro:</strong> ${book?.title || 'Não encontrado na sua biblioteca'}</p>
            <p class="review-author"><strong>Autor:</strong> ${book?.author || 'Autor desconhecido'}</p>
            <p class="review-rating"><strong>Avaliação:</strong> ${stars}</p>
            <div class="review-content">
                <strong>Resenha:</strong>
                <p>${review.content}</p>
            </div>
        `;
        container.appendChild(card);
        console.log(`Resenha renderizada: ${review.title}`);
    });

    console.log('=== FIM loadAndRenderReviews ===');
};

function renderEmptyReviewState(container) {
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-pen-fancy"></i>
            <p>Nenhuma resenha escrita ainda.</p>
            <p class="empty-subtitle">Adicione resenhas aos seus livros no catálogo!</p>
        </div>`;
    const totalReviewsEl = document.getElementById('totalReviews');
    if (totalReviewsEl) totalReviewsEl.textContent = 0;
}

// Call initialize function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    addLogoutButton();
    
    // Ensure profile is loaded and books are rendered after initialization
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Force reload profile and render books
        currentProfile = getCurrentProfile();
        if (currentProfile) {
            console.log('Profile reloaded in DOMContentLoaded:', currentProfile.name);
            console.log('BookRefs in DOMContentLoaded:', JSON.stringify(currentProfile.bookRefs, null, 2));
            
            // Load user library and render books correctly
            loadUserLibraryAndRender();
            
            // Load profile books from localStorage
            loadProfileBooks();
            
            updateReadingStats();
            updateProfileUI();
            updateSidebarCurrentlyReading();
            
            // Setup edit profile modal event listeners
            setupEditProfileModalListeners();
            
            // Hide all modals on page load
            hideAllModalsOnLoad();
            
            console.log('Profile fully loaded and books rendered');
            console.log('=== INITIALIZATION COMPLETE ===');
        } else {
            console.error('No profile found during initialization');
        }
    }, 300);
    
    // Add event listeners for dynamic modal buttons
    document.addEventListener('click', function(event) {
        // Handle book selection in modal
        if (event.target.classList.contains('status-option') || event.target.closest('.status-option')) {
            const statusOption = event.target.classList.contains('status-option') ? 
                                event.target : event.target.closest('.status-option');
            
            const selectedStatus = statusOption.dataset.status;
            console.log('Status option clicked via delegation:', selectedStatus);
            
            // Remove previous selections
            document.querySelectorAll('.status-option').forEach(opt => {
                opt.style.borderColor = '#e0e6ed';
                opt.style.background = 'white';
                opt.classList.remove('selected');
            });
            
            // Add selection to clicked option
            statusOption.style.borderColor = '#1C3D6A';
            statusOption.style.background = '#f0f7ff';
            statusOption.classList.add('selected');
            
            // Update global variable
            selectedBookStatus = selectedStatus;
            console.log('Global selectedBookStatus set via delegation to:', selectedBookStatus);
            
            // Enable confirm button
            const confirmButton = document.getElementById('confirmAddBook');
            if (confirmButton) {
                confirmButton.disabled = false;
                confirmButton.style.background = '#1C3D6A';
                confirmButton.style.cursor = 'pointer';
            }
        }
        
        // Handle add book buttons with data attributes
        if (event.target.classList.contains('btn-add-book') || event.target.closest('.btn-add-book')) {
            const button = event.target.classList.contains('btn-add-book') ? 
                          event.target : event.target.closest('.btn-add-book');
            
            const bookId = button.dataset.bookId;
            const section = button.dataset.section;
            
            if (bookId && section) {
                console.log('Adding book via data attributes:', bookId, 'to section:', section);
                const success = adicionarLivroALista(bookId, section);
                if (success) {
                    showNotification('Livro adicionado com sucesso!', 'success');
                } else {
                    showNotification('Este livro já está na seção.', 'warning');
                }
            }
        }
    });
    
    // Event delegation for all dynamic modal buttons
    document.body.addEventListener('click', function(e) {
        // Handle add book buttons with data attributes
        if (e.target.matches('.btn-add-book') || e.target.closest('.btn-add-book')) {
            const button = e.target.matches('.btn-add-book') ? e.target : e.target.closest('.btn-add-book');
            const bookId = button.dataset.bookId;
            const lista = button.dataset.list || button.dataset.section;
            
            console.log('Add book button clicked:', bookId, 'to list:', lista);
            
            if (bookId && lista) {
                const success = adicionarLivroALista(bookId, lista);
                if (success) {
                    showNotification('Livro adicionado com sucesso!', 'success');
                    // Close modal if it exists
                    const modal = document.querySelector('.modal-overlay');
                    if (modal) modal.remove();
                } else {
                    showNotification('Este livro já está na lista.', 'warning');
                }
            }
        }
        
        // Handle confirm book selection button - removed duplicate handler
    });
    
    // Initialize all add-to-section buttons in modals
    document.addEventListener('click', function(e) {
        if (e.target.matches('.add-to-section') || e.target.closest('.add-to-section')) {
            const button = e.target.matches('.add-to-section') ? e.target : e.target.closest('.add-to-section');
            const bookId = button.dataset.bookId;
            const listType = button.dataset.section;
            
            console.log('Add to section button clicked:', bookId, 'to list:', listType);
            
            if (bookId && listType) {
                const success = adicionarLivroALista(bookId, listType);
                if (success) {
                    showNotification('Livro adicionado à seção com sucesso!', 'success');
                    // Close modal
                    const modal = document.querySelector('.modal-overlay');
                    if (modal) modal.remove();
                } else {
                    showNotification('Livro já está nessa seção!', 'warning');
                }
            }
        }
    });
    
    // Initialize modal confirm button for add book functionality
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmAddBook');
        if (confirmBtn) {
            // Remove any existing event listeners to prevent duplicates
            confirmBtn.replaceWith(confirmBtn.cloneNode(true));
            const newConfirmBtn = document.getElementById('confirmAddBook');
            
            newConfirmBtn.addEventListener('click', function() {
                const bookId = this.dataset.bookId;
                const section = selectedBookStatus;
                
                console.log('Confirm add book:', bookId, 'to section:', section);
                
                if (bookId && section) {
                    confirmBookSelection(bookId);
                } else {
                    showNotification('Selecione uma seção primeiro!', 'error');
                }
            });
        }
    }, 500);
    
    // Function to load and render reviews (defined inside DOMContentLoaded)
    function loadReviews() {
        console.log('=== INÍCIO loadAndRenderReviews ===');
        const container = document.getElementById('reviewsContainer');
        if (!container || !currentProfile) {
            console.log('Container ou currentProfile não encontrado');
            return;
        }

        container.innerHTML = '';
        let reviews = [];

        const reviewKey = `${currentProfile.id}_reviews`;

        const userReviewData = localStorage.getItem(reviewKey);
        console.log(`Buscando resenhas específicas do usuário em ${reviewKey}:`, userReviewData);
        
        if (!userReviewData) {
            console.log('Nenhuma resenha encontrada.');
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-pen-fancy"></i>
                    <p>Nenhuma resenha escrita ainda.</p>
                    <p class="empty-subtitle">Adicione resenhas aos seus livros no catálogo!</p>
                </div>`;
            const totalReviewsEl = document.getElementById('totalReviews');
            if (totalReviewsEl) totalReviewsEl.textContent = 0;
            return;
        }

        try {
            reviews = JSON.parse(userReviewData);
            console.log('Resenhas carregadas:', reviews);
        } catch (e) {
            console.error('Erro ao carregar resenhas:', e);
            return;
        }

        if (!Array.isArray(reviews) || reviews.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-pen-fancy"></i>
                    <p>Nenhuma resenha escrita ainda.</p>
                    <p class="empty-subtitle">Adicione resenhas aos seus livros no catálogo!</p>
                </div>`;
            const totalReviewsEl = document.getElementById('totalReviews');
            if (totalReviewsEl) totalReviewsEl.textContent = 0;
            return;
        }

        const totalReviewsEl = document.getElementById('totalReviews');
        if (totalReviewsEl) totalReviewsEl.textContent = reviews.length;

        const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
        const livrosDoUsuario = biblioteca.filter(l => l.profileId === currentProfile.id);
        console.log('Livros do usuário na biblioteca:', livrosDoUsuario);

        reviews.forEach((review, index) => {
            const book = livrosDoUsuario.find(b => b.id === review.bookId);
            const stars = '⭐'.repeat(parseInt(review.rating || 0));
            const reviewDate = new Date(review.createdAt || Date.now()).toLocaleDateString('pt-BR');

            const card = document.createElement('div');
            card.className = 'review-card';
            card.setAttribute('data-review-id', review.id || index);
            card.innerHTML = `
                <div class="review-header">
                    <div class="review-meta">
                        <h4 class="review-title">${review.title}</h4>
                        <span class="review-date">${reviewDate}</span>
                    </div>
                    <div class="review-actions">
                        <button class="btn-review-action edit" onclick="editReview('${review.id || index}')" title="Editar resenha">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-review-action delete" onclick="deleteReview('${review.id || index}')" title="Excluir resenha">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="review-book-info">
                    <p class="review-book"><strong>Livro:</strong> ${book?.title || 'Não encontrado na sua biblioteca'}</p>
                    <p class="review-author"><strong>Autor:</strong> ${book?.author || 'Autor desconhecido'}</p>
                    <p class="review-rating"><strong>Avaliação:</strong> ${stars}</p>
                </div>
                <div class="review-content">
                    <p>${review.content}</p>
                </div>
                <div class="review-footer">
                    <button class="btn-review-action like" onclick="likeReview('${review.id || index}')" title="Curtir resenha">
                        <i class="fas fa-heart"></i>
                        <span class="like-count">${review.likes || 0}</span>
                    </button>
                    <button class="btn-review-action comment" onclick="commentOnReview('${review.id || index}')" title="Comentar">
                        <i class="fas fa-comment"></i>
                        <span class="comment-count">${review.comments ? review.comments.length : 0}</span>
                    </button>
                </div>
            `;
            container.appendChild(card);
            console.log(`Resenha renderizada: ${review.title}`);
        });

        console.log('=== FIM loadAndRenderReviews ===');
    }

// Review Action Functions
function editReview(reviewId) {
    console.log('Editing review:', reviewId);
    
    if (!currentProfile) return;
    
    const reviewKey = `${currentProfile.id}_reviews`;
    let reviews = JSON.parse(localStorage.getItem(reviewKey) || '[]');
    const reviewIndex = reviews.findIndex(r => (r.id || reviews.indexOf(r)) == reviewId);
    
    if (reviewIndex === -1) {
        showNotification('Resenha não encontrada', 'error');
        return;
    }
    
    const review = reviews[reviewIndex];
    
    // Create edit modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal edit-review-modal">
            <div class="modal-header">
                <h3><i class="fas fa-edit"></i> Editar Resenha</h3>
                <button class="modal-close" onclick="closeEditReviewModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="editReviewForm">
                    <div class="form-group">
                        <label for="editReviewTitle">Título da Resenha</label>
                        <input type="text" id="editReviewTitle" value="${review.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="editReviewRating">Avaliação</label>
                        <select id="editReviewRating">
                            <option value="1" ${review.rating == 1 ? 'selected' : ''}>1 ⭐</option>
                            <option value="2" ${review.rating == 2 ? 'selected' : ''}>2 ⭐⭐</option>
                            <option value="3" ${review.rating == 3 ? 'selected' : ''}>3 ⭐⭐⭐</option>
                            <option value="4" ${review.rating == 4 ? 'selected' : ''}>4 ⭐⭐⭐⭐</option>
                            <option value="5" ${review.rating == 5 ? 'selected' : ''}>5 ⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="editReviewContent">Conteúdo da Resenha</label>
                        <textarea id="editReviewContent" rows="6" required>${review.content}</textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeEditReviewModal()">Cancelar</button>
                <button class="btn-primary" onclick="saveEditedReview('${reviewId}')">Salvar Alterações</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeEditReviewModal() {
    const modal = document.querySelector('.edit-review-modal').parentElement;
    if (modal) modal.remove();
}

function saveEditedReview(reviewId) {
    const title = document.getElementById('editReviewTitle').value.trim();
    const rating = document.getElementById('editReviewRating').value;
    const content = document.getElementById('editReviewContent').value.trim();
    
    if (!title || !content) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    const reviewKey = `${currentProfile.id}_reviews`;
    let reviews = JSON.parse(localStorage.getItem(reviewKey) || '[]');
    const reviewIndex = reviews.findIndex(r => (r.id || reviews.indexOf(r)) == reviewId);
    
    if (reviewIndex !== -1) {
        reviews[reviewIndex] = {
            ...reviews[reviewIndex],
            title,
            rating: parseInt(rating),
            content,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
        showNotification('Resenha atualizada com sucesso!', 'success');
        closeEditReviewModal();
        loadReviews(); // Reload reviews
    }
}

function deleteReview(reviewId) {
    console.log('Deleting review:', reviewId);
    
    if (!currentProfile) return;
    
    if (!confirm('Tem certeza que deseja excluir esta resenha? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    const reviewKey = `${currentProfile.id}_reviews`;
    let reviews = JSON.parse(localStorage.getItem(reviewKey) || '[]');
    const reviewIndex = reviews.findIndex(r => (r.id || reviews.indexOf(r)) == reviewId);
    
    if (reviewIndex !== -1) {
        reviews.splice(reviewIndex, 1);
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
        showNotification('Resenha excluída com sucesso!', 'success');
        loadReviews(); // Reload reviews
    } else {
        showNotification('Resenha não encontrada', 'error');
    }
}



function likeReview(reviewId) {
    console.log('Liking review:', reviewId);
    
    if (!currentProfile) return;
    
    const reviewKey = `${currentProfile.id}_reviews`;
    let reviews = JSON.parse(localStorage.getItem(reviewKey) || '[]');
    const reviewIndex = reviews.findIndex(r => (r.id || reviews.indexOf(r)) == reviewId);
    
    if (reviewIndex !== -1) {
        if (!reviews[reviewIndex].likes) reviews[reviewIndex].likes = 0;
        reviews[reviewIndex].likes++;
        
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
        
        // Update UI immediately
        const likeButton = document.querySelector(`[data-review-id="${reviewId}"] .like .like-count`);
        if (likeButton) {
            likeButton.textContent = reviews[reviewIndex].likes;
        }
        
        showNotification('Curtiu a resenha!', 'success');
    }
}

function commentOnReview(reviewId) {
    console.log('Commenting on review:', reviewId);
    
    if (!currentProfile) return;
    
    const comment = prompt('Digite seu comentário:');
    if (!comment || !comment.trim()) return;
    
    const reviewKey = `${currentProfile.id}_reviews`;
    let reviews = JSON.parse(localStorage.getItem(reviewKey) || '[]');
    const reviewIndex = reviews.findIndex(r => (r.id || reviews.indexOf(r)) == reviewId);
    
    if (reviewIndex !== -1) {
        if (!reviews[reviewIndex].comments) reviews[reviewIndex].comments = [];
        
        reviews[reviewIndex].comments.push({
            id: Date.now(),
            text: comment.trim(),
            author: currentProfile.name,
            createdAt: new Date().toISOString()
        });
        
        localStorage.setItem(reviewKey, JSON.stringify(reviews));
        
        // Update UI immediately
        const commentButton = document.querySelector(`[data-review-id="${reviewId}"] .comment .comment-count`);
        if (commentButton) {
            commentButton.textContent = reviews[reviewIndex].comments.length;
        }
        
        showNotification('Comentário adicionado!', 'success');
    }
}
    
    // Add event listeners for tab switching to load reviews when needed
    setTimeout(() => {
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                if (tabName === 'resenhas') {
                    console.log('[DEBUG] Carregando resenhas...');
                    setTimeout(() => loadReviews(), 100);
                }
            });
        });
    }, 500);
});

// New Book Edit Modal Functions
function openBookEditModal(bookId, currentSection) {
    console.log('Opening edit modal for book:', bookId, 'in section:', currentSection);
    
    if (!currentProfile) {
        showNotification('Nenhum perfil ativo encontrado', 'error');
        return;
    }
    
    // Get book from central library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        showNotification('Livro não encontrado', 'error');
        return;
    }
    
    // Check if book is in favorites using new system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    const isFavorite = profileBooks.some(b => b.id === bookId && b.status === 'favorites');
    
    // Map section IDs to display names
    const sectionMap = {
        'want-to-read': 'wantToRead',
        'currently-reading': 'currentlyReading', 
        'finished-books': 'finished'
    };
    
    const mappedCurrentSection = sectionMap[currentSection] || currentSection;
    
    // Create edit modal
    const modalHtml = `
        <div id="editBookModal" class="modal-overlay" onclick="closeEditBookModal()">
            <div class="modal-content" onclick="event.stopPropagation()" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>Editar Livro</h2>
                    <button class="close-btn" onclick="closeEditBookModal()">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="edit-book-info" style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                        <img src="${book.coverUrl || book.cover || book.coverImage || book.cover_image || ''}" 
                             alt="Capa do livro" class="edit-book-cover" 
                             style="width: 80px; height: 120px; object-fit: cover; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="book-placeholder" style="display:none; width: 80px; height: 120px; background: #f0f0f0; border-radius: 8px; align-items: center; justify-content: center;">
                            <i class="fas fa-book" style="font-size: 2rem; color: #999;"></i>
                        </div>
                        <div class="edit-book-details">
                            <h3>${book.title}</h3>
                            <p><strong>Autor:</strong> ${book.author}</p>
                            <p><strong>Ano:</strong> ${book.publicationYear || book.publication_year || book.year || 'N/A'}</p>
                            <p><strong>Gênero:</strong> ${book.genre || 'N/A'}</p>
                        </div>
                    </div>
                    
                    <div class="edit-section">
                        <h4>Seção do Livro</h4>
                        <div class="section-options" style="display: grid; gap: 0.5rem; margin: 1rem 0;">
                            <button class="section-option-btn ${mappedCurrentSection === 'wantToRead' ? 'active' : ''}" 
                                    onclick="selectEditSection('want-to-read', this)">
                                <i class="fas fa-bookmark"></i>
                                <span>Quero Ler</span>
                            </button>
                            <button class="section-option-btn ${mappedCurrentSection === 'currentlyReading' ? 'active' : ''}" 
                                    onclick="selectEditSection('currently-reading', this)">
                                <i class="fas fa-book-open"></i>
                                <span>Lendo Agora</span>
                            </button>
                            <button class="section-option-btn ${mappedCurrentSection === 'finished' ? 'active' : ''}" 
                                    onclick="selectEditSection('finished-books', this)">
                                <i class="fas fa-check-circle"></i>
                                <span>Finalizados</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="edit-favorite" style="margin: 1.5rem 0;">
                        <label class="favorite-toggle" style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                            <input type="checkbox" id="editFavoriteCheck" ${isFavorite ? 'checked' : ''} 
                                   style="width: 18px; height: 18px;">
                            <span class="favorite-label">Adicionar aos Favoritos</span>
                        </label>
                    </div>
                    
                    <div class="edit-actions" style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                        <button class="btn btn-secondary" onclick="closeEditBookModal()">Cancelar</button>
                        <button class="btn btn-primary" onclick="saveBookEdit('${bookId}', '${currentSection}')">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('editBookModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Store selected section (initially current section)
    window.selectedEditSection = currentSection;
}

function selectEditSection(section, buttonElement) {
    // Update visual selection
    document.querySelectorAll('#editBookModal .section-option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    buttonElement.classList.add('active');
    
    // Store selected section
    window.selectedEditSection = section;
}

function saveBookEdit(bookId, originalSection) {
    console.log('Saving book edit:', bookId, 'from', originalSection, 'to', window.selectedEditSection);
    
    if (!currentProfile) {
        showNotification('Nenhum perfil ativo encontrado', 'error');
        return;
    }
    
    const selectedSection = window.selectedEditSection || originalSection;
    const isFavoriteChecked = document.getElementById('editFavoriteCheck').checked;
    
    // Get book from central library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        showNotification('Livro não encontrado', 'error');
        return;
    }
    
    // Get current profile books using new system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    let profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    // Remove all instances of this book (including favorites)
    profileBooks = profileBooks.filter(b => b.id !== bookId);
    
    // Add book to new section
    const bookToAdd = {
        id: bookId,
        status: selectedSection,
        addedAt: new Date().toISOString()
    };
    
    profileBooks.push(bookToAdd);
    
    // Add to favorites if checked
    if (isFavoriteChecked) {
        const favoriteBook = {
            id: bookId,
            status: 'favorites',
            addedAt: new Date().toISOString()
        };
        profileBooks.push(favoriteBook);
    }
    
    // Save updated profile books
    localStorage.setItem(profileBooksKey, JSON.stringify(profileBooks));
    
    // Close modal and refresh display
    closeEditBookModal();
    loadProfileBooks();
    updateSidebarCurrentlyReading();
    updateReadingStats();
    
    showNotification('Livro editado com sucesso!', 'success');
}

function selectEditSection(section, buttonElement) {
    // Remove active class from all buttons
    document.querySelectorAll('.section-option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    buttonElement.classList.add('active');
    
    // Store selected section
    window.selectedEditSection = section;
    console.log('Selected edit section:', section);
}

function saveBookEdit(bookId, originalSection) {
    console.log('Saving book edit for:', bookId);
    
    if (!currentProfile) {
        showNotification('Nenhum perfil ativo encontrado', 'error');
        return;
    }
    
    const newSection = window.selectedEditSection || originalSection;
    const favoriteCheck = document.getElementById('editFavoriteCheck');
    const shouldBeFavorite = favoriteCheck ? favoriteCheck.checked : false;
    
    console.log('New section:', newSection, 'Should be favorite:', shouldBeFavorite);
    
    // Get book from central library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const book = biblioteca.find(b => b.id === bookId);
    
    if (!book) {
        showNotification('Livro não encontrado', 'error');
        return;
    }
    
    // Update using new persistence system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    let profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    // Remove existing entries for this book
    profileBooks = profileBooks.filter(b => b.id !== bookId);
    
    // Add book with new section
    if (newSection && newSection !== 'remove') {
        const bookWithStatus = {
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover || book.coverUrl,
            year: book.year || book.publicationYear,
            rating: book.rating,
            status: newSection,
            addedAt: new Date().toISOString()
        };
        profileBooks.push(bookWithStatus);
    }
    
    // Add to favorites if checked (can coexist with other sections)
    if (shouldBeFavorite) {
        const favoriteBook = {
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover || book.coverUrl,
            year: book.year || book.publicationYear,
            rating: book.rating,
            status: 'favorites',
            addedAt: new Date().toISOString()
        };
        profileBooks.push(favoriteBook);
    }
    
    // Save updated profile books
    localStorage.setItem(profileBooksKey, JSON.stringify(profileBooks));
    
    // Update UI
    loadProfileBooks();
    updateReadingStats();
    
    // Close modal and show success
    closeEditBookModal();
    
    const sectionNames = {
        'want-to-read': 'Quero Ler',
        'currently-reading': 'Lendo Agora',
        'finished-books': 'Finalizados',
        'favorites': 'Favoritos'
    };
    
    const sectionName = sectionNames[newSection] || newSection;
    showNotification(`"${book.title}" atualizado para "${sectionName}"`, 'success');
}

function closeEditBookModal() {
    const modal = document.getElementById('editBookModal');
    if (modal) {
        modal.remove();
    }
    // Clear selected section
    window.selectedEditSection = null;
}

// Function to open edit profile modal


// Function to create edit profile modal
function openEditProfileModal() {
    console.log('Opening edit profile modal...');
    
    if (!currentProfile) {
        showNotification('Nenhum perfil ativo encontrado', 'error');
        return;
    }
    
    const modal = document.getElementById('editProfileModal');
    if (!modal) {
        console.error('Edit profile modal not found in DOM');
        return;
    }
    
    // Populate form fields with current profile data
    populateEditProfileForm();
    
    // Show modal using multiple approaches for compatibility
    modal.classList.add('active');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    console.log('Edit profile modal opened successfully');
}

function populateEditProfileForm() {
    const editName = document.getElementById('editName');
    const editUsername = document.getElementById('editUsername');
    const editAge = document.getElementById('editAge');
    const editLocation = document.getElementById('editLocation');
    const editProfession = document.getElementById('editProfession');
    const editBio = document.getElementById('editBio');
    const editReadingGoal = document.getElementById('editReadingGoal');
    
    if (currentProfile) {
        if (editName) editName.value = currentProfile.name || '';
        if (editUsername) editUsername.value = currentProfile.username || '';
        if (editAge) editAge.value = currentProfile.age || '';
        if (editLocation) editLocation.value = currentProfile.location || '';
        if (editProfession) editProfession.value = currentProfile.profession || '';
        if (editBio) editBio.value = currentProfile.bio || '';
        if (editReadingGoal) editReadingGoal.value = currentProfile.readingGoal || '';
    }
}

function setupEditProfileModalEvents() {
    const modal = document.getElementById('editProfileModal');
    const closeButton = document.getElementById('closeEditModal');
    const cancelButton = document.getElementById('cancelEdit');
    const form = document.getElementById('editProfileForm');
    const avatarInput = document.getElementById('editAvatarInput');
    const avatarContainer = document.querySelector('.current-avatar');
    
    // Close button events
    if (closeButton) {
        closeButton.onclick = closeEditProfileModal;
    }
    
    if (cancelButton) {
        cancelButton.onclick = closeEditProfileModal;
    }
    
    // Form submit event
    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();
            saveProfileChanges();
        };
    }
    
    // Avatar upload events
    if (avatarInput) {
        avatarInput.onchange = function(e) {
            handleAvatarUpload(e);
        };
    }
    
    if (avatarContainer) {
        avatarContainer.onclick = function() {
            document.getElementById('editAvatarInput').click();
        };
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) {
                closeEditProfileModal();
            }
        };
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEditProfileModal();
        }
    });
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const avatarPreview = document.getElementById('editAvatarPreview');
        if (avatarPreview) {
            avatarPreview.src = e.target.result;
        }
    };
    reader.readAsDataURL(file);
}

function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.remove('active');
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }
    
    console.log('Edit profile modal closed');
}

function handleAvatarPreview(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('previewAvatar');
            if (preview) {
                preview.src = e.target.result;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function saveProfileChanges() {
    // Get values from the blue modal form fields
    const name = document.getElementById('editName')?.value.trim();
    const username = document.getElementById('editUsername')?.value.trim();
    const age = document.getElementById('editAge')?.value;
    const location = document.getElementById('editLocation')?.value.trim();
    const profession = document.getElementById('editProfession')?.value.trim();
    const bio = document.getElementById('editBio')?.value.trim();
    const readingGoal = document.getElementById('editReadingGoal')?.value;
    
    if (!name) {
        showNotification('Nome completo é obrigatório', 'error');
        return;
    }
    
    if (!username) {
        showNotification('Nome de usuário é obrigatório', 'error');
        return;
    }
    
    if (!currentProfile) {
        showNotification('Nenhum perfil ativo encontrado', 'error');
        return;
    }
    
    // Update profile data
    currentProfile.name = name;
    currentProfile.username = username;
    currentProfile.age = age || '';
    currentProfile.location = location || '';
    currentProfile.profession = profession || '';
    currentProfile.bio = bio || '';
    currentProfile.readingGoal = readingGoal || '';
    currentProfile.updatedAt = new Date().toISOString();
    
    // Save profile to localStorage
    const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
    const profileIndex = profiles.findIndex(p => p.id === currentProfile.id);
    
    if (profileIndex !== -1) {
        profiles[profileIndex] = currentProfile;
        localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
        localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
    }
    
    // Update UI elements
    updateProfileUI();
    updateAboutSection();
    
    // Close modal and show success message
    closeEditProfileModal();
    showNotification('Perfil atualizado com sucesso!', 'success');
    
    console.log('Profile updated successfully:', {
        name: currentProfile.name,
        username: currentProfile.username,
        age: currentProfile.age,
        location: currentProfile.location,
        profession: currentProfile.profession,
        bio: currentProfile.bio,
        readingGoal: currentProfile.readingGoal
    });
}

// Setup edit profile modal event listeners on page load
function setupEditProfileModalListeners() {
    // Setup open modal button - find the edit profile button in sidebar
    const editProfileButton = document.querySelector('button[onclick="openEditProfileModal()"]');
    if (editProfileButton) {
        editProfileButton.removeAttribute('onclick');
        editProfileButton.addEventListener('click', openEditProfileModal);
    }
    
    // Setup add book button - find the add book button in sidebar
    const addBookButton = document.querySelector('button[onclick="openAddBookModal()"]');
    if (addBookButton) {
        addBookButton.removeAttribute('onclick');
        addBookButton.addEventListener('click', openAddBookModal);
    }
    
    const closeButton = document.getElementById('closeEditModal');
    const cancelButton = document.getElementById('cancelEdit');
    const saveButton = document.getElementById('saveProfile');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeEditProfileModal);
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', closeEditProfileModal);
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', function(e) {
            e.preventDefault();
            saveProfileChanges();
        });
    }
    
    // Setup modal overlay click to close
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEditProfileModal();
            }
        });
    }
    
    console.log('Edit profile modal event listeners setup complete');
}

// Update the "Sobre mim" section with current profile data
function updateAboutSection() {
    if (!currentProfile) return;
    
    // Update location info
    const locationInfo = document.querySelector('.location-info .info-value');
    if (locationInfo) {
        locationInfo.textContent = currentProfile.location || 'Não informado';
    }
    
    // Update age info
    const ageInfo = document.querySelector('.age-info .info-value');
    if (ageInfo) {
        if (currentProfile.age) {
            ageInfo.textContent = `${currentProfile.age} anos`;
        } else {
            ageInfo.textContent = 'Não informado';
        }
    }
    
    // Update profession info
    const professionInfo = document.querySelector('.profession-info .info-value');
    if (professionInfo) {
        professionInfo.textContent = currentProfile.profession || 'Não informado';
    }
    
    // Update reading goal info
    const goalInfo = document.querySelector('.goal-info .info-value');
    if (goalInfo) {
        if (currentProfile.readingGoal) {
            goalInfo.textContent = `${currentProfile.readingGoal} livros por ano`;
        } else {
            goalInfo.textContent = 'Não informado';
        }
    }
    
    // Update bio text
    const bioText = document.querySelector('.bio-text');
    if (bioText) {
        if (currentProfile.bio && currentProfile.bio.trim() !== '') {
            bioText.textContent = currentProfile.bio;
            bioText.style.fontStyle = 'normal';
        } else {
            bioText.innerHTML = '<em>Clique em "Editar Perfil" para adicionar uma descrição</em>';
            bioText.style.fontStyle = 'italic';
        }
    }
    
    console.log('About section updated with:', {
        location: currentProfile.location,
        age: currentProfile.age,
        profession: currentProfile.profession,
        readingGoal: currentProfile.readingGoal,
        bio: currentProfile.bio
    });
}

// Hide all modals on page load to prevent unwanted visibility
function hideAllModalsOnLoad() {
    const modalIds = [
        'editProfileModal',
        'bookSelectionModal', 
        'addBookModal',
        'editBookModal',
        'genreSelectionModal'
    ];
    
    modalIds.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            modal.style.display = 'none';
        }
    });
    
    // Also remove any dynamically created modals
    const dynamicModals = document.querySelectorAll('.modal-overlay');
    dynamicModals.forEach(modal => {
        if (!modal.id || !modalIds.includes(modal.id)) {
            modal.remove();
        }
    });
    
    // Ensure body scroll is enabled
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
    
    console.log('All modals hidden on page load');
}

// Continue with the existing function
function loadUserLibraryAndRender() {
    if (!currentProfile) {
        console.log('No current profile found');
        return;
    }
    
    // Get profile books using new system
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    console.log(`Loading ${profileBooks.length} books for user library`);
    
    // Render books by sections
    loadProfileBooks();
    updateSidebarCurrentlyReading();
    updateReadingStats();
}

function renderBooksFromRefsData(bookRefsData) {
    if (!currentProfile || !bookRefsData) return;
    
    console.log('Rendering books from refs data:', bookRefsData);
    
    // Get book data from central library
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    
    // Render each section
    Object.keys(bookRefsData).forEach(sectionId => {
        const bookIds = bookRefsData[sectionId] || [];
        const sectionBooks = bookIds.map(id => biblioteca.find(book => book.id === id)).filter(Boolean);
        
        if (sectionBooks.length > 0) {
            renderBooksInSection(sectionId, sectionBooks);
        }
    });
    
    updateReadingStats();
}

// Function to load user library and render books correctly
function loadUserLibraryAndRender() {
    console.log('=== LOADING USER LIBRARY AND RENDERING ===');
    
    const currentProfile = loadFromLocalStorage("currentProfile");
    if (!currentProfile) {
        console.log('No currentProfile found in localStorage');
        return;
    }
    
    console.log('Found profile:', currentProfile.name, 'ID:', currentProfile.id);

    const userLibraryKey = `${currentProfile.id}_biblioteca`;
    const userLibrary = loadFromLocalStorage(userLibraryKey) || [];
    console.log(`User library (${userLibraryKey}) has`, userLibrary.length, 'entries');

    // Reconstruct bookRefs from saved user library
    const bookRefs = {
        "want-to-read": [],
        "currently-reading": [],
        "finished-books": [],
        "favorites": []
    };

    userLibrary.forEach(entry => {
        console.log('Processing entry:', entry);
        if (entry.status && entry.book && entry.book.id) {
            if (bookRefs[entry.status]) {
                bookRefs[entry.status].push(entry.book.id);
                console.log(`Added book ${entry.book.id} to ${entry.status}`);
            }
        }
    });

    console.log('Reconstructed bookRefs:', JSON.stringify(bookRefs, null, 2));
    
    // Update global currentProfile
    window.currentProfile = currentProfile;
    currentProfile.bookRefs = bookRefs;
    
    // Render books with reconstructed data
    renderBooksFromRefsData(bookRefs);
    
    console.log('=== USER LIBRARY LOAD AND RENDER COMPLETE ===');
}

// Save book to profile with specific status
function saveBookToProfile(book, status) {
    if (!currentProfile) {
        console.error('No current profile to save book to');
        return false;
    }
    
    // Ensure bookRefs structure exists with correct keys
    if (!currentProfile.bookRefs) {
        currentProfile.bookRefs = {
            'want-to-read': [],
            'currently-reading': [],
            'finished-books': [],
            'favorites': []
        };
    }
    
    // Remove book from all sections first (in case it's being moved)
    Object.keys(currentProfile.bookRefs).forEach(section => {
        const bookIndex = currentProfile.bookRefs[section].indexOf(book.id);
        if (bookIndex > -1) {
            currentProfile.bookRefs[section].splice(bookIndex, 1);
            console.log(`Removed book ${book.id} from section ${section}`);
        }
    });
    
    // Add book to the correct section
    if (!currentProfile.bookRefs[status]) {
        currentProfile.bookRefs[status] = [];
    }
    
    if (!currentProfile.bookRefs[status].includes(book.id)) {
        currentProfile.bookRefs[status].push(book.id);
        console.log(`Added book ${book.id} to section ${status}`);
    }
    
    // Also maintain the legacy profileBooks system for compatibility
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    const existingBookIndex = profileBooks.findIndex(b => b.id === book.id);
    
    if (existingBookIndex !== -1) {
        profileBooks[existingBookIndex].status = status;
    } else {
        const bookWithStatus = {
            id: book.id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            year: book.year,
            rating: book.rating,
            status: status,
            addedAt: new Date().toISOString()
        };
        profileBooks.push(bookWithStatus);
    }
    
    localStorage.setItem(profileBooksKey, JSON.stringify(profileBooks));
    
    // Save the updated profile with bookRefs
    saveCurrentProfile();
    
    console.log(`Profile books saved: ${profileBooks.length} total books`);
    console.log(`BookRefs updated:`, JSON.stringify(currentProfile.bookRefs, null, 2));
    return true;
}

// Load profile books and render them in sections
function loadProfileBooks() {
    if (!currentProfile) {
        console.log('No current profile for loading books');
        return;
    }
    
    console.log('=== LOADING PROFILE BOOKS ===');
    
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    const profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    console.log(`Found ${profileBooks.length} books in profile storage`);
    
    // Clear all containers and reset empty states
    const containers = {
        'want-to-read': 'wantToReadContainer',
        'currently-reading': 'currentlyReadingContainer',
        'finished-books': 'finishedBooksContainer',
        'favorites': 'favoriteBooksContainer'
    };
    
    Object.values(containers).forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            container.style.display = 'none';
            
            // Show empty state by default
            const section = container.closest('.book-section');
            if (section) {
                const emptyState = section.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.style.display = 'block';
                }
            }
        }
    });
    
    // Group books by status for better rendering
    const booksByStatus = {
        'want-to-read': [],
        'currently-reading': [],
        'finished-books': [],
        'favorites': []
    };
    
    profileBooks.forEach(book => {
        if (booksByStatus[book.status]) {
            booksByStatus[book.status].push(book);
        }
    });
    
    // Render books by status groups
    Object.keys(booksByStatus).forEach(status => {
        const books = booksByStatus[status];
        const containerId = containers[status];
        const container = document.getElementById(containerId);
        
        if (container && books.length > 0) {
            // Hide empty state and show container
            const section = container.closest('.book-section');
            if (section) {
                const emptyState = section.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.style.display = 'none';
                }
            }
            container.style.display = 'grid';
            
            // Render all books in this status
            books.forEach(book => {
                renderBookInSection(book);
            });
        }
    });
    
    console.log('=== PROFILE BOOKS LOADED ===');
}

// Render a book in its designated section
function renderBookInSection(book) {
    const containers = {
        'want-to-read': 'wantToReadContainer',
        'currently-reading': 'currentlyReadingContainer',
        'finished-books': 'finishedBooksContainer',
        'favorites': 'favoriteBooksContainer'
    };
    
    const containerId = containers[book.status];
    if (!containerId) {
        console.warn(`Unknown book status: ${book.status}`);
        return;
    }
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Container not found: ${containerId}`);
        return;
    }
    
    // Get complete book data from central library to ensure we have cover
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    const fullBook = biblioteca.find(b => b.id === book.id) || book;
    
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.dataset.bookId = book.id;
    
    // Use complete book data for cover with multiple fallback options
    const coverUrl = fullBook.cover || fullBook.coverUrl || fullBook.coverImage || book.cover || book.coverUrl || book.coverImage || '';
    
    // Create proper cover URL with fallback SVG
    const finalCoverUrl = coverUrl && coverUrl.trim() !== "" 
        ? coverUrl 
        : `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="180" viewBox="0 0 120 180"><rect width="120" height="180" fill="#cccccc"/><text x="60" y="90" text-anchor="middle" fill="#666" font-family="Arial" font-size="14" font-weight="bold">${fullBook.title}</text><text x="60" y="160" text-anchor="middle" fill="#666" font-family="Arial" font-size="10">${fullBook.author}</text></svg>`)}`;

    bookCard.innerHTML = `
        <div class="book-cover-wrapper">
            <img src="${finalCoverUrl}" alt="${fullBook.title}" class="book-cover">
            <div class="book-overlay">
                <button class="action-btn favorite ${book.status === 'favorites' ? 'active' : ''}" 
                        onclick="toggleBookFavorite('${book.id}')" title="Favoritar">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="action-btn remove" onclick="removeBookFromProfile('${book.id}')" title="Remover">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="book-info">
            <h4 class="book-title">${fullBook.title}</h4>
            <p class="book-author">${fullBook.author}</p>
            ${fullBook.year ? `<p class="book-year">${fullBook.year}</p>` : ''}
            <div class="book-rating">
                ${'⭐'.repeat(Math.floor(fullBook.rating || 0))}
                ${fullBook.rating ? `<span class="rating-text">${fullBook.rating}/5</span>` : ''}
            </div>
        </div>
    `;
    
    container.appendChild(bookCard);
    console.log(`Rendered book "${fullBook.title}" in ${containerId}`);
}

// Remove book from profile
function removeBookFromProfile(bookId) {
    if (!currentProfile) return;
    
    if (!confirm('Tem certeza que deseja remover este livro do seu perfil?')) {
        return;
    }
    
    const profileBooksKey = `${currentProfile.id}_profileBooks`;
    let profileBooks = JSON.parse(localStorage.getItem(profileBooksKey) || '[]');
    
    const bookIndex = profileBooks.findIndex(b => b.id === bookId);
    if (bookIndex !== -1) {
        const removedBook = profileBooks.splice(bookIndex, 1)[0];
        localStorage.setItem(profileBooksKey, JSON.stringify(profileBooks));
        
        // Remove from DOM
        const bookCard = document.querySelector(`[data-book-id="${bookId}"]`);
        if (bookCard) {
            bookCard.style.transform = 'scale(0)';
            bookCard.style.opacity = '0';
            setTimeout(() => bookCard.remove(), 300);
        }
        
        showNotification(`"${removedBook.title}" removido do perfil`, 'success');
        updateReadingStats();
    }
}

// Modified render function that accepts bookRefs data directly
function renderBooksFromRefsData(bookRefsData) {
    console.log('=== RENDERING BOOKS FROM REFS DATA ===');
    
    const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
    console.log('Central library has', biblioteca.length, 'books');
    console.log('Using bookRefs data:', JSON.stringify(bookRefsData, null, 2));
    
    // Map bookRefs keys to container IDs in HTML - using standardized hyphenated keys
    const seções = {
        'finished-books': 'finishedBooksContainer',
        'currently-reading': 'currentlyReadingContainer', 
        'favorites': 'favoriteBooksContainer',
        'want-to-read': 'wantToReadContainer'
    };

    Object.entries(seções).forEach(([refKey, containerId]) => {
        const container = document.getElementById(containerId);
        if (!container) {
            console.log(`Container ${containerId} not found in DOM`);
            return;
        }

        const bookIds = bookRefsData[refKey] || [];
        console.log(`Container ${containerId}: Looking for ${bookIds.length} books with IDs:`, bookIds);
        
        const books = bookIds.map(id => {
            const book = biblioteca.find(book => book.id === id);
            console.log(`Book ID ${id}:`, book ? `Found "${book.title}"` : 'NOT FOUND');
            return book;
        }).filter(Boolean);

        console.log(`Container ${containerId}: Found ${books.length} valid books`);

        if (books.length === 0) {
            container.innerHTML = '';
            console.log(`Container ${containerId}: No books to display`);
            return;
        }

        container.innerHTML = books.map(book => `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-cover-wrapper">
                    <img src="${book.cover || '/default-book-cover.jpg'}" alt="${book.title}" class="book-cover" 
                         onerror="this.src='/default-book-cover.jpg'">
                    <div class="book-overlay">
                        <button class="action-btn favorite ${refKey === 'favorites' ? 'active' : ''}" 
                                onclick="toggleBookFavorite('${book.id}')" title="Favoritar">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn edit" onclick="openBookEditModal('${book.id}', '${refKey}')" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn remove" onclick="removeBookFromSection('${book.id}', '${refKey}')" title="Remover">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-author">${book.author}</p>
                    ${book.year ? `<p class="book-year">${book.year}</p>` : ''}
                    <div class="book-rating">
                        ${'⭐'.repeat(Math.floor(book.rating || 0))}
                        ${book.rating ? `<span class="rating-text">${book.rating}/5</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log(`Container ${containerId}: Rendered ${books.length} books successfully`);
    });
    
    console.log('=== BOOKS RENDERING COMPLETE ===');
}
