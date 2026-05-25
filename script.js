/* ============================================================
   CasaGo — script.js  (versão corrigida)
   Fix: renderização de cards, onerror de imagem, chips
============================================================ */

/* ── BANCO DE DADOS ── */
const imoveis = [
  {
    id: 1, nome: "Vila Serena Residencial", tipo: "casa",
    cidade: "São Paulo", bairro: "Morumbi",
    quartos: 4, banheiros: 3, garagem: 2, area: 280, preco: 1850000,
    descricao: "Casa ampla e bem localizada no coração do Morumbi. Projeto moderno com acabamentos de alto padrão, piscina, churrasqueira e jardim privativo. Próxima a escolas, shoppings e transporte público.",
    features: ["Piscina", "Churrasqueira", "Jardim", "Varanda gourmet", "Ar-condicionado", "Câmeras de segurança", "Portão eletrônico", "Lavanderia"],
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", destaque: true
  },
  {
    id: 2, nome: "Apto Garden Itaim", tipo: "apartamento",
    cidade: "São Paulo", bairro: "Itaim Bibi",
    quartos: 2, banheiros: 2, garagem: 1, area: 95, preco: 980000,
    descricao: "Apartamento garden de alto padrão no Itaim Bibi com varanda integrada à sala, cozinha americana e suíte master com closet. Condomínio com academia, piscina e salão de festas.",
    features: ["Academia", "Piscina", "Varanda", "Closet", "Cozinha americana", "Portaria 24h", "Salão de festas"],
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", destaque: true
  },
  {
    id: 3, nome: "Cobertura Duplex Vista Mar", tipo: "cobertura",
    cidade: "Rio de Janeiro", bairro: "Ipanema",
    quartos: 4, banheiros: 4, garagem: 3, area: 420, preco: 5800000,
    descricao: "Cobertura duplex exclusiva em Ipanema com vista panorâmica para o mar. Dois andares de luxo com piscina privativa, terraço gourmet, jacuzzi e acabamentos importados.",
    features: ["Piscina privativa", "Jacuzzi", "Vista mar", "Terraço gourmet", "Adega climatizada", "Elevador privativo", "Home theater"],
    img: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80", destaque: true
  },
  {
    id: 4, nome: "Mansão Alto da Boa Vista", tipo: "luxo",
    cidade: "São Paulo", bairro: "Alto da Boa Vista",
    quartos: 6, banheiros: 7, garagem: 5, area: 1200, preco: 15000000,
    descricao: "Mansão única em condomínio fechado de altíssimo padrão. Arquitetura contemporânea assinada, piscina olímpica, quadra de tênis, cinema privativo e automação residencial completa.",
    features: ["Piscina olímpica", "Quadra de tênis", "Cinema privativo", "Automação residencial", "Heliponto", "Spa", "Academia completa", "Gerador próprio"],
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", destaque: false
  },
  {
    id: 5, nome: "Studio Moderno Pinheiros", tipo: "apartamento",
    cidade: "São Paulo", bairro: "Pinheiros",
    quartos: 1, banheiros: 1, garagem: 1, area: 42, preco: 420000,
    descricao: "Studio inteligente e bem planejado em Pinheiros, próximo ao metrô e às melhores opções de gastronomia e cultura da cidade. Ideal para quem valoriza localização e modernidade.",
    features: ["Metrô próximo", "Mobiliado", "Cozinha planejada", "Ar-condicionado", "Portaria 24h", "Bicicletário"],
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", destaque: false
  },
  {
    id: 6, nome: "Casa Familiar Curitiba", tipo: "casa",
    cidade: "Curitiba", bairro: "Batel",
    quartos: 3, banheiros: 2, garagem: 2, area: 180, preco: 780000,
    descricao: "Casa com ótima planta no melhor bairro de Curitiba. Ambiente amplo e aconchegante com quintal arborizado, churrasqueira e estrutura perfeita para famílias.",
    features: ["Quintal", "Churrasqueira", "Alameda arborizada", "Depósito", "Portão eletrônico", "Calefação"],
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", destaque: true
  },
  {
    id: 7, nome: "Penthouse Leblon", tipo: "cobertura",
    cidade: "Rio de Janeiro", bairro: "Leblon",
    quartos: 3, banheiros: 3, garagem: 2, area: 280, preco: 8500000,
    descricao: "Penthouse exclusivo no Leblon com vista deslumbrante para a Lagoa Rodrigo de Freitas. Projeto de interiores assinado, varanda enorme e piscina com borda infinita.",
    features: ["Vista lagoa", "Piscina borda infinita", "Varanda enorme", "Projeto assinado", "Portaria 24h", "Vaga coberta"],
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", destaque: false
  },
  {
    id: 8, nome: "Casa de Praia Premium", tipo: "luxo",
    cidade: "Florianópolis", bairro: "Jurerê Internacional",
    quartos: 5, banheiros: 5, garagem: 3, area: 600, preco: 7200000,
    descricao: "Casa de praia exclusiva em Jurerê Internacional, a 200m do mar. Piscina aquecida, spa, sala de jogos e acesso direto à praia privativa do condomínio.",
    features: ["200m do mar", "Piscina aquecida", "Spa", "Sala de jogos", "Praia privativa", "Churrasqueira gourmet"],
    img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80", destaque: true
  },
  {
    id: 9, nome: "Flat Executivo Savassi", tipo: "apartamento",
    cidade: "Belo Horizonte", bairro: "Savassi",
    quartos: 1, banheiros: 1, garagem: 1, area: 58, preco: 390000,
    descricao: "Flat bem localizado na Savassi, o bairro mais desejado de Belo Horizonte. Ideal para executivos ou investimento. Com serviços de hotel inclusos.",
    features: ["Room service", "Lavanderia", "Academia", "Restaurante no térreo", "Business center", "Wi-Fi fibra"],
    img: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80", destaque: false
  },
  {
    id: 10, nome: "Casa em Condomínio Fechado", tipo: "casa",
    cidade: "Fortaleza", bairro: "Eusébio",
    quartos: 4, banheiros: 3, garagem: 2, area: 220, preco: 680000,
    descricao: "Casa moderna em condomínio fechado de alto padrão. Lazer completo com clube, piscina, quadra poliesportiva e área verde. Segurança 24h e ruas arborizadas.",
    features: ["Clube", "Piscina coletiva", "Quadra poliesportiva", "Área verde", "Segurança 24h", "Parque infantil"],
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", destaque: true
  },
  {
    id: 11, nome: "Loft Industrial Chic", tipo: "apartamento",
    cidade: "São Paulo", bairro: "Vila Madalena",
    quartos: 2, banheiros: 1, garagem: 1, area: 110, preco: 890000,
    descricao: "Loft com pé-direito duplo e estilo industrial na Vila Madalena. Tijolos aparentes, mezanino, janelões e localização privilegiada próxima a restaurantes e galerias de arte.",
    features: ["Pé-direito duplo", "Mezanino", "Tijolos aparentes", "Janelões", "Próx. galeria", "Design único"],
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", destaque: false
  },
  {
    id: 12, nome: "Cobertura Contemporânea", tipo: "cobertura",
    cidade: "Florianópolis", bairro: "Beira Mar Norte",
    quartos: 3, banheiros: 3, garagem: 2, area: 310, preco: 3200000,
    descricao: "Cobertura contemporânea na Beira Mar Norte com vista de 360° para o mar e a lagoa. Terraço privativo, churrasqueira e acabamentos de altíssimo padrão.",
    features: ["Vista 360°", "Terraço privativo", "Churrasqueira", "Vista mar e lagoa", "Lareira", "Projeto assinado"],
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", destaque: false
  }
];

/* ── ESTADO ── */
var favoritos = JSON.parse(localStorage.getItem('casago_favoritos') || '[]');
var usuarioLogado = JSON.parse(localStorage.getItem('casago_usuario') || 'null');
var filtrosAtivos = { tipo: '', quartos: '', cidade: '', precoMin: '', precoMax: '', ordem: 'default' };
var imovelAtual = null;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function () {
  atualizarNavbarAuth();
  atualizarBadgeFavoritos();
  renderDestaques();
  renderImoveis(imoveis);
  window.addEventListener('scroll', handleNavbarScroll);
  observeReveal();
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); closeDetalhe(); }
  });
});

/* ── NAVEGAÇÃO ── */
function showSection(id) {
  document.querySelectorAll('.section').forEach(function (s) { s.classList.remove('active'); });
  var sec = document.getElementById('section-' + id);
  if (sec) sec.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'favoritos') renderFavoritos();
  closeMobileMenu();
}

function setActive(el) {
  document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
  if (el) el.classList.add('active');
}

/* ── NAVBAR ── */
function handleNavbarScroll() {
  var nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
}

function toggleMenu() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('navLinks').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navLinks').classList.remove('open');
}

/* ── AUTH ── */
function openModal(tipo) {
  document.getElementById('modalOverlay').classList.add('open');
  switchModal(tipo);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  var le = document.getElementById('loginError');
  var ce = document.getElementById('cadError');
  if (le) le.classList.add('hidden');
  if (ce) ce.classList.add('hidden');
}

function closeModalOverlay(event) {
  if (event.target === document.getElementById('modalOverlay')) closeModal();
}

function switchModal(tipo) {
  var login = document.getElementById('loginModal');
  var cad = document.getElementById('cadastroModal');
  if (tipo === 'login') { login.classList.remove('hidden'); cad.classList.add('hidden'); }
  else { cad.classList.remove('hidden'); login.classList.add('hidden'); }
}

function fazerLogin(e) {
  e.preventDefault();
  var email = document.getElementById('loginEmail').value.trim();
  var senha = document.getElementById('loginSenha').value;
  var errorEl = document.getElementById('loginError');
  var usuarios = JSON.parse(localStorage.getItem('casago_usuarios') || '[]');

  if (!email || !senha) { showError(errorEl, '⚠️ Preencha todos os campos.'); return; }

  var usuario = usuarios.find(function (u) { return u.email === email && u.senha === senha; });
  if (!usuario) { showError(errorEl, '❌ E-mail ou senha incorretos.'); return; }

  usuarioLogado = { nome: usuario.nome, email: usuario.email };
  localStorage.setItem('casago_usuario', JSON.stringify(usuarioLogado));
  atualizarNavbarAuth();
  closeModal();
  showToast('✅ Bem-vindo de volta, ' + usuario.nome.split(' ')[0] + '!', 'success');
}

function fazerCadastro(e) {
  e.preventDefault();
  var nome = document.getElementById('cadNome').value.trim();
  var email = document.getElementById('cadEmail').value.trim();
  var senha = document.getElementById('cadSenha').value;
  var confirma = document.getElementById('cadConfirma').value;
  var errorEl = document.getElementById('cadError');

  if (!nome || !email || !senha || !confirma) { showError(errorEl, '⚠️ Preencha todos os campos.'); return; }
  if (nome.length < 3) { showError(errorEl, '⚠️ Nome deve ter pelo menos 3 caracteres.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(errorEl, '⚠️ E-mail inválido.'); return; }
  if (senha.length < 6) { showError(errorEl, '⚠️ Senha deve ter pelo menos 6 caracteres.'); return; }
  if (senha !== confirma) { showError(errorEl, '❌ As senhas não coincidem.'); return; }

  var usuarios = JSON.parse(localStorage.getItem('casago_usuarios') || '[]');
  if (usuarios.find(function (u) { return u.email === email; })) {
    showError(errorEl, '⚠️ E-mail já cadastrado.'); return;
  }

  usuarios.push({ nome: nome, email: email, senha: senha });
  localStorage.setItem('casago_usuarios', JSON.stringify(usuarios));
  usuarioLogado = { nome: nome, email: email };
  localStorage.setItem('casago_usuario', JSON.stringify(usuarioLogado));
  atualizarNavbarAuth();
  closeModal();
  showToast('🎉 Conta criada! Bem-vindo(a), ' + nome.split(' ')[0] + '!', 'success');
}

function logout() {
  usuarioLogado = null;
  localStorage.removeItem('casago_usuario');
  atualizarNavbarAuth();
  showToast('👋 Até logo!', 'success');
}

function atualizarNavbarAuth() {
  var navAuth = document.getElementById('navAuth');
  var navUser = document.getElementById('navUser');
  var userName = document.getElementById('userName');
  var userAvatar = document.getElementById('userAvatar');
  if (usuarioLogado) {
    navAuth.classList.add('hidden');
    navUser.classList.remove('hidden');
    userName.textContent = usuarioLogado.nome.split(' ')[0];
    userAvatar.textContent = usuarioLogado.nome.charAt(0).toUpperCase();
  } else {
    navAuth.classList.remove('hidden');
    navUser.classList.add('hidden');
  }
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(function () { el.classList.add('hidden'); }, 4000);
}

function togglePass(inputId, btn) {
  var input = document.getElementById(inputId);
  if (input.type === 'password') { input.type = 'text'; btn.textContent = '🙈'; }
  else { input.type = 'password'; btn.textContent = '👁️'; }
}

/* ── HELPERS ── */
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
}

function getTipoBadge(tipo) {
  var badges = { casa: '🏠 Casa', apartamento: '🏢 Apartamento', cobertura: '🌇 Cobertura', luxo: '💎 Alto Padrão' };
  return badges[tipo] || tipo;
}

/* ── CRIAR CARD (sem aspas aninhadas no onerror) ── */
function criarCard(imovel, delay) {
  delay = delay || 0;
  var isFav = favoritos.indexOf(imovel.id) !== -1;

  /* wrapper */
  var card = document.createElement('article');
  card.className = 'imovel-card';
  card.style.animationDelay = (delay * 0.07) + 's';

  /* badge tipo */
  var badge = document.createElement('div');
  badge.className = 'card-badge';
  badge.textContent = getTipoBadge(imovel.tipo);

  /* botão favorito */
  var btnFav = document.createElement('button');
  btnFav.className = 'btn-fav' + (isFav ? ' active' : '');
  btnFav.setAttribute('aria-label', 'Favoritar');
  btnFav.textContent = isFav ? '❤️' : '🤍';
  btnFav.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleFavorito(imovel.id, btnFav);
  });

  /* imagem */
  var imgWrap = document.createElement('div');
  imgWrap.className = 'card-img-wrap';

  var img = document.createElement('img');
  img.src = imovel.img;
  img.alt = imovel.nome;
  img.loading = 'lazy';
  img.addEventListener('error', function () {
    imgWrap.innerHTML = '';
    var ph = document.createElement('div');
    ph.className = 'card-img-placeholder';
    ph.textContent = '🏠';
    imgWrap.appendChild(ph);
  });
  imgWrap.appendChild(img);

  /* corpo */
  var body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML =
    '<p class="card-location">📍 ' + imovel.bairro + ', ' + imovel.cidade + '</p>' +
    '<h3 class="card-name">' + imovel.nome + '</h3>' +
    '<div class="card-specs">' +
      '<span class="spec">🛏️ ' + imovel.quartos + ' quarto' + (imovel.quartos > 1 ? 's' : '') + '</span>' +
      '<span class="spec">🚿 ' + imovel.banheiros + ' ban.</span>' +
      '<span class="spec">🚗 ' + imovel.garagem + ' vaga' + (imovel.garagem > 1 ? 's' : '') + '</span>' +
      '<span class="spec">📐 ' + imovel.area + 'm²</span>' +
    '</div>' +
    '<div class="card-footer">' +
      '<div class="card-price">' +
        '<strong>' + formatarPreco(imovel.preco) + '</strong>' +
        '<small>Preço total</small>' +
      '</div>' +
      '<button class="btn-detalhe">Ver detalhes</button>' +
    '</div>';

  /* evento do botão detalhes */
  body.querySelector('.btn-detalhe').addEventListener('click', function () {
    abrirDetalhe(imovel.id);
  });

  card.appendChild(badge);
  card.appendChild(btnFav);
  card.appendChild(imgWrap);
  card.appendChild(body);
  return card;
}

/* ── RENDER DESTAQUES (home) ── */
function renderDestaques() {
  var grid = document.getElementById('destaquesGrid');
  if (!grid) return;
  grid.innerHTML = '';
  var lista = imoveis.filter(function (i) { return i.destaque; }).slice(0, 6);
  lista.forEach(function (imovel, idx) {
    grid.appendChild(criarCard(imovel, idx));
  });
}

/* ── RENDER IMÓVEIS (página imóveis) ── */
function renderImoveis(lista) {
  var grid = document.getElementById('imoveisGrid');
  var noResults = document.getElementById('noResults');
  var countEl = document.getElementById('resultCount');
  if (!grid) return;

  grid.innerHTML = '';

  if (lista.length === 0) {
    noResults.classList.remove('hidden');
    if (countEl) countEl.textContent = '0 imóveis encontrados';
    return;
  }

  noResults.classList.add('hidden');
  if (countEl) countEl.textContent = lista.length + ' imóvel' + (lista.length > 1 ? 's encontrados' : ' encontrado');

  lista.forEach(function (imovel, idx) {
    grid.appendChild(criarCard(imovel, idx));
  });
}

/* ── RENDER FAVORITOS ── */
function renderFavoritos() {
  var grid = document.getElementById('favoritosGrid');
  var noFav = document.getElementById('noFavoritos');
  if (!grid) return;
  grid.innerHTML = '';
  var lista = imoveis.filter(function (i) { return favoritos.indexOf(i.id) !== -1; });
  if (lista.length === 0) { noFav.classList.remove('hidden'); return; }
  noFav.classList.add('hidden');
  lista.forEach(function (imovel, idx) { grid.appendChild(criarCard(imovel, idx)); });
}

/* ── FAVORITOS ── */
function toggleFavorito(id, btn) {
  var imovel = imoveis.find(function (i) { return i.id === id; });
  var idx = favoritos.indexOf(id);
  if (idx === -1) {
    favoritos.push(id);
    if (btn) { btn.textContent = '❤️'; btn.classList.add('active'); }
    showToast('❤️ "' + imovel.nome + '" adicionado!');
  } else {
    favoritos.splice(idx, 1);
    if (btn) { btn.textContent = '🤍'; btn.classList.remove('active'); }
    showToast('🤍 "' + imovel.nome + '" removido.');
    var favSec = document.getElementById('section-favoritos');
    if (favSec && favSec.classList.contains('active')) renderFavoritos();
  }
  localStorage.setItem('casago_favoritos', JSON.stringify(favoritos));
  atualizarBadgeFavoritos();
}

function atualizarBadgeFavoritos() {
  var badge = document.getElementById('favBadge');
  if (badge) badge.textContent = favoritos.length;
}

/* ── FILTROS ── */
function selectChip(chip, grupo) {
  var groupId = 'filter' + grupo.charAt(0).toUpperCase() + grupo.slice(1);
  var container = document.getElementById(groupId);
  if (!container) return;
  container.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
  chip.classList.add('active');
  filtrosAtivos[grupo] = chip.getAttribute('data-value');
  applyFilters();
}

function applyFilters() {
  var lista = imoveis.slice();

  var busca = (document.getElementById('filterSearch').value || '').toLowerCase().trim();
  if (busca) {
    lista = lista.filter(function (i) {
      return i.nome.toLowerCase().indexOf(busca) !== -1 ||
             i.cidade.toLowerCase().indexOf(busca) !== -1 ||
             i.bairro.toLowerCase().indexOf(busca) !== -1;
    });
  }

  if (filtrosAtivos.tipo) {
    lista = lista.filter(function (i) { return i.tipo === filtrosAtivos.tipo; });
  }

  if (filtrosAtivos.quartos) {
    var q = parseInt(filtrosAtivos.quartos);
    lista = filtrosAtivos.quartos === '4'
      ? lista.filter(function (i) { return i.quartos >= 4; })
      : lista.filter(function (i) { return i.quartos === q; });
  }

  var cidade = document.getElementById('filterCidade').value;
  if (cidade) lista = lista.filter(function (i) { return i.cidade === cidade; });

  var precoMin = parseFloat(document.getElementById('precoMin').value);
  if (!isNaN(precoMin) && precoMin > 0) lista = lista.filter(function (i) { return i.preco >= precoMin; });

  var precoMax = parseFloat(document.getElementById('precoMax').value);
  if (!isNaN(precoMax) && precoMax > 0) lista = lista.filter(function (i) { return i.preco <= precoMax; });

  var ordem = document.getElementById('filterOrdem').value;
  if (ordem === 'preco-asc') lista.sort(function (a, b) { return a.preco - b.preco; });
  else if (ordem === 'preco-desc') lista.sort(function (a, b) { return b.preco - a.preco; });
  else if (ordem === 'nome') lista.sort(function (a, b) { return a.nome.localeCompare(b.nome); });

  renderImoveis(lista);
}

function clearFilters() {
  document.getElementById('filterSearch').value = '';
  document.getElementById('filterCidade').value = '';
  document.getElementById('precoMin').value = '';
  document.getElementById('precoMax').value = '';
  document.getElementById('filterOrdem').value = 'default';

  ['filterTipo', 'filterQuartos'].forEach(function (gid) {
    var g = document.getElementById(gid);
    if (!g) return;
    g.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
    var first = g.querySelector('[data-value=""]');
    if (first) first.classList.add('active');
  });

  filtrosAtivos = { tipo: '', quartos: '', cidade: '', precoMin: '', precoMax: '', ordem: 'default' };
  renderImoveis(imoveis);
  showToast('🔄 Filtros removidos.');
}

/* ── FILTROS MOBILE ── */
function openMobileFilters() {
  document.getElementById('filtersSidebar').classList.add('open');
  document.getElementById('filtersOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeMobileFilters() {
  document.getElementById('filtersSidebar').classList.remove('open');
  document.getElementById('filtersOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

/* ── BUSCA HERO ── */
function heroSearch() {
  var busca = document.getElementById('heroSearch').value.trim();
  var tipo = document.getElementById('heroTipo').value;
  showSection('imoveis');
  setActive(document.querySelectorAll('.nav-link')[1]);
  setTimeout(function () {
    if (busca) document.getElementById('filterSearch').value = busca;
    if (tipo) {
      var chip = document.querySelector('#filterTipo [data-value="' + tipo + '"]');
      if (chip) selectChip(chip, 'tipo');
    }
    applyFilters();
  }, 100);
}

/* ── MODAL DETALHE ── */
function abrirDetalhe(id) {
  var imovel = imoveis.find(function (i) { return i.id === id; });
  if (!imovel) return;
  imovelAtual = imovel;
  var isFav = favoritos.indexOf(id) !== -1;
  var content = document.getElementById('detalheContent');

  var featsHTML = imovel.features.map(function (f) {
    return '<div class="feat-item">✓ ' + f + '</div>';
  }).join('');

  content.innerHTML =
    '<div class="detalhe-imgs">' +
      '<div class="detalhe-tipo-badge">' + getTipoBadge(imovel.tipo) + '</div>' +
      '<img id="detalheImg" src="' + imovel.img + '" alt="' + imovel.nome + '" style="width:100%;height:100%;object-fit:cover;" />' +
    '</div>' +
    '<div class="detalhe-body">' +
      '<div class="detalhe-top">' +
        '<div>' +
          '<h2 class="detalhe-nome">' + imovel.nome + '</h2>' +
          '<p class="detalhe-local">📍 ' + imovel.bairro + ', ' + imovel.cidade + '</p>' +
        '</div>' +
        '<div class="detalhe-preco">' +
          '<strong>' + formatarPreco(imovel.preco) + '</strong>' +
          '<small>Preço total</small>' +
        '</div>' +
      '</div>' +
      '<div class="detalhe-specs">' +
        '<div class="detalhe-spec">🛏️ <div><strong>' + imovel.quartos + '</strong> Quarto' + (imovel.quartos > 1 ? 's' : '') + '</div></div>' +
        '<div class="detalhe-spec">🚿 <div><strong>' + imovel.banheiros + '</strong> Banheiro' + (imovel.banheiros > 1 ? 's' : '') + '</div></div>' +
        '<div class="detalhe-spec">🚗 <div><strong>' + imovel.garagem + '</strong> Vaga' + (imovel.garagem > 1 ? 's' : '') + '</div></div>' +
        '<div class="detalhe-spec">📐 <div><strong>' + imovel.area + 'm²</strong> Área</div></div>' +
      '</div>' +
      '<div class="detalhe-desc"><h4>Sobre o imóvel</h4><p>' + imovel.descricao + '</p></div>' +
      '<div class="detalhe-feats"><h4>Diferenciais</h4><div class="feats-grid">' + featsHTML + '</div></div>' +
      '<div class="detalhe-mapa"><h4>Localização</h4>' +
        '<div class="mapa-fake"><div class="mapa-label">📍 ' + imovel.bairro + ', ' + imovel.cidade + '</div></div>' +
      '</div>' +
      '<div class="detalhe-actions">' +
        '<button class="btn-contato-detalhe" id="btnContatoDet">📞 Entrar em contato</button>' +
        '<button class="btn-fav-detalhe" id="btnFavDet">' + (isFav ? '❤️ Favoritado' : '🤍 Favoritar') + '</button>' +
      '</div>' +
    '</div>';

  /* fix imagem com erro no detalhe */
  var detalheImg = document.getElementById('detalheImg');
  detalheImg.addEventListener('error', function () {
    detalheImg.style.display = 'none';
  });

  document.getElementById('btnContatoDet').addEventListener('click', function () {
    contatoImovel(imovel.id);
  });
  document.getElementById('btnFavDet').addEventListener('click', function () {
    toggleFavorito(imovel.id, null);
    var isFavNow = favoritos.indexOf(imovel.id) !== -1;
    this.textContent = isFavNow ? '❤️ Favoritado' : '🤍 Favoritar';
  });

  document.getElementById('detalheOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetalhe() {
  document.getElementById('detalheOverlay').classList.remove('open');
  document.body.style.overflow = '';
  imovelAtual = null;
}
function closeDetalheOverlay(event) {
  if (event.target === document.getElementById('detalheOverlay')) closeDetalhe();
}

function contatoImovel(id) {
  var imovel = imoveis.find(function (i) { return i.id === id; });
  closeDetalhe();
  showSection('contato');
  setActive(document.querySelectorAll('.nav-link')[3]);
  setTimeout(function () {
    var assunto = document.getElementById('cAssunto');
    var msg = document.getElementById('cMsg');
    if (assunto) assunto.value = 'Quero comprar um imóvel';
    if (msg) msg.value = 'Olá! Tenho interesse no imóvel "' + imovel.nome + '" em ' + imovel.bairro + ', ' + imovel.cidade + '. Gostaria de mais informações.';
  }, 100);
}

/* ── CONTATO ── */
function enviarContato(e) {
  e.preventDefault();
  var nome = document.getElementById('cNome').value.trim();
  var email = document.getElementById('cEmail').value.trim();
  if (!nome || !email) { showToast('⚠️ Preencha os campos obrigatórios.', 'error'); return; }
  var btn = e.target.querySelector('.btn-submit');
  var orig = btn.textContent;
  btn.textContent = '⏳ Enviando...';
  btn.disabled = true;
  setTimeout(function () {
    btn.textContent = orig;
    btn.disabled = false;
    e.target.reset();
    showToast('✅ Mensagem enviada! Entraremos em contato em breve.', 'success');
  }, 1500);
}

/* ── TOAST ── */
function showToast(msg, tipo) {
  var container = document.getElementById('toastContainer');
  var toast = document.createElement('div');
  toast.className = 'toast' + (tipo ? ' ' + tipo : '');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(function () {
    toast.style.animation = 'toastOut .3s ease forwards';
    setTimeout(function () { toast.remove(); }, 300);
  }, 3500);
}

/* ── SCROLL REVEAL ── */
function observeReveal() {
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
}