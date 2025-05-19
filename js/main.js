// ===== Смена темы =====
function switchTheme() {
  const link = document.getElementById('theme-link');
  link.href = link.href.includes('light') ? 'css/dark.css' : 'css/light.css';
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const themeLink = document.getElementById('theme-link');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    themeLink.href = 'css/dark.css';
    toggle.checked = true;
  } else {
    themeLink.href = 'css/light.css';
    toggle.checked = false;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      themeLink.href = 'css/dark.css';
      localStorage.setItem('theme', 'dark');
    } else {
      themeLink.href = 'css/light.css';
      localStorage.setItem('theme', 'light');
    }
  });
});

// ===== Раскрытие изображения =====
function expandImage(img) {
  const modal = document.getElementById('expandedImgContainer');
  const expandedImg = document.getElementById('expandedImg');
  const artTitle = document.getElementById('artTitle');
  const artDetails = document.getElementById('artDetails');

  expandedImg.src = img.src;
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add('show'), 10);

  const description = artworks[img.alt];
  if (description) {
    artTitle.textContent = description.title;
    artDetails.textContent = description.details;
  }
}

function closeImage() {
  const modal = document.getElementById('expandedImgContainer');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = "none";
  }, 400);
}

// ===== Цитаты =====
const quotes = [
  {
    text: "Живопись — это поэзия, которую видят, а не слышат.",
    author: "Леонардо да Винчи"
  },
  {
    text: "Я увидел ангела в мраморе и высек его, чтобы освободить.",
    author: "Микеланджело Буонарроти"
  },
  {
    text: "Когда я пишу картину, я чувствую, что сам рождаюсь заново.",
    author: "Рафаэль Санти"
  }
];

let currentQuote = 0;

function showQuote(index) {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  quoteText.classList.remove('visible');
  quoteAuthor.classList.remove('visible');

  setTimeout(() => {
    const quote = quotes[index];
    quoteText.innerText = `"${quote.text}"`;
    quoteAuthor.innerText = `— ${quote.author}`;

    quoteText.classList.add('visible');
    quoteAuthor.classList.add('visible');

    updateDots();
  }, 500);
}

function nextQuote() {
  currentQuote = (currentQuote + 1) % quotes.length;
  showQuote(currentQuote);
}

function prevQuote() {
  currentQuote = (currentQuote - 1 + quotes.length) % quotes.length;
  showQuote(currentQuote);
}

function updateDots() {
  const dotsContainer = document.getElementById('quote-dots');
  dotsContainer.innerHTML = '';

  quotes.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.toggle('active', idx === currentQuote);
    dot.addEventListener('click', () => {
      currentQuote = idx;
      showQuote(currentQuote);
    });
    dotsContainer.appendChild(dot);
  });
}

setInterval(nextQuote, 5000);

// ===== Анимация при прокрутке =====
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});

// ===== Модальные окна (произвольный текст) =====
function openModal(text) {
  document.getElementById('modal-text').innerText = text;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// ===== Произведения искусства =====
const artworks = {
  "Страшный суд": {
    title: "Страшный суд",
    details: "Страшный суд — это финальное событие в христианской эсхатологии, когда всё человечество предстанет перед божьим судом для определения своей вечной участи. Это момент окончательного божественного правосудия, когда каждый человек, живший когда-либо на Земле, получит справедливую оценку своих деяний."
  },
  "Сикстинская капелла": {
    title: "Сикстинская капелла",
    details: "Потолок Сикстинской капеллы — один из главных шедевров искусства эпохи Высокого Возрождения. Его расписал Микеланджело Буонарроти с 1508 по 1512 год."
  },
  "Микеланджело": {
    title: "Микеланджело",
    details: "«Пьета» («Оплакивание Христа», или «Ватиканская Пьета») — одна из ранних и самых знаменитых работ выдающегося художника эпохи Возрождения, скульптора Микеланджело Буонарроти. Хранится «Пьета» в Соборе святого Петра в Ватикане."
  }
};

function showItemsOnScroll() {
  document.querySelectorAll('.art-item').forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      item.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', showItemsOnScroll);
window.addEventListener('load', showItemsOnScroll);

// Убрана функция showItemsOnScroll, так как она не используется без .art-item

// ===== Переключение вкладок =====
function openTab(evt, tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');
  if (tabs && buttons) {
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    const tab = document.getElementById(tabId);
    if (tab) tab.classList.add('active');
    if (evt.currentTarget) evt.currentTarget.classList.add('active');
  }
}

// ===== Увеличение изображений =====
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.wiki-float-img');
  if (images.length > 0) {
    images.forEach(img => {
      img.addEventListener('click', () => {
        images.forEach(otherImg => {
          if (otherImg !== img) otherImg.classList.remove('enlarged');
        });
        img.classList.toggle('enlarged');
      });
    });
  }
});

// ===== Поэты / Модальные окна поэтов =====
document.addEventListener('DOMContentLoaded', () => {
  const poetButtons = document.querySelectorAll('.show-poet-btn');
  if (poetButtons.length > 0) {
    poetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const poetKey = btn.dataset.poet;
        showPoet(poetKey, btn);
      });
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('close-poet-modal')) {
        const modal = e.target.closest('.poet-modal');
        if (modal) modal.remove();
      }
    });
  }
});

// ===== Философы и поиск =====
const philosophers = [
  { name: "Марсилио Фичино (1433–1499)", link: "ficino.html" },
  { name: "Франческо Петрарка (1304–1374)", link: "petrarca.html" },
  { name: "Колюччо Салютати (1331–1406)", link: "salutati.html" },
  { name: "Георгий Гемист (ок.1360–1452)", link: "gempist.html" },
  { name: "Леонардо Бруни (1370/1374–1444)", link: "bruni.html" },
  { name: "Пьетро Баральони (1380–1459)", link: "baraglioni.html" },
  { name: "Джорджио из Трапезунда (1395–1486)", link: "trapezund.html" },
  { name: "Николай Кузанский (1401–1464)", link: "kuzansky.html" },
  { name: "Виссарион Никейский (1403–1472)", link: "nikeskij.html" },
  { name: "Лоренцо Валла (1405–1457)", link: "valla.html" }
];

function searchPhilosophers() {
  const searchInput = document.getElementById('search-input');
  const list = document.getElementById('philosophers-list');
  if (searchInput && list) {
    const searchTerm = searchInput.value.toLowerCase();
    list.innerHTML = '';

    const filtered = philosophers.filter(p => p.name.toLowerCase().includes(searchTerm));

    if (filtered.length === 0) {
      list.innerHTML = '<li>Ничего не найдено</li>';
      return;
    }

    filtered.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.link;
      a.textContent = p.name;
      li.appendChild(a);
      list.appendChild(li);
    });
  }
}

function resetSearch() {
  const searchInput = document.getElementById('search-input');
  const list = document.getElementById('philosophers-list');
  if (searchInput && list) {
    searchInput.value = '';
    list.innerHTML = '';

    philosophers.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.link;
      a.textContent = p.name;
      li.appendChild(a);
      list.appendChild(li);
    });
  }
}
function toggleArtist(artistId) {
      const artistInfo = document.getElementById(artistId);
      if (!artistInfo) return;

      const isHidden = artistInfo.style.display === "none" || artistInfo.style.display === "";
      artistInfo.style.display = isHidden ? "block" : "none";
    }

    // Инициализация: скрыть все блоки информации при загрузке
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll(".artist-info").forEach((info) => {
        info.style.display = "none";
      });
    });