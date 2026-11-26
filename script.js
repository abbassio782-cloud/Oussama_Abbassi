
const $ = id => document.getElementById(id);

const KEYS = {
  admins: "rifii_admins_v6",
  tournaments: "rifii_tournaments_v6",
  requests: "rifii_requests_v6"
};

const defaultTournaments = [
  { id: "solo2027", name: "RAMADAN SOLO", type: "SOLO", date: "2027-02-12", time: "21:00", price: 5, open: true },
  { id: "duo2027", name: "RAMADAN DUO", type: "DUO", date: "2027-02-17", time: "21:00", price: 5, open: true },
  { id: "squad2027", name: "RAMADAN SQUAD", type: "SQUAD", date: "2027-02-22", time: "21:00", price: 5, open: true }
];

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

let admins = read(KEYS.admins, []);
let tournaments = read(KEYS.tournaments, defaultTournaments);
let requests = read(KEYS.requests, []);
let currentAdmin = null;

function saveAll() {
  localStorage.setItem(KEYS.admins, JSON.stringify(admins));
  localStorage.setItem(KEYS.tournaments, JSON.stringify(tournaments));
  localStorage.setItem(KEYS.requests, JSON.stringify(requests));
}

/* إنشاء حساب الدخول الأول أو إضافته إذا لم يكن موجوداً */
if (!admins.some(a => a.username === "admin1")) {
  admins.push({
    username: "admin1",
    password: "oussama2014",
    role: "main"
  });
  saveAll();
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[c]);
}

function teamSize(type) {
  return type === "DUO" ? 1 : type === "SQUAD" ? 3 : 0;
}

function formatDate(date) {
  if (!date) return "غير محدد";
  return new Date(date + "T12:00:00").toLocaleDateString("ar-MA");
}

function renderTournaments() {
  const container = $("tournamentList");
  container.innerHTML = "";

  if (!tournaments.length) {
    container.innerHTML = "<p>لا توجد بطولات حالياً.</p>";
    return;
  }

  tournaments.forEach(t => {
    const accepted = requests.filter(r => r.tournamentId === t.id && r.status === "accepted").length;
    const card = document.createElement("article");
    card.className = "tournament-card";
    card.innerHTML = `
      <div>
        <h3>${escapeHTML(t.name)}</h3>
        <p>🎮 النوع: ${escapeHTML(t.type)}</p>
        <p>📅 التاريخ: ${formatDate(t.date)} - ${escapeHTML(t.time)}</p>
        <p>💰 التسجيل: ${Number(t.price)} DH</p>
        <p>👥 المقبولون: ${accepted}</p>
        <p class="status ${t.open ? "" : "closed"}">${t.open ? "التسجيل مفتوح" : "التسجيل مغلق"}</p>
      </div>
      <div class="card-actions">
        <button class="main-btn" ${t.open ? "" : "disabled"} data-register="${escapeHTML(t.id)}">
          ${t.open ? "سجل الآن" : "التسجيل مغلق"}
        </button>
      </div>`;
    container.appendChild(card);
  });
}

function renderTeamInputs(type) {
  const count = teamSize(type);
  $("teamMembersArea").innerHTML = "";

  for (let i = 1; i <= count; i++) {
    $("teamMembersArea").insertAdjacentHTML("beforeend", `
      <h3>عضو الفريق ${i}</h3>
      <label>اسم العضو</label>
      <input class="member-name" required placeholder="اسم اللاعب ${i}">
      <label>Player ID للعضو</label>
      <input class="member-id" required placeholder="ID اللاعب ${i}">
    `);
  }
}

function openRegistration(id) {
  const t = tournaments.find(x => x.id === id);
  if (!t || !t.open) return;

  $("registrationForm").reset();
  $("registrationTournamentId").value = id;
  $("selectedTournamentInfo").textContent =
    `${t.name} | ${t.type} | ${formatDate(t.date)} | ${t.price} DH`;
  $("registrationMessage").textContent = "";
  renderTeamInputs(t.type);
  $("registrationModal").classList.add("show");
}

function closeModal(id) {
  $(id).classList.remove("show");
}

function renderStats() {
  $("totalRequests").textContent = requests.length;
  $("acceptedRequests").textContent = requests.filter(r => r.status === "accepted").length;
  $("rejectedRequests").textContent = requests.filter(r => r.status === "rejected").length;
  $("pendingRequests").textContent = requests.filter(r => r.status === "pending").length;
}

function renderAdminRequests() {
  const box = $("adminRequests");
  box.innerHTML = "";

  if (!requests.length) {
    box.innerHTML = "<p>لا توجد طلبات تسجيل حتى الآن.</p>";
    return;
  }

  requests.forEach(r => {
    const tournament = tournaments.find(t => t.id === r.tournamentId);
    const card = document.createElement("article");
    card.className = "request-card";
    const members = (r.members || []).map(m =>
      `<p>عضو: ${escapeHTML(m.name)} — ID: ${escapeHTML(m.id)}</p>`
    ).join("");

    card.innerHTML = `
      <h4>${escapeHTML(r.fullName)} — ${escapeHTML(r.gameName)}</h4>
      <p>البطولة: ${escapeHTML(tournament?.name || "بطولة محذوفة")}</p>
      <p>Player ID: ${escapeHTML(r.playerId)}</p>
      <p>الهاتف: ${escapeHTML(r.phone || "غير متوفر")}</p>
      ${members}
      <p>رمز الأداء: ${escapeHTML(r.paymentCode || "غير متوفر")}</p>
      <p>ملاحظة الأداء: ${escapeHTML(r.paymentNote || "لا توجد")}</p>
      <p>حالة الطلب: <strong>${r.status === "accepted" ? "مقبول" : r.status === "rejected" ? "مرفوض" : "معلق"}</strong></p>
      <p>الأداء: <strong>${r.paid ? "تم التأكيد" : "لم يتم التأكيد"}</strong></p>
      <div class="actions">
        <button class="success-btn" data-action="accept" data-id="${r.id}">قبول</button>
        <button class="danger-btn" data-action="reject" data-id="${r.id}">رفض</button>
        <button class="small-btn" data-action="paid" data-id="${r.id}">${r.paid ? "إلغاء تأكيد الأداء" : "تأكيد الأداء"}</button>
        <button class="small-btn" data-action="delete-request" data-id="${r.id}">حذف الطلب</button>
      </div>`;
    box.appendChild(card);
  });
}

function renderManageTournaments() {
  const box = $("manageTournaments");
  box.innerHTML = "";

  tournaments.forEach(t => {
    const card = document.createElement("article");
    card.className = "manage-card";
    card.innerHTML = `
      <h4>${escapeHTML(t.name)}</h4>
      <p>${escapeHTML(t.type)} | ${formatDate(t.date)} | ${t.price} DH</p>
      <p>${t.open ? "التسجيل مفتوح" : "التسجيل مغلق"}</p>
      <div class="actions">
        <button class="small-btn" data-action="edit-tournament" data-id="${t.id}">تعديل</button>
        <button class="small-btn" data-action="toggle-tournament" data-id="${t.id}">${t.open ? "إغلاق التسجيل" : "فتح التسجيل"}</button>
        <button class="danger-btn" data-action="delete-tournament" data-id="${t.id}">حذف</button>
      </div>`;
    box.appendChild(card);
  });
}

function renderAdmins() {
  const box = $("adminAccounts");
  box.innerHTML = "";

  admins.forEach(a => {
    const card = document.createElement("article");
    card.className = "account-card";
    card.innerHTML = `
      <p><strong>${escapeHTML(a.username)}</strong> — ${a.role === "main" ? "ADMIN رئيسي" : "ADMIN مساعد"}</p>
      ${a.username === "admin1" ? "<p>الحساب الرئيسي الأصلي</p>" :
      `<button class="danger-btn" data-action="delete-admin" data-id="${escapeHTML(a.username)}">حذف الحساب</button>`}`;
    box.appendChild(card);
  });
}

function renderDashboard() {
  renderStats();
  renderAdminRequests();
  renderManageTournaments();
  renderAdmins();

  $("loggedAdminInfo").textContent =
    `مرحباً ${currentAdmin.username} — ${currentAdmin.role === "main" ? "ADMIN رئيسي" : "ADMIN مساعد"}`;

  $("adminPermissionMessage").textContent =
    currentAdmin.role === "main" ? "يمكنك إدارة حسابات الإدارة." : "إدارة حسابات Admin متاحة للحساب الرئيسي فقط.";

  $("adminManagement").classList.toggle("hidden", currentAdmin.role !== "main");
}

function showDashboard() {
  $("loginBox").classList.add("hidden");
  $("dashboard").classList.remove("hidden");
  renderDashboard();
}

function showLogin() {
  currentAdmin = null;
  $("loginBox").classList.remove("hidden");
  $("dashboard").classList.add("hidden");
  $("loginUsername").value = "";
  $("loginPassword").value = "";
  $("loginMessage").textContent = "";
}

$("adminTopButton").addEventListener("click", () => {
  $("admin").classList.add("show");
  showLogin();
});

$("closeAdmin").addEventListener("click", () => closeModal("admin"));

$("loginButton").addEventListener("click", () => {
  const username = $("loginUsername").value.trim();
  const password = $("loginPassword").value;
  const account = admins.find(a => a.username === username && a.password === password);

  if (!account) {
    $("loginMessage").textContent = "اسم المستخدم أو كلمة المرور غير صحيحة.";
    $("loginMessage").className = "message error";
    return;
  }

  currentAdmin = account;
  $("loginMessage").textContent = "";
  showDashboard();
});

$("logoutButton").addEventListener("click", showLogin);

$("tournamentList").addEventListener("click", e => {
  const button = e.target.closest("[data-register]");
  if (button) openRegistration(button.dataset.register);
});

$("closeRegistration").addEventListener("click", () => closeModal("registrationModal"));
$("closeEditTournament").addEventListener("click", () => closeModal("editTournamentModal"));

$("registrationForm").addEventListener("submit", e => {
  e.preventDefault();

  const tournamentId = $("registrationTournamentId").value;
  const tournament = tournaments.find(t => t.id === tournamentId);
  if (!tournament || !tournament.open) {
    $("registrationMessage").textContent = "التسجيل في هذه البطولة مغلق.";
    return;
  }

  const members = [...document.querySelectorAll(".member-name")].map((input, i) => ({
    name: input.value.trim(),
    id: document.querySelectorAll(".member-id")[i].value.trim()
  }));

  const request = {
    id: "req_" + Date.now(),
    tournamentId,
    fullName: $("playerFullName").value.trim(),
    gameName: $("playerGameName").value.trim(),
    playerId: $("playerId").value.trim(),
    phone: $("playerPhone").value.trim(),
    members,
    paymentCode: $("paymentCode").value.trim(),
    paymentNote: $("paymentNote").value.trim(),
    status: "pending",
    paid: false,
    createdAt: new Date().toISOString()
  };

  requests.push(request);
  saveAll();

  $("registrationMessage").textContent = "تم إرسال طلبك بنجاح. انتظر قرار الإدارة.";
  $("registrationMessage").className = "message";

  $("registrationForm").reset();
  setTimeout(() => closeModal("registrationModal"), 1800);
});

$("adminRequests").addEventListener("click", e => {
  const button = e.target.closest("[data-action]");
  if (!button) return;

  const request = requests.find(r => r.id === button.dataset.id);
  if (!request) return;

  switch (button.dataset.action) {
    case "accept":
      request.status = "accepted";
      break;
    case "reject":
      request.status = "rejected";
      break;
    case "paid":
      request.paid = !request.paid;
      break;
    case "delete-request":
      if (!confirm("واش متأكد من حذف الطلب؟")) return;
      requests = requests.filter(r => r.id !== request.id);
      break;
  }

  saveAll();
  renderDashboard();
});

$("addTournamentButton").addEventListener("click", () => {
  const name = $("newTournamentName").value.trim();
  const date = $("newTournamentDate").value;
  const time = $("newTournamentTime").value;
  const type = $("newTournamentType").value;
  const price = Number($("newTournamentPrice").value);

  if (!name || !date || !time || price < 0) {
    alert("عمر معلومات البطولة بشكل صحيح.");
    return;
  }

  tournaments.push({
    id: "t_" + Date.now(),
    name, type, date, time, price, open: true
  });

  saveAll();
  $("newTournamentName").value = "";
  $("newTournamentDate").value = "";
  renderTournaments();
  renderDashboard();
  alert("تمت إضافة البطولة.");
});

$("manageTournaments").addEventListener("click", e => {
  const button = e.target.closest("[data-action]");
  if (!button) return;

  const t = tournaments.find(x => x.id === button.dataset.id);
  if (!t) return;

  switch (button.dataset.action) {
    case "toggle-tournament":
      t.open = !t.open;
      break;

    case "delete-tournament":
      if (!confirm("حذف البطولة؟")) return;
      tournaments = tournaments.filter(x => x.id !== t.id);
      break;

    case "edit-tournament":
      $("editTournamentId").value = t.id;
      $("editTournamentName").value = t.name;
      $("editTournamentType").value = t.type;
      $("editTournamentDate").value = t.date;
      $("editTournamentTime").value = t.time;
      $("editTournamentPrice").value = t.price;
      $("editTournamentModal").classList.add("show");
      return;
  }

  saveAll();
  renderTournaments();
  renderDashboard();
});

$("saveTournamentEdit").addEventListener("click", () => {
  const t = tournaments.find(x => x.id === $("editTournamentId").value);
  if (!t) return;

  const name = $("editTournamentName").value.trim();
  const date = $("editTournamentDate").value;
  const time = $("editTournamentTime").value;
  const price = Number($("editTournamentPrice").value);

  if (!name || !date || !time || price < 0) {
    alert("راجع المعلومات.");
    return;
  }

  t.name = name;
  t.type = $("editTournamentType").value;
  t.date = date;
  t.time = time;
  t.price = price;

  saveAll();
  closeModal("editTournamentModal");
  renderTournaments();
  renderDashboard();
});

$("addAdminButton").addEventListener("click", () => {
  if (!currentAdmin || currentAdmin.role !== "main") return;

  const username = $("newAdminUsername").value.trim();
  const password = $("newAdminPassword").value;
  const role = $("newAdminRole").value;

  if (!username || !password) {
    alert("دخل اسم المستخدم وكلمة المرور.");
    return;
  }

  if (admins.some(a => a.username === username)) {
    alert("اسم المستخدم موجود من قبل.");
    return;
  }

  admins.push({ username, password, role });
  saveAll();

  $("newAdminUsername").value = "";
  $("newAdminPassword").value = "";
  renderAdmins();
  alert("تمت إضافة حساب Admin.");
});

$("adminAccounts").addEventListener("click", e => {
  const button = e.target.closest('[data-action="delete-admin"]');
  if (!button || !currentAdmin || currentAdmin.role !== "main") return;

  const username = button.dataset.id;
  if (username === "admin1") return alert("لا يمكن حذف الحساب الرئيسي الأصلي.");
  if (!confirm("حذف حساب الإدارة؟")) return;

  admins = admins.filter(a => a.username !== username);
  saveAll();
  renderAdmins();
});

$("admin").addEventListener("click", e => {
  if (e.target === $("admin")) closeModal("admin");
});

$("registrationModal").addEventListener("click", e => {
  if (e.target === $("registrationModal")) closeModal("registrationModal");
});

$("editTournamentModal").addEventListener("click", e => {
  if (e.target === $("editTournamentModal")) closeModal("editTournamentModal");
});

/* تحديث الواجهة عند فتح الموقع */
renderTournaments();
saveAll();
