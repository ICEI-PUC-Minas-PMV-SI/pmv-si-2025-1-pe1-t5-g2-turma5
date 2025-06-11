
            // Modal Functions
            function openModal(modalId) {
                document.getElementById(modalId).style.display = "block";
            }

            function closeModal(modalId) {
                document.getElementById(modalId).style.display = "none";
            }

            // Close modal when clicking outside
            window.onclick = function (event) {
                if (event.target.classList.contains("modal")) {
                    event.target.style.display = "none";
                }
            };

            // Form Handlers
            function handleLogin(event) {
                event.preventDefault();
                const email = document.getElementById("loginEmail").value;
                const password = document.getElementById("loginPassword").value;

                // Simulate login
                alert(`Login realizado com sucesso!\nEmail: ${email}`);
                closeModal("loginModal");

                // Update UI for logged in user
                updateAuthButtons(true, email);
            }

            function handleRegister(event) {
                event.preventDefault();
                const name = document.getElementById("registerName").value;
                const email = document.getElementById("registerEmail").value;
                const password =
                    document.getElementById("registerPassword").value;

                // Simulate registration
                alert(`Cadastro realizado com sucesso!\nBem-vindo, ${name}!`);
                closeModal("registerModal");

                // Update UI for logged in user
                updateAuthButtons(true, email);
            }

            function handleAddBook(event) {
                event.preventDefault();
                const title = document.getElementById("bookTitle").value;
                const author = document.getElementById("bookAuthor").value;
                const year = document.getElementById("bookYear").value;
                const genre = document.getElementById("bookGenre").value;
                const synopsis = document.getElementById("bookSynopsis").value;

                // Simulate book addition
                alert(
                    `Livro cadastrado com sucesso!\n\nTítulo: ${title}\nAutor: ${author}\nAno: ${year}\nGênero: ${genre}`
                );
                closeModal("addBookModal");

                // Reset form
                document
                    .getElementById("addBookModal")
                    .querySelector("form")
                    .reset();

                // Update stats
                updateStats();
            }

            // Navigation Functions
            function showSection(section) {
                // Fechar todos os modais primeiro
                document.querySelectorAll(".modal").forEach((modal) => {
                    modal.style.display = "none";
                });

                switch (section) {
                    case "home":
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        break;
                    case "catalog":
                        openModal("catalogModal");
                        loadCatalog();
                        break;
                    case "mybooks":
                        openModal("myBooksModal");
                        loadMyBooks();
                        break;
                    case "profile":
                        openModal("profileModal");
                        loadProfile();
                        break;
                    case "community":
                        openModal("communityModal");
                        loadCommunity();
                        break;
                    case "favorites":
                        openModal("favoritesModal");
                        loadFavorites();
                        break;
                    case "reading":
                        openModal("readingModal");
                        loadCurrentReading();
                        break;
                    case "wishlist":
                        openModal("wishlistModal");
                        loadWishlist();
                        break;
                    case "reviews":
                        openModal("reviewsModal");
                        loadReviews();
                        break;
                    case "recommendations":
                        openModal("recommendationsModal");
                        loadRecommendations();
                        break;
                    default:
                        console.log("Seção não encontrada");
                }
            }

            function showBookDetails(bookTitle) {
                alert(`Abrindo detalhes do livro: ${bookTitle}`);
            }

            function performSearch() {
                const searchTerm = document.getElementById("searchInput").value;
                if (searchTerm.trim()) {
                    alert(`Buscando por: "${searchTerm}"`);
                } else {
                    alert("Digite algo para buscar!");
                }
            }

            // Utility Functions
            function updateAuthButtons(isLoggedIn, userEmail = "") {
                const authButtons = document.querySelector(".auth-buttons");
                if (isLoggedIn) {
                    authButtons.innerHTML = `
                    <span style="color: #667eea; margin-right: 1rem;">👤 ${userEmail}</span>
                    <button class="btn btn-secondary" onclick="logout()">Sair</button>
                `;
                }
            }

            function logout() {
                alert("Logout realizado com sucesso!");
                location.reload();
            }

            function updateStats() {
                const totalBooks = document.getElementById("totalBooks");
                const currentCount = parseInt(
                    totalBooks.textContent.replace(",", "")
                );
                totalBooks.textContent = (currentCount + 1).toLocaleString();
            }

            // Search on Enter key
            document
                .getElementById("searchInput")
                .addEventListener("keypress", function (e) {
                    if (e.key === "Enter") {
                        performSearch();
                    }
                });

            // Smooth scrolling for internal links
            document.addEventListener("DOMContentLoaded", function () {
                // Add some animations
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px",
                };

                const observer = new IntersectionObserver(function (entries) {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = "1";
                            entry.target.style.transform = "translateY(0)";
                        }
                    });
                }, observerOptions);

                // Observe elements for animation
                document
                    .querySelectorAll(".action-card, .book-card")
                    .forEach((el) => {
                        el.style.opacity = "0";
                        el.style.transform = "translateY(20px)";
                        el.style.transition = "all 0.6s ease";
                        observer.observe(el);
                    });

                // Counter animation for stats
                animateCounters();
            });

            function animateCounters() {
                const counters =
                    document.querySelectorAll(".stat-item .number");
                counters.forEach((counter) => {
                    const target = parseInt(
                        counter.textContent.replace(/,/g, "")
                    );
                    let current = 0;
                    const increment = target / 100;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            counter.textContent =
                                Math.floor(current).toLocaleString();
                        }
                    }, 20);
                });
            }

            // Random book recommendations
            const bookRecommendations = [
                { title: "O Alquimista", author: "Paulo Coelho", emoji: "⭐" },
                {
                    title: "Cem Anos de Solidão",
                    author: "Gabriel García Márquez",
                    emoji: "🌟",
                },
                {
                    title: "O Nome do Vento",
                    author: "Patrick Rothfuss",
                    emoji: "🌪️",
                },
                { title: "Neuromancer", author: "William Gibson", emoji: "🤖" },
                { title: "Duna", author: "Frank Herbert", emoji: "🏜️" },
                { title: "O Hobbit", author: "J.R.R. Tolkien", emoji: "🧙‍♂️" },
            ];

            function getRandomRecommendation() {
                const randomBook =
                    bookRecommendations[
                        Math.floor(Math.random() * bookRecommendations.length)
                    ];
                alert(
                    `📚 Recomendação: "${randomBook.title}" por ${randomBook.author} ${randomBook.emoji}`
                );
            }

            // Add reading progress tracker
            let readingGoal = 12; // books per year
            let booksReadThisYear = 8;

            function showReadingProgress() {
                const progress = Math.round(
                    (booksReadThisYear / readingGoal) * 100
                );
                alert(
                    `📈 Progresso de Leitura:\n${booksReadThisYear}/${readingGoal} livros (${progress}%)\nMeta anual: ${readingGoal} livros`
                );
            }

            // Enhanced search with filters
            function advancedSearch() {
                const searchTerm = document.getElementById("searchInput").value;
                const filters = {
                    genre: prompt("Filtrar por gênero (opcional):") || "",
                    author: prompt("Filtrar por autor (opcional):") || "",
                    year: prompt("Filtrar por ano (opcional):") || "",
                };

                let searchQuery = `Buscando: "${searchTerm}"`;
                if (filters.genre) searchQuery += `\nGênero: ${filters.genre}`;
                if (filters.author) searchQuery += `\nAutor: ${filters.author}`;
                if (filters.year) searchQuery += `\nAno: ${filters.year}`;

                alert(searchQuery);
            }

            // Book status management
            const bookStatuses = {
                "to-read": "Quero Ler",
                reading: "Lendo",
                read: "Lido",
                abandoned: "Abandonado",
            };

            function changeBookStatus(bookTitle, currentStatus) {
                const statusOptions = Object.entries(bookStatuses)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n");

                const newStatus = prompt(
                    `Alterar status de "${bookTitle}":\n${statusOptions}\n\nDigite a chave do novo status:`
                );

                if (newStatus && bookStatuses[newStatus]) {
                    alert(
                        `Status de "${bookTitle}" alterado para: ${bookStatuses[newStatus]}`
                    );
                }
            }

            // Social features
            function shareBook(bookTitle, author) {
                const message = `Estou lendo "${bookTitle}" de ${author} na TÔ LENDO! 📚`;

                if (navigator.share) {
                    navigator.share({
                        title: "TÔ LENDO - Compartilhar Livro",
                        text: message,
                        url: window.location.href,
                    });
                } else {
                    // Fallback for browsers without Web Share API
                    navigator.clipboard.writeText(message).then(() => {
                        alert("Link copiado para a área de transferência!");
                    });
                }
            }

            // Reading statistics
            function showReadingStats() {
                const stats = {
                    totalBooks: 42,
                    pagesRead: 12450,
                    averageRating: 4.2,
                    favoriteGenre: "Ficção Científica",
                    readingStreak: 15, // days
                    monthlyAverage: 3.5,
                };

                alert(`📊 Suas Estatísticas de Leitura:
            
📚 Total de livros: ${stats.totalBooks}
📄 Páginas lidas: ${stats.pagesRead.toLocaleString()}
⭐ Avaliação média: ${stats.averageRating}/5
❤️ Gênero favorito: ${stats.favoriteGenre}
🔥 Sequência atual: ${stats.readingStreak} dias
📈 Média mensal: ${stats.monthlyAverage} livros`);
            }

            // Book club features
            function joinBookClub(clubName) {
                alert(
                    `Você se inscreveu no clube de leitura: "${clubName}"! 🎉\n\nVocê receberá notificações sobre discussões e eventos.`
                );
            }

            // Export/Import library
            function exportLibrary() {
                const libraryData = {
                    books: [
                        {
                            title: "1984",
                            author: "George Orwell",
                            status: "read",
                            rating: 5,
                        },
                        {
                            title: "Dom Casmurro",
                            author: "Machado de Assis",
                            status: "reading",
                            rating: null,
                        },
                    ],
                    exportDate: new Date().toISOString(),
                };

                const dataStr = JSON.stringify(libraryData, null, 2);
                const dataBlob = new Blob([dataStr], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(dataBlob);

                const link = document.createElement("a");
                link.href = url;
                link.download = "minha_biblioteca.json";
                link.click();

                alert("Biblioteca exportada com sucesso! 📁");
            }

            // Keyboard shortcuts
            document.addEventListener("keydown", function (e) {
                if (e.ctrlKey || e.metaKey) {
                    switch (e.key) {
                        case "k": // Ctrl+K for search
                            e.preventDefault();
                            document.getElementById("searchInput").focus();
                            break;
                        case "n": // Ctrl+N for new book
                            e.preventDefault();
                            openModal("addBookModal");
                            break;
                        case "l": // Ctrl+L for login
                            e.preventDefault();
                            openModal("loginModal");
                            break;
                    }
                }

                // ESC to close modals
                if (e.key === "Escape") {
                    document.querySelectorAll(".modal").forEach((modal) => {
                        modal.style.display = "none";
                    });
                }
            });

            // Theme toggle (bonus feature)
            function toggleTheme() {
                document.body.classList.toggle("dark-theme");
                const isDark = document.body.classList.contains("dark-theme");
                localStorage.setItem("theme", isDark ? "dark" : "light");
            }

            // Load saved theme
            document.addEventListener("DOMContentLoaded", function () {
                const savedTheme = localStorage.getItem("theme");
                if (savedTheme === "dark") {
                    document.body.classList.add("dark-theme");
                }
            });
            // Novas funções para as funcionalidades

            function showBookDetails(bookTitle) {
                const bookData = {
                    1984: {
                        title: "1984",
                        author: "George Orwell",
                        year: "1949",
                        genre: "Ficção Científica",
                        cover: "📖",
                        synopsis:
                            "Um romance distópico que retrata uma sociedade totalitária onde o governo controla todos os aspectos da vida humana. Winston Smith trabalha reescrevendo a história para o Partido, mas secretamente se rebela contra o sistema.",
                    },
                    "Dom Casmurro": {
                        title: "Dom Casmurro",
                        author: "Machado de Assis",
                        year: "1899",
                        genre: "Romance",
                        cover: "📚",
                        synopsis:
                            "Narrado por Bentinho, conta a história de seu amor por Capitu e suas suspeitas sobre uma possível traição. Uma das obras mais importantes da literatura brasileira.",
                    },
                    "O Pequeno Príncipe": {
                        title: "O Pequeno Príncipe",
                        author: "Antoine de Saint-Exupéry",
                        year: "1943",
                        genre: "Fábula",
                        cover: "⭐",
                        synopsis:
                            "A história de um pequeno príncipe que viaja de planeta em planeta, encontrando diversos personagens que representam aspectos da natureza humana adulta.",
                    },
                    "Harry Potter": {
                        title: "Harry Potter e a Pedra Filosofal",
                        author: "J.K. Rowling",
                        year: "1997",
                        genre: "Fantasia",
                        cover: "⚡",
                        synopsis:
                            "Harry Potter descobre no seu aniversário de 11 anos que é filho de bruxos e está matriculado na Escola de Magia e Bruxaria de Hogwarts.",
                    },
                };

                const book = bookData[bookTitle] || {
                    title: bookTitle,
                    author: "Autor Desconhecido",
                    year: "2023",
                    genre: "Ficção",
                    cover: "📖",
                    synopsis: "Sinopse não disponível.",
                };

                document.getElementById("bookDetailsTitle").textContent =
                    book.title;
                document.getElementById("bookDetailsAuthor").textContent =
                    book.author;
                document.getElementById("bookDetailsYear").textContent =
                    book.year;
                document.getElementById("bookDetailsGenre").textContent =
                    book.genre;
                document.getElementById("bookDetailsCover").textContent =
                    book.cover;
                document.getElementById("bookDetailsSynopsis").textContent =
                    book.synopsis;

                openModal("bookDetailsModal");
            }

            function updateProfile() {
                const name = document.getElementById("profileName").value;
                const email = document.getElementById("profileEmail").value;

                showNotification(`Perfil atualizado com sucesso! 👤`);

                // Atualizar nome no header se logado
                const authButtons = document.querySelector(".auth-buttons");
                if (authButtons.innerHTML.includes("@")) {
                    authButtons.innerHTML = `
            <span style="color: #667eea; margin-right: 1rem;">👤 ${name}</span>
            <button class="btn btn-secondary" onclick="logout()">Sair</button>
        `;
                }
            }

            function setRating(rating) {
                const stars = document.querySelectorAll(
                    "#bookDetailsModal .star"
                );
                stars.forEach((star, index) => {
                    star.classList.toggle("active", index < rating);
                });
                showNotification(
                    `Avaliação: ${rating} estrela${rating > 1 ? "s" : ""} ⭐`
                );
            }

            function toggleFavorite() {
                const btn = event.target;
                const isFavorited = btn.textContent.includes("❤️");

                if (isFavorited) {
                    btn.innerHTML = "🤍 Remover dos Favoritos";
                    showNotification("Removido dos favoritos 💔");
                } else {
                    btn.innerHTML = "❤️ Favoritar";
                    showNotification("Adicionado aos favoritos ❤️");
                }
            }

            function shareBook() {
                const title =
                    document.getElementById("bookDetailsTitle").textContent;
                const author =
                    document.getElementById("bookDetailsAuthor").textContent;
                const message = `📚 Estou lendo "${title}" de ${author} na TÔ LENDO! Que livro incrível! 🌟`;

                if (navigator.share) {
                    navigator.share({
                        title: "TÔ LENDO - Compartilhar Livro",
                        text: message,
                        url: window.location.href,
                    });
                } else {
                    navigator.clipboard.writeText(message).then(() => {
                        showNotification("Link copiado para compartilhar! 📤");
                    });
                }
            }

            function updateBookStatus(status) {
                const statusLabels = {
                    "to-read": "Quero Ler 📚",
                    reading: "Lendo 📖",
                    read: "Lido ✅",
                    abandoned: "Abandonado ❌",
                };

                showNotification(
                    `Status alterado para: ${statusLabels[status]}`
                );
            }

            function saveReview() {
                const review = event.target.previousElementSibling.value;
                if (review.trim()) {
                    showNotification("Resenha salva com sucesso! ✍️");
                    event.target.previousElementSibling.value = "";
                } else {
                    showNotification("Escreva uma resenha antes de salvar! 📝");
                }
            }

            function joinBookClub(clubName) {
                showNotification(`Você entrou no clube "${clubName}"! 🎉`);
            }

            function createBookClub() {
                const clubName = prompt("Nome do novo clube de leitura:");
                if (clubName) {
                    showNotification(
                        `Clube "${clubName}" criado com sucesso! 🎊`
                    );
                }
            }

            function createPost() {
                const title = prompt("Título da discussão:");
                if (title) {
                    showNotification(`Discussão "${title}" criada! 💬`);
                }
            }

            function loadCatalog() {
                // Simular carregamento do catálogo
                showNotification("Carregando catálogo... 📚");
            }

            function loadMyBooks() {
                showNotification("Carregando seus livros... 📖");
            }

            function loadProfile() {
                showNotification("Carregando perfil... 👤");
            }

            function loadCommunity() {
                showNotification("Carregando comunidade... 👥");
            }

            function loadFavorites() {
                showNotification("Carregando favoritos... ❤️");
            }

            function loadCurrentReading() {
                showNotification("Carregando leituras atuais... 📖");
            }

            function loadWishlist() {
                showNotification("Carregando lista de desejos... 💝");
            }

            function loadReviews() {
                showNotification("Carregando suas avaliações... ⭐");
            }

            function loadRecommendations() {
                showNotification("Carregando recomendações... 🎯");
            }

            // Sistema de notificações
            function showNotification(message, type = "success") {
                const notification = document.createElement("div");
                notification.className = "notification show";
                notification.textContent = message;

                if (type === "error") {
                    notification.style.background =
                        "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)";
                }

                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.classList.remove("show");
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            }

            // Função melhorada de exportar biblioteca
            function exportLibrary() {
                const libraryData = {
                    user: {
                        name:
                            document.getElementById("profileName")?.value ||
                            "Usuário",
                        email:
                            document.getElementById("profileEmail")?.value ||
                            "email@exemplo.com",
                        readingGoal: 24,
                        booksRead: 42,
                    },
                    books: [
                        {
                            title: "1984",
                            author: "George Orwell",
                            status: "read",
                            rating: 5,
                            genre: "Ficção Científica",
                        },
                        {
                            title: "Dom Casmurro",
                            author: "Machado de Assis",
                            status: "reading",
                            rating: null,
                            genre: "Romance",
                        },
                        {
                            title: "O Pequeno Príncipe",
                            author: "Antoine de Saint-Exupéry",
                            status: "read",
                            rating: 5,
                            genre: "Fábula",
                        },
                        {
                            title: "Harry Potter",
                            author: "J.K. Rowling",
                            status: "to-read",
                            rating: null,
                            genre: "Fantasia",
                        },
                    ],
                    exportDate: new Date().toISOString(),
                    stats: {
                        totalBooks: 42,
                        averageRating: 4.3,
                        favoriteGenre: "Ficção Científica",
                    },
                };

                const dataStr = JSON.stringify(libraryData, null, 2);
                const dataBlob = new Blob([dataStr], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(dataBlob);

                const link = document.createElement("a");
                link.href = url;
                link.download = "TÔ LENDO_backup.json";
                link.click();

                showNotification("Biblioteca exportada com sucesso! 📁");
                URL.revokeObjectURL(url);
            }

            // Funções adicionais para completar a funcionalidade

            function addToLibrary(bookTitle) {
                showNotification(
                    `"${bookTitle}" adicionado à sua biblioteca! 📚`
                );
            }

            function filterMyBooks(status) {
                const buttons = document.querySelectorAll("#myBooksModal .btn");
                buttons.forEach((btn) => (btn.className = "btn btn-secondary"));
                event.target.className = "btn btn-primary";

                showNotification(
                    `Filtrando livros: ${
                        status === "all" ? "Todos" : status
                    } 📖`
                );
            }

            function updateReadingProgress() {
                const currentPage = prompt("Em que página você está?");
                if (currentPage && !isNaN(currentPage)) {
                    const progress = Math.round((currentPage / 320) * 100);
                    showNotification(
                        `Progresso atualizado: ${currentPage}/320 páginas (${progress}%) 📈`
                    );

                    // Atualizar a barra de progresso
                    const progressBar = document.querySelector(
                        "#readingModal .progress-fill"
                    );
                    if (progressBar) {
                        progressBar.style.width = progress + "%";
                    }
                }
            }

            function moveToReading(bookTitle) {
                showNotification(
                    `"${bookTitle}" movido para "Lendo Agora"! 📖`
                );
            }

            // Função para navegação entre seções (melhorada)
            function showSection(section) {
                // Fechar todos os modais primeiro
                document.querySelectorAll(".modal").forEach((modal) => {
                    modal.style.display = "none";
                });

                const sectionMap = {
                    home: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                    catalog: () => openModal("catalogModal"),
                    mybooks: () => openModal("myBooksModal"),
                    profile: () => openModal("profileModal"),
                    community: () => openModal("communityModal"),
                    favorites: () => openModal("favoritesModal"),
                    reading: () => openModal("readingModal"),
                    wishlist: () => openModal("wishlistModal"),
                    reviews: () => openModal("reviewsModal"),
                    recommendations: () => openModal("recommendationsModal"),
                };

                if (sectionMap[section]) {
                    sectionMap[section]();
                } else {
                    showNotification(
                        `Seção "${section}" não encontrada`,
                        "error"
                    );
                }
            }

            // Melhorar a função de busca
            function performSearch() {
                const searchTerm = document
                    .getElementById("searchInput")
                    .value.trim();
                if (searchTerm) {
                    showNotification(`🔍 Buscando por: "${searchTerm}"`);
                    // Simular abertura do catálogo com filtro
                    setTimeout(() => {
                        openModal("catalogModal");
                    }, 500);
                } else {
                    showNotification("Digite algo para buscar! 📝", "error");
                }
            }
        