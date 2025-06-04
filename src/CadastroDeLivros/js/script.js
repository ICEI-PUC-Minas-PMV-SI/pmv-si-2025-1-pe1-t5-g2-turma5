// Variáveis globais
let currentTab = 0;
const tabs = document.getElementsByClassName("tab");
const tabContents = document.getElementsByClassName("tab-content");
const progressBar = document.getElementById("progress");
let editingBookId = null;

// Campos obrigatórios por aba
const requiredFieldsByTab = [
  ["titulo", "autor", "ano", "editora"], // Aba 1
  ["paginas", "genero", "sinopse", "avaliacoes"], // Aba 2
  ["linkCompra", "linkDownload"], // Aba 3 - Links de Acesso
  [], // Aba 4 (não tem campos obrigatórios)
];

// Inicialização
document.addEventListener("DOMContentLoaded", function () {
  updateProgressBar();
  loadBooksFromStorage();

  // Adicionar validação ao perder o foco nos campos obrigatórios
  const requiredFields = [].concat(...requiredFieldsByTab);
  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("blur", function () {
        validateField(this);
      });
    }
  });
});

// Função para atualizar a barra de progresso
function updateProgressBar() {
  progressBar.style.width = ((currentTab + 1) / tabs.length) * 100 + "%";
}

// Função para mudar de aba
function changeTab(tabName, tabIndex) {
  // Limpar todas as abas e conteúdos ativos
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].className = tabContents[i].className.replace(" active", "");
    tabs[i].className = tabs[i].className.replace(" active", "");
  }

  // Ativar a aba e conteúdo selecionados
  document.getElementById(tabName).className += " active";
  tabs[tabIndex].className += " active";

  // Atualizar o índice da aba atual
  currentTab = tabIndex;
  updateProgressBar();
}

// Função para validar um campo específico
function validateField(field) {
  const fieldId = field.id;
  const errorElement = document.getElementById(`${fieldId}-error`);

  // Remover mensagens e estilos de erro existentes
  field.classList.remove("input-error");
  if (errorElement) errorElement.style.display = "none";

  // Diferentes validações dependendo do tipo de campo
  let valid = true;
  let errorMsg = "Este campo é obrigatório";

  if (!field.value.trim()) {
    valid = false;
  } else if (fieldId === "ano") {
    const year = parseInt(field.value);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1 || year > currentYear) {
      valid = false;
      errorMsg = `O ano deve ser um número entre 1 e ${currentYear}`;
    }
  } else if (fieldId === "paginas") {
    const pages = parseInt(field.value);
    if (isNaN(pages) || pages < 1) {
      valid = false;
      errorMsg = "O número de páginas deve ser maior que 0";
    }
  } else if (
    fieldId === "linkCompra" ||
    fieldId === "linkDownload" ||
    fieldId === "urlCapa"
  ) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (field.value.trim() && !urlPattern.test(field.value)) {
      valid = false;
      errorMsg = "Por favor, insira uma URL válida";
    }
  }

  // Mostrar erro se inválido
  if (!valid) {
    field.classList.add("input-error");
    if (errorElement) {
      errorElement.textContent = errorMsg;
      errorElement.style.display = "block";
    }
  }

  return valid;
}

// Função para validar todos os campos de uma aba
function validateTab(tabIndex) {
  const fieldsToValidate = requiredFieldsByTab[tabIndex];
  let allValid = true;

  fieldsToValidate.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      allValid = false;
    }
  });

  return allValid;
}

// Função para validar e ir para a próxima aba
function validateAndNextTab(currentTabIndex) {
  if (validateTab(currentTabIndex)) {
    nextTab();
  } else {
    showErrorMessage(
      "Por favor, preencha todos os campos obrigatórios corretamente."
    );
  }
}

// Função para ir à próxima aba
function nextTab() {
  if (currentTab < tabs.length - 1) {
    const nextTabIndex = currentTab + 1;
    const tabNames = [
      "info-basicas",
      "info-detalhadas",
      "links-acesso",
      "info-adicionais",
    ];
    changeTab(tabNames[nextTabIndex], nextTabIndex);
  }
}

// Função para voltar à aba anterior
function prevTab() {
  if (currentTab > 0) {
    const prevTabIndex = currentTab - 1;
    const tabNames = [
      "info-basicas",
      "info-detalhadas",
      "links-acesso",
      "info-adicionais",
    ];
    changeTab(tabNames[prevTabIndex], prevTabIndex);
  }
}

// Função para salvar o livro
function saveBook() {
  // Validar todas as abas obrigatórias
  let allValid = true;
  for (let i = 0; i < 3; i++) {
    // Apenas as 3 primeiras abas têm campos obrigatórios
    if (!validateTab(i)) {
      allValid = false;
      break;
    }
  }

  if (!allValid) {
    showErrorMessage(
      "Por favor, preencha todos os campos obrigatórios nas abas anteriores."
    );
    return;
  }

  // Coletar dados do formulário
  const bookData = {
    id: editingBookId || Date.now().toString(),
    titulo: document.getElementById("titulo").value.trim(),
    autor: document.getElementById("autor").value.trim(),
    ano: parseInt(document.getElementById("ano").value),
    editora: document.getElementById("editora").value.trim(),
    paginas: parseInt(document.getElementById("paginas").value),
    genero: document.getElementById("genero").value,
    sinopse: document.getElementById("sinopse").value.trim(),
    avaliacoes: document.getElementById("avaliacoes").value.trim(),
    linkCompra: document.getElementById("linkCompra").value.trim(),
    linkDownload: document.getElementById("linkDownload").value.trim(),
    urlCapa: document.getElementById("urlCapa").value.trim(),
    premios: document.getElementById("premios").value.trim(),
    serie: document.getElementById("serie").value.trim(),
    ilustrador: document.getElementById("ilustrador").value.trim(),
    origem: document.getElementById("origem").value.trim(),
    dataRegistro: editingBookId
      ? getBooksFromStorage().find((b) => b.id === editingBookId)?.dataRegistro
      : new Date().toLocaleDateString("pt-BR"),
  };

  try {
    // Salvar no armazenamento
    saveBooksToStorage(bookData);

    // Mostrar mensagem de sucesso
    showSuccessMessage();

    // Limpar formulário após salvar
    setTimeout(() => {
      clearForm();
      changeTab("info-basicas", 0);
      editingBookId = null;
    }, 2000);
  } catch (error) {
    console.error("Erro ao salvar livro:", error);
    showErrorMessage("Erro interno. Tente novamente.");
  }
}

// Função para salvar livros no armazenamento (usando array em memória)
let booksStorage = [];

function saveBooksToStorage(bookData) {
  // Buscar livros existentes do localStorage
  let books = JSON.parse(localStorage.getItem("livros")) || [];

  if (editingBookId) {
    // Editar livro existente
    const index = books.findIndex((book) => book.id === editingBookId);
    if (index !== -1) {
      books[index] = bookData;
    }
  } else {
    // Adicionar novo livro
    books.push(bookData);
  }

  // Salvar no localStorage
  localStorage.setItem("livros", JSON.stringify(books));

  // Atualizar array em memória para manter sincronizado
  booksStorage = books;

  updateBooksTable();
}

function getBooksFromStorage() {
  // Sempre buscar do localStorage para garantir dados atualizados
  booksStorage = JSON.parse(localStorage.getItem("livros")) || [];
  return booksStorage;
}

function loadBooksFromStorage() {
  updateBooksTable();
}

// Função para atualizar a tabela de livros
function updateBooksTable() {
  const tbody = document.getElementById("livros-tbody");
  const books = getBooksFromStorage();

  tbody.innerHTML = "";

  if (books.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center; color: #666;">Nenhum livro cadastrado ainda.</td></tr>';
    return;
  }

  books.forEach((book) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${book.titulo}</td>
          <td>${book.autor}</td>
          <td>${book.ano}</td>
          <td>${book.editora}</td>
          <td>${book.genero}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editBook('${book.id}')" title="Editar">
              ✏️
            </button>
            <button class="action-btn delete-btn" onclick="deleteBook('${book.id}')" title="Excluir">
              🗑️
            </button>
          </td>
        `;
    tbody.appendChild(row);
  });
}

// Função para editar um livro
function editBook(bookId) {
  const books = getBooksFromStorage();
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    showErrorMessage("Livro não encontrado.");
    return;
  }

  // Preencher o formulário com os dados do livro
  editingBookId = bookId;

  document.getElementById("titulo").value = book.titulo || "";
  document.getElementById("autor").value = book.autor || "";
  document.getElementById("ano").value = book.ano || "";
  document.getElementById("editora").value = book.editora || "";
  document.getElementById("paginas").value = book.paginas || "";
  document.getElementById("genero").value = book.genero || "";
  document.getElementById("sinopse").value = book.sinopse || "";
  document.getElementById("avaliacoes").value = book.avaliacoes || "";
  document.getElementById("linkCompra").value = book.linkCompra || "";
  document.getElementById("linkDownload").value = book.linkDownload || "";
  document.getElementById("urlCapa").value = book.urlCapa || "";
  document.getElementById("premios").value = book.premios || "";
  document.getElementById("serie").value = book.serie || "";
  document.getElementById("ilustrador").value = book.ilustrador || "";
  document.getElementById("origem").value = book.origem || "";

  // Ir para a primeira aba
  changeTab("info-basicas", 0);

  // Scroll para o topo do formulário
  document.querySelector(".container").scrollIntoView({ behavior: "smooth" });
}

function deleteBook(bookId) {
  if (confirm("Tem certeza que deseja excluir este livro?")) {
    // Buscar livros do localStorage
    let books = JSON.parse(localStorage.getItem("livros")) || [];

    // Filtrar removendo o livro
    books = books.filter((book) => book.id !== bookId);

    // Salvar de volta no localStorage
    localStorage.setItem("livros", JSON.stringify(books));

    // Atualizar array em memória
    booksStorage = books;

    updateBooksTable();
    showSuccessMessage("Livro excluído com sucesso!");
  }
}

// Função para limpar o formulário
function clearForm() {
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("input-error");
  });

  const errorElements = document.querySelectorAll(".error-feedback");
  errorElements.forEach((element) => {
    element.style.display = "none";
  });

  editingBookId = null;
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(
  message = "Seu livro foi cadastrado com sucesso em nossa biblioteca."
) {
  const successMessage = document.getElementById("success-message");
  const overlay = document.getElementById("overlay");
  const messageText = successMessage.querySelector("p");

  messageText.textContent = message;

  overlay.style.display = "block";
  successMessage.style.display = "block";
}

// Função para fechar mensagem de sucesso
function closeSuccessMessage() {
  const successMessage = document.getElementById("success-message");
  const overlay = document.getElementById("overlay");

  overlay.style.display = "none";
  successMessage.style.display = "none";

  // Atualizar tabela após fechar
  updateBooksTable();
}

// Função para mostrar mensagem de erro
function showErrorMessage(message = "Não foi possível completar o cadastro.") {
  const errorMessage = document.getElementById("error-message");
  const overlay = document.getElementById("overlay");
  const messageText = document.getElementById("error-message-text");

  messageText.textContent = message;

  overlay.style.display = "block";
  errorMessage.style.display = "block";
}

// Função para fechar mensagem de erro
function closeErrorMessage() {
  const errorMessage = document.getElementById("error-message");
  const overlay = document.getElementById("overlay");

  overlay.style.display = "none";
  errorMessage.style.display = "none";
}

// Fechar mensagens ao clicar no overlay
document.getElementById("overlay").addEventListener("click", function () {
  closeSuccessMessage();
  closeErrorMessage();
});

// Prevenir envio do formulário com Enter
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
  }
});
