
const ADMIN_KEY = "rifii_admins_v6";
const TOURNAMENT_KEY = "rifii_tournaments_v6";
const REQUEST_KEY = "rifii_requests_v6";

const $ = id => document.getElementById(id);

function load(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

let admins = load(ADMIN_KEY, null);
let tournaments = load(TOURNAMENT_KEY, null);
let requests = load(REQUEST_KEY, []);
let currentAdmin = null;

if (!admins) {
  admins = [{
    id: "main-admin",
    username: "admin",
    password: "RIFII",
    role: "main"
  }];
  save(ADMIN_KEY, admins);
}

if (!tournaments) {
  tournaments = [
    {
      id: "solo-2027",
      name: "RAMADAN SOLO",
      type: "SOLO",
      date: "2027-02-12",
      time: "21:00",
      price: 5,
      open: true
    },
    {
      id: "duo-2027",
      name: "RAMADAN DUO",
      type: "DUO",
      date: "2027-02-17",
      time: "21:00",
      price: 5,
      open: true
    },
    {
      id: "squad-2027",
      name: "RAMADAN SQUAD",
      type: "SQUAD",
      date: "2027-02-22",
      time: "21:00",
      price: 5,
      open: true
    }
  ];
  save(TOURNAMENT_KEY, tournaments);
}

function saveAll() {
  save(ADMIN_KEY, admins);
  save(TOURNAMENT_KEY, tournaments);
  save(REQUEST_KEY, requests);
}

function formatDate(date) {
  if (!date) return "غير محدد";
  return new Date(date + "T12:00:00").toLocaleDateString("ar-MA");
}

function roleName(role) {
  return role === "main" ? "ADMIN رئيسي" : "ADMIN مساعد";
}

/* عرض البطولات */

function renderTournaments() {
  const container = $("tournamentList");

  if (!tournaments.length) {
    container.innerHTML = "<p>لا توجد بطولات حاليا.</p>";
    return;
  }

  container.innerHTML = tournaments.map(t => {
    const accepted = requests.filter(
      r => r.tournamentId === t.id && r.status === "accepted"
    );

    return `
      <article class="tournament-card">
        <div>
          <span class="tag">${escapeHTML(t.type)}</span>
          <h3>${escapeHTML(t.name)}</h3>
          <div class="tournament-info">
            <span>📅 ${formatDate(t.date)}</span>
            <span>🕘 ${escapeHTML(t.time)}</span>
            <span>💰 ${Number(t.price) || 0} DH</span>
            <span>👥 ${accepted.length} مشارك مقبول</span>
          </div>
        </div>
        <div>
          ${t.open
            ? `<button class="join-btn" onclick="openRegistration('${t.id}')">سجل الآن</button>`
            : `<span class="closed-label">التسجيل مغلق</span>`}
        </div>
      </article>
    `;
  }).join("");
}

/* التسجيل */

function openRegistration(id) {
  const tournament = tournaments.find(t => t.id === id);

  if (!tournament || !tournament.open) {
    alert("التسجيل في هذه البطولة مغلق.");
    return;
  }

  $("registrationTournamentId").value = id;

  $("selectedTournamentInfo").textContent =
    `${tournament.name} | ${tournament.type} | ${formatDate(tournament.date)} | ${tournament.price} DH`;

  const members = $("teamMembersArea");

  const extraCount = tournament.type === "DUO" ? 1 :
                     tournament.type === "SQUAD" ? 3 : 0;

  members.innerHTML = "";

  for (let i = 1; i <= extraCount; i++) {
    members.innerHTML += `
      <label>اسم اللاعب ${i + 1} في الفريق *</label>
      <input class="member-name" required placeholder="اسم اللاعب ${i + 1}">
      <label>Player ID للاعب ${i + 1} *</label>
      <input class="member-id" required placeholder="Player ID">
    `;
  }

  $("registrationForm").reset();
  $("registrationTournamentId").value = id;

  $("selectedTournamentInfo").textContent =
    `${tournament.name} | ${tournament.type} | ${formatDate(tournament.date)} | ${tournament.price} DH`;

  $("registrationMessage").textContent = "";
  $("registrationModal").classList.remove("hidden");
}

$("closeRegistration").addEventListener("click", () => {
  $("registrationModal").classList.add("hidden");
});

$("registrationForm").addEventListener("submit", event => {
  event.preventDefault();

  const tournamentId = $("registrationTournamentId").value;
  const tournament = tournaments.find(t => t.id === tournamentId);

  if (!tournament || !tournament.open) {
    alert("هذه البطولة غير متاحة حاليا.");
    return;
  }

  const fullName = $("playerFullName").value.trim();
  const gameName = $("playerGameName").value.trim();
  const playerId = $("playerId").value.trim();

  if (!fullName || !gameName || !playerId) {
    $("registrationMessage").textContent = "عمر المعلومات الإجبارية.";
    return;
  }

  const memberNames = [
    ...document.querySelectorAll(".member-name")
  ];

  const memberIds = [
    ...document.querySelectorAll(".member-id")
  ];

  const members = memberNames.map((input, i) => ({
    name: input.value.trim(),
    playerId: memberIds[i].value.trim()
  }));

  if (members.some(m => !m.name || !m.playerId)) {
    $("registrationMessage").textContent =
      "عمر معلومات جميع أعضاء الفريق.";
    return;
  }

  const request = {
    id: "req-" + Date.now() + "-" + Math.floor(Math.random() * 10000),
    tournamentId,
    fullName,
    gameName,
    playerId,
    phone: $("playerPhone").value.trim(),
    members,
    paymentCode: $("paymentCode").value.trim(),
    paymentNote: $("paymentNote").value.trim(),
    paymentStatus: "not-confirmed",
    status: "pending",
    createdAt: new Date().toISOString()
  };

  requests.push(request);
  saveAll();

  $("registrationMessage").textContent =
    "✅ توصلنا بطلبك! غادي تبقى النتيجة حتى تراجع الإدارة.";

  $("registrationMessage").style.color = "#21c77a";

  $("registrationForm").reset();

  setTimeout(() => {
    $("registrationModal").classList.add("hidden");
    renderTournaments();
  }, 1800);
});

/* فتح لوحة الإدارة */

$("adminTopButton").addEventListener("click", () => {
  $("admin").classList.remove("hidden");
  $("admin").scrollIntoView({ behavior: "smooth" });
});

$("closeAdmin").addEventListener("click", () => {
  $("admin").classList.add("hidden");
});

$("loginButton").addEventListener("click", login);

function login() {
  const username = $("loginUsername").value.trim();
  const password = $("loginPassword").value;

  const account = admins.find(a =>
    a.username.toLowerCase() === username.toLowerCase() &&
    a.password === password
  );

  if (!account) {
    $("loginMessage").textContent =
      "❌ اسم المستخدم أو كلمة المرور غير صحيحة.";

    $("loginMessage").style.color = "#f05b65";
    return;
  }

  currentAdmin = account;

  $("loginBox").classList.add("hidden");
  $("dashboard").classList.remove("hidden");

  $("loggedAdminInfo").textContent =
    `مرحبا ${account.username} — ${roleName(account.role)}`;

  renderDashboard();
}

function logout() {
  currentAdmin = null;

  $("dashboard").classList.add("hidden");
  $("loginBox").classList.remove("hidden");

  $("loginPassword").value = "";
  $("loginMessage").textContent = "";
}

$("logoutButton").addEventListener("click", logout);

function isMainAdmin() {
  return currentAdmin && currentAdmin.role === "main";
}

/* الإحصائيات والطلبات */

function renderDashboard() {
  renderStats();
  renderRequests();
  renderManageTournaments();
  renderAdminAccounts();
}

function renderStats() {
  $("totalRequests").textContent = requests.length;

  $("acceptedRequests").textContent =
    requests.filter(r => r.status === "accepted").length;

  $("rejectedRequests").textContent =
    requests.filter(r => r.status === "rejected").length;

  $("pendingRequests").textContent =
    requests.filter(r => r.status === "pending").length;
}

function renderRequests() {
  const container = $("adminRequests");

  if (!requests.length) {
    container.innerHTML =
      "<p>ما كاين حتى طلب تسجيل حاليا.</p>";
    return;
  }

  container.innerHTML = [...requests].reverse().map(r => {
    const tournament = tournaments.find(
      t => t.id === r.tournamentId
    );

    const statusText =
      r.status === "accepted" ? "مقبول" :
      r.status === "rejected" ? "مرفوض" :
      "قيد المراجعة";

    const membersText = (r.members || []).map(m =>
      `${escapeHTML(m.name)} (ID: ${escapeHTML(m.playerId)})`
    ).join("<br>");

    return `
      <div class="request-card">
        <h4>${escapeHTML(r.fullName)} — ${escapeHTML(r.gameName)}</h4>

        <p>البطولة: ${escapeHTML(tournament?.name || "بطولة محذوفة")}</p>
        <p>Player ID: ${escapeHTML(r.playerId)}</p>
        <p>الهاتف: ${escapeHTML(r.phone || "لم يقدم")}</p>
        <p>أعضاء الفريق: ${membersText || "لا يوجد"}</p>
        <p>رمز الأداء: ${escapeHTML(r.paymentCode || "لم يقدم")}</p>
        <p>ملاحظة الأداء: ${escapeHTML(r.paymentNote || "لا توجد")}</p>
        <p>حالة الأداء: ${r.paymentStatus === "paid" ? "مؤكد من الإدارة" : "غير مؤكد"}</p>
        <p>تاريخ الطلب: ${new Date(r.createdAt).toLocaleString("ar-MA")}</p>

        <p>
          الحالة:
          <span class="status ${r.status}">${statusText}</span>
        </p>

        <div class="request-actions">
          <button class="accept-btn"
            onclick="changeRequestStatus('${r.id}','accepted')">
            قبول الطلب
          </button>

          <button class="reject-btn"
            onclick="changeRequestStatus('${r.id}','rejected')">
            رفض الطلب
          </button>

          <button class="small-btn" onclick="togglePayment('${r.id}')">
            ${r.paymentStatus === "paid"
              ? "إلغاء تأكيد الأداء"
              : "تأكيد الأداء"}
          </button>

          <button class="small-btn" onclick="deleteRequest('${r.id}')">
            حذف الطلب
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function changeRequestStatus(id, status) {
  const request = requests.find(r => r.id === id);
  if (!request) return;

  const word = status === "accepted" ? "قبول" : "رفض";

  if (!confirm(`واش متأكد بغيتي ${word} هاد الطلب؟`)) {
    return;
  }

  request.status = status;

  saveAll();
  renderDashboard();
  renderTournaments();
}

function togglePayment(id) {
  const request = requests.find(r => r.id === id);
  if (!request) return;

  request.paymentStatus =
    request.paymentStatus === "paid"
      ? "not-confirmed"
      : "paid";

  saveAll();
  renderDashboard();
}

function deleteRequest(id) {
  if (!confirm("واش متأكد بغيتي تحذف هاد الطلب نهائيا؟")) {
    return;
  }

  requests = requests.filter(r => r.id !== id);

  saveAll();
  renderDashboard();
  renderTournaments();
}

/* إضافة وتعديل البطولات */

$("addTournamentButton").addEventListener("click", () => {
  if (!currentAdmin) return;

  const name = $("newTournamentName").value.trim();
  const type = $("newTournamentType").value;
  const date = $("newTournamentDate").value;
  const time = $("newTournamentTime").value;
  const price = Number($("newTournamentPrice").value);

  if (!name || !date || !time ||
      price < 0 || !Number.isFinite(price)) {
    alert("عمر جميع معلومات البطولة بشكل صحيح.");
    return;
  }

  tournaments.push({
    id: "t-" + Date.now(),
    name,
    type,
    date,
    time,
    price,
    open: true
  });

  saveAll();

  $("newTournamentName").value = "";
  $("newTournamentDate").value = "";

  renderDashboard();
  renderTournaments();
});

function renderManageTournaments() {
  $("manageTournaments").innerHTML = tournaments.map(t => `
    <div class="manage-card">
      <h4>${escapeHTML(t.name)}</h4>

      <p>
        ${escapeHTML(t.type)} |
        ${formatDate(t.date)} |
        ${escapeHTML(t.time)} |
        ${Number(t.price)} DH
      </p>

      <p>التسجيل: ${t.open ? "مفتوح" : "مغلق"}</p>

      <div class="manage-actions">
        <button class="small-btn" onclick="editTournament('${t.id}')">
          ✏️ تعديل
        </button>

        <button class="small-btn" onclick="toggleTournament('${t.id}')">
          ${t.open ? "إغلاق التسجيل" : "فتح التسجيل"}
        </button>

        <button class="reject-btn" onclick="deleteTournament('${t.id}')">
          حذف
        </button>
      </div>
    </div>
  `).join("");
}

function editTournament(id) {
  const t = tournaments.find(item => item.id === id);
  if (!t) return;

  $("editTournamentId").value = t.id;
  $("editTournamentName").value = t.name;
  $("editTournamentType").value = t.type;
  $("editTournamentDate").value = t.date;
  $("editTournamentTime").value = t.time;
  $("editTournamentPrice").value = t.price;

  $("editTournamentModal").classList.remove("hidden");
}

$("closeEditTournament").addEventListener("click", () => {
  $("editTournamentModal").classList.add("hidden");
});

$("saveTournamentEdit").addEventListener("click", () => {
  const id = $("editTournamentId").value;
  const t = tournaments.find(item => item.id === id);

  if (!t) return;

  const name = $("editTournamentName").value.trim();
  const price = Number($("editTournamentPrice").value);

  if (!name ||
      !$("editTournamentDate").value ||
      !$("editTournamentTime").value ||
      !Number.isFinite(price) ||
      price < 0) {
    alert("راجع معلومات البطولة.");
    return;
  }

  t.name = name;
  t.type = $("editTournamentType").value;
  t.date = $("editTournamentDate").value;
  t.time = $("editTournamentTime").value;
  t.price = price;

  saveAll();

  $("editTournamentModal").classList.add("hidden");

  renderDashboard();
  renderTournaments();
});

function toggleTournament(id) {
  const t = tournaments.find(item => item.id === id);
  if (!t) return;

  t.open = !t.open;

  saveAll();
  renderDashboard();
  renderTournaments();
}

function deleteTournament(id) {
  if (!confirm("واش متأكد بغيتي تحذف هاد البطولة؟")) {
    return;
  }

  tournaments = tournaments.filter(t => t.id !== id);

  saveAll();
  renderDashboard();
  renderTournaments();
}

/* إضافة Admin وحسابات الإدارة */

function renderAdminAccounts() {
  const area = $("adminManagement");
  const message = $("adminPermissionMessage");

  if (!isMainAdmin()) {
    area.classList.add("hidden");
    message.textContent =
      "هذه الخاصية متاحة فقط للـ ADMIN الرئيسي.";
    return;
  }

  area.classList.remove("hidden");
  message.textContent = "";

  $("adminAccounts").innerHTML = admins.map(a => `
    <div class="manage-card">
      <h4>👤 ${escapeHTML(a.username)}</h4>

      <p>الرتبة: ${roleName(a.role)}</p>

      <p>
        ${a.id === currentAdmin.id
          ? "هذا هو الحساب الحالي"
          : ""}
      </p>

      <div class="manage-actions">
        ${a.id !== currentAdmin.id && a.id !== "main-admin"
          ? `<button class="reject-btn"
               onclick="deleteAdmin('${a.id}')">
               حذف Admin
             </button>`
          : ""}
      </div>
    </div>
  `).join("");
}

$("addAdminButton").addEventListener("click", () => {
  if (!isMainAdmin()) {
    alert("غير ADMIN الرئيسي يقدر يزيد Admin جديد.");
    return;
  }

  const username = $("newAdminUsername").value.trim();
  const password = $("newAdminPassword").value.trim();
  const role = $("newAdminRole").value;

  if (username.length < 3 || password.length < 4) {
    alert("اسم المستخدم خاصو 3 حروف على الأقل وكلمة المرور 4 حروف على الأقل.");
    return;
  }

  if (admins.some(a =>
    a.username.toLowerCase() === username.toLowerCase()
  )) {
    alert("هاد اسم المستخدم مستعمل من قبل.");
    return;
  }

  admins.push({
    id: "admin-" + Date.now(),
    username,
    password,
    role
  });

  saveAll();

  $("newAdminUsername").value = "";
  $("newAdminPassword").value = "";

  renderAdminAccounts();

  alert("✅ تزاد Admin الجديد بنجاح.");
});

function deleteAdmin(id) {
  if (!isMainAdmin()) return;

  const target = admins.find(a => a.id === id);

  if (!target || target.id === "main-admin") {
    alert("ما يمكنش تحذف الحساب الرئيسي الأصلي.");
    return;
  }

  if (!confirm(`واش متأكد بغيتي تحذف Admin: ${target.username} ؟`)) {
    return;
  }

  admins = admins.filter(a => a.id !== id);

  saveAll();
  renderAdminAccounts();
}

/* بداية الموقع */

renderTournaments();
