
/* ==================================
   WORK WITH FRIENDS SHOP
   FREE FIRE DIAMONDS & BOOYAH PASS
================================== */

// رقم WhatsApp الشخصي ديالك
const whatsappNumber = "212779583670";

// المنتجات والأثمنة
const products = [
  {
    name: "100 Diamonds",
    price: 16,
    icon: "💎"
  },
  {
    name: "210 Diamonds",
    price: 30,
    icon: "💎"
  },
  {
    name: "530 Diamonds",
    price: 72,
    icon: "💎"
  },
  {
    name: "1080 Diamonds",
    price: 140,
    icon: "💎"
  },
  {
    name: "2200 Diamonds",
    price: 280,
    icon: "💎"
  },
  {
    name: "Booyah Pass",
    price: 48,
    icon: "🎟️"
  }
];

// عناصر الصفحة
const productsContainer = document.getElementById("products");
const packName = document.getElementById("packName");
const packPrice = document.getElementById("packPrice");

// عرض جميع المنتجات
function displayProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product";

    const icon = document.createElement("div");
    icon.className = "product-icon";
    icon.textContent = product.icon;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = product.price + " DH";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "BUY NOW 🛒";

    button.addEventListener("click", () => {
      selectProduct(index);
    });

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(button);

    productsContainer.appendChild(card);
  });
}

// اختيار باقة للشراء
function selectProduct(index) {
  const product = products[index];

  packName.value = product.name;
  packPrice.value = product.price + " DH";

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });

  document.getElementById("playerName").focus({
    preventScroll: true
  });
}

// تشغيل عرض المنتجات
displayProducts();

// إرسال الطلب مباشرة للرقم الشخصي
document.getElementById("orderForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("playerName").value.trim();
  const id = document.getElementById("playerID").value.trim();
  const pack = packName.value;
  const price = packPrice.value;
  const payment = document.getElementById("paymentMethod").value;

  if (!name || !id || !pack || !price || !payment) {
    alert("عافاك عمر جميع المعلومات واختار باقة!");
    return;
  }

  const message =
`🔥 NEW ORDER - WORK WITH FRIENDS

👤 الاسم: ${name}
🆔 Free Fire ID: ${id}

💎 المنتج: ${pack}
💰 الثمن: ${price}

💳 طريقة الدفع: ${payment}

شكراً لاختياركم WORK WITH FRIENDS ❤️`;

  const whatsappURL =
    "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
});
