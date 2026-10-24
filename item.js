
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const detailDiv = document.getElementById("itemDetail");
  const notFoundDiv = document.getElementById("notFound");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showNotFound();
    return;
  }

  const item = getItemById(id);

  if (!item) {
    showNotFound();
    return;
  }

  detailDiv.innerHTML = `
    <h1>${item.title}</h1>
    <div class="price">${formatPrice(item.price)}</div>
    <p class="muted">Posted ${timeAgo(item.date)}</p>
    <div class="desc">${item.description || "No description provided."}</div>
    <div class="seller-box">
      <strong>Seller:</strong> ${item.seller}<br />
      <strong>Contact:</strong> 
      <button class="btn btn-primary" id="showContactBtn">Show contact</button>
      <span id="contactText" hidden>${item.contact}</span>
    </div>
  `;

  const showContactBtn = document.getElementById("showContactBtn");
  const contactText = document.getElementById("contactText");
  if (showContactBtn) {
    showContactBtn.addEventListener("click", () => {
      contactText.hidden = false;
      showContactBtn.hidden = true;
    });
  }

  function showNotFound() {
    detailDiv.hidden = true;
    notFoundDiv.hidden = false;
  }
});