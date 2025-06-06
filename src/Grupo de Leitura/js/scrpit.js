// Estado global da aplicação
let isGroupMember = false;
let currentGenreFilter = 'todos';
let currentPage = 1;
let userLikes = new Set();
let userLibrary = new Set();

// Dados mockados para funcionalidade completa
const mockBooks = {
    'Orgulho e Preconceito': {
        title: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        genre: 'Romance',
        rating: 4.8,
        description: 'Uma das obras mais amadas da literatura inglesa, que acompanha Elizabeth Bennet e Mr. Darcy em uma história de amor, mal-entendidos e crescimento pessoal. A obra explora temas de classe social, casamento e a importância de superar primeiras impressões.',
        pages: 432,
        year: 1813,
        reviews: 156,
        readers: 2847
    },
    'Sapiens': {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        genre: 'História',
        rating: 4.9,
        description: 'Uma jornada fascinante através da história da humanidade, desde os primeiros Homo sapiens até as revoluções que moldaram nosso mundo moderno. Harari apresenta uma perspectiva única sobre agricultura, religião, ciência e tecnologia.',
        pages: 464,
        year: 2011,
        reviews: 243,
        readers: 3521
    },
    'Harry Potter e a Pedra Filosofal': {
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J.K. Rowling',
        genre: 'Fantasia',
        rating: 4.7,
        description: 'O primeiro livro da série que conquistou o mundo. Acompanhe Harry Potter em sua jornada de descoberta do mundo mágico, amizades verdadeiras e a luta contra as forças das trevas.',
        pages: 264,
        year: 1997,
        reviews: 189,
        readers: 4156
    },
    'O Senhor dos Anéis': {
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasia',
        rating: 4.9,
        description: 'A épica jornada de Frodo e seus companheiros para destruir o Um Anel. Uma obra-prima da literatura fantástica que influenciou gerações de escritores.',
        pages: 1216,
        year: 1954,
        reviews: 298,
        readers: 2934
    },
    'Drácula': {
        title: 'Drácula',
        author: 'Bram Stoker',
        genre: 'Terror',
        rating: 4.4,
        description: 'O clássico romance gótico que definiu o vampiro moderno. Uma história de horror, suspense e a eterna luta entre o bem e o mal.',
        pages: 418,
        year: 1897,
        reviews: 134,
        readers: 1876
    }
};

const mockMembers = [
    { name: 'Camila Oliveira', avatar: 'CO', books: 47, reviews: 23 },
    { name: 'Pedro Santos', avatar: 'PS', books: 62, reviews: 31 },
    { name: 'Ana Beatriz', avatar: 'AB', books: 38, reviews: 19 },
    { name: 'Lucas Ferreira', avatar: 'LF', books: 55, reviews: 28 },
    { name: 'Isabella Costa', avatar: 'IC', books: 41, reviews: 22 },
    { name: 'Rafael Lima', avatar: 'RL', books: 33, reviews: 16 }
];

// Funcionalidade de busca
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length > 2) {
                const results = performSearch(query);
                displaySearchResults(results);
            } else {
                hideSearchResults();
            }
        });
    }
    
    // Inicializar notificação de boas-vindas
    showNotification('Bem-vindo ao grupo Leitores Unidos!', 'success');
});

function performSearch(query) {
    const bookResults = Object.keys(mockBooks)
        .filter(book => 
            book.toLowerCase().includes(query) || 
            mockBooks[book].author.toLowerCase().includes(query)
        )
        .map(book => ({ 
            type: 'book', 
            title: book, 
            author: mockBooks[book].author 
        }));
    
    const memberResults = mockMembers
        .filter(member => member.name.toLowerCase().includes(query))
        .map(member => ({ 
            type: 'member', 
            name: member.name, 
            avatar: member.avatar 
        }));
    
    const groupResults = query.includes('leitores') || query.includes('unidos') 
        ? [{ type: 'group', name: 'Leitores Unidos' }] 
        : [];
    
    return [...bookResults, ...memberResults, ...groupResults].slice(0, 8);
}

function displaySearchResults(results) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (results.length > 0) {
        resultsDiv.innerHTML = results.map(result => {
            switch(result.type) {
                case 'book':
                    return `<div class="search-result-item" onclick="selectSearchResult('${result.title}', 'book')">
                        📚 ${result.title} - ${result.author}
                    </div>`;
                case 'member':
                    return `<div class="search-result-item" onclick="selectSearchResult('${result.name}', 'member')">
                        👤 ${result.name}
                    </div>`;
                case 'group':
                    return `<div class="search-result-item" onclick="selectSearchResult('${result.name}', 'group')">
                        👥 Grupo: ${result.name}
                    </div>`;
                default:
                    return '';
            }
        }).join('');
        resultsDiv.style.display = 'block';
    } else {
        resultsDiv.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
        resultsDiv.style.display = 'block';
    }
}

function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

function selectSearchResult(item, type) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = item;
    hideSearchResults();
    
    switch(type) {
        case 'book':
            showBookDetails(item);
            break;
        case 'member':
            showMemberProfile(item);
            break;
        case 'group':
            showNotification(`Você já está no grupo: ${item}`, 'success');
            break;
    }
}

// Fechar resultados da busca ao clicar fora
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-bar')) {
        hideSearchResults();
    }
});

// Menu do usuário
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('userDropdown').classList.remove('show');
    }
});

// Participação no grupo
function toggleGroupMembership() {
    const btn = document.getElementById('joinGroupBtn');
    const memberCount = document.getElementById('memberCount');
    let count = parseInt(memberCount.textContent);
    
    if (!isGroupMember) {
        btn.innerHTML = '✓ Membro do Grupo';
        btn.classList.add('joined');
        memberCount.textContent = count + 1;
        showNotification('Você agora faz parte do grupo! Bem-vindo aos Leitores Unidos!', 'success');
        isGroupMember = true;
        updateStats();
    } else {
        if (confirm('Tem certeza que deseja sair do grupo?')) {
            btn.innerHTML = '+ Participar do Grupo';
            btn.classList.remove('joined');
            memberCount.textContent = count - 1;
            showNotification('Você saiu do grupo. Sentiremos sua falta!', 'warning');
            isGroupMember = false;
            updateStats();
        }
    }
}

// Filtro por gênero
function filterByGenre(genre) {
    currentGenreFilter = genre;
    const books = document.querySelectorAll('.book-card');
    const tags = document.querySelectorAll('.genre-tag');
    
    // Atualizar tag ativa
    tags.forEach(tag => tag.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filtrar livros
    let visibleCount = 0;
    books.forEach(book => {
        if (genre === 'todos' || book.dataset.genre === genre) {
            book.style.display = 'flex';
            visibleCount++;
        } else {
            book.style.display = 'none';
        }
    });
    
    // Atualizar notificação
    if (genre !== 'todos') {
        const genreNames = {
            'ficcao': 'Ficção',
            'romance': 'Romance',
            'fantasia': 'Fantasia',
            'misterio': 'Mistério',
            'suspense': 'Suspense',
            'terror': 'Terror',
            'biografia': 'Biografia',
            'historia': 'História',
            'cientifico': 'Científico',
            'infantil': 'Infantil',
            'autoajuda': 'Auto Ajuda'
        };
        showNotification(`Mostrando ${visibleCount} livros de ${genreNames[genre] || genre}`, 'success');
    } else {
        showNotification(`Mostrando todos os ${visibleCount} livros disponíveis`, 'success');
    }
    
    currentPage = 1;
    updatePagination();
}

// Modal de detalhes do livro
function showBookDetails(bookTitle) {
    const modal = document.getElementById('bookModal');
    const details = document.getElementById('bookDetails');
    
    const book = mockBooks[bookTitle] || {
        title: bookTitle,
        author: 'Autor Desconhecido',
        genre: 'Diversos',
        rating: 4.5,
        description: 'Descrição não disponível no momento. Este livro faz parte do nosso catálogo em expansão.',
        pages: 300,
        year: 2020,
        reviews: 0,
        readers: 0
    };
    
    const isInLibrary = userLibrary.has(bookTitle);
    
    details.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h2 style="color: var(--primary); margin-bottom: 1rem;">${book.title}</h2>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; color: var(--text-secondary);">
                <span>📖 ${book.pages} páginas</span>
                <span>📅 ${book.year}</span>
                <span>👥 ${book.readers} leitores</span>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Gênero:</strong> ${book.genre}</p>
            <p><strong>Avaliação:</strong> ⭐ ${book.rating} (${book.reviews} resenhas)</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <p><strong>Descrição:</strong></p>
            <p style="line-height: 1.6; color: var(--text-secondary);">${book.description}</p>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn ${isInLibrary ? 'joined' : ''}" onclick="toggleLibrary('${book.title}')">
                ${isInLibrary ? '✓ Na Biblioteca' : '📚 Adicionar à Biblioteca'}
            </button>
            <button class="btn secondary" onclick="writeReview('${book.title}')">
                ✍️ Escrever Resenha
            </button>
            <button class="btn secondary" onclick="shareBook('${book.title}')">
                🔗 Compartilhar
            </button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Adicionar/remover da biblioteca
function toggleLibrary(bookTitle) {
    const btn = event.target;
    
    if (userLibrary.has(bookTitle)) {
        userLibrary.delete(bookTitle);
        btn.innerHTML = '📚 Adicionar à Biblioteca';
        btn.classList.remove('joined');
        showNotification(`"${bookTitle}" removido da sua biblioteca`, 'warning');
    } else {
        userLibrary.add(bookTitle);
        btn.innerHTML = '✓ Na Biblioteca';
        btn.classList.add('joined');
        showNotification(`"${bookTitle}" adicionado à sua biblioteca!`, 'success');
    }
}

// Perfil de membro
function showMemberProfile(memberName) {
    const member = mockMembers.find(m => m.name === memberName) || {
        name: memberName,
        avatar: memberName.split(' ').map(n => n[0]).join('').toUpperCase(),
        books: Math.floor(Math.random() * 50) + 10,
        reviews: Math.floor(Math.random() * 25) + 5
    };
    
    showNotification(`Perfil de ${member.name}: ${member.books} livros lidos, ${member.reviews} resenhas escritas`, 'success');
    
    setTimeout(() => {
        showNotification('Funcionalidade de perfil completo em desenvolvimento', 'warning');
    }, 2000);
}

function showAllMembers() {
    showNotification('Carregando lista completa de 485 membros...', 'success');
    
    setTimeout(() => {
        showNotification('Lista de membros carregada! Funcionalidade completa em desenvolvimento.', 'success');
    }, 1500);
}

// Interações com resenhas
function likeReview(element) {
    const reviewCard = element.closest('.review-card');
    const reviewId = Array.from(reviewCard.parentNode.children).indexOf(reviewCard);
    
    element.classList.toggle('liked');
    const countSpan = element.querySelector('span:last-child');
    let count = parseInt(countSpan.textContent);
    
    if (element.classList.contains('liked')) {
        countSpan.textContent = count + 1;
        userLikes.add(reviewId);
        showNotification('Resenha curtida!', 'success');
    } else {
        countSpan.textContent = Math.max(0, count - 1);
        userLikes.delete(reviewId);
        showNotification('Curtida removida', 'warning');
    }
}

function replyToReview() {
    const replyText = prompt('Digite sua resposta:');
    if (replyText && replyText.trim()) {
        showNotification('Resposta publicada com sucesso!', 'success');
        
        const commentCount = event.target.querySelector('span:last-child');
        if (commentCount) {
            commentCount.textContent = parseInt(commentCount.textContent) + 1;
        }
    } else if (replyText !== null) {
        showNotification('Resposta não pode estar vazia', 'error');
    }
}

function shareReview() {
    const reviewTitle = event.target.closest('.review-card').querySelector('h4').textContent;
    const bookTitle = event.target.closest('.review-card').querySelector('.reviewer-info p').textContent.replace('sobre ', '');
    
    showNotification(`Link da resenha de ${reviewTitle} ${bookTitle} copiado para área de transferência!`, 'success');
    
    if (navigator.clipboard) {
        const fakeUrl = `https://tolendo.com/review/${reviewTitle.replace(/\s+/g, '-').toLowerCase()}`;
        navigator.clipboard.writeText(fakeUrl).catch(() => {});
    }
}

// Paginação
function changePage(page) {
    const totalPages = 3;
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    updatePagination();
    
    showNotification(`Carregando página ${page}...`, 'success');
    
    setTimeout(() => {
        showNotification(`Página ${page} carregada com sucesso!`, 'success');
        document.querySelector('.books-grid').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

function updatePagination() {
    const buttons = document.querySelectorAll('.page-btn');
    buttons.forEach((btn, index) => {
        btn.classList.remove('active');
        if (index === currentPage) {
            btn.classList.add('active');
        }
    });
}

// Funções de biblioteca e resenhas
function writeReview(bookTitle) {
    const reviewText = prompt(`Escreva sua resenha para "${bookTitle}":`);
    if (reviewText && reviewText.trim()) {
        showNotification(`Resenha para "${bookTitle}" publicada com sucesso!`, 'success');
        closeModal();
        
        const reviewCount = document.getElementById('totalReviews');
        if (reviewCount) {
            reviewCount.textContent = parseInt(reviewCount.textContent) + 1;
        }
    } else if (reviewText !== null) {
        showNotification('A resenha não pode estar vazia', 'error');
    }
}

function shareBook(bookTitle) {
    showNotification(`Link de "${bookTitle}" copiado para área de transferência!`, 'success');
    closeModal();
    
    if (navigator.clipboard) {
        const fakeUrl = `https://tolendo.com/book/${bookTitle.replace(/\s+/g, '-').toLowerCase()}`;
        navigator.clipboard.writeText(fakeUrl).catch(() => {});
    }
}

// Funções de navegação
function goHome() {
    showNotification('Redirecionando para página inicial...', 'success');
    
    setTimeout(() => {
        showNotification('Você está na página inicial!', 'success');
    }, 1000);
}

function showPage(page) {
    const pageNames = {
        'inicio': 'Página Inicial',
        'meus-livros': 'Meus Livros',
        'grupos': 'Grupos de Leitura',
        'descobrir': 'Descobrir Novos Livros'
    };
    
    const pageName = pageNames[page] || page;
    showNotification(`Navegando para ${pageName}...`, 'success');
    
    setTimeout(() => {
        showNotification(`Bem-vindo à página: ${pageName}`, 'success');
    }, 800);
}

// Funções do menu do usuário
function showProfile() {
    const userStats = {
        booksRead: userLibrary.size + Math.floor(Math.random() * 20) + 15,
        reviewsWritten: Math.floor(Math.random() * 10) + 5,
        groupsJoined: isGroupMember ? 1 + Math.floor(Math.random() * 3) : Math.floor(Math.random() * 3),
        favoriteGenre: 'Fantasia'
    };
    
    showNotification(`Seu perfil: ${userStats.booksRead} livros lidos, ${userStats.reviewsWritten} resenhas, ${userStats.groupsJoined} grupos`, 'success');
    document.getElementById('userDropdown').classList.remove('show');
    
    setTimeout(() => {
        showNotification('Abrindo perfil completo...', 'success');
    }, 1500);
}

function showSettings() {
    const settings = [
        'Notificações: Ativadas',
        'Privacidade: Perfil Público',
        'Tema: Claro',
        'Idioma: Português (BR)'
    ];
    
    showNotification('Configurações atuais carregadas', 'success');
    document.getElementById('userDropdown').classList.remove('show');
    
    setTimeout(() => {
        showNotification(`${settings.join(' | ')}`, 'success');
    }, 1000);
}

function showHelp() {
    const helpTopics = [
        'Como participar de grupos',
        'Como escrever resenhas',
        'Como usar a busca avançada',
        'Como gerenciar sua biblioteca'
    ];
    
    showNotification('Central de ajuda: 4 tópicos disponíveis', 'success');
    document.getElementById('userDropdown').classList.remove('show');
    
    setTimeout(() => {
        showNotification('Tópicos: ' + helpTopics.join(', '), 'success');
    }, 1200);
}

function logout() {
    if (confirm('Tem certeza que deseja sair da sua conta?')) {
        showNotification('Fazendo logout... Até logo!', 'warning');
        document.getElementById('userDropdown').classList.remove('show');
        
        setTimeout(() => {
            showNotification('Logout realizado com sucesso', 'success');
        }, 1500);
    }
}

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    notification.className = 'notification';
    notification.textContent = message;
    notification.classList.add(type);
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Atualizar estatísticas
function updateStats() {
    const stats = {
        totalBooks: document.getElementById('totalBooks'),
        totalReviews: document.getElementById('totalReviews'),
        activeGenres: document.getElementById('activeGenres'),
        thisMonth: document.getElementById('thisMonth')
    };
    
    if (isGroupMember) {
        Object.values(stats).forEach(stat => {
            if (stat) {
                const currentValue = parseInt(stat.textContent);
                stat.textContent = currentValue + Math.floor(Math.random() * 3) + 1;
            }
        });
    }
}

// Fechar modal clicando fora
window.onclick = function(event) {
    const modal = document.getElementById('bookModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar modal
    if (e.key === 'Escape') {
        closeModal();
        hideSearchResults();
        document.getElementById('userDropdown').classList.remove('show');
    }
    
    // Ctrl/Cmd + K para focar na busca
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
        showNotification('Busca ativada - digite para procurar', 'success');
    }
    
    // Enter na busca
    if (e.key === 'Enter' && e.target.id === 'searchInput') {
        const firstResult = document.querySelector('.search-result-item');
        if (firstResult) {
            firstResult.click();
        }
    }
});

// Funcionalidades extras para melhor experiência
function addRandomBook() {
    const randomBooks = [
        'O Alquimista - Paulo Coelho',
        'Dom Casmurro - Machado de Assis',
        'O Cortiço - Aluísio Azevedo',
        'Vidas Secas - Graciliano Ramos',
        'O Guarani - José de Alencar'
    ];
    
    const randomBook = randomBooks[Math.floor(Math.random() * randomBooks.length)];
    showNotification(`Sugestão de leitura: ${randomBook}`, 'success');
}