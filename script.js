
const ADMIN_PASSWORD = "shop";

const KEYS = {
  ads: "oam_ads",
  orders: "oam_diamond_orders",
  unlocks: "oam_unlock_requests",
  unlocked: "oam_contact_unlocked"
};

function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* التنقل */
function enterShop() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("shop").classList.remove("hidden");
  showSection("accounts");
  window.scrollTo(0, 0);
}

function backHome() {
  document.getElementById("shop").classList.add("hidden");
  document.getElementById("landing").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function showSection(id) {
  document.querySelectorAll(".content-section").forEach(section => {
    section.classList.add("hidden");
  });

  document.getElementById(id).classList.remove("hidden");

  if (id === "accounts") renderAccounts();

  if (id === "admin" && sessionStorage.getItem("oam_admin") === "yes") {
    document.getElementById("adminLogin").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    renderAdmin();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* عروض الجواهر */
const products = [
  { name: "100 Diamonds", price: 15, description: "شحن 100 جوهرة" },
  { name: "210 Diamonds", price: 28, description: "شحن 210 جوهرة" },
  { name: "530 Diamonds", price: 70, description: "شحن 530 جوهرة" },
  { name: "1080 Diamonds", price: 140, description: "شحن 1080 جوهرة" },
  { name: "2200 Diamonds", price: 280, description: "شحن 2200 جوهرة" },
  { name: "BOOYAH PASS", price: 45, description: "Booyah Pass - 300 Diamonds" }
];

function renderProducts() {
  const container = document.getElementById("diamondProducts");

  container.innerHTML = products.map((product, index) => `
    <div class="card">
      <h3>💎 ${safe(product.name)}</h3>
      <p>${safe(product.description)}</p>
      <div class="price">${product.price} DH</div>
      <button onclick="selectProduct(${index})">اختيار العرض</button>
    </div>
  `).join("");
}

function selectProduct(index) {
  document.getElementById("diamondProduct").value = products[index].name;
  document.getElementById("diamonds").scrollIntoView({ behavior: "smooth" });
  document.getElementById("playerName").focus();
}

/* إرسال طلب الشحن */
document.getElementById("diamondForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const product = document.getElementById("diamondProduct").value;
  const playerName = document.getElementById("playerName").value.trim();
  const playerId = document.getElementById("playerId").value.trim();
  const reference = document.getElementById("diamondReference").value.trim();

  if (!product) {
    alert("اختار عرض الجواهر أولا.");
    return;
  }

  const selected = products.find(item => item.name === product);
  const orders = getData(KEYS.orders);

  orders.push({
    id: Date.now(),
    product,
    price: selected.price,
    playerName,
    playerId,
    reference,
    status: "pending",
    date: new Date().toLocaleString("ar-MA")
  });

  saveData(KEYS.orders, orders);
  alert("تم إرسال طلبك! انتظر مراجعة الإدارة.");
  this.reset();
});

/* إرسال حساب للبيع */
document.getElementById("sellForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const title = document.getElementById("sellerTitle").value.trim();
  const description = document.getElementById("sellerDescription").value.trim();
  const price = Number(document.getElementById("sellerPrice").value);
  const whatsapp = document.getElementById("sellerWhatsapp").value.trim();
  const files = Array.from(document.getElementById("sellerPhotos").files).slice(0, 4);

  if (price <= 0) {
    alert("دخل ثمن صحيح.");
    return;
  }

  try {
    const photos = await Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }));

    const ads = getData(KEYS.ads);

    ads.push({
      id: Date.now(),
      title,
      description,
      sellerPrice: price,
      displayPrice: price + 15,
      whatsapp,
      photos,
      status: "pending",
      date: new Date().toLocaleString("ar-MA")
    });

    saveData(KEYS.ads, ads);
    alert("توصلنا بطلبك! غادي تراجع الإدارة الحساب ديالك.");
    this.reset();

  } catch (error) {
    alert("ما قدرناش نحفظو الصور. جرب صور أقل أو أصغر.");
  }
});

/* عرض الحسابات المقبولة */
function renderAccounts() {
  const container = document.getElementById("accountsList");
  const ads = getData(KEYS.ads).filter(ad => ad.status === "approved");
  const unlocked = localStorage.getItem(KEYS.unlocked) === "yes";

  if (!ads.length) {
    container.innerHTML = "<p>ما كاين حتى حساب متوفر حاليا. رجع من بعد!</p>";
    return;
  }

  container.innerHTML = ads.map(ad => `
    <div class="card">
      ${ad.photos?.length ? `<img src="${ad.photos[0]}" alt="صورة الحساب">` : ""}
      <h3>${safe(ad.title)}</h3>
      <p>${safe(ad.description)}</p>
      <div class="price">${Number(ad.displayPrice)} DH</div>
      <p>الثمن الأصلي: ${Number(ad.sellerPrice)} DH + 15 DH</p>
      ${
        unlocked
          ? `<a href="https://wa.me/${safe(ad.whatsapp).replace(/\D/g, "")}" target="_blank" rel="noopener">
               <button>تواصل مع البائع</button>
             </a>`
          : `<button onclick="showSection('unlock')">فتح التواصل مع البائعين</button>`
      }
    </div>
  `).join("");
}

/* طلب فتح التواصل */
function sendUnlockRequest() {
  const name = document.getElementById("unlockName").value.trim();
  const reference = document.getElementById("unlockReference").value.trim();

  if (!name || !reference) {
    alert("عمر الاسم ومرجع الأداء.");
    return;
  }

  const requests = getData(KEYS.unlocks);

  requests.push({
    id: Date.now(),
    name,
    reference,
    status: "pending",
    date: new Date().toLocaleString("ar-MA")
  });

  saveData(KEYS.unlocks, requests);

  document.getElementById("unlockStatus").textContent =
    "تم إرسال الطلب، انتظر موافقة الإدارة.";

  document.getElementById("unlockName").value = "";
  document.getElementById("unlockReference").value = "";
}

/* دخول الإدارة */
function adminLogin() {
  const password = document.getElementById("adminPassword").value;

  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem("oam_admin", "yes");
    document.getElementById("adminLogin").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    document.getElementById("loginMessage").textContent = "";
    renderAdmin();
  } else {
    document.getElementById("loginMessage").textContent =
      "كلمة المرور غير صحيحة!";
  }
}

function adminLogout() {
  sessionStorage.removeItem("oam_admin");
  document.getElementById("adminPanel").classList.add("hidden");
  document.getElementById("adminLogin").classList.remove("hidden");
  document.getElementById("adminPassword").value = "";
}

/* لوحة الإدارة */
function renderAdmin() {
  renderPendingAds();
  renderDiamondOrders();
  renderUnlockRequests();
}

function renderPendingAds() {
  const container = document.getElementById("pendingAds");
  const ads = getData(KEYS.ads);

  if (!ads.length) {
    container.innerHTML = "<p>ما كايناش طلبات حسابات.</p>";
    return;
  }

  container.innerHTML = ads.map(ad => `
    <div class="admin-item">
      <h3>${safe(ad.title)}</h3>
      <p>${safe(ad.description)}</p>
      <p>ثمن البائع: ${Number(ad.sellerPrice)} DH</p>
      <p>ثمن العرض: ${Number(ad.displayPrice)} DH</p>
      <p>WhatsApp البائع: ${safe(ad.whatsapp)}</p>
      <p>الحالة: ${safe(ad.status)}</p>

      ${ad.photos?.map(photo =>
        `<img src="${photo}" style="width:85px;height:75px;object-fit:cover;border-radius:8px;margin:4px">`
      ).join("") || ""}

      <div>
        <button onclick="approveAd(${ad.id})">قبول</button>
        <button onclick="editAdPrice(${ad.id})">تعديل الثمن</button>
        <button class="reject" onclick="rejectAd(${ad.id})">رفض / حذف</button>
      </div>
    </div>
  `).join("");
}

function approveAd(id) {
  const ads = getData(KEYS.ads);
  const ad = ads.find(item => item.id === id);
  if (!ad) return;

  ad.status = "approved";
  saveData(KEYS.ads, ads);
  renderAdmin();
}

function rejectAd(id) {
  if (!confirm("واش متأكد بغيتي تحذف هاد الحساب؟")) return;

  saveData(KEYS.ads, getData(KEYS.ads).filter(ad => ad.id !== id));
  renderAdmin();
}

function editAdPrice(id) {
  const ads = getData(KEYS.ads);
  const ad = ads.find(item => item.id === id);
  if (!ad) return;

  const newPrice = Number(prompt("دخل الثمن الجديد للبائع بالدرهم:", ad.sellerPrice));
  if (!Number.isFinite(newPrice) || newPrice <= 0) return;

  ad.sellerPrice = newPrice;
  ad.displayPrice = newPrice + 15;

  saveData(KEYS.ads, ads);
  renderAdmin();
}

/* إدارة طلبات الجواهر */
function renderDiamondOrders() {
  const container = document.getElementById("diamondOrders");
  const orders = getData(KEYS.orders);

  if (!orders.length) {
    container.innerHTML = "<p>ما كايناش طلبات شحن حاليا.</p>";
    return;
  }

  container.innerHTML = orders.map(order => `
    <div class="admin-item">
      <h3>${safe(order.product)}</h3>
      <p>الثمن: ${Number(order.price)} DH</p>
      <p>اسم اللاعب: ${safe(order.playerName)}</p>
      <p>ID اللاعب: ${safe(order.playerId)}</p>
      <p>مرجع الأداء: ${safe(order.reference)}</p>
      <p>الحالة: ${safe(order.status)}</p>
      ${
        order.status === "pending"
          ? `<button onclick="completeDiamondOrder(${order.id})">تم تنفيذ الطلب</button>`
          : ""
      }
      <button class="reject" onclick="deleteDiamondOrder(${order.id})">حذف</button>
    </div>
  `).join("");
}

function completeDiamondOrder(id) {
  const orders = getData(KEYS.orders);
  const order = orders.find(item => item.id === id);
  if (!order) return;

  order.status = "completed";
  saveData(KEYS.orders, orders);
  renderAdmin();
}

function deleteDiamondOrder(id) {
  saveData(KEYS.orders, getData(KEYS.orders).filter(order => order.id !== id));
  renderAdmin();
}

/* إدارة طلبات فتح التواصل */
function renderUnlockRequests() {
  const container = document.getElementById("unlockRequests");
  const requests = getData(KEYS.unlocks);

  if (!requests.length) {
    container.innerHTML = "<p>ما كايناش طلبات فتح التواصل.</p>";
    return;
  }

  container.innerHTML = requests.map(request => `
    <div class="admin-item">
      <h3>${safe(request.name)}</h3>
      <p>مرجع الأداء: ${safe(request.reference)}</p>
      <p>الحالة: ${safe(request.status)}</p>
      ${
        request.status === "pending"
          ? `<button onclick="approveUnlock(${request.id})">قبول الطلب</button>`
          : ""
      }
      <button class="reject" onclick="deleteUnlock(${request.id})">حذف</button>
    </div>
  `).join("");
}

function approveUnlock(id) {
  const requests = getData(KEYS.unlocks);
  const request = requests.find(item => item.id === id);
  if (!request) return;

  request.status = "approved";
  saveData(KEYS.unlocks, requests);
  localStorage.setItem(KEYS.unlocked, "yes");

  renderAdmin();
  renderAccounts();
}

function deleteUnlock(id) {
  saveData(KEYS.unlocks, getData(KEYS.unlocks).filter(item => item.id !== id));
  renderAdmin();
}

/* تشغيل المتجر */
renderProducts();
renderAccounts();
