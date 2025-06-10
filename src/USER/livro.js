/**
 * Book Details Page JavaScript
 * Handles book data loading, comments, ratings, and user interactions
 */

class BookDetailsPage {
    constructor() {
        this.currentBook = null;
        this.currentUserRating = 0;
        this.comments = [];
        this.genreEmojis = {
            'ficcao': '✨',
            'nao-ficcao': '📚',
            'romance': '💕',
            'fantasia': '🧙‍♂️',
            'misterio': '🔍',
            'biografia': '👤',
            'historia': '🏛️',
            'ciencia': '🔬',
            'autoajuda': '🌟',
            'infantil': '🧒',
            'jovem-adulto': '🎭',
            'poesia': '🎭',
            'drama': '🎪',
            'aventura': '⚔️'
        };
        this.genreNames = {
            'ficcao': 'Ficção',
            'nao-ficcao': 'Não-ficção',
            'romance': 'Romance',
            'fantasia': 'Fantasia',
            'misterio': 'Mistério',
            'biografia': 'Biografia',
            'historia': 'História',
            'ciencia': 'Ciência',
            'autoajuda': 'Autoajuda',
            'infantil': 'Infantil',
            'jovem-adulto': 'Jovem Adulto',
            'poesia': 'Poesia',
            'drama': 'Drama',
            'aventura': 'Aventura'
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadBookFromURL();
    }

    bindEvents() {
        // Star rating interaction
        const starRating = document.getElementById('starRating');
        if (starRating) {
            const stars = starRating.querySelectorAll('i');
            stars.forEach((star, index) => {
                star.addEventListener('mouseover', () => this.highlightStars(index + 1));
                star.addEventListener('mouseout', () => this.highlightStars(this.currentUserRating));
                star.addEventListener('click', () => this.setRating(index + 1));
            });
        }

        // Comment form submission
        const commentForm = document.getElementById('commentForm');
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => this.handleCommentSubmit(e));
        }

        // Like button
        const likeButton = document.getElementById('likeButton');
        if (likeButton) {
            likeButton.addEventListener('click', () => this.toggleLike());
        }
    }

    loadBookFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get('id');
        
        if (!bookId) {
            this.showNotFound();
            return;
        }

        this.loadBook(bookId);
    }

    async loadBook(bookId) {
        try {
            // Debug localStorage contents
            console.log('Todas as chaves do localStorage:', Object.keys(localStorage));
            console.log('Conteúdo biblioteca_livros:', localStorage.getItem('biblioteca_livros'));
            
            // Load books from the correct localStorage key
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            
            console.log('Carregando livro com ID:', bookId);
            console.log('Total de livros encontrados:', books.length);
            console.log('IDs dos livros disponíveis:', books.map(b => b.id));
            
            const book = books.find(b => b.id === bookId);
            console.log('Livro encontrado:', book);

            if (!book) {
                console.log('Livro não encontrado');
                // Tentar busca por título como fallback
                const bookByTitle = books.find(b => b.titulo && b.titulo.toLowerCase().includes(bookId.toLowerCase()));
                if (bookByTitle) {
                    console.log('Livro encontrado por título:', bookByTitle);
                    this.currentBook = bookByTitle;
                    this.loadComments(bookByTitle.id);
                    this.displayBook(bookByTitle);
                    return;
                }
                this.showNotFound();
                return;
            }

            this.currentBook = book;
            this.loadComments(bookId);
            this.displayBook(book);
            this.checkUserLikeStatus(bookId);
            
            // Hide loading state
            document.getElementById('loadingState').style.display = 'none';
            document.getElementById('bookDetails').style.display = 'block';
            
        } catch (error) {
            console.error('Erro ao carregar livro:', error);
            this.showNotFound();
        }
    }

    displayBook(book) {
        // Update page title
        document.title = `${book.title} - Detalhes do Livro`;

        // Book cover
        const bookCover = document.getElementById('bookCover');
        const coverImage = book.coverImage || book.cover_image;
        if (coverImage && coverImage.trim()) {
            bookCover.src = coverImage;
            bookCover.alt = `Capa de ${book.title}`;
            bookCover.onerror = () => {
                bookCover.parentElement.classList.add('no-image');
                bookCover.style.display = 'none';
            };
        } else {
            bookCover.parentElement.classList.add('no-image');
            bookCover.style.display = 'none';
        }

        // Basic info
        document.getElementById('bookTitle').textContent = book.title || 'Título não informado';
        document.getElementById('bookAuthor').textContent = book.author || 'Autor não informado';
        
        // Genre with emoji
        const genreEmoji = this.genreEmojis[book.genre] || '📖';
        const genreName = this.genreNames[book.genre] || book.genre || 'Não informado';
        document.getElementById('bookGenre').textContent = `${genreEmoji} ${genreName}`;
        
        // Meta information
        document.getElementById('bookYear').textContent = book.publicationYear || book.publication_year || 'Não informado';
        document.getElementById('bookPublisher').textContent = book.publisher || 'Não informado';
        document.getElementById('bookPages').textContent = book.pages || 'Não informado';

        // Synopsis
        const synopsis = book.synopsis || book.description || 'Sinopse não disponível.';
        document.getElementById('bookSynopsis').textContent = synopsis;

        // Action buttons
        this.setupActionButtons(book);

        // Additional information
        this.displayAdditionalInfo(book);

        // Load and display rating
        this.displayRating(book);

        // Update stats
        this.updateBookStats(book);
    }

    setupActionButtons(book) {
        const downloadButton = document.getElementById('downloadButton');
        const purchaseButton = document.getElementById('purchaseButton');

        // Download button
        if (book.downloadLink || book.download_link) {
            downloadButton.href = book.downloadLink || book.download_link;
            downloadButton.style.display = 'flex';
        } else {
            downloadButton.style.display = 'none';
        }

        // Purchase button
        if (book.purchaseLink || book.purchase_link) {
            purchaseButton.href = book.purchaseLink || book.purchase_link;
            purchaseButton.style.display = 'flex';
        } else {
            purchaseButton.style.display = 'none';
        }
    }

    displayAdditionalInfo(book) {
        const additionalInfo = document.getElementById('additionalInfo');
        let hasAdditionalInfo = false;

        // Series
        const seriesInfo = document.getElementById('seriesInfo');
        if (book.series && book.series.trim()) {
            document.getElementById('bookSeries').textContent = book.series;
            seriesInfo.style.display = 'flex';
            hasAdditionalInfo = true;
        }

        // Illustrator
        const illustratorInfo = document.getElementById('illustratorInfo');
        if (book.illustrator && book.illustrator.trim()) {
            document.getElementById('bookIllustrator').textContent = book.illustrator;
            illustratorInfo.style.display = 'flex';
            hasAdditionalInfo = true;
        }

        // Origin
        const originInfo = document.getElementById('originInfo');
        if (book.origin && book.origin.trim()) {
            document.getElementById('bookOrigin').textContent = book.origin;
            originInfo.style.display = 'flex';
            hasAdditionalInfo = true;
        }

        // Awards
        const awardsInfo = document.getElementById('awardsInfo');
        if (book.awards && book.awards.trim()) {
            document.getElementById('bookAwards').textContent = book.awards;
            awardsInfo.style.display = 'flex';
            hasAdditionalInfo = true;
        }

        additionalInfo.style.display = hasAdditionalInfo ? 'block' : 'none';
    }

    displayRating(book) {
        const reviews = this.loadReviews(book.id);
        let totalRating = 0;
        let ratingCount = 0;

        reviews.forEach(review => {
            if (review.rating && review.rating > 0) {
                totalRating += review.rating;
                ratingCount++;
            }
        });

        const averageRating = ratingCount > 0 ? (totalRating / ratingCount) : 0;
        
        // Update rating display
        document.getElementById('bookRatingValue').textContent = averageRating.toFixed(1);
        this.updateStarsDisplay(document.getElementById('bookRatingStars'), averageRating);
    }

    updateStarsDisplay(container, rating) {
        container.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('i');
            if (i <= Math.floor(rating)) {
                star.className = 'fas fa-star';
            } else if (i - 0.5 <= rating) {
                star.className = 'fas fa-star-half-alt';
            } else {
                star.className = 'far fa-star';
            }
            container.appendChild(star);
        }
    }

    updateBookStats(book) {
        const likes = this.loadLikes(book.id);
        const reviews = this.loadReviews(book.id);
        
        document.getElementById('bookLikes').textContent = likes.length;
        document.getElementById('bookComments').textContent = reviews.length;
    }

    checkUserLikeStatus(bookId) {
        const currentUser = this.getCurrentUser();
        const likes = this.loadLikes(bookId);
        const userLiked = likes.some(like => like.user_id === currentUser.id);
        
        const likeButton = document.getElementById('likeButton');
        const heartIcon = likeButton.querySelector('i');
        
        if (userLiked) {
            likeButton.classList.add('liked');
            heartIcon.className = 'fas fa-heart';
            likeButton.querySelector('span').textContent = 'Curtido';
        } else {
            likeButton.classList.remove('liked');
            heartIcon.className = 'far fa-heart';
            likeButton.querySelector('span').textContent = 'Curtir';
        }
    }

    toggleLike() {
        if (!this.currentBook) return;

        const currentUser = this.getCurrentUser();
        const allLikes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
        const existingLike = allLikes.find(l => l.book_id === this.currentBook.id && l.user_id === currentUser.id);
        
        if (existingLike) {
            // Remove like
            const updatedLikes = allLikes.filter(l => !(l.book_id === this.currentBook.id && l.user_id === currentUser.id));
            localStorage.setItem('biblioteca_curtidas', JSON.stringify(updatedLikes));
        } else {
            // Add like
            const newLike = {
                id: Date.now().toString(),
                book_id: this.currentBook.id,
                user_id: currentUser.id,
                user_name: currentUser.name,
                created_at: new Date().toISOString()
            };
            allLikes.push(newLike);
            localStorage.setItem('biblioteca_curtidas', JSON.stringify(allLikes));
        }

        this.checkUserLikeStatus(this.currentBook.id);
        this.updateBookStats(this.currentBook);
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('#starRating i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    setRating(rating) {
        this.currentUserRating = rating;
        this.highlightStars(rating);
    }

    async handleCommentSubmit(event) {
        event.preventDefault();

        const commentText = document.getElementById('commentText').value.trim();
        if (!commentText) {
            this.showNotification('Por favor, escreva um comentário.', 'error');
            return;
        }

        if (this.currentUserRating === 0) {
            this.showNotification('Por favor, selecione uma avaliação com estrelas.', 'error');
            return;
        }

        const currentUser = this.getCurrentUser();
        const review = {
            id: this.generateId(),
            livroId: this.currentBook.id,
            book_id: this.currentBook.id, // Manter compatibilidade
            usuario: currentUser.name,
            user_id: currentUser.id,
            user_name: currentUser.name,
            user_email: currentUser.email,
            username: currentUser.username,
            rating: this.currentUserRating,
            texto: commentText,
            review: commentText, // Manter compatibilidade
            text: commentText,
            comment: commentText,
            data: new Date().toISOString(),
            date: new Date().toISOString() // Manter compatibilidade
        };

        console.log('Salvando resenha:', review);

        // Use unified comment system if available
        if (window.sistemaComentarios) {
            window.sistemaComentarios.adicionarComentario(
                this.currentBook.id,
                commentText,
                this.currentUserRating,
                '' // no title for comments from book page
            );
        } else {
            // Fallback to old system
            const reviews = this.loadReviews(this.currentBook.id);
            const existingReviewIndex = reviews.findIndex(r => r.user_id === currentUser.id);
            if (existingReviewIndex >= 0) {
                reviews[existingReviewIndex] = review;
            } else {
                reviews.push(review);
            }
            this.salvarResenhaGlobal(review);
        }
        
        // Reload comments from unified system
        this.loadComments(this.currentBook.id);
        this.updateBookAverageRating(this.currentBook.id, this.comments);
        
        // Reset form
        document.getElementById('commentForm').reset();
        this.currentUserRating = 0;
        this.highlightStars(0);

        // Refresh display
        this.displayComments();
        this.displayRating(this.currentBook);
        this.updateBookStats(this.currentBook);

        this.showNotification('Sua avaliação foi adicionada com sucesso!', 'success');
    }

    updateBookAverageRating(bookId, reviews) {
        // Calculate average rating
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            
            // Update book in localStorage with new average rating
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            const bookIndex = books.findIndex(b => b.id === bookId);
            
            if (bookIndex >= 0) {
                books[bookIndex].averageRating = averageRating;
                books[bookIndex].totalReviews = reviews.length;
                books[bookIndex].lastReviewed = new Date().toISOString();
                localStorage.setItem('biblioteca_livros', JSON.stringify(books));
                console.log(`Avaliação média atualizada para ${books[bookIndex].title}: ${averageRating.toFixed(1)} (${reviews.length} resenhas)`);
            }
        }
    }

    loadComments(bookId) {
        // Use the global utility function first
        const globalReviews = this.obterResenhasDoLivro(bookId);
        
        // Load from other storage systems for compatibility
        const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
        const livro = biblioteca.find(l => l.id === bookId);
        const centralComments = Array.isArray(livro?.comments) ? livro.comments : (Array.isArray(livro?.reviews) ? livro.reviews : []);
        
        const reviews = this.loadReviews(bookId);
        let bibliotecaResenhas = [];
        try {
            bibliotecaResenhas = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
            if (!Array.isArray(bibliotecaResenhas)) bibliotecaResenhas = [];
        } catch (e) {
            console.warn('Erro ao carregar biblioteca_resenhas:', e);
            bibliotecaResenhas = [];
        }
        
        const bookReviews = bibliotecaResenhas.filter(r => 
            r && typeof r === 'object' && (r.book_id === bookId || r.livroId === bookId)
        );
        
        // Merge all reviews from all sources
        const allReviews = [
            ...globalReviews,
            ...centralComments.filter(r => r && typeof r === 'object' && r.id),
            ...reviews.filter(r => r && typeof r === 'object' && r.id),
            ...bookReviews
        ];
        
        const validReviews = allReviews.filter(review => 
            review && 
            typeof review === 'object' && 
            review.id && 
            typeof review.id === 'string' &&
            (review.book_id === bookId || review.livroId === bookId) &&
            (review.review || review.text || review.comment || review.content || review.texto)
        );
        
        const uniqueReviews = validReviews.filter((review, index, self) => 
            index === self.findIndex(r => r.id === review.id)
        );
        
        console.log('Resenhas unificadas carregadas para o livro:', bookId, uniqueReviews);
        this.comments = uniqueReviews;
        this.displayComments();
    }

    displayComments() {
        const commentsList = document.getElementById('commentsList');
        const noComments = document.getElementById('noComments');

        if (this.comments.length === 0) {
            noComments.style.display = 'block';
            return;
        }

        noComments.style.display = 'none';
        
        // Sort comments by date (newest first)
        const sortedComments = this.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const commentsHtml = sortedComments.map(comment => this.createCommentHtml(comment)).join('');
        commentsList.innerHTML = commentsHtml;
    }

    createCommentHtml(comment) {
        // Handle date formatting with fallbacks
        let dateString = 'Data não disponível';
        try {
            const dateValue = comment.date || comment.data || comment.created_at;
            if (dateValue) {
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                    dateString = date.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                } else if (typeof dateValue === 'string' && dateValue.includes('2025')) {
                    // Try to parse custom date format
                    dateString = dateValue;
                }
            }
        } catch (e) {
            console.warn('Erro ao formatar data do comentário:', e);
            dateString = 'Data inválida';
        }

        const starsHtml = this.createRatingStarsHtml(comment.rating || 0);
        
        // Get comment text with multiple fallbacks
        const commentText = comment.texto || comment.review || comment.text || comment.comment || comment.content || '[Comentário não disponível]';
        
        // Get user name with fallbacks
        const userName = comment.usuario || comment.user_name || comment.userName || 'Usuário Anônimo';
        
        // Get current user to check if they can edit/delete this review
        const currentUser = this.getCurrentUser();
        const canEditDelete = comment.user_id === currentUser.id || comment.userId === currentUser.id;

        return `
            <div class="comment-item" data-review-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-user">
                        <i class="fas fa-user"></i>
                        <strong>${userName}</strong>
                        ${comment.username ? `<span class="username">${comment.username}</span>` : ''}
                    </div>
                    <div class="comment-meta">
                        <div class="comment-rating">
                            ${starsHtml}
                        </div>
                        ${canEditDelete ? `
                            <div class="comment-actions">
                                <button class="action-btn edit-review-btn" onclick="editReview('${comment.id}')" title="Editar resenha">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn delete-review-btn" onclick="deleteReview('${comment.id}')" title="Excluir resenha">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="comment-text">${commentText}</div>
                <div class="comment-date">${dateString}</div>
            </div>
        `;
    }

    createRatingStarsHtml(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        return starsHtml;
    }

    // Utility functions
    generateId() {
        return 'review_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Função utilitária global para obter resenhas de um livro usando sistema unificado
    obterResenhasDoLivro(livroId) {
        if (window.sistemaComentarios) {
            return window.sistemaComentarios.obterComentariosLivro(livroId);
        }
        
        // Fallback para compatibilidade
        const todasResenhas = JSON.parse(localStorage.getItem('resenhas_livros') || '[]');
        return todasResenhas.filter(resenha => resenha.livroId === livroId || resenha.book_id === livroId);
    }

    // Função utilitária global para salvar resenha
    salvarResenhaGlobal(review) {
        const todasResenhas = JSON.parse(localStorage.getItem('resenhas_livros') || '[]');
        
        // Remove resenha existente do mesmo usuário para o mesmo livro
        const filteredResenhas = todasResenhas.filter(r => 
            !(r.livroId === review.livroId && r.user_id === review.user_id) &&
            !(r.book_id === review.book_id && r.user_id === review.user_id)
        );
        
        filteredResenhas.push(review);
        localStorage.setItem('resenhas_livros', JSON.stringify(filteredResenhas));
        
        console.log('Resenha salva no sistema global:', review);
        return filteredResenhas;
    }

    getCurrentUser() {
        // Integra com o sistema de perfis existente
        const activeProfileId = localStorage.getItem('tolendo_active_profile');
        
        if (!activeProfileId) {
            // Se não há usuário logado, cria usuário anônimo
            return {
                id: 'guest_' + Date.now(),
                name: 'Usuário Convidado',
                email: 'convidado@exemplo.com',
                username: '@convidado'
            };
        }
        
        const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
        const profile = profiles.find(p => p.id === activeProfileId);
        
        if (!profile) {
            return {
                id: 'anonymous',
                name: 'Usuário Anônimo',
                email: 'anonimo@email.com',
                username: '@anonimo'
            };
        }
        
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email || `${profile.name.toLowerCase().replace(/\s+/g, '')}@email.com`,
            username: profile.username || `@${profile.name.toLowerCase().replace(/\s+/g, '')}`
        };
    }

    loadReviews(bookId) {
        // Buscar em ambas as fontes para compatibilidade
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const bibliotecaResenhas = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
        
        // Combinar as duas fontes
        const allReviews = [...reviews, ...bibliotecaResenhas];
        
        return allReviews.filter(review => review.book_id === bookId);
    }

    saveReviews(bookId, reviews) {
        // Salvar em ambas as chaves para garantir compatibilidade
        const allReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const allBibliotecaResenhas = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
        
        // Remove existing reviews for this book from both sources
        const filteredReviews = allReviews.filter(review => review.book_id !== bookId);
        const filteredBibliotecaResenhas = allBibliotecaResenhas.filter(review => review.book_id !== bookId);
        
        // Add new reviews with book_id
        const reviewsWithBookId = reviews.map(review => ({
            ...review,
            book_id: bookId
        }));
        
        const updatedReviews = [...filteredReviews, ...reviewsWithBookId];
        const updatedBibliotecaResenhas = [...filteredBibliotecaResenhas, ...reviewsWithBookId];
        
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        localStorage.setItem('biblioteca_resenhas', JSON.stringify(updatedBibliotecaResenhas));
    }

    loadLikes(bookId) {
        // Use only unified storage to prevent double counting
        const likes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
        return likes.filter(like => like.book_id === bookId || like.book_id == bookId);
    }

    saveLikes(bookId, likes) {
        // Deprecated function - use direct manipulation in toggleLike to prevent duplication
        console.warn('saveLikes is deprecated to prevent like duplication');
    }

    showNotFound() {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('notFoundState').style.display = 'flex';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgb(var(--success))' : type === 'error' ? 'rgb(var(--error))' : 'rgb(var(--primary-blue))'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the book details page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.bookDetails = new BookDetailsPage();
    
    // Setup edit form event listener
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditSubmit);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('editModal');
        if (event.target === modal) {
            closeEditModal();
        }
    });
});

// Edit Modal Functions
function openEditModal() {
    if (!window.bookDetails || !window.bookDetails.currentBook) {
        window.bookDetails.showNotification('Erro: Livro não encontrado', 'error');
        return;
    }

    const book = window.bookDetails.currentBook;
    
    // Populate form with current book data
    document.getElementById('editTitle').value = book.title || '';
    document.getElementById('editAuthor').value = book.author || '';
    document.getElementById('editPublisher').value = book.publisher || '';
    document.getElementById('editYear').value = book.publicationYear || '';
    document.getElementById('editPages').value = book.pages || '';
    document.getElementById('editGenre').value = book.genre || '';
    document.getElementById('editSynopsis').value = book.synopsis || '';
    document.getElementById('editISBN').value = book.isbn || '';
    document.getElementById('editLanguage').value = book.language || '';
    document.getElementById('editCover').value = book.cover || '';
    document.getElementById('editDownloadLink').value = book.downloadLink || '';
    document.getElementById('editPurchaseLink').value = book.purchaseLink || '';

    // Show modal
    document.getElementById('editModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

async function handleEditSubmit(event) {
    event.preventDefault();
    
    if (!window.bookDetails || !window.bookDetails.currentBook) {
        window.bookDetails.showNotification('Erro: Livro não encontrado', 'error');
        return;
    }

    const bookId = window.bookDetails.currentBook.id;

    // Get form data
    const formData = {
        title: document.getElementById('editTitle').value.trim(),
        author: document.getElementById('editAuthor').value.trim(),
        publisher: document.getElementById('editPublisher').value.trim(),
        publicationYear: document.getElementById('editYear').value.trim(),
        pages: document.getElementById('editPages').value.trim(),
        genre: document.getElementById('editGenre').value,
        synopsis: document.getElementById('editSynopsis').value.trim(),
        isbn: document.getElementById('editISBN').value.trim(),
        language: document.getElementById('editLanguage').value,
        cover: document.getElementById('editCover').value.trim(),
        downloadLink: document.getElementById('editDownloadLink').value.trim(),
        purchaseLink: document.getElementById('editPurchaseLink').value.trim()
    };

    // Validate required fields
    if (!formData.title || !formData.author) {
        window.bookDetails.showNotification('Por favor, preencha os campos obrigatórios', 'error');
        return;
    }

    try {
        // Update book in storage
        const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex === -1) {
            window.bookDetails.showNotification('Livro não encontrado para edição', 'error');
            return;
        }

        // Update book data while preserving ID and other metadata
        books[bookIndex] = {
            ...books[bookIndex],
            ...formData,
            updatedAt: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('biblioteca_livros', JSON.stringify(books));

        // Close modal and reload book data
        closeEditModal();
        window.bookDetails.showNotification('Livro atualizado com sucesso!', 'success');
        
        // Reload the page to show updated data
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    } catch (error) {
        console.error('Erro ao salvar livro:', error);
        window.bookDetails.showNotification('Erro ao salvar as alterações', 'error');
    }
}

// Review Management Functions
function editReview(reviewId) {
    // Get the review data
    const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
    const review = allReviews.find(r => r.id === reviewId);
    
    if (!review) {
        window.bookDetails.showNotification('Resenha não encontrada', 'error');
        return;
    }
    
    // Check if user can edit this review
    const currentUser = window.bookDetails.getCurrentUser();
    if (review.user_id !== currentUser.id && review.userId !== currentUser.id) {
        window.bookDetails.showNotification('Você só pode editar suas próprias resenhas', 'error');
        return;
    }
    
    // Create and show edit modal
    showEditReviewModal(review);
}

function deleteReview(reviewId) {
    // Get the review data
    const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
    const review = allReviews.find(r => r.id === reviewId);
    
    if (!review) {
        window.bookDetails.showNotification('Resenha não encontrada', 'error');
        return;
    }
    
    // Check if user can delete this review
    const currentUser = window.bookDetails.getCurrentUser();
    if (review.user_id !== currentUser.id && review.userId !== currentUser.id) {
        window.bookDetails.showNotification('Você só pode excluir suas próprias resenhas', 'error');
        return;
    }
    
    if (confirm('Tem certeza que deseja excluir esta resenha? Esta ação não pode ser desfeita.')) {
        // Remove from unified storage
        const filteredReviews = allReviews.filter(r => r.id !== reviewId);
        localStorage.setItem('comentariosLivros', JSON.stringify(filteredReviews));
        
        // Also remove from legacy storage systems for consistency
        const legacySources = ['resenhas_livros', 'biblioteca_resenhas', 'reviews'];
        legacySources.forEach(source => {
            const data = JSON.parse(localStorage.getItem(source) || '[]');
            const filtered = data.filter(r => r.id !== reviewId);
            localStorage.setItem(source, JSON.stringify(filtered));
        });
        
        window.bookDetails.showNotification('Resenha excluída com sucesso', 'success');
        
        // Reload comments section
        setTimeout(() => {
            window.bookDetails.loadComments(window.bookDetails.currentBook.id);
        }, 500);
    }
}

function showEditReviewModal(review) {
    // Create modal HTML
    const modalHtml = `
        <div id="editReviewModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-edit"></i> Editar Resenha</h2>
                    <span class="close" onclick="closeEditReviewModal()">&times;</span>
                </div>
                <form id="editReviewForm">
                    <div class="form-group">
                        <label for="editReviewTitle">Título da Resenha</label>
                        <input type="text" id="editReviewTitle" value="${review.titulo || ''}" placeholder="Título da sua resenha (opcional)">
                    </div>
                    
                    <div class="form-group">
                        <label for="editReviewRating">Avaliação *</label>
                        <div class="rating-input">
                            <div class="stars-input" id="editStarsInput">
                                ${[1,2,3,4,5].map(i => `
                                    <i class="star ${i <= (review.rating || 0) ? 'fas fa-star active' : 'far fa-star'}" 
                                       data-rating="${i}" 
                                       onclick="setEditRating(${i})"></i>
                                `).join('')}
                            </div>
                            <span id="editRatingText">${review.rating || 0}/5 estrelas</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="editReviewText">Sua Resenha *</label>
                        <textarea id="editReviewText" rows="6" required placeholder="Escreva sua resenha sobre este livro...">${review.comentario || review.review || review.text || ''}</textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeEditReviewModal()">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('editReviewModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    document.getElementById('editReviewModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add form submit handler
    document.getElementById('editReviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveEditedReview(review.id);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('editReviewModal');
        if (event.target === modal) {
            closeEditReviewModal();
        }
    });
}

function closeEditReviewModal() {
    const modal = document.getElementById('editReviewModal');
    if (modal) {
        modal.remove();
    }
    document.body.style.overflow = 'auto';
}

function setEditRating(rating) {
    // Update visual stars
    const stars = document.querySelectorAll('#editStarsInput .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.className = 'star fas fa-star active';
        } else {
            star.className = 'star far fa-star';
        }
    });
    
    // Update rating text
    document.getElementById('editRatingText').textContent = `${rating}/5 estrelas`;
    
    // Store rating
    window.currentEditRating = rating;
}

function saveEditedReview(reviewId) {
    const title = document.getElementById('editReviewTitle').value.trim();
    const text = document.getElementById('editReviewText').value.trim();
    const rating = window.currentEditRating || 0;
    
    if (!text) {
        window.bookDetails.showNotification('Por favor, escreva sua resenha', 'error');
        return;
    }
    
    if (rating === 0) {
        window.bookDetails.showNotification('Por favor, selecione uma avaliação', 'error');
        return;
    }
    
    // Update review in unified storage
    const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
    const reviewIndex = allReviews.findIndex(r => r.id === reviewId);
    
    if (reviewIndex !== -1) {
        allReviews[reviewIndex] = {
            ...allReviews[reviewIndex],
            titulo: title,
            comentario: text,
            rating: rating,
            dataHora: new Date().toISOString()
        };
        
        localStorage.setItem('comentariosLivros', JSON.stringify(allReviews));
        
        // Also update legacy storage systems
        const legacySources = ['resenhas_livros', 'biblioteca_resenhas', 'reviews'];
        legacySources.forEach(source => {
            const data = JSON.parse(localStorage.getItem(source) || '[]');
            const index = data.findIndex(r => r.id === reviewId);
            if (index !== -1) {
                data[index] = {
                    ...data[index],
                    titulo: title,
                    title: title,
                    texto: text,
                    review: text,
                    text: text,
                    comment: text,
                    rating: rating,
                    data: new Date().toISOString(),
                    date: new Date().toISOString()
                };
                localStorage.setItem(source, JSON.stringify(data));
            }
        });
        
        closeEditReviewModal();
        window.bookDetails.showNotification('Resenha atualizada com sucesso!', 'success');
        
        // Reload comments
        setTimeout(() => {
            window.bookDetails.loadComments(window.bookDetails.currentBook.id);
        }, 500);
    } else {
        window.bookDetails.showNotification('Erro ao atualizar resenha', 'error');
    }
}

// Functions for action buttons
function editCurrentBook() {
    openEditModal();
}

function deleteCurrentBook() {
    if (window.bookDetails && window.bookDetails.currentBook) {
        const book = window.bookDetails.currentBook;
        
        if (confirm(`Tem certeza que deseja excluir o livro "${book.title}"? Esta ação não pode ser desfeita.`)) {
            // Remove book from localStorage
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            const updatedBooks = books.filter(b => b.id !== book.id);
            localStorage.setItem('biblioteca_livros', JSON.stringify(updatedBooks));
            
            // Remove associated reviews and likes
            const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
            const filteredReviews = reviews.filter(r => r.book_id !== book.id);
            localStorage.setItem('reviews', JSON.stringify(filteredReviews));
            
            const bibliotecaResenhas = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
            const filteredBibliotecaResenhas = bibliotecaResenhas.filter(r => r.book_id !== book.id);
            localStorage.setItem('biblioteca_resenhas', JSON.stringify(filteredBibliotecaResenhas));
            
            const likes = JSON.parse(localStorage.getItem('likes') || '[]');
            const filteredLikes = likes.filter(l => l.book_id !== book.id);
            localStorage.setItem('likes', JSON.stringify(filteredLikes));
            
            const bibliotecaCurtidas = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
            const filteredBibliotecaCurtidas = bibliotecaCurtidas.filter(l => l.book_id !== book.id);
            localStorage.setItem('biblioteca_curtidas', JSON.stringify(filteredBibliotecaCurtidas));
            
            alert('Livro excluído com sucesso!');
            window.location.href = 'catalogo.html';
        }
    }
}

// Add CSS for notifications if not already present
if (!document.querySelector('#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
    notificationStyles.textContent = `
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
    document.head.appendChild(notificationStyles);
}