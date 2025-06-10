/**
 * Catálogo de Livros - Gerenciamento e Visualização
 * Handles book display, search, filtering, editing, and deletion
 */

class BookCatalog {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.currentEditingBook = null;
        this.currentUser = this.getCurrentUser();
        this.currentBookId = null;
        this.currentDeletingBookId = null;
        
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

    async init() {
        this.bindEvents();
        await this.loadBooks();
        this.renderBooks();
        this.updateStats();
    }

    bindEvents() {
        // Search input
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterBooks();
        });

        // Filter selects
        document.getElementById('genreFilter').addEventListener('change', () => {
            this.filterBooks();
        });

        document.getElementById('sortOrder').addEventListener('change', () => {
            this.filterBooks();
        });

        // Modal events
        document.querySelector('#editModal .close').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            this.handleEditSubmit(e);
        });

        // File input change event
        document.getElementById('jsonFileInput').addEventListener('change', (e) => {
            this.handleFileImport(e);
        });

        // Merge file input change event
        document.getElementById('mergeFileInput').addEventListener('change', (e) => {
            this.handleMergeFileImport(e);
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === document.getElementById('editModal')) {
                this.closeEditModal();
            }
            if (e.target === document.getElementById('deleteModal')) {
                this.closeDeleteModal();
            }
            if (e.target === document.getElementById('importModal')) {
                this.closeImportModal();
            }
            if (e.target === document.getElementById('mergeModal')) {
                this.closeMergeModal();
            }
        });
    }

    async loadBooks() {
        try {
            // Carrega livros do localStorage
            this.books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            
            // Corrige livros sem ID
            let needsUpdate = false;
            this.books = this.books.map(book => {
                if (!book.id || book.id === null || book.id === undefined) {
                    book.id = this.generateId();
                    needsUpdate = true;
                    console.log('ID gerado para livro:', book.title, 'ID:', book.id);
                }
                return book;
            });
            
            // Salva as correções se necessário
            if (needsUpdate) {
                localStorage.setItem('biblioteca_livros', JSON.stringify(this.books));
                console.log('Livros atualizados com novos IDs salvos no localStorage');
            }
            
            // Carrega e adiciona estatísticas de curtidas e resenhas
            let likes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
            const reviews = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
            
            // Remove curtidas duplicadas do mesmo usuário para o mesmo livro
            const uniqueLikes = [];
            const seenCombinations = new Set();
            
            likes.forEach(like => {
                const combination = `${like.book_id}_${like.user_id}`;
                if (!seenCombinations.has(combination) && like.book_id !== 'undefined' && like.book_id) {
                    seenCombinations.add(combination);
                    uniqueLikes.push(like);
                }
            });
            
            // Salva curtidas limpas se houve mudanças
            if (uniqueLikes.length !== likes.length) {
                localStorage.setItem('biblioteca_curtidas', JSON.stringify(uniqueLikes));
                console.log(`Curtidas limpas: ${likes.length} -> ${uniqueLikes.length}`);
            }
            
            likes = uniqueLikes;
            console.log('Total de curtidas válidas:', likes.length);
            console.log('Total de resenhas:', reviews.length);
            
            this.books.forEach(book => {
                const bookLikes = likes.filter(l => l.book_id === book.id || l.book_id == book.id);
                const bookReviews = reviews.filter(r => r.book_id === book.id || r.book_id == book.id);
                
                console.log(`Livro ${book.title} (ID: ${book.id})`);
                console.log(`- Curtidas encontradas: ${bookLikes.length}`);
                console.log(`- Resenhas encontradas: ${bookReviews.length}`);
                
                book.total_likes = bookLikes.length;
                book.review_count = bookReviews.length;
                book.average_rating = 0;
                
                if (bookReviews.length > 0) {
                    const ratings = bookReviews.filter(r => r.rating).map(r => r.rating);
                    if (ratings.length > 0) {
                        book.average_rating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
                    }
                    console.log(`- Avaliação média: ${book.average_rating}`);
                }
            });
            
            this.filteredBooks = [...this.books];
        } catch (error) {
            console.error('Erro ao carregar livros:', error);
            this.books = [];
            this.filteredBooks = [];
        }
    }

    filterBooks() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const genreFilter = document.getElementById('genreFilter').value;
        const sortOrder = document.getElementById('sortOrder').value;

        this.filteredBooks = this.books.filter(book => {
            const matchesSearch = 
                book.title?.toLowerCase().includes(searchTerm) ||
                book.author?.toLowerCase().includes(searchTerm) ||
                this.genreNames[book.genre]?.toLowerCase().includes(searchTerm);

            const matchesGenre = !genreFilter || book.genre === genreFilter;

            return matchesSearch && matchesGenre;
        });

        // Sort books
        this.filteredBooks.sort((a, b) => {
            switch (sortOrder) {
                case 'newest':
                    return new Date(b.registeredAt) - new Date(a.registeredAt);
                case 'oldest':
                    return new Date(a.registeredAt) - new Date(b.registeredAt);
                case 'title':
                    return (a.title || '').localeCompare(b.title || '');
                case 'author':
                    return (a.author || '').localeCompare(b.author || '');
                default:
                    return 0;
            }
        });

        this.renderBooks();
    }

    renderBooks() {
        const booksGrid = document.getElementById('booksGrid');
        const emptyState = document.getElementById('emptyState');
        const loadingState = document.getElementById('loadingState');

        loadingState.style.display = 'none';

        if (this.filteredBooks.length === 0) {
            booksGrid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        booksGrid.style.display = 'grid';
        
        booksGrid.innerHTML = this.filteredBooks.map(book => this.createBookCard(book)).join('');
    }

    createBookCard(book) {
        const genreEmoji = this.genreEmojis[book.genre] || '📖';
        const genreName = this.genreNames[book.genre] || book.genre;
        const coverImage = book.coverImage || book.cover_image;
        const hasImage = coverImage && coverImage.trim() !== '';
        
        // Carregar estatísticas reais usando sistema unificado
        const reviews = this.obterResenhasDoLivro(book.id);
        const likes = this.loadBookLikes(book.id);
        
        const totalLikes = likes.length;
        const reviewCount = reviews.length;
        
        // Calcular avaliação média das resenhas
        let averageRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
            averageRating = totalRating / reviews.length;
        }
        
        const totalReviews = reviewCount;
        
        // Cria estrelas para avaliação
        const starsHtml = this.createStarsHtml(averageRating);

        return `
            <div class="book-card" data-book-id="${book.id}">
                <div class="book-cover ${!hasImage ? 'no-image' : ''}">
                    ${hasImage ? 
                        `<img src="${coverImage}" alt="${book.title}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none'; this.parentElement.innerHTML += '<i class=\\"fas fa-book\\"></i>';">` : 
                        '<i class="fas fa-book"></i>'
                    }
                    <div class="book-stats-overlay">
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span>${totalLikes}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-comment"></i>
                            <span>${reviewCount}</span>
                        </div>
                    </div>
                    <div class="book-actions">
                        <button class="action-btn edit" onclick="catalog.editBook('${book.id}')" title="Editar livro">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" onclick="catalog.deleteBook('${book.id}')" title="Excluir livro">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <h3 class="book-title">
                        <a href="livro.html?id=${book.id}" class="book-title-link">${book.title || 'Título não informado'}</a>
                    </h3>
                    <div class="book-author">
                        <i class="fas fa-user-edit"></i>
                        ${book.author || 'Autor não informado'}
                    </div>
                    ${book.user_name ? `<div class="book-added-by">👤 Adicionado por ${book.user_name}</div>` : ''}
                    
                    <div class="book-rating">
                        ${starsHtml}
                        <span class="rating-text">${averageRating > 0 ? averageRating.toFixed(1) : 'Sem avaliações'}</span>
                    </div>
                    
                    <div class="book-meta">
                        <span class="book-genre">${genreEmoji} ${genreName}</span>
                        <span class="book-year">${book.publicationYear || book.publication_year || 'Ano não informado'}</span>
                    </div>
                    ${book.synopsis || book.description ? `<p class="book-description">${(book.synopsis || book.description || '').substring(0, 100)}${(book.synopsis || book.description || '').length > 100 ? '...' : ''}</p>` : ''}
                    
                    ${this.createReviewsPreview(book.id, reviews)}
                    
                    <div class="social-actions">
                        <button class="btn-like" 
                                onclick="catalog.toggleLike('${book.id}')" 
                                data-book-id="${book.id}">
                            <i class="fas fa-heart"></i> 
                            <span class="like-count">${totalLikes}</span>
                        </button>
                        <button class="btn-review" onclick="catalog.openReviewModal('${book.id}')">
                            <i class="fas fa-comment"></i> Resenhar
                        </button>
                        <button class="btn-view" onclick="catalog.viewBookDetail('${book.id}')">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createStarsHtml(rating) {
        let starsHtml = '<div class="stars">';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fas fa-star star-filled"></i>';
            } else if (i - 0.5 <= rating) {
                starsHtml += '<i class="fas fa-star-half-alt star-half"></i>';
            } else {
                starsHtml += '<i class="far fa-star star-empty"></i>';
            }
        }
        starsHtml += '</div>';
        return starsHtml;
    }

    updateStats() {
        const totalBooks = this.books.length;
        const uniqueGenres = new Set(this.books.map(book => book.genre)).size;
        const uniqueAuthors = new Set(this.books.map(book => book.author)).size;

        document.getElementById('totalBooks').textContent = totalBooks;
        document.getElementById('totalGenres').textContent = uniqueGenres;
        document.getElementById('totalAuthors').textContent = uniqueAuthors;
    }

    editBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        this.currentEditingBook = book;

        // Populate all form fields
        document.getElementById('editTitle').value = book.title || '';
        document.getElementById('editAuthor').value = book.author || '';
        document.getElementById('editPublicationYear').value = book.publicationYear || book.publication_year || '';
        document.getElementById('editPublisher').value = book.publisher || '';
        document.getElementById('editPages').value = book.pages || '';
        document.getElementById('editGenre').value = book.genre || '';
        document.getElementById('editSynopsis').value = book.synopsis || book.description || '';
        document.getElementById('editReviews').value = book.reviews || '';
        document.getElementById('editPurchaseLink').value = book.purchaseLink || book.purchase_link || '';
        document.getElementById('editDownloadLink').value = book.downloadLink || book.download_link || '';
        document.getElementById('editCoverImage').value = book.coverImage || book.cover_image || '';
        document.getElementById('editAwards').value = book.awards || '';
        document.getElementById('editSeries').value = book.series || '';
        document.getElementById('editIllustrator').value = book.illustrator || '';
        document.getElementById('editOrigin').value = book.origin || '';

        // Show modal
        document.getElementById('editModal').style.display = 'block';
    }

    async handleEditSubmit(event) {
        event.preventDefault();

        if (!this.currentEditingBook) return;

        const formData = new FormData(event.target);
        const updatedData = {};
        
        for (let [key, value] of formData.entries()) {
            updatedData[key] = value;
        }

        try {
            // Carrega livros do localStorage
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            
            // Encontra e atualiza o livro
            const bookIndex = books.findIndex(b => b.id === this.currentEditingBook.id);
            if (bookIndex !== -1) {
                books[bookIndex] = { ...books[bookIndex], ...updatedData };
                
                // Salva no localStorage
                localStorage.setItem('biblioteca_livros', JSON.stringify(books));
                
                // Update local data
                Object.assign(this.currentEditingBook, updatedData);
                this.filterBooks();
                this.closeEditModal();
                
                // Show success message
                this.showNotification('Livro atualizado com sucesso!', 'success');
            } else {
                this.showNotification('Erro: Livro não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            this.showNotification('Erro ao atualizar livro. Tente novamente.', 'error');
        }
    }

    closeEditModal() {
        document.getElementById('editModal').style.display = 'none';
        this.currentEditingBook = null;
    }

    deleteBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        this.currentDeletingBookId = bookId;
        document.getElementById('deleteModal').style.display = 'block';
    }

    async confirmDelete() {
        if (!this.currentDeletingBookId) return;

        try {
            // Carrega livros do localStorage
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            
            // Remove o livro
            const filteredBooks = books.filter(book => book.id !== this.currentDeletingBookId);
            
            // Salva no localStorage
            localStorage.setItem('biblioteca_livros', JSON.stringify(filteredBooks));
            
            // Remove também resenhas e curtidas relacionadas
            const reviews = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
            const filteredReviews = reviews.filter(r => r.book_id !== this.currentDeletingBookId);
            localStorage.setItem('biblioteca_resenhas', JSON.stringify(filteredReviews));
            
            const likes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
            const filteredLikes = likes.filter(l => l.book_id !== this.currentDeletingBookId);
            localStorage.setItem('biblioteca_curtidas', JSON.stringify(filteredLikes));
            
            // Remove from local data
            this.books = this.books.filter(book => book.id !== this.currentDeletingBookId);
            this.filterBooks();
            this.updateStats();
            this.closeDeleteModal();
            
            // Show success message
            this.showNotification('Livro excluído com sucesso!', 'success');
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            this.showNotification('Erro ao excluir livro. Tente novamente.', 'error');
        }
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').style.display = 'none';
        this.currentDeletingBookId = null;
    }

    async exportBooks() {
        try {
            // Carrega livros diretamente do localStorage para exportação
            const books = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
            
            if (books.length === 0) {
                this.showNotification('Nenhum livro encontrado para exportar', 'warning');
                return;
            }
            
            // Cria estrutura completa para exportação
            const exportData = {
                biblioteca: {
                    livros: books,
                    resenhas: JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]'),
                    curtidas: JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]'),
                    exportado_em: new Date().toISOString(),
                    total_livros: books.length
                }
            };
            
            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `biblioteca-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            
            // Limpa o URL do blob para liberar memória
            setTimeout(() => URL.revokeObjectURL(link.href), 100);
            
            this.showNotification(`Biblioteca exportada com ${books.length} livros!`, 'success');
        } catch (error) {
            console.error('Erro ao exportar biblioteca:', error);
            this.showNotification('Erro ao exportar biblioteca. Tente novamente.', 'error');
        }
    }

    showImportModal() {
        document.getElementById('importModal').style.display = 'block';
        document.getElementById('jsonTextInput').value = '';
        document.getElementById('jsonFileInput').value = '';
    }

    closeImportModal() {
        document.getElementById('importModal').style.display = 'none';
    }

    async handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/json') {
            alert('Por favor, selecione um arquivo JSON válido.');
            return;
        }

        try {
            const text = await file.text();
            const data = JSON.parse(text);
            await this.processImportData(data);
        } catch (error) {
            console.error('Erro ao ler arquivo:', error);
            alert('Erro ao ler arquivo JSON. Verifique se o formato está correto.');
        }
    }

    async importFromText() {
        const text = document.getElementById('jsonTextInput').value.trim();
        if (!text) {
            alert('Por favor, cole o JSON na área de texto.');
            return;
        }

        try {
            const data = JSON.parse(text);
            await this.processImportData(data);
        } catch (error) {
            console.error('Erro ao processar JSON:', error);
            alert('Erro no formato JSON. Verifique se o texto está correto.');
        }
    }

    async processImportData(importedData) {
        let booksToImport = [];
        let reviewsToImport = [];
        let likesToImport = [];
        
        console.log('Dados importados:', importedData);
        
        // Verifica se é o novo formato estruturado
        if (importedData.biblioteca) {
            booksToImport = importedData.biblioteca.livros || [];
            reviewsToImport = importedData.biblioteca.resenhas || [];
            likesToImport = importedData.biblioteca.curtidas || [];
            console.log('Formato estruturado encontrado - Livros:', booksToImport.length, 'Resenhas:', reviewsToImport.length, 'Curtidas:', likesToImport.length);
        }
        // Verifica se há resenhas e curtidas no nível raiz
        else if (importedData.livros || importedData.books) {
            booksToImport = importedData.livros || importedData.books || [];
            reviewsToImport = importedData.resenhas || importedData.reviews || [];
            likesToImport = importedData.curtidas || importedData.likes || [];
            console.log('Formato com propriedades no nível raiz - Livros:', booksToImport.length, 'Resenhas:', reviewsToImport.length, 'Curtidas:', likesToImport.length);
        }
        // Formato antigo - apenas array de livros
        else if (Array.isArray(importedData)) {
            booksToImport = importedData;
            console.log('Formato array simples - Livros:', booksToImport.length);
        }
        else {
            console.error('Formato não reconhecido:', Object.keys(importedData));
            alert('Formato de arquivo não reconhecido. O arquivo deve conter livros para importar.');
            return;
        }
        
        if (booksToImport.length === 0) {
            alert('Nenhum livro encontrado no arquivo para importar.');
            return;
        }

        const importMode = document.querySelector('input[name="importMode"]:checked').value;
        
        try {
            if (importMode === 'replace') {
                // Substituir toda a biblioteca
                await this.replaceAllBooks(booksToImport, reviewsToImport, likesToImport);
                this.showNotification(`Biblioteca substituída! ${booksToImport.length} livros importados.`, 'success');
            } else {
                // Mesclar com livros existentes
                const newBooks = await this.mergeBooks(booksToImport, reviewsToImport, likesToImport);
                this.showNotification(`${newBooks} novos livros adicionados à biblioteca!`, 'success');
            }
            
            // Recarregar dados e interface
            await this.loadBooks();
            this.filterBooks();
            this.updateStats();
            this.closeImportModal();
            
        } catch (error) {
            console.error('Erro ao importar livros:', error);
            alert('Erro ao importar livros. Tente novamente.');
        }
    }

    async replaceAllBooks(newBooks, newReviews = [], newLikes = []) {
        try {
            // Validar e processar livros
            const processedBooks = this.validateAndProcessBooks(newBooks);
            
            // Criar mapa de IDs antigos para novos (caso os IDs tenham mudado)
            const idMapping = {};
            for (let i = 0; i < newBooks.length; i++) {
                if (newBooks[i].id && processedBooks[i].id !== newBooks[i].id) {
                    idMapping[newBooks[i].id] = processedBooks[i].id;
                }
            }
            
            // Substituir dados no localStorage
            localStorage.setItem('biblioteca_livros', JSON.stringify(processedBooks));
            console.log('Livros importados:', processedBooks.length);
            
            // Importar resenhas se fornecidas
            if (newReviews.length > 0) {
                const updatedReviews = newReviews.map(review => {
                    if (idMapping[review.book_id]) {
                        review.book_id = idMapping[review.book_id];
                    }
                    return review;
                });
                localStorage.setItem('biblioteca_resenhas', JSON.stringify(updatedReviews));
                console.log('Resenhas importadas:', updatedReviews.length);
            }
            
            // Importar curtidas se fornecidas
            if (newLikes.length > 0) {
                const updatedLikes = newLikes.map(like => {
                    if (idMapping[like.book_id]) {
                        like.book_id = idMapping[like.book_id];
                    }
                    return like;
                });
                localStorage.setItem('biblioteca_curtidas', JSON.stringify(updatedLikes));
                console.log('Curtidas importadas:', updatedLikes.length);
            }
            
            return processedBooks.length;
        } catch (error) {
            console.error('Erro ao substituir biblioteca:', error);
            throw error;
        }
    }

    async mergeBooks(newBooks, newReviews = [], newLikes = []) {
        try {
            const processedBooks = this.validateAndProcessBooks(newBooks);
            let addedCount = 0;
            
            // Carrega livros existentes
            const existingBooks = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');

            for (const book of processedBooks) {
                // Verificar se livro já existe (por título e autor)
                const exists = existingBooks.some(existing => 
                    existing.title === book.title && existing.author === book.author
                );

                if (!exists) {
                    existingBooks.push(book);
                    addedCount++;
                }
            }
            
            // Salva livros atualizados
            localStorage.setItem('biblioteca_livros', JSON.stringify(existingBooks));
            
            // Mescla resenhas se fornecidas
            if (newReviews.length > 0) {
                const existingReviews = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
                const mergedReviews = [...existingReviews, ...newReviews];
                localStorage.setItem('biblioteca_resenhas', JSON.stringify(mergedReviews));
            }
            
            // Mescla curtidas se fornecidas
            if (newLikes.length > 0) {
                const existingLikes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
                const mergedLikes = [...existingLikes, ...newLikes];
                localStorage.setItem('biblioteca_curtidas', JSON.stringify(mergedLikes));
            }
            
            return addedCount;
        } catch (error) {
            console.error('Erro ao mesclar livros:', error);
            throw error;
        }
    }

    validateAndProcessBooks(books) {
        return books.map(book => {
            // Garantir campos obrigatórios
            const processedBook = {
                id: book.id || this.generateId(), // Gerar ID único se não existir
                title: book.title || 'Título não informado',
                author: book.author || 'Autor não informado',
                genre: book.genre || 'ficcao',
                publisher: book.publisher || 'Editora não informada',
                publicationYear: book.publicationYear || new Date().getFullYear(),
                pages: book.pages || 0,
                synopsis: book.synopsis || '',
                reviews: book.reviews || '',
                purchaseLink: book.purchaseLink || '',
                downloadLink: book.downloadLink || '',
                coverImage: book.coverImage || '',
                awards: book.awards || '',
                series: book.series || '',
                illustrator: book.illustrator || '',
                origin: book.origin || ''
            };

            return processedBook;
        }).filter(book => book.title && book.author); // Filtrar livros sem título ou autor
    }

    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    // Merge Modal Functions
    showMergeModal() {
        document.getElementById('mergeModal').style.display = 'block';
        document.getElementById('mergeTextInput').value = '';
        document.getElementById('mergeFileInput').value = '';
        document.getElementById('mergePreview').style.display = 'none';
        this.pendingMergeData = null;
    }

    closeMergeModal() {
        document.getElementById('mergeModal').style.display = 'none';
        this.pendingMergeData = null;
    }

    async handleMergeFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type !== 'application/json') {
            alert('Por favor, selecione um arquivo JSON válido.');
            return;
        }

        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Extrair livros do formato estruturado
            let booksToMerge = [];
            if (data.biblioteca && data.biblioteca.livros) {
                booksToMerge = data.biblioteca.livros;
            } else if (data.livros || data.books) {
                booksToMerge = data.livros || data.books;
            } else if (Array.isArray(data)) {
                booksToMerge = data;
            } else {
                alert('Formato de arquivo não reconhecido. Verifique se contém livros para importar.');
                return;
            }
            
            await this.previewMerge(booksToMerge);
        } catch (error) {
            console.error('Erro ao ler arquivo:', error);
            alert('Erro ao ler arquivo JSON. Verifique se o formato está correto.');
        }
    }

    async mergeFromText() {
        const text = document.getElementById('mergeTextInput').value.trim();
        if (!text) {
            alert('Por favor, cole o JSON na área de texto.');
            return;
        }

        try {
            const data = JSON.parse(text);
            
            // Extrair livros do formato estruturado
            let booksToMerge = [];
            if (data.biblioteca && data.biblioteca.livros) {
                booksToMerge = data.biblioteca.livros;
            } else if (data.livros || data.books) {
                booksToMerge = data.livros || data.books;
            } else if (Array.isArray(data)) {
                booksToMerge = data;
            } else {
                alert('Formato de arquivo não reconhecido. Verifique se contém livros para importar.');
                return;
            }
            
            await this.previewMerge(booksToMerge);
        } catch (error) {
            console.error('Erro ao processar JSON:', error);
            alert('Erro no formato JSON. Verifique se o texto está correto.');
        }
    }

    async previewMerge(friendBooks) {
        if (!Array.isArray(friendBooks)) {
            alert('O JSON deve conter uma lista de livros.');
            return;
        }

        const processedBooks = this.validateAndProcessBooks(friendBooks);
        
        // Contar novos livros vs duplicatas
        let newBooks = 0;
        let duplicates = 0;
        
        const newBooksToAdd = [];
        
        for (const book of processedBooks) {
            const exists = this.books.some(existing => 
                existing.title?.toLowerCase() === book.title?.toLowerCase() && 
                existing.author?.toLowerCase() === book.author?.toLowerCase()
            );
            
            if (exists) {
                duplicates++;
            } else {
                newBooks++;
                newBooksToAdd.push(book);
            }
        }

        // Mostrar preview
        document.getElementById('totalFound').textContent = friendBooks.length;
        document.getElementById('newBooks').textContent = newBooks;
        document.getElementById('duplicates').textContent = duplicates;
        document.getElementById('mergePreview').style.display = 'block';
        
        // Salvar dados para confirmação
        this.pendingMergeData = newBooksToAdd;
    }

    async confirmMerge() {
        if (!this.pendingMergeData || this.pendingMergeData.length === 0) {
            alert('Nenhum livro novo para adicionar.');
            return;
        }

        try {
            let addedCount = 0;

            for (const book of this.pendingMergeData) {
                const response = await fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book)
                });

                const result = await response.json();
                if (result.success) {
                    addedCount++;
                }
            }

            // Recarregar dados e interface
            await this.loadBooks();
            this.filterBooks();
            this.updateStats();
            this.closeMergeModal();
            
            this.showNotification(`${addedCount} novos livros adicionados da biblioteca do seu amigo!`, 'success');
            
        } catch (error) {
            console.error('Erro ao mesclar livros:', error);
            alert('Erro ao mesclar livros. Tente novamente.');
        }
    }

    getCurrentUser() {
        // Integra com o sistema de perfis existente
        const activeProfileId = localStorage.getItem('tolendo_active_profile');
        
        if (!activeProfileId) {
            // Se não há usuário logado, redireciona ou cria usuário anônimo
            const guestUser = {
                id: 'guest_' + Date.now(),
                name: 'Usuário Convidado',
                email: 'convidado@exemplo.com',
                username: '@convidado',
                likedBooks: []
            };
            
            // Retorna usuário convidado silenciosamente
            return guestUser;
        }
        
        const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
        const profile = profiles.find(p => p.id === activeProfileId);
        
        if (!profile) {
            localStorage.removeItem('tolendo_active_profile');
            window.location.href = '/';
            return null;
        }
        
        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            username: profile.username,
            likedBooks: JSON.parse(localStorage.getItem('liked_books_' + profile.id) || '[]')
        };
    }

    async toggleLike(bookId) {
        try {
            const likes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
            const existingLike = likes.find(l => l.book_id === bookId && l.user_id === this.currentUser.id);
            
            let liked = false;
            
            if (existingLike) {
                // Remove curtida
                const updatedLikes = likes.filter(l => !(l.book_id === bookId && l.user_id === this.currentUser.id));
                localStorage.setItem('biblioteca_curtidas', JSON.stringify(updatedLikes));
                liked = false;
            } else {
                // Adiciona curtida
                const newLike = {
                    id: Date.now().toString(),
                    book_id: bookId,
                    user_id: this.currentUser.id,
                    user_name: this.currentUser.name,
                    created_at: new Date().toISOString()
                };
                likes.push(newLike);
                localStorage.setItem('biblioteca_curtidas', JSON.stringify(likes));
                liked = true;
            }
            
            // Conta total de curtidas apenas do sistema principal
            const updatedLikes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
            const totalLikes = updatedLikes.filter(l => l.book_id === bookId).length;
            
            // Atualiza interface
            const likeBtn = document.querySelector(`[data-book-id="${bookId}"] .like-count`);
            if (likeBtn) {
                likeBtn.textContent = totalLikes;
            }
            
            // REMOVE duplicated storage that causes double counting
            // Don't update liked_books_ keys or user profiles to avoid duplication
            
            this.showNotification(liked ? 'Livro curtido!' : 'Curtida removida!', 'success');
            this.renderBooks(); // Refresh to show updated counts
        } catch (error) {
            console.error('Erro ao curtir:', error);
            this.showNotification('Erro ao curtir livro', 'error');
        }
    }

    openReviewModal(bookId) {
        this.currentBookId = bookId;
        const book = this.books.find(b => b.id === bookId);
        
        if (!book) return;
        
        document.getElementById('reviewBookTitle').textContent = book.title;
        document.getElementById('reviewModal').style.display = 'flex';
        
        // Limpa formulário
        document.getElementById('reviewRating').value = '';
        document.getElementById('reviewTitle').value = '';
        document.getElementById('reviewContent').value = '';
        
        // Carrega resenha existente do usuário se houver
        this.loadUserReview(bookId);
    }

    async loadUserReview(bookId) {
        try {
            // Sempre inicia com formulário limpo para nova resenha
            document.getElementById('reviewRating').value = '';
            document.getElementById('reviewTitle').value = '';
            document.getElementById('reviewContent').value = '';
            
            // Opcionalmente, mostra quantas resenhas o usuário já escreveu
            const reviews = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
            const userReviews = reviews.filter(r => r.book_id === bookId && r.user_id === this.currentUser.id);
            
            if (userReviews.length > 0) {
                const reviewModal = document.getElementById('reviewModal');
                const modalTitle = reviewModal.querySelector('h3');
                if (modalTitle) {
                    modalTitle.textContent = `Nova Resenha (você já tem ${userReviews.length} resenha${userReviews.length > 1 ? 's' : ''})`;
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados da resenha:', error);
        }
    }

    async submitReview() {
        const rating = document.getElementById('reviewRating').value;
        const title = document.getElementById('reviewTitle').value;
        const content = document.getElementById('reviewContent').value;
        
        if (!content.trim()) {
            this.showNotification('Por favor, escreva uma resenha', 'error');
            return;
        }
        
        try {
            // Use the unified comment system
            if (window.sistemaComentarios) {
                window.sistemaComentarios.adicionarComentario(
                    this.currentBookId,
                    content.trim(),
                    rating ? parseInt(rating) : 0,
                    title.trim()
                );
            } else {
                // Fallback to old system
                const reviews = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]');
                const newReview = {
                    id: Date.now().toString(),
                    book_id: this.currentBookId,
                    user_id: this.currentUser.id,
                    user_name: this.currentUser.name,
                    rating: rating ? parseInt(rating) : null,
                    title: title.trim(),
                    content: content.trim(),
                    created_at: new Date().toISOString()
                };
                
                reviews.push(newReview);
                localStorage.setItem('biblioteca_resenhas', JSON.stringify(reviews));
                this.updateUserProfile(newReview);
            }
            
            // Clear form fields
            document.getElementById('reviewRating').value = '';
            document.getElementById('reviewTitle').value = '';
            document.getElementById('reviewContent').value = '';
            
            this.showNotification('Resenha salva com sucesso!', 'success');
            this.closeReviewModal();
            this.renderBooks(); // Refresh to show updated counts
        } catch (error) {
            console.error('Erro ao enviar resenha:', error);
            this.showNotification('Erro ao salvar resenha', 'error');
        }
    }

    updateUserProfile(review) {
        // Atualiza o perfil do usuário logado com a nova resenha
        const activeProfileId = localStorage.getItem('tolendo_active_profile');
        if (!activeProfileId || activeProfileId.startsWith('guest_')) return;
        
        const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
        const profileIndex = profiles.findIndex(p => p.id === activeProfileId);
        
        if (profileIndex !== -1) {
            const profile = profiles[profileIndex];
            
            // Inicializa array de resenhas se não existir
            if (!profile.reviews) {
                profile.reviews = [];
            }
            
            // Remove resenha existente do mesmo livro se houver
            profile.reviews = profile.reviews.filter(r => r.book_id !== review.book_id);
            
            // Adiciona a nova resenha
            profile.reviews.push({
                ...review,
                book_title: this.books.find(b => b.id === review.book_id)?.title || 'Título não encontrado'
            });
            
            // Atualiza estatísticas
            profile.totalReviews = profile.reviews.length;
            profile.lastAccess = new Date().toISOString();
            
            profiles[profileIndex] = profile;
            localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
        }
    }

    updateUserLikes(bookId, liked) {
        // Atualiza curtidas no perfil do usuário
        const activeProfileId = localStorage.getItem('tolendo_active_profile');
        if (!activeProfileId || activeProfileId.startsWith('guest_')) return;
        
        const profiles = JSON.parse(localStorage.getItem('tolendo_profiles') || '[]');
        const profileIndex = profiles.findIndex(p => p.id === activeProfileId);
        
        if (profileIndex !== -1) {
            const profile = profiles[profileIndex];
            
            // Inicializa array de curtidas se não existir
            if (!profile.likedBooks) {
                profile.likedBooks = [];
            }
            
            if (liked) {
                // Adiciona curtida se não existir
                if (!profile.likedBooks.includes(bookId)) {
                    profile.likedBooks.push(bookId);
                }
            } else {
                // Remove curtida
                profile.likedBooks = profile.likedBooks.filter(id => id !== bookId);
            }
            
            // Atualiza estatísticas
            profile.totalLikes = profile.likedBooks.length;
            profile.lastAccess = new Date().toISOString();
            
            profiles[profileIndex] = profile;
            localStorage.setItem('tolendo_profiles', JSON.stringify(profiles));
        }
    }

    // Função utilitária global para obter resenhas de um livro usando sistema unificado
    obterResenhasDoLivro(livroId) {
        if (window.sistemaComentarios) {
            return window.sistemaComentarios.obterComentariosLivro(livroId);
        }
        
        // Fallback para compatibilidade
        const sources = ['resenhas_livros', 'biblioteca_resenhas', 'reviews'];
        let todasResenhas = [];
        
        sources.forEach(source => {
            const data = JSON.parse(localStorage.getItem(source) || '[]');
            if (Array.isArray(data)) {
                todasResenhas = todasResenhas.concat(data);
            }
        });
        
        return todasResenhas.filter(resenha => {
            const possibleIds = [
                resenha.livroId,
                resenha.book_id, 
                resenha.bookId,
                resenha.id_livro,
                resenha.livrId
            ];
            
            return possibleIds.some(id => 
                id === livroId || 
                String(id) === String(livroId) ||
                id == livroId
            );
        });
    }

    loadBookReviews(bookId) {
        // Use global unified system first
        const globalReviews = this.obterResenhasDoLivro(bookId);
        
        // Load from other sources for compatibility
        const biblioteca = JSON.parse(localStorage.getItem('biblioteca_livros') || '[]');
        const livro = biblioteca.find(l => l.id === bookId);
        const centralComments = Array.isArray(livro?.comments) ? livro.comments.filter(c => c.book_id === bookId || c.livroId === bookId) : 
                               Array.isArray(livro?.reviews) ? livro.reviews.filter(r => r.book_id === bookId || r.livroId === bookId) : [];
        
        let reviews = JSON.parse(localStorage.getItem('reviews') || '[]').filter(r => r.book_id === bookId || r.livroId === bookId);
        const bibliotecaResenhas = JSON.parse(localStorage.getItem('biblioteca_resenhas') || '[]').filter(r => r.book_id === bookId || r.livroId === bookId);
        
        // Combine all sources
        const allReviews = [...globalReviews, ...centralComments, ...reviews, ...bibliotecaResenhas];
        
        // Filter valid entries
        const validReviews = allReviews.filter(review => 
            review && 
            typeof review === 'object' && 
            review.id && 
            (review.book_id === bookId || review.livroId === bookId) &&
            typeof review.id === 'string' &&
            (review.review || review.text || review.comment || review.content || review.texto)
        );
        
        // Remove duplicates
        const uniqueReviews = validReviews.filter((review, index, self) => 
            index === self.findIndex(r => r.id === review.id)
        );
        
        console.log('Reviews unificadas para livro:', bookId, uniqueReviews);
        return uniqueReviews;
    }

    loadBookLikes(bookId) {
        // Use only the main likes storage to prevent double counting
        const likes = JSON.parse(localStorage.getItem('biblioteca_curtidas') || '[]');
        return likes.filter(like => like.book_id === bookId || like.book_id == bookId);
    }

    createReviewsPreview(bookId, reviews) {
        if (!reviews || reviews.length === 0) {
            return '';
        }

        // Mostrar apenas a resenha mais recente como preview
        const latestReview = reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        
        // Verificar se os dados existem e buscar o texto da resenha
        if (!latestReview) {
            return '';
        }
        
        // Buscar o texto da resenha em diferentes campos possíveis
        const reviewText = latestReview.texto || latestReview.review || latestReview.text || latestReview.comment || latestReview.content || '';
        
        if (!reviewText || reviewText.trim() === '') {
            return '';
        }
        
        const reviewPreview = reviewText.length > 80 ? reviewText.substring(0, 80) + '...' : reviewText;
        const userName = latestReview.usuario || latestReview.user_name || latestReview.userName || 'Usuário Anônimo';
        const rating = latestReview.rating || 0;
        
        const starsHtml = this.createStarsHtml(rating);
        
        return `
            <div class="review-preview">
                <div class="review-header">
                    <i class="fas fa-comment"></i>
                    <span class="review-author">${userName}</span>
                    <div class="review-rating">${starsHtml}</div>
                </div>
                <p class="review-text">"${reviewPreview}"</p>
                ${reviews.length > 1 ? `<span class="more-reviews">+${reviews.length - 1} mais</span>` : ''}
            </div>
        `;
    }

    closeReviewModal() {
        document.getElementById('reviewModal').style.display = 'none';
        this.currentBookId = null;
    }

    async viewBookDetail(bookId) {
        try {
            // Carrega livro do localStorage
            let book = this.books.find(b => b.id === bookId);
            
            // Se não encontrou, tenta busca por ID como string e número
            if (!book) {
                book = this.books.find(b => b.id == bookId || String(b.id) === String(bookId));
            }
            
            // Se ainda não encontrou, tenta recarregar os livros
            if (!book) {
                await this.loadBooks();
                book = this.books.find(b => b.id === bookId || b.id == bookId || String(b.id) === String(bookId));
            }
            
            // Carrega resenhas e curtidas usando sistema unificado
            const bookReviews = this.obterResenhasDoLivro(bookId);
            const bookLikes = this.loadBookLikes(bookId);
            
            if (book) {
                this.showBookDetailModal(book, bookReviews, bookLikes);
            } else {
                this.showNotification('Livro não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao carregar detalhes:', error);
            this.showNotification('Erro ao carregar detalhes do livro', 'error');
        }
    }

    showBookDetailModal(book, reviews, likes = []) {
        const modal = document.getElementById('bookDetailModal');
        const content = document.getElementById('bookDetailContent');
        
        const averageRating = book.average_rating || 0;
        const starsHtml = this.createStarsHtml(averageRating);
        
        content.innerHTML = `
            <div class="book-detail-header">
                <div class="book-detail-cover">
                    <img src="${book.coverImage || book.cover_image || 'https://via.placeholder.com/200x300?text=Sem+Capa'}" 
                         alt="${book.title}" 
                         onerror="this.src='https://via.placeholder.com/200x300?text=Sem+Capa'">
                </div>
                <div class="book-detail-info">
                    <h2>${book.title}</h2>
                    <p><strong>Autor:</strong> ${book.author}</p>
                    <p><strong>Gênero:</strong> ${book.genre}</p>
                    ${book.pages ? `<p><strong>Páginas:</strong> ${book.pages}</p>` : ''}
                    ${book.publicationYear || book.publication_year ? `<p><strong>Ano:</strong> ${book.publicationYear || book.publication_year}</p>` : ''}
                    ${book.user_name ? `<p><strong>Adicionado por:</strong> ${book.user_name}</p>` : ''}
                    
                    <div class="book-rating-detail">
                        ${starsHtml}
                        <span>${averageRating > 0 ? averageRating.toFixed(1) : 'Sem avaliações'} (${reviews.length} resenhas)</span>
                    </div>
                    
                    ${book.description || book.synopsis ? `<div class="book-synopsis"><strong>Sinopse:</strong><p>${book.description || book.synopsis}</p></div>` : ''}
                </div>
            </div>
            
            <div class="book-tabs">
                <div class="tabs-header">
                    <button class="tab-btn active" onclick="catalog.switchTab('reviews')">
                        <i class="fas fa-comment"></i> Resenhas (${reviews.length})
                    </button>
                    <button class="tab-btn" onclick="catalog.switchTab('likes')">
                        <i class="fas fa-heart"></i> Curtidas (${likes.length})
                    </button>
                </div>
                
                <div class="tab-content">
                    <div id="reviews-tab" class="tab-pane active">
                        <div id="detalhesResenhas" class="reviews-list">
                            <!-- Reviews will be loaded dynamically by renderizarResenhasDoLivro -->
                        </div>
                    </div>
                    
                    <div id="likes-tab" class="tab-pane">
                        <div class="likes-list">
                            ${likes.length === 0 ? '<p class="no-likes">Nenhuma curtida ainda. Seja o primeiro a curtir!</p>' : 
                              likes.map(like => this.createLikeHtml(like)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Load reviews dynamically using unified system
        this.renderizarResenhasDoLivro(book.id);
    }

    // Function to render reviews in detail modal using unified system
    renderizarResenhasDoLivro(livroId) {
        const container = document.getElementById("detalhesResenhas");
        if (!container) return;
        
        // Use unified system if available
        if (window.sistemaComentarios) {
            window.sistemaComentarios.renderizarComentarios(livroId, "detalhesResenhas");
            return;
        }
        
        // Fallback to old method
        const resenhas = this.obterResenhasDoLivro(livroId);
        container.innerHTML = "";

        if (resenhas.length === 0) {
            container.innerHTML = "<p class='no-reviews'>Nenhuma resenha disponível para este livro. Seja o primeiro a escrever!</p>";
            return;
        }

        resenhas.forEach(resenha => {
            let dataHora = 'Data não disponível';
            try {
                const dateValue = resenha.data || resenha.date || resenha.created_at || resenha.dataHora;
                if (dateValue) {
                    const data = new Date(dateValue);
                    if (!isNaN(data.getTime())) {
                        dataHora = `${data.toLocaleDateString("pt-BR")} às ${data.toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}`;
                    }
                }
            } catch (e) {
                console.warn('Erro ao formatar data da resenha:', e);
            }

            const div = document.createElement("div");
            div.classList.add("resenha-card");
            
            const userName = resenha.usuario || resenha.user_name || resenha.userName || "Usuário Anônimo";
            const reviewText = resenha.comentario || resenha.texto || resenha.review || resenha.text || resenha.comment || resenha.content || "Sem comentário";
            const reviewTitle = resenha.titulo || resenha.title || '';
            const rating = resenha.rating || 0;
            const starsHtml = rating > 0 ? this.createStarsHtml(rating) : '';
            
            div.innerHTML = `
                <div class="review-header">
                    <div class="review-author">
                        <strong>${userName}</strong>
                        <span class="review-date">${dataHora}</span>
                    </div>
                    ${starsHtml}
                </div>
                ${reviewTitle ? `<h4 class="review-title">${reviewTitle}</h4>` : ''}
                <p class="review-content">${reviewText}</p>
            `;
            container.appendChild(div);
        });
    }

    createReviewHtml(review) {
        const reviewStars = review.rating ? this.createStarsHtml(review.rating) : '';
        
        // Handle multiple date formats
        let dateString = 'Data não disponível';
        try {
            const dateValue = review.created_at || review.date || review.data || review.dataHora;
            if (dateValue) {
                const date = new Date(dateValue);
                if (!isNaN(date.getTime())) {
                    const reviewDate = date.toLocaleDateString('pt-BR');
                    const reviewTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    dateString = `${reviewDate} às ${reviewTime}`;
                }
            }
        } catch (e) {
            console.warn('Erro ao formatar data:', e);
        }
        
        const userName = review.usuario || review.user_name || review.userName || 'Usuário Anônimo';
        const reviewText = review.texto || review.content || review.review || review.text || review.comment || review.comentario || 'Sem comentário';
        const reviewTitle = review.title || review.titulo || '';
        
        // Check if current user can edit/delete this review
        const currentUser = this.getCurrentUser();
        const canEditDelete = review.user_id === currentUser.id || review.userId === currentUser.id;
        
        return `
            <div class="review-item" data-review-id="${review.id}">
                <div class="review-header">
                    <div class="review-author">
                        <strong>${userName}</strong>
                        <span class="review-date">${dateString}</span>
                    </div>
                    <div class="review-meta">
                        ${reviewStars}
                        ${canEditDelete ? `
                            <div class="comment-actions">
                                <button class="action-btn edit-review-btn" onclick="catalog.editReview('${review.id}')" title="Editar resenha">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="action-btn delete-review-btn" onclick="catalog.deleteReview('${review.id}')" title="Excluir resenha">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
                ${reviewTitle ? `<h4 class="review-title">${reviewTitle}</h4>` : ''}
                <p class="review-content">${reviewText}</p>
            </div>
        `;
    }

    createLikeHtml(like) {
        const likeDate = new Date(like.created_at).toLocaleDateString('pt-BR');
        const likeTime = new Date(like.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        return `
            <div class="like-item">
                <div class="like-user">
                    <i class="fas fa-heart"></i>
                    <strong>${like.user_name}</strong>
                </div>
                <span class="like-date">${likeDate} às ${likeTime}</span>
            </div>
        `;
    }

    switchTab(tabName) {
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        document.querySelector(`[onclick="catalog.switchTab('${tabName}')"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    closeBookDetailModal() {
        document.getElementById('bookDetailModal').style.display = 'none';
    }

    editReview(reviewId) {
        // Get the review data from unified storage
        const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
        const review = allReviews.find(r => r.id === reviewId);
        
        if (!review) {
            this.showNotification('Resenha não encontrada', 'error');
            return;
        }
        
        // Check if user can edit this review
        const currentUser = this.getCurrentUser();
        if (review.user_id !== currentUser.id && review.userId !== currentUser.id) {
            this.showNotification('Você só pode editar suas próprias resenhas', 'error');
            return;
        }
        
        this.showEditReviewModal(review);
    }

    deleteReview(reviewId) {
        // Get the review data
        const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
        const review = allReviews.find(r => r.id === reviewId);
        
        if (!review) {
            this.showNotification('Resenha não encontrada', 'error');
            return;
        }
        
        // Check if user can delete this review
        const currentUser = this.getCurrentUser();
        if (review.user_id !== currentUser.id && review.userId !== currentUser.id) {
            this.showNotification('Você só pode excluir suas próprias resenhas', 'error');
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
            
            this.showNotification('Resenha excluída com sucesso', 'success');
            
            // Refresh the current view
            this.renderBooks();
            
            // If book detail modal is open, refresh it
            const modal = document.getElementById('bookDetailModal');
            if (modal && modal.style.display === 'block') {
                const bookId = review.idLivro || review.book_id || review.livroId;
                if (bookId) {
                    setTimeout(() => {
                        this.renderizarResenhasDoLivro(bookId);
                    }, 500);
                }
            }
        }
    }

    showEditReviewModal(review) {
        // Create modal HTML
        const modalHtml = `
            <div id="editReviewModalCatalog" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2><i class="fas fa-edit"></i> Editar Resenha</h2>
                        <span class="close" onclick="catalog.closeEditReviewModal()">&times;</span>
                    </div>
                    <form id="editReviewFormCatalog">
                        <div class="form-group">
                            <label for="editReviewTitleCatalog">Título da Resenha</label>
                            <input type="text" id="editReviewTitleCatalog" value="${review.titulo || review.title || ''}" placeholder="Título da sua resenha (opcional)">
                        </div>
                        
                        <div class="form-group">
                            <label for="editReviewRatingCatalog">Avaliação *</label>
                            <div class="rating-input">
                                <div class="stars-input" id="editStarsInputCatalog">
                                    ${[1,2,3,4,5].map(i => `
                                        <i class="star ${i <= (review.rating || 0) ? 'fas fa-star active' : 'far fa-star'}" 
                                           data-rating="${i}" 
                                           onclick="catalog.setEditRating(${i})"></i>
                                    `).join('')}
                                </div>
                                <span id="editRatingTextCatalog">${review.rating || 0}/5 estrelas</span>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="editReviewTextCatalog">Sua Resenha *</label>
                            <textarea id="editReviewTextCatalog" rows="6" required placeholder="Escreva sua resenha sobre este livro...">${review.comentario || review.review || review.text || review.content || review.texto || ''}</textarea>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary" onclick="catalog.closeEditReviewModal()">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('editReviewModalCatalog');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        document.getElementById('editReviewModalCatalog').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add form submit handler
        document.getElementById('editReviewFormCatalog').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedReview(review.id);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modal = document.getElementById('editReviewModalCatalog');
            if (event.target === modal) {
                catalog.closeEditReviewModal();
            }
        });
    }

    closeEditReviewModal() {
        const modal = document.getElementById('editReviewModalCatalog');
        if (modal) {
            modal.remove();
        }
        document.body.style.overflow = 'auto';
    }

    setEditRating(rating) {
        // Update visual stars
        const stars = document.querySelectorAll('#editStarsInputCatalog .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.className = 'star fas fa-star active';
            } else {
                star.className = 'star far fa-star';
            }
        });
        
        // Update rating text
        document.getElementById('editRatingTextCatalog').textContent = `${rating}/5 estrelas`;
        
        // Store rating
        this.currentEditRating = rating;
    }

    saveEditedReview(reviewId) {
        const title = document.getElementById('editReviewTitleCatalog').value.trim();
        const text = document.getElementById('editReviewTextCatalog').value.trim();
        const rating = this.currentEditRating || 0;
        
        if (!text) {
            this.showNotification('Por favor, escreva sua resenha', 'error');
            return;
        }
        
        if (rating === 0) {
            this.showNotification('Por favor, selecione uma avaliação', 'error');
            return;
        }
        
        // Update review in unified storage
        const allReviews = JSON.parse(localStorage.getItem('comentariosLivros') || '[]');
        const reviewIndex = allReviews.findIndex(r => r.id === reviewId);
        
        if (reviewIndex !== -1) {
            allReviews[reviewIndex] = {
                ...allReviews[reviewIndex],
                titulo: title,
                title: title,
                comentario: text,
                review: text,
                text: text,
                content: text,
                rating: rating,
                dataHora: new Date().toISOString(),
                date: new Date().toISOString()
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
                        content: text,
                        comentario: text,
                        rating: rating,
                        data: new Date().toISOString(),
                        date: new Date().toISOString(),
                        dataHora: new Date().toISOString()
                    };
                    localStorage.setItem(source, JSON.stringify(data));
                }
            });
            
            this.closeEditReviewModal();
            this.showNotification('Resenha atualizada com sucesso!', 'success');
            
            // Refresh the view
            this.renderBooks();
            
            // If book detail modal is open, refresh it
            const modal = document.getElementById('bookDetailModal');
            if (modal && modal.style.display === 'block') {
                const bookId = allReviews[reviewIndex].idLivro || allReviews[reviewIndex].book_id || allReviews[reviewIndex].livroId;
                if (bookId) {
                    setTimeout(() => {
                        this.renderizarResenhasDoLivro(bookId);
                    }, 500);
                }
            }
        } else {
            this.showNotification('Erro ao atualizar resenha', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgb(34, 197, 94)' : type === 'error' ? 'rgb(239, 68, 68)' : 'rgb(59, 130, 246)'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global functions for modal actions
function closeEditModal() {
    if (window.catalog) {
        window.catalog.closeEditModal();
    }
}

function closeDeleteModal() {
    if (window.catalog) {
        window.catalog.closeDeleteModal();
    }
}

function closeImportModal() {
    if (window.catalog) {
        window.catalog.closeImportModal();
    }
}

function closeMergeModal() {
    if (window.catalog) {
        window.catalog.closeMergeModal();
    }
}

function confirmDelete() {
    if (window.catalog) {
        window.catalog.confirmDelete();
    }
}

// Initialize catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new BookCatalog();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
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