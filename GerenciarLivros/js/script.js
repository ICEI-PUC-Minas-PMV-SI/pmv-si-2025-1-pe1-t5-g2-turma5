// Dados dos livros armazenados em memória
let livros = [];

// Mapeamento de gêneros
const generos = {
  ficcao: "Ficção",
  romance: "Romance",
  fantasia: "Fantasia",
  misterio: "Mistério",
  suspense: "Suspense",
  terror: "Terror",
  biografia: "Biografia",
  historia: "História",
  cientifico: "Científico",
  infantil: "Infantil",
  autoajuda: "Autoajuda",
  outro: "Outro",
};

// Variáveis de controle
let currentEditTab = 0;
let editingIndex = -1;
let isAddingNew = false;

// Função para salvar livros no localStorage
function salvarNoLocalStorage() {
  localStorage.setItem("livros", JSON.stringify(livros));
}

// Função para renderizar livros na grade
function renderizarLivros() {
  const grid = document.getElementById("livrosGrid");

  if (livros.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>📚 Nenhum livro encontrado</h3>
        <p>Sua biblioteca está vazia. Clique no botão ➕ para adicionar seus primeiros livros!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = livros
    .map(
      (livro, index) => `
    <div class="book-card">
      <img src="${
        livro.urlCapa || "https://via.placeholder.com/300x200?text=Sem+Capa"
      }" 
          class="book-cover" 
          onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Capa'"
          alt="Capa de ${livro.titulo}">
      <div class="book-info">
        <h3 class="book-title">${livro.titulo}</h3>
        <p class="book-author">${livro.autor}</p>
        <p class="book-details">📅 ${livro.ano} • 📖 ${
        livro.paginas
      } páginas</p>
        <p class="book-details">🏢 ${livro.editora}</p>
        <span class="book-genre">${generos[livro.genero] || livro.genero}</span>
      </div>
      <div class="book-actions">
        <button class="btn edit-btn" onclick="editarLivro(${index})">
          ✏️ Editar
        </button>
        <button class="btn view-btn" onclick="visualizarLivro(${index})">
          👁️ Ver
        </button>
        <button class="btn delete-btn" onclick="excluirLivro(${index})">
          🗑️ Excluir
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Função para abrir modal de adição
function abrirModalAdicionar() {
  isAddingNew = true;
  editingIndex = -1;
  document.getElementById("modalTitle").textContent = "➕ Adicionar Novo Livro";
  limparFormulario();
  document.getElementById("editModal").style.display = "block";
  changeEditTab("basicas", 0);
}

// Função para editar livro
function editarLivro(index) {
  isAddingNew = false;
  editingIndex = index;
  const livro = livros[index];

  document.getElementById("modalTitle").textContent = "✏️ Editar Livro";

  // Preencher campos do formulário
  document.getElementById("editTitulo").value = livro.titulo;
  document.getElementById("editAutor").value = livro.autor;
  document.getElementById("editAno").value = livro.ano;
  document.getElementById("editEditora").value = livro.editora;
  document.getElementById("editPaginas").value = livro.paginas;
  document.getElementById("editGenero").value = livro.genero;
  document.getElementById("editSinopse").value = livro.sinopse;
  document.getElementById("editAvaliacoes").value = livro.avaliacoes;
  document.getElementById("editLinkCompra").value = livro.linkCompra;
  document.getElementById("editLinkDownload").value = livro.linkDownload;
  document.getElementById("editUrlCapa").value = livro.urlCapa || "";
  document.getElementById("editPremios").value = livro.premios || "";
  document.getElementById("editSerie").value = livro.serie || "";
  document.getElementById("editIlustrador").value = livro.ilustrador || "";
  document.getElementById("editOrigem").value = livro.origem || "";

  document.getElementById("editModal").style.display = "block";
  changeEditTab("basicas", 0);
}

// Função para visualizar livro
function visualizarLivro(index) {
  const livro = livros[index];

  document.getElementById("viewTitulo").textContent = livro.titulo;
  document.getElementById("viewAutor").textContent = livro.autor;
  document.getElementById("viewAno").textContent = livro.ano;
  document.getElementById("viewEditora").textContent = livro.editora;
  document.getElementById("viewPaginas").textContent = livro.paginas;
  document.getElementById("viewGenero").textContent =
    generos[livro.genero] || livro.genero;
  document.getElementById("viewSinopse").textContent = livro.sinopse;
  document.getElementById("viewAvaliacoes").textContent = livro.avaliacoes;

  // Capa
  const viewCapa = document.getElementById("viewCapa");
  viewCapa.src =
    livro.urlCapa || "https://via.placeholder.com/150x200?text=Sem+Capa";
  viewCapa.onerror = function () {
    this.src = "https://via.placeholder.com/150x200?text=Sem+Capa";
  };

  // Links
  document.getElementById("viewLinkCompra").href = livro.linkCompra;
  document.getElementById("viewLinkDownload").href = livro.linkDownload;

  // Campos opcionais
  const premiosSection = document.getElementById("viewPremiosSection");
  const serieSection = document.getElementById("viewSerieSection");
  const ilustradorSection = document.getElementById("viewIlustradorSection");
  const origemSection = document.getElementById("viewOrigemSection");

  if (livro.premios && livro.premios.trim()) {
    document.getElementById("viewPremios").textContent = livro.premios;
    premiosSection.style.display = "block";
  } else {
    premiosSection.style.display = "none";
  }

  if (livro.serie && livro.serie.trim()) {
    document.getElementById("viewSerie").textContent = livro.serie;
    serieSection.style.display = "block";
  } else {
    serieSection.style.display = "none";
  }

  if (livro.ilustrador && livro.ilustrador.trim()) {
    document.getElementById("viewIlustrador").textContent = livro.ilustrador;
    ilustradorSection.style.display = "block";
  } else {
    ilustradorSection.style.display = "none";
  }

  if (livro.origem && livro.origem.trim()) {
    document.getElementById("viewOrigem").textContent = livro.origem;
    origemSection.style.display = "block";
  } else {
    origemSection.style.display = "none";
  }

  document.getElementById("viewModal").style.display = "block";
}

// Função para excluir livro
function excluirLivro(index) {
  const livro = livros[index];
  if (confirm(`Tem certeza que deseja excluir o livro "${livro.titulo}"?`)) {
    livros.splice(index, 1);
    salvarNoLocalStorage();
    renderizarLivros();
  }
}

// Função para alterar aba do modal de edição
function changeEditTab(tabId, tabIndex) {
  // Remover classe active de todas as abas
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  // Adicionar classe active à aba selecionada
  document.querySelectorAll(".tab")[tabIndex].classList.add("active");
  document.getElementById(`edit-${tabId}`).classList.add("active");

  currentEditTab = tabIndex;
}

// Função para validar campos obrigatórios
function validarCampos() {
  let isValid = true;

  // Lista de campos obrigatórios
  const camposObrigatorios = [
    { id: "editTitulo", error: "errorTitulo" },
    { id: "editAutor", error: "errorAutor" },
    { id: "editAno", error: "errorAno" },
    { id: "editEditora", error: "errorEditora" },
    { id: "editPaginas", error: "errorPaginas" },
    { id: "editGenero", error: "errorGenero" },
    { id: "editSinopse", error: "errorSinopse" },
    { id: "editAvaliacoes", error: "errorAvaliacoes" },
    { id: "editLinkCompra", error: "errorLinkCompra" },
    { id: "editLinkDownload", error: "errorLinkDownload" },
  ];

  // Limpar mensagens de erro
  camposObrigatorios.forEach((campo) => {
    document.getElementById(campo.error).style.display = "none";
  });

  // Validar cada campo
  camposObrigatorios.forEach((campo) => {
    const elemento = document.getElementById(campo.id);
    const valor = elemento.value.trim();

    if (!valor) {
      document.getElementById(campo.error).style.display = "block";
      isValid = false;
    } else if (campo.id === "editAno") {
      const ano = parseInt(valor);
      if (ano < 1 || ano > 2025) {
        document.getElementById(campo.error).style.display = "block";
        isValid = false;
      }
    } else if (campo.id === "editPaginas") {
      const paginas = parseInt(valor);
      if (paginas < 1) {
        document.getElementById(campo.error).style.display = "block";
        isValid = false;
      }
    } else if (campo.id.includes("Link") && valor) {
      try {
        new URL(valor);
      } catch {
        document.getElementById(campo.error).style.display = "block";
        isValid = false;
      }
    }
  });

  // Validar URL da capa (campo opcional)
  const urlCapa = document.getElementById("editUrlCapa").value.trim();
  if (urlCapa) {
    try {
      new URL(urlCapa);
    } catch {
      document.getElementById("errorUrlCapa").style.display = "block";
      isValid = false;
    }
  }

  return isValid;
}

// Função para salvar edição
function salvarEdicao() {
  if (!validarCampos()) {
    return;
  }

  // Coletar dados do formulário
  const dadosLivro = {
    titulo: document.getElementById("editTitulo").value.trim(),
    autor: document.getElementById("editAutor").value.trim(),
    ano: parseInt(document.getElementById("editAno").value),
    editora: document.getElementById("editEditora").value.trim(),
    paginas: parseInt(document.getElementById("editPaginas").value),
    genero: document.getElementById("editGenero").value,
    sinopse: document.getElementById("editSinopse").value.trim(),
    avaliacoes: document.getElementById("editAvaliacoes").value.trim(),
    linkCompra: document.getElementById("editLinkCompra").value.trim(),
    linkDownload: document.getElementById("editLinkDownload").value.trim(),
    urlCapa: document.getElementById("editUrlCapa").value.trim(),
    premios: document.getElementById("editPremios").value.trim(),
    serie: document.getElementById("editSerie").value.trim(),
    ilustrador: document.getElementById("editIlustrador").value.trim(),
    origem: document.getElementById("editOrigem").value.trim(),
  };

  if (isAddingNew) {
    // Adicionar novo livro
    dadosLivro.id =
      livros.length > 0 ? Math.max(...livros.map((l) => l.id)) + 1 : 1;
    livros.push(dadosLivro);
    salvarNoLocalStorage();
  } else {
    // Editar livro existente
    dadosLivro.id = livros[editingIndex].id;
    livros[editingIndex] = dadosLivro;
    salvarNoLocalStorage();
  }

  // Mostrar mensagem de sucesso
  const successMessage = document.getElementById("successMessage");
  successMessage.textContent = isAddingNew
    ? "✅ Livro adicionado com sucesso!"
    : "✅ Livro atualizado com sucesso!";
  successMessage.style.display = "block";

  // Atualizar interface
  renderizarLivros();

  // Fechar modal após um tempo
  setTimeout(() => {
    fecharModal();
  }, 1500);
}

// Função para limpar formulário
function limparFormulario() {
  const campos = [
    "editTitulo",
    "editAutor",
    "editAno",
    "editEditora",
    "editPaginas",
    "editGenero",
    "editSinopse",
    "editAvaliacoes",
    "editLinkCompra",
    "editLinkDownload",
    "editUrlCapa",
    "editPremios",
    "editSerie",
    "editIlustrador",
    "editOrigem",
  ];

  campos.forEach((campo) => {
    const elemento = document.getElementById(campo);
    if (elemento.type === "select-one") {
      elemento.selectedIndex = 0;
    } else {
      elemento.value = "";
    }
  });

  // Limpar mensagens de erro
  document.querySelectorAll(".error-message").forEach((error) => {
    error.style.display = "none";
  });

  // Limpar mensagem de sucesso
  document.getElementById("successMessage").style.display = "none";
}

// Função para fechar modal de edição
function fecharModal() {
  document.getElementById("editModal").style.display = "none";
  limparFormulario();
}

// Função para fechar modal de visualização
function fecharModalVisualizacao() {
  document.getElementById("viewModal").style.display = "none";
}

// Fechar modais ao clicar fora deles
window.onclick = function (event) {
  const editModal = document.getElementById("editModal");
  const viewModal = document.getElementById("viewModal");

  if (event.target === editModal) {
    fecharModal();
  } else if (event.target === viewModal) {
    fecharModalVisualizacao();
  }
};

// Fechar modais com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    fecharModal();
    fecharModalVisualizacao();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  livros = JSON.parse(localStorage.getItem("livros")) || [];
  renderizarLivros();
});
