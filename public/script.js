const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 13",
      preco: 3499.9,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      descricao: "Smartphone Apple com excelente câmera, desempenho rápido e design moderno.",
      emEstoque: true
    },
    {
      id: 2,
      nome: "Samsung Galaxy S23",
      preco: 2999.9,
      categoria: "Celulares",
      imagem: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      descricao: "Celular Samsung com tela de alta qualidade, boa bateria e ótimo desempenho.",
      emEstoque: true
    },
    {
      id: 3,
      nome: "Notebook Dell Inspiron",
      preco: 4299.9,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
      descricao: "Notebook ideal para estudos, trabalho, programação e uso diário.",
      emEstoque: true
    },
    {
      id: 4,
      nome: "MacBook Air M1",
      preco: 6499.9,
      categoria: "Notebooks",
      imagem: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      descricao: "Notebook Apple com chip M1, bateria duradoura e alta performance.",
      emEstoque: false
    },
    {
      id: 5,
      nome: "Headset Gamer RGB",
      preco: 199.9,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400",
      descricao: "Headset com microfone, iluminação RGB e bom isolamento de som.",
      emEstoque: true
    },
    {
      id: 6,
      nome: "Mouse Sem Fio",
      preco: 89.9,
      categoria: "Acessórios",
      imagem: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      descricao: "Mouse confortável, leve e ideal para produtividade no dia a dia.",
      emEstoque: true
    },
    {
      id: 7,
      nome: "PlayStation 5",
      preco: 3999.9,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
      descricao: "Console de nova geração com gráficos avançados e jogos exclusivos.",
      emEstoque: false
    },
    {
      id: 8,
      nome: "Controle Xbox",
      preco: 349.9,
      categoria: "Games",
      imagem: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400",
      descricao: "Controle sem fio confortável, compatível com Xbox e PC.",
      emEstoque: true
    }
  ]
};

// getElementById
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const btnRender = document.getElementById("btnRender");

// querySelector
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.classList.add("card");
  card.setAttribute("data-id", produto.id);

  // Ajuste visual via JS
  card.style.padding = "16px";
  card.style.border = "1px solid #ddd";
  card.style.borderRadius = "10px";

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);
  img.setAttribute("alt", produto.nome);
  img.classList.add("card-img");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.innerText = produto.nome;

  const price = document.createElement("p");
  price.classList.add("card-price");
  price.innerText = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.classList.add("card-category");
  category.innerText = `Categoria: ${produto.categoria}`;

  const btnDetails = document.createElement("button");
  btnDetails.innerText = "Ver detalhes";
  btnDetails.classList.add("btn-details");

  const btnHighlight = document.createElement("button");
  btnHighlight.innerText = "Destacar";
  btnHighlight.classList.add("btn-highlight");

  btnDetails.addEventListener("click", function () {
    showProductDetails(produto);
  });

  btnHighlight.addEventListener("click", function () {
    if (card.classList.contains("highlight")) {
      card.classList.remove("highlight");
    } else {
      card.classList.add("highlight");
    }
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  if (produtos.length === 0) {
    productList.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  produtos.forEach(function (produto) {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // querySelectorAll obrigatório
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    console.log("Card renderizado com ID:", card.getAttribute("data-id"));
    card.style.transition = "0.2s";
  });
}

function renderCategories() {
  categorySelect.innerHTML = "";

  const optionAll = document.createElement("option");
  optionAll.value = "Todas";
  optionAll.innerText = "Todas";
  categorySelect.appendChild(optionAll);

  const categorias = [];

  data.produtos.forEach(function (produto) {
    if (!categorias.includes(produto.categoria)) {
      categorias.push(produto.categoria);
    }
  });

  categorias.forEach(function (categoria) {
    const option = document.createElement("option");
    option.value = categoria;
    option.innerText = categoria;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  const statusEstoque = produto.emEstoque ? "Em estoque" : "Fora de estoque";

  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status:</strong> ${statusEstoque}</p>
    <p><strong>Descrição:</strong> ${produto.descricao}</p>
  `;
}

function filterProducts() {
  const textoBusca = searchInput.value.toLowerCase();
  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter(function (produto) {
    const nomeCombina = produto.nome.toLowerCase().includes(textoBusca);
    const categoriaCombina =
      categoriaSelecionada === "Todas" || produto.categoria === categoriaSelecionada;

    return nomeCombina && categoriaCombina;
  });

  return produtosFiltrados;
}

searchInput.addEventListener("input", function () {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

categorySelect.addEventListener("change", function () {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

btnRender.addEventListener("click", function () {
  const produtosFiltrados = filterProducts();
  renderProducts(produtosFiltrados);
});

renderCategories();
renderProducts(data.produtos);