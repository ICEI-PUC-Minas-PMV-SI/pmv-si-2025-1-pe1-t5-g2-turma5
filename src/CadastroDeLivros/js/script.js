/**
 * Book Registration Form - Multi-step Wizard
 * Handles form navigation, validation, and local storage
 */

// Dark Mode Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");
    const body = document.body;

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem("theme") || "light";
    body.setAttribute("data-theme", currentTheme);

    // Update icon based on current theme
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener("click", function () {
        const currentTheme = body.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        body.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    }
});

class BookRegistrationForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 4;
        this.formData = {};

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadFromLocalStorage();
        this.updateUI();
    }

    bindEvents() {
        // Navigation buttons
        document
            .getElementById("nextBtn")
            .addEventListener("click", () => this.nextStep());
        document
            .getElementById("prevBtn")
            .addEventListener("click", () => this.prevStep());
        document
            .getElementById("submitBtn")
            .addEventListener("click", (e) => this.submitForm(e));

        // Form inputs - save to localStorage on change
        const form = document.getElementById("bookForm");
        form.addEventListener("input", (e) => this.saveToLocalStorage(e));
        form.addEventListener("change", (e) => this.saveToLocalStorage(e));

        // Step clicks for navigation
        document.querySelectorAll(".step").forEach((step) => {
            step.addEventListener("click", (e) => {
                const stepNumber = parseInt(e.currentTarget.dataset.step);
                this.goToStep(stepNumber);
            });
        });

        // Modal events
        document
            .querySelector(".close")
            .addEventListener("click", () => this.closeModal());
        document
            .getElementById("newBookBtn")
            .addEventListener("click", () => this.resetForm());

        // Close modal when clicking outside
        window.addEventListener("click", (e) => {
            const modal = document.getElementById("successModal");
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateUI();
            }
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateUI();
        }
    }

    goToStep(stepNumber) {
        if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
            this.currentStep = stepNumber;
            this.updateUI();
        }
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(
            `.form-step[data-step="${this.currentStep}"]`
        );
        const requiredFields =
            currentStepElement.querySelectorAll("[required]");
        let isValid = true;

        // Clear previous error states
        this.clearErrors();

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                this.showFieldError(field, "Este campo é obrigatório");
                isValid = false;
            } else {
                // Specific validations
                if (field.type === "email" && !this.isValidEmail(field.value)) {
                    this.showFieldError(
                        field,
                        "Por favor, insira um email válido"
                    );
                    isValid = false;
                }
                if (field.type === "url" && !this.isValidURL(field.value)) {
                    this.showFieldError(
                        field,
                        "Por favor, insira uma URL válida"
                    );
                    isValid = false;
                }
                if (field.type === "number") {
                    const min = parseInt(field.getAttribute("min"));
                    const max = parseInt(field.getAttribute("max"));
                    const value = parseInt(field.value);

                    if (min && value < min) {
                        this.showFieldError(
                            field,
                            `O valor deve ser maior que ${min}`
                        );
                        isValid = false;
                    }
                    if (max && value > max) {
                        this.showFieldError(
                            field,
                            `O valor deve ser menor que ${max}`
                        );
                        isValid = false;
                    }
                }
            }
        });

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add("error");

        // Create or update error message
        let errorElement = field.parentNode.querySelector(".error-message");
        if (!errorElement) {
            errorElement = document.createElement("div");
            errorElement.className = "error-message";
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.classList.add("show");
    }

    clearErrors() {
        // Remove error classes
        document.querySelectorAll(".error").forEach((field) => {
            field.classList.remove("error");
        });

        // Hide error messages
        document.querySelectorAll(".error-message").forEach((error) => {
            error.classList.remove("show");
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    updateUI() {
        // Update step indicators
        document.querySelectorAll(".step").forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove("active", "completed");

            if (stepNumber === this.currentStep) {
                step.classList.add("active");
            } else if (stepNumber < this.currentStep) {
                step.classList.add("completed");
            }
        });

        // Update form steps visibility
        document.querySelectorAll(".form-step").forEach((step) => {
            step.classList.remove("active");
        });
        document
            .querySelector(`.form-step[data-step="${this.currentStep}"]`)
            .classList.add("active");

        // Update navigation buttons
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const submitBtn = document.getElementById("submitBtn");

        prevBtn.style.display = this.currentStep === 1 ? "none" : "inline-flex";

        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = "none";
            submitBtn.style.display = "inline-flex";
        } else {
            nextBtn.style.display = "inline-flex";
            submitBtn.style.display = "none";
        }

        // Remove step accessibility restrictions
        // this.updateStepAccessibility();
    }

    updateStepAccessibility() {
        const maxAccessibleStep = this.getMaxAccessibleStep();

        document.querySelectorAll(".step").forEach((step, index) => {
            const stepNumber = index + 1;
            if (stepNumber <= maxAccessibleStep) {
                step.style.cursor = "pointer";
                step.style.opacity = "1";
            } else {
                step.style.cursor = "not-allowed";
                step.style.opacity = "0.5";
            }
        });
    }

    getMaxAccessibleStep() {
        // Users can access steps they've completed or the next incomplete step
        let maxStep = 1;

        for (let i = 1; i <= this.totalSteps; i++) {
            const stepElement = document.querySelector(
                `.form-step[data-step="${i}"]`
            );
            const requiredFields = stepElement.querySelectorAll("[required]");
            let stepComplete = true;

            for (let field of requiredFields) {
                if (!field.value.trim()) {
                    stepComplete = false;
                    break;
                }
            }

            if (stepComplete) {
                maxStep = Math.min(i + 1, this.totalSteps);
            } else {
                break;
            }
        }

        return Math.max(maxStep, this.currentStep);
    }

    saveToLocalStorage(event) {
        const field = event.target;
        const formData = new FormData(document.getElementById("bookForm"));
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Also save current step
        data._currentStep = this.currentStep;

        // Manter localStorage para dados temporários
        localStorage.setItem("bookRegistrationData", JSON.stringify(data));
        this.formData = data;
    }

    loadFromLocalStorage() {
        const savedData = localStorage.getItem("bookRegistrationData");
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.formData = data;

                // Restore form values
                Object.keys(data).forEach((key) => {
                    if (key !== "_currentStep") {
                        const field = document.getElementById(key);
                        if (field) {
                            field.value = data[key];
                        }
                    }
                });

                // Restore current step
                if (data._currentStep) {
                    this.currentStep = parseInt(data._currentStep);
                }
            } catch (error) {
                console.error("Error loading data from localStorage:", error);
            }
        }
    }

    async submitForm(event) {
        event.preventDefault();

        if (!this.validateCurrentStep()) {
            return;
        }

        // Collect all form data
        const formData = new FormData(document.getElementById("bookForm"));
        const bookData = {};

        for (let [key, value] of formData.entries()) {
            bookData[key] = value;
        }

        try {
            // Adicionar ID único se não existir
            if (!bookData.id) {
                bookData.id = this.generateId();
            }

            // Adicionar data de criação
            bookData.created_at = new Date().toISOString();

            // Carregar livros existentes do localStorage
            const existingBooks = JSON.parse(
                localStorage.getItem("biblioteca_livros") || "[]"
            );

            // Adicionar novo livro
            existingBooks.push(bookData);

            // Salvar no localStorage
            localStorage.setItem(
                "biblioteca_livros",
                JSON.stringify(existingBooks)
            );

            // Limpar dados temporários do localStorage
            localStorage.removeItem("bookRegistrationData");
            this.showSuccessModal();
        } catch (error) {
            console.error("Erro ao salvar livro:", error);
            alert("Erro ao salvar livro. Tente novamente.");
        }
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async loadBooksFromServer() {
        try {
            return JSON.parse(
                localStorage.getItem("biblioteca_livros") || "[]"
            );
        } catch (error) {
            console.error("Erro ao carregar livros:", error);
            return [];
        }
    }

    showSuccessModal() {
        document.getElementById("successModal").style.display = "block";
    }

    closeModal() {
        document.getElementById("successModal").style.display = "none";
    }

    resetForm() {
        // Clear form
        document.getElementById("bookForm").reset();

        // Clear localStorage
        localStorage.removeItem("bookRegistrationData");

        // Reset to first step
        this.currentStep = 1;
        this.formData = {};

        // Update UI
        this.updateUI();
        this.clearErrors();

        // Close modal
        this.closeModal();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Public method to get saved books from server
    async getSavedBooks() {
        return await this.loadBooksFromServer();
    }
}

// Initialize the form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new BookRegistrationForm();
});

// Add some utility functions for potential future features
window.BookRegistry = {
    getBooks: async () => {
        try {
            return JSON.parse(
                localStorage.getItem("biblioteca_livros") || "[]"
            );
        } catch (error) {
            console.error("Erro ao carregar livros:", error);
            return [];
        }
    },

    exportBooks: async () => {
        try {
            const books = await window.BookRegistry.getBooks();

            if (books.length === 0) {
                alert("Nenhum livro encontrado para exportar");
                return;
            }

            // Cria estrutura completa para exportação
            const exportData = {
                biblioteca: {
                    livros: books,
                    resenhas: JSON.parse(
                        localStorage.getItem("biblioteca_resenhas") || "[]"
                    ),
                    curtidas: JSON.parse(
                        localStorage.getItem("biblioteca_curtidas") || "[]"
                    ),
                    exportado_em: new Date().toISOString(),
                    total_livros: books.length,
                },
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(dataBlob);
            link.download = `biblioteca-${
                new Date().toISOString().split("T")[0]
            }.json`;
            link.click();

            // Limpa o URL do blob
            setTimeout(() => URL.revokeObjectURL(link.href), 100);

            alert(`Biblioteca exportada com ${books.length} livros!`);
        } catch (error) {
            console.error("Erro ao exportar:", error);
            alert("Erro ao exportar biblioteca. Tente novamente.");
        }
    },

    clearLibrary: () => {
        if (
            confirm(
                "Tem certeza que deseja limpar toda a biblioteca? Esta ação não pode ser desfeita."
            )
        ) {
            // Limpar apenas dados temporários do localStorage
            localStorage.removeItem("bookRegistrationData");
            alert(
                "Dados temporários limpos com sucesso!\nPara limpar livros salvos, delete o arquivo livros.json do servidor."
            );
        }
    },
};
