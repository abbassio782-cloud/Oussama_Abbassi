// رقم واتساب متجر OUSSAMA SHOP
const SHOP_WHATSAPP = "212779583670";

// لائحة المنتجات
const products = [
  {
    id: 1,
    name: "100 Diamonds",
    description: "باقة 100 جوهرة",
    price: 15,
    icon: "💎"
  },
  {
    id: 2,
    name: "210 Diamonds",
    description: "باقة 210 جوهرة",
    price: 28,
    icon: "💎"
  },
  {
    id: 3,
    name: "530 Diamonds",
    description: "باقة 530 جوهرة",
    price: 70,
    icon: "💎"
  },
  {
    id: 4,
    name: "1080 Diamonds",
    description: "باقة 1080 جوهرة",
    price: 140,
    icon: "💎"
  },
  {
    id: 5,
    name: "2200 Diamonds",
    description: "باقة 2200 جوهرة",
    price: 280,
    icon: "💎"
  },
  {
    id: 6,
    name: "BOOYAH PASS",
    description: "اشتري Booyah Pass",
    price: 45,
    icon: "🎟️"
  }
];

const productsGrid = document.getElementById("productsGrid");
const selectedName = document.getElementById("selectedName");
const selectedPrice = document.getElementById("selectedPrice");
const orderForm = document.getElementById("orderForm");

let selectedProduct = null;

// عرض المنتجات
function displayProducts() {
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product-card";
    card.dataset.id = product.id;

    card.innerHTML = `
      <div class="product-icon">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <div class="product-price">${product.price} DH</div>
      <button class="choose-button" type="button">
        اختار هاد الباقة
      </button>
    `;

    card.querySelector(".choose-button").addEventListener("click", () => {
      selectProduct(product);
    });

    productsGrid.appendChild(card);
  });
}

// اختيار الباقة
function selectProduct(product) {
  selectedProduct = product;

  selectedName.textContent = product.name;
  selectedPrice.textContent = product.price + " DH";

  document.querySelectorAll(".product-card").forEach((card) => {
    card.classList.remove("selected");
  });

  const card = document.querySelector(
    `.product-card[data-id="${product.id}"]`
  );

  if (card) {
    card.classList.add("selected");
  }

  document.getElementById("order").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// إرسال الطلب مباشرة عبر واتساب
orderForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!selectedProduct) {
    alert("اختار الباقة اللي بغيتي الأول!");
    document.getElementById("products").scrollIntoView({
      behavior: "smooth"
    });
    return;
  }

  const customerName = document.getElementById("customerName").value.trim();
  const playerId = document.getElementById("playerId").value.trim();
  const payment = document.getElementById("payment").value;
  const notes = document.getElementById("notes").value.trim();

  if (!customerName || !playerId) {
    alert("عمر الاسم وPlayer ID من فضلك.");
    return;
  }

  if (!/^\d{5,20}$/.test(playerId)) {
    alert("تأكد من Player ID ديالك، خاصو يكون أرقام فقط.");
    return;
  }

  const message = `
🔥 *طلب جديد من OUSSAMA SHOP* 🔥

👤 *اسم الزبون:* ${customerName}

🎮 *Free Fire ID:* ${playerId}

📦 *الباقة:* ${selectedProduct.name}

💎 *الثمن:* ${selectedProduct.price} DH

💳 *طريقة الدفع:* ${payment}

📝 *ملاحظات:* ${notes || "لا توجد"}

شكراً على طلبكم من OUSSAMA SHOP ❤️
  `.trim();

  const whatsappURL =
    "https://wa.me/" +
    SHOP_WHATSAPP +
    "?text=" +
    encodeURIComponent(message);

  window.open(whatsappURL, "_blank");
});

// تشغيل الموقع
displayProducts();
