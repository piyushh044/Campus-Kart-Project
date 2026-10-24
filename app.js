
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const searchInput = document.getElementById("searchInput");
  const categoryChips = document.getElementById("categoryChips");
  const sortSelect = document.getElementById("sortSelect");
  const itemsGrid = document.getElementById("itemsGrid");
  const resultCount = document.getElementById("resultCount");
  const emptyState = document.getElementById("emptyState");

  let allItems = getItems();
  let activeCategory = "All";
  let searchTerm = "";
  let sortBy = "new";

  function renderChips() {
    const categories = ["All", ...new Set(allItems.map((i) => i.category))];
    categoryChips.innerHTML = categories
      .map(
        (cat) =>
          `<button class="chip ${cat === activeCategory ? "active" : ""}" data-cat="${cat}">${cat}</button>`
      )
      .join("");

    categoryChips.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeCategory = chip.dataset.cat;
        renderChips();
        renderItems();
      });
    });
  }

  function renderItems() {

    let filtered = allItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        (item.description || "").toLowerCase().includes(term) ||
        item.seller.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      filtered.sort((a, b) => b.date - a.date); 
    }

    resultCount.textContent = `${filtered.length} item${filtered.length !== 1 ? "s" : ""} found`;

    if (filtered.length === 0) {
      itemsGrid.innerHTML = "";
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    itemsGrid.innerHTML = filtered
      .map(
        (item) => `
        <a href="item.html?id=${item.id}" class="card">
          <div class="card-img">${
            item.imageUrl
              ? `<img src="${item.imageUrl}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover;" />`
              : getCategoryEmoji(item.category)
          }</div>
          <div class="card-body">
            <div class="card-title">${item.title}</div>
            <div class="card-price">${formatPrice(item.price)}</div>
            <div class="card-meta">${item.seller} · ${timeAgo(item.date)}</div>
          </div>
        </a>
      `
      )
      .join("");
  }

  function getCategoryEmoji(category) {
    const map = {
      Books: "📚",
      Electronics: "💻",
      Cycles: "🚲",
      Hostel: "🛏️",
      Others: "📦",
    };
    return map[category] || "📦";
  }

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderItems();
  });

  sortSelect.addEventListener("change", (e) => {
    sortBy = e.target.value;
    renderItems();
  });

  renderChips();
  renderItems();
});