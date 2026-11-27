
const whatsappNumber = "212779583670";

const products = [
  { name: "100 Diamonds", price: 16, icon: "💎" },
  { name: "210 Diamonds", price: 30, icon: "💎" },
  { name: "530 Diamonds", price: 72, icon: "💎" },
  { name: "1080 Diamonds", price: 140, icon: "💎" },
  { name: "2200 Diamonds", price: 280, icon: "💎" },
  { name: "Booyah Pass", price: 48, icon: "🎟️" }
];

const container = document.getElementById("products");

const packName = document.getElementById("packName");
const packPrice = document.getElementById("packPrice");

// عرض الباقات وأزرار الشراء
products.forEach((product, index) => {
  const card = document.createElement("div");
  card.className = "product";

  card.innerHTML = `
    <div class="product-icon">${product.icon}</div>
    <h3>${product.name}</h3>
    <div class="product-price">${product.price} DH</div>
    <button type="button">BUY NOW 🛒</button>
  `;

  card.querySelector("button").addEventListener("click", () => {
    packName.value = product.name;
    packPrice.value = product.price + " DH";

    document.getElementById("order").scrollIntoView({
      behavior: "smooth"
    });
  });

  container.appendChild(card);
});

// إرسال الطلب إلى WhatsApp الشخصي
document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("playerName").value.trim();
  const id = document.getElementById("playerID").value.trim();
  const pack = packName.value;
  const price = packPrice.value;
  const payment = document.getElementById("paymentMethod").value;

  if (!name || !id || !pack || !price || !payment) {
    alert("عافاك عمر جميع المعلومات!");
    return;
  }

  const message =
`🔥 NEW ORDER - WORK WITH FRIENDS

👤 Name: ${name}
🆔 Free Fire ID: ${id}
💎 Product: ${pack}
💰 Price: ${price}
💳 Payment: ${payment}

شكرا على اختيار متجرنا ❤️`;

  const url =
    "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
});
