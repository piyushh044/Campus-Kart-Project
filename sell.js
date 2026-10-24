
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const form = document.getElementById("sellForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = Number(document.getElementById("price").value);
    const category = document.getElementById("category").value;
    const imageUrl = document.getElementById("imageUrl").value.trim();
    const seller = document.getElementById("seller").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!title || !price || !category || !seller || !contact) {
      alert("Please fill in all required fields.");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title,
      description,
      price,
      category,
      imageUrl,
      seller,
      contact,
      date: Date.now(),
    };

    addItem(newItem);
    alert("Item posted successfully!");
    window.location.href = "index.html";
  });
});