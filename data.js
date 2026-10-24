
const STORAGE_KEY = "campus_items";

const SEED_ITEMS = [
  {
    id: "1",
    title: "Engineering Mathematics Textbook",
    description: "B.S. Grewal, 44th edition. Good condition, no torn pages.",
    price: 350,
    category: "Books",
    imageUrl: "",
    seller: "Amit",
    contact: "amit@college.edu",
    date: Date.now() - 86400000 * 2, 
  },
  {
    id: "2",
    title: "Hero Sprint Cycle",
    description: "21-speed, well maintained. New tyres.",
    price: 4500,
    category: "Cycles",
    imageUrl: "",
    seller: "Priya",
    contact: "9876543210",
    date: Date.now() - 86400000 * 5,
  },
  {
    id: "3",
    title: "Casio FX-991ES Calculator",
    description: "Perfect for engineering students. Includes cover.",
    price: 800,
    category: "Electronics",
    imageUrl: "",
    seller: "Rahul",
    contact: "rahul@college.edu",
    date: Date.now() - 86400000 * 1,
  },
];


function getItems() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS));
    return [...SEED_ITEMS];
  }
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse items", e);
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function addItem(item) {
  const items = getItems();
  items.push(item);
  saveItems(items);
}

function getItemById(id) {
  return getItems().find((item) => item.id === id);
}


function formatPrice(price) {
  return "₹" + Number(price).toLocaleString("en-IN");
}

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + "m ago";
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + "h ago";
  const days = Math.floor(hours / 24);
  if (days < 30) return days + "d ago";
  return new Date(timestamp).toLocaleDateString();
}