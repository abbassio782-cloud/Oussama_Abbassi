
const products = [
  { name: "100 Diamonds", price: 15, icon: "💎" },
  { name: "210 Diamonds", price: 28, icon: "💎" },
  { name: "530 Diamonds", price: 70, icon: "💎" },
  { name: "1080 Diamonds", price: 140, icon: "💎" },
  { name: "2200 Diamonds", price: 280, icon: "💎" },
  { name: "BOOYAH PASS", price: 45, icon: "🎟️" }
];

const whatsappNumber = "212779583670";
let currentOrder = null;

// عرض المنتجات
const productsList = document.getElementById("productsList");

products.forEach((product, index) => {
  const card = document.createElement("div");
  card.className = "product-card";

  const icon = document.createElement("div");
  icon.className = "product-icon";
  icon.textContent = product.icon;

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("div");
  price.className = "price";
  price.textContent = product.price + " DH";

  const button = document.createElement("button");
  button.className = "buy-btn";
  button.textContent = "اشتر الآن";
  button.addEventListener("click", () => selectProduct(index));

  card.append(icon, name, price, button);
  productsList.appendChild(card);
});

// لائحة الأثمنة
const priceList = document.getElementById("priceList");

products.forEach(product => {
  const row = document.createElement("div");
  row.className = "price-row";

  const name = document.createElement("span");
  name.textContent = product.icon + " " + product.name;

  const price = document.createElement("strong");
  price.textContent = product.price + " DH";

  row.append(name, price);
  priceList.appendChild(row);
});

// اختيار المنتج
function selectProduct(index) {
  const product = products[index];

  document.getElementById("selectedProduct").value =
    product.name + " - " + product.price + " DH";

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}

// إرسال الطلب
function sendOrder() {
  const product = document.getElementById("selectedProduct").value.trim();
  const playerId = document.getElementById("playerId").value.trim();
  const name = document.getElementById("customerName").value.trim();

  if (!product || !playerId || !name) {
    alert("المرجو اختيار الباقة وإدخال الاسم وPlayer ID!");
    return;
  }

  if (!/^\d+$/.test(playerId)) {
    alert("Player ID خاصو يكون أرقام فقط!");
    return;
  }

  currentOrder = { product, playerId, name };

  const message =
`🔥 OUSSAMA SHOP - NEW ORDER

👤 الاسم: ${name}
🎮 Player ID: ${playerId}
💎 الباقة: ${product}
🟠 طريقة الدفع: Orange Money

الحالة: طلب جديد في انتظار المراجعة`;

  const url = "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");

  document.getElementById("codeSection").classList.remove("hidden");

  document.getElementById("codeSection").scrollIntoView({
    behavior: "smooth"
  });
}

// خانات رمز الطلب
const digits = document.querySelectorAll(".code-digit");

digits.forEach((input, index) => {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, 1);

    if (input.value && index < digits.length - 1) {
      digits[index + 1].focus();
    }
  });

  input.addEventListener("keydown", event => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      digits[index - 1].focus();
    }
  });
});

// إرسال رمز الطلب
function sendCode() {
  if (!currentOrder) {
    alert("أرسل الطلب الأول!");
    return;
  }

  const code = Array.from(digits)
    .map(input => input.value)
    .join("");

  if (!/^\d{4}$/.test(code)) {
    alert("دخل 4 أرقام كاملة!");
    return;
  }

  const message =
`🔥 OUSSAMA SHOP - ORDER CODE

👤 الاسم: ${currentOrder.name}
🎮 Player ID: ${currentOrder.playerId}
💎 الباقة: ${currentOrder.product}

🔢 رمز الطلب: ${code}

الحالة: في انتظار المراجعة`;

  const url = "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}

// نسخ الأثمنة
function copyPrices() {
  const text = products.map(product =>
    product.name + " - " + product.price + " DH"
  ).join("\n");

  navigator.clipboard.writeText(text)
    .then(() => alert("تم نسخ الأثمنة بنجاح!"))
    .catch(() => alert("تعذر النسخ، حاول من جديد."));
}
