
// =============================================
// RIFII CHAMPIONS 2027
// FIREBASE + FIRESTORE + ADMIN PANEL
// =============================================

const firebaseConfig = {
  apiKey: "AIzaSyAP9f5GvtzTmFJM_i8tLDK0ax7-ypCNcrk",
  authDomain: "rifii-champions.firebaseapp.com",
  projectId: "rifii-champions",
  storageBucket: "rifii-champions.firebasestorage.app",
  messagingSenderId: "523105636336",
  appId: "1:523105636336:web:dbbab2a3b9d425a67a1735",
  measurementId: "G-BLHHEVFPR3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const tournamentsRef = db.collection("tournaments");
const requestsRef = db.collection("requests");
const adminsRef = db.collection("admins");

const $ = id => document.getElementById(id);

let currentAdmin = null;
let currentAdminData = null;

let tournaments = [];
let requests = [];
let admins = [];

let unsubscribeTournaments = null;
let unsubscribeRequests = null;
let unsubscribeAdmins = null;

// =============================================
// DEFAULT TOURNAMENTS
// =============================================

const defaultTournaments = [
  {
    id: "solo2027",
    name: "RAMADAN SOLO",
    type: "SOLO",
    date: "2027-02-12",
    time: "21:00",
    price: 5,
    open: true
  },
  {
    id: "duo2027",
    name: "RAMADAN DUO",
    type: "DUO",
    date: "2027-02-17",
    time: "21:00",
    price: 5,
    open: true
  },
  {
    id: "squad2027",
    name: "RAMADAN SQUAD",
    type: "SQUAD",
    date: "2027-02-22",
    time: "21:00",
    price: 5,
    open: true
  }
];

// =============================================
// HELPERS
// =============================================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function showMessage(element, message, error = false) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("error", error);
}

function openOverlay(id) {
  $(id)?.classList.add("show");
}

function closeOverlay(id) {
  $(id)?.classList.remove("show");
}

function formatDate(date) {
  if (!date) return "غير محدد";

  try {
    return new Date(date + "T00:00:00").toLocaleDateString("ar-MA");
  } catch {
    return date;
  }
}

function getTournament(id) {
  return tournaments.find(t => t.id === id);
}

function getTournamentName(id) {
  return getTournament(id)?.name || "بطولة محذوفة";
}

function getRequestDate(timestamp) {
  if (!timestamp) return "غير محدد";

  const date = timestamp.toDate
    ? timestamp.toDate()
    : new Date(timestamp);

  return date.toLocaleString("ar-MA");
}

// =============================================
// DEFAULT TOURNAMENT CREATION
// ADMIN ONLY
// =============================================

async function createDefaultTournaments() {
  const snapshot = await tournamentsRef.limit(1).get();

  if (!snapshot.empty) return;

  const batch = db.batch();

  defaultTournaments.forEach(tournament => {
    const ref = tournamentsRef.doc(tournament.id);
    const data = { ...tournament };

    delete data.id;

    batch.set(ref, data);
  });

  await batch.commit();
}

// =============================================
// PUBLIC TOURNAMENT LISTENER
// =============================================

function startPublicTournamentListener() {
  if (unsubscribeTournaments) {
    unsubscribeTournaments();
  }

  unsubscribeTournaments = tournamentsRef.onSnapshot(
    snapshot => {
      tournaments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      tournaments.sort((a, b) =>
        String(a.date || "").localeCompare(String(b.date || ""))
      );

      renderTournaments();
      renderManageTournaments();
    },
    error => {
      console.error("Tournament listener:", error);

      $("tournamentList").innerHTML =
        "<p class='message error'>تعذر تحميل البطولات. حاول مرة أخرى.</p>";
    }
  );
}

// =============================================
// ADMIN LISTENERS
// =============================================

function stopAdminListeners() {
  if (unsubscribeRequests) unsubscribeRequests();
  if (unsubscribeAdmins) unsubscribeAdmins();

  unsubscribeRequests = null;
  unsubscribeAdmins = null;
}

async function startAdminListeners() {
  stopAdminListeners();

  try {
    await createDefaultTournaments();
  } catch (error) {
    console.error("Default tournaments:", error);
  }

  unsubscribeRequests = requestsRef
    .orderBy("createdAt", "desc")
    .onSnapshot(
      snapshot => {
        requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        renderStats();
        renderAdminRequests();
      },
      error => {
        console.error("Requests listener:", error);

        showMessage(
          $("loginMessage"),
          "تعذر تحميل الطلبات: " + error.message,
          true
        );
      }
    );

  unsubscribeAdmins = adminsRef.onSnapshot(
    snapshot => {
      admins = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      renderAdmins();
    },
    error => {
      console.error("Admins listener:", error);
    }
  );
}

// =============================================
// RENDER TOURNAMENTS
// =============================================

function renderTournaments() {
  const container = $("tournamentList");

  if (!container) return;

  if (!tournaments.length) {
    container.innerHTML =
      "<p class='message'>لا توجد بطولات حاليا.</p>";
    return;
  }

  container.innerHTML = tournaments.map(t => `
    <article class="tournament-card">
      <div>
        <h3>${escapeHTML(t.name)}</h3>
        <p>🎮 النوع: ${escapeHTML(t.type)}</p>
        <p>📅 التاريخ: ${formatDate(t.date)}</p>
        <p>🕘 الوقت: ${escapeHTML(t.time || "21:00")}</p>
        <p>💰 ثمن المشاركة: ${escapeHTML(t.price ?? 5)} DH</p>

        <p class="status ${t.open ? "" : "closed"}">
          ${t.open ? "● التسجيل مفتوح" : "● التسجيل مغلق"}
        </p>
      </div>

      <div class="card-actions">
        ${
          t.open
            ? `<button class="main-btn" onclick="openRegistration('${escapeHTML(t.id)}')">سجل الآن</button>`
            : `<button class="small-btn" disabled>التسجيل مغلق</button>`
        }
      </div>
    </article>
  `).join("");
}

// =============================================
// TEAM MEMBERS INPUTS
// =============================================

function renderTeamInputs(type) {
  const area = $("teamMembersArea");

  if (!area) return;

  let count = 0;

  if (type === "DUO") count = 1;
  if (type === "SQUAD") count = 3;

  if (count === 0) {
    area.innerHTML = "";
    return;
  }

  let html = "<h3>👥 معلومات أعضاء الفريق</h3>";

  for (let i = 1; i <= count; i++) {
    html += `
      <label>اسم اللاعب ${i + 1}</label>
      <input
        class="team-member-name"
        required
        maxlength="60"
        placeholder="اسم اللاعب ${i + 1} داخل اللعبة"
      >

      <label>Player ID للاعب ${i + 1}</label>
      <input
        class="team-member-id"
        required
        maxlength="40"
        placeholder="Player ID للاعب ${i + 1}"
      >
    `;
  }

  area.innerHTML = html;
}

// =============================================
// OPEN REGISTRATION
// =============================================

function openRegistration(tournamentId) {
  const tournament = getTournament(tournamentId);

  if (!tournament) {
    alert("هذه البطولة غير موجودة.");
    return;
  }

  if (!tournament.open) {
    alert("التسجيل في هذه البطولة مغلق حاليا.");
    return;
  }

  $("registrationForm").reset();

  $("registrationTournamentId").value = tournament.id;

  $("selectedTournamentInfo").textContent =
    `${tournament.name} | ${formatDate(tournament.date)} | ${tournament.price} DH`;

  renderTeamInputs(tournament.type);

  showMessage($("registrationMessage"), "");

  openOverlay("registrationModal");
}

// =============================================
// SUBMIT REGISTRATION
// =============================================

$("registrationForm").addEventListener("submit", async event => {
  event.preventDefault();

  const button = $("registrationForm").querySelector(
    "button[type='submit']"
  );

  button.disabled = true;
  button.textContent = "جاري إرسال الطلب...";

  try {
    const tournamentId = $("registrationTournamentId").value;
    const tournament = getTournament(tournamentId);

    if (!tournament || !tournament.open) {
      throw new Error("البطولة غير متاحة حاليا.");
    }

    const fullName = $("playerFullName").value.trim();
    const gameName = $("playerGameName").value.trim();
    const playerId = $("playerId").value.trim();
    const phone = $("playerPhone").value.trim();
    const paymentCode = $("paymentCode").value.trim();
    const paymentNote = $("paymentNote").value.trim();

    const names = [
      ...document.querySelectorAll(".team-member-name")
    ].map(input => input.value.trim());

    const ids = [
      ...document.querySelectorAll(".team-member-id")
    ].map(input => input.value.trim());

    const members = names.map((name, index) => ({
      name,
      playerId: ids[index]
    }));

    if (!fullName || !gameName || !playerId) {
      throw new Error("عمر جميع المعلومات المطلوبة.");
    }

    if (members.some(member => !member.name || !member.playerId)) {
      throw new Error("خاصك تعمر معلومات جميع أعضاء الفريق.");
    }

    await requestsRef.add({
      tournamentId,
      fullName,
      gameName,
      playerId,
      phone,
      members,
      paymentCode,
      paymentNote,
      status: "pending",
      paid: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showMessage(
      $("registrationMessage"),
      "✅ توصلنا بطلبك! الإدارة غادي تراجع التسجيل ديالك."
    );

    $("registrationForm").reset();
    $("teamMembersArea").innerHTML = "";

  } catch (error) {
    console.error(error);

    showMessage(
      $("registrationMessage"),
      error.message || "وقع خطأ أثناء إرسال الطلب.",
      true
    );

  } finally {
    button.disabled = false;
    button.textContent = "إرسال طلب التسجيل";
  }
});

// =============================================
// OPEN AND CLOSE PANELS
// =============================================

$("adminTopButton").addEventListener("click", () => {
  openOverlay("admin");
});

$("closeAdmin").addEventListener("click", () => {
  closeOverlay("admin");
});

$("closeRegistration").addEventListener("click", () => {
  closeOverlay("registrationModal");
});

$("closeEditTournament").addEventListener("click", () => {
  closeOverlay("editTournamentModal");
});

// Close overlay when clicking outside the modal
["admin", "registrationModal", "editTournamentModal"].forEach(id => {
  $(id).addEventListener("click", event => {
    if (event.target.id === id) {
      closeOverlay(id);
    }
  });
});

// =============================================
// ADMIN LOGIN
// =============================================

$("loginButton").addEventListener("click", async () => {
  const email = $("loginUsername").value.trim();
  const password = $("loginPassword").value;

  if (!email || !password) {
    showMessage(
      $("loginMessage"),
      "دخل الإيميل وكلمة المرور.",
      true
    );
    return;
  }

  const button = $("loginButton");

  button.disabled = true;
  button.textContent = "جاري الدخول...";

  try {
    await auth.signInWithEmailAndPassword(email, password);

  } catch (error) {
    console.error(error);

    let message = "تعذر تسجيل الدخول.";

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      message = "الإيميل أو كلمة المرور غير صحيحة.";
    } else if (error.code === "auth/invalid-email") {
      message = "صيغة البريد الإلكتروني غير صحيحة.";
    } else if (error.code === "auth/too-many-requests") {
      message = "محاولات كثيرة. حاول من بعد.";
    } else {
      message = error.message;
    }

    showMessage($("loginMessage"), message, true);

  } finally {
    button.disabled = false;
    button.textContent = "دخول";
  }
});

// =============================================
// CHECK ADMIN ACCOUNT
// =============================================

auth.onAuthStateChanged(async user => {
  if (!user) {
    currentAdmin = null;
    currentAdminData = null;

    stopAdminListeners();

    $("loginBox").classList.remove("hidden");
    $("dashboard").classList.add("hidden");

    return;
  }

  try {
    const adminDoc = await adminsRef.doc(user.uid).get();

    if (!adminDoc.exists) {
      await auth.signOut();

      showMessage(
        $("loginMessage"),
        "هذا الحساب ليس لديه صلاحية الإدارة.",
        true
      );

      return;
    }

    currentAdmin = user;
    currentAdminData = adminDoc.data();

    $("loginBox").classList.add("hidden");
    $("dashboard").classList.remove("hidden");

    $("loggedAdminInfo").textContent =
      `مرحباً بك في لوحة الإدارة: ${user.email}`;

    startAdminListeners();

  } catch (error) {
    console.error("Admin check:", error);

    showMessage(
      $("loginMessage"),
      "تعذر التحقق من صلاحية الإدارة: " + error.message,
      true
    );
  }
});

// =============================================
// ADMIN LOGOUT
// =============================================

$("logoutButton").addEventListener("click", async () => {
  stopAdminListeners();

  try {
    await auth.signOut();

    currentAdmin = null;
    currentAdminData = null;

    $("loginPassword").value = "";

    $("loginBox").classList.remove("hidden");
    $("dashboard").classList.add("hidden");

  } catch (error) {
    alert("تعذر تسجيل الخروج: " + error.message);
  }
});

// =============================================
// DASHBOARD STATS
// =============================================

function renderStats() {
  const accepted = requests.filter(
    r => r.status === "accepted"
  ).length;

  const rejected = requests.filter(
    r => r.status === "rejected"
  ).length;

  const pending = requests.filter(
    r => r.status === "pending"
  ).length;

  $("totalRequests").textContent = requests.length;
  $("acceptedRequests").textContent = accepted;
  $("rejectedRequests").textContent = rejected;
  $("pendingRequests").textContent = pending;
}

// =============================================
// RENDER ADMIN REQUESTS
// =============================================

function renderAdminRequests() {
  const container = $("adminRequests");

  if (!container) return;

  if (!requests.length) {
    container.innerHTML =
      "<p class='message'>لا توجد طلبات تسجيل حاليا.</p>";
    return;
  }

  container.innerHTML = requests.map(request => {
    const statusText = {
      pending: "⏳ في الانتظار",
      accepted: "✅ مقبول",
      rejected: "❌ مرفوض"
    }[request.status] || "غير معروف";

    const members = Array.isArray(request.members)
      ? request.members.map(member => `
          <p>
            👤 ${escapeHTML(member.name)}
            — ID: ${escapeHTML(member.playerId)}
          </p>
        `).join("")
      : "";

    return `
      <article class="request-card">
        <h4>${escapeHTML(request.fullName)}</h4>

        <p>🏆 البطولة: ${escapeHTML(getTournamentName(request.tournamentId))}</p>
        <p>🎮 Game Name: ${escapeHTML(request.gameName)}</p>
        <p>🆔 Player ID: ${escapeHTML(request.playerId)}</p>
        <p>📞 الهاتف: ${escapeHTML(request.phone || "غير متوفر")}</p>

        ${members}

        <p>💳 رمز الأداء: ${escapeHTML(request.paymentCode || "غير متوفر")}</p>
        <p>📝 الملاحظة: ${escapeHTML(request.paymentNote || "لا توجد")}</p>
        <p>📅 تاريخ الطلب: ${getRequestDate(request.createdAt)}</p>
        <p>الحالة: ${statusText}</p>
        <p>الأداء: ${request.paid ? "✅ تم الأداء" : "❌ لم يتم الأداء"}</p>

        <div class="actions">
          <button
            class="success-btn"
            onclick="updateRequest('${request.id}', 'accepted')"
          >
            قبول
          </button>

          <button
            class="danger-btn"
            onclick="updateRequest('${request.id}', 'rejected')"
          >
            رفض
          </button>

          <button
            class="small-btn"
            onclick="togglePaid('${request.id}', ${!request.paid})"
          >
            ${request.paid ? "إلغاء تأكيد الأداء" : "تأكيد الأداء"}
          </button>

          <button
            class="danger-btn"
            onclick="deleteRequest('${request.id}')"
          >
            حذف
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// =============================================
// ACCEPT / REJECT REQUEST
// =============================================

async function updateRequest(id, status) {
  if (!currentAdmin) return;

  if (!["accepted", "rejected"].includes(status)) return;

  try {
    await requestsRef.doc(id).update({ status });
  } catch (error) {
    alert("تعذر تحديث الطلب: " + error.message);
  }
}

// =============================================
// PAID / UNPAID
// =============================================

async function togglePaid(id, paid) {
  if (!currentAdmin) return;

  try {
    await requestsRef.doc(id).update({ paid });
  } catch (error) {
    alert("تعذر تغيير حالة الأداء: " + error.message);
  }
}

// =============================================
// DELETE REQUEST
// =============================================

async function deleteRequest(id) {
  if (!currentAdmin) return;

  if (!confirm("واش متأكد بغيتي تحذف هاد الطلب؟")) {
    return;
  }

  try {
    await requestsRef.doc(id).delete();
  } catch (error) {
    alert("تعذر حذف الطلب: " + error.message);
  }
}

// =============================================
// ADD TOURNAMENT
// =============================================

$("addTournamentButton").addEventListener("click", async () => {
  if (!currentAdmin) return;

  const name = $("newTournamentName").value.trim();
  const type = $("newTournamentType").value;
  const date = $("newTournamentDate").value;
  const time = $("newTournamentTime").value;
  const price = Number($("newTournamentPrice").value);

  if (!name || !date || !time || !Number.isFinite(price) || price < 0) {
    alert("عمر معلومات البطولة بشكل صحيح.");
    return;
  }

  const button = $("addTournamentButton");
  button.disabled = true;

  try {
    await tournamentsRef.add({
      name,
      type,
      date,
      time,
      price,
      open: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    $("newTournamentName").value = "";
    $("newTournamentDate").value = "";
    $("newTournamentTime").value = "21:00";
    $("newTournamentPrice").value = "5";

    alert("✅ تمت إضافة البطولة.");

  } catch (error) {
    alert("تعذر إضافة البطولة: " + error.message);

  } finally {
    button.disabled = false;
  }
});

// =============================================
// MANAGE TOURNAMENTS
// =============================================

function renderManageTournaments() {
  const container = $("manageTournaments");

  if (!container) return;

  if (!tournaments.length) {
    container.innerHTML =
      "<p class='message'>لا توجد بطولات.</p>";
    return;
  }

  container.innerHTML = tournaments.map(t => `
    <article class="manage-card">
      <h4>${escapeHTML(t.name)}</h4>

      <p>
        ${escapeHTML(t.type)}
        |
        ${formatDate(t.date)}
        |
        ${escapeHTML(t.time || "")}
      </p>

      <p>الثمن: ${escapeHTML(t.price ?? 5)} DH</p>

      <p class="status ${t.open ? "" : "closed"}">
        ${t.open ? "مفتوحة" : "مغلقة"}
      </p>

      <div class="actions">
        <button
          class="small-btn"
          onclick="editTournament('${t.id}')"
        >
          تعديل
        </button>

        <button
          class="small-btn"
          onclick="toggleTournament('${t.id}', ${!t.open})"
        >
          ${t.open ? "إغلاق التسجيل" : "فتح التسجيل"}
        </button>

        <button
          class="danger-btn"
          onclick="deleteTournament('${t.id}')"
        >
          حذف
        </button>
      </div>
    </article>
  `).join("");
}

// =============================================
// OPEN / CLOSE TOURNAMENT
// =============================================

async function toggleTournament(id, open) {
  if (!currentAdmin) return;

  try {
    await tournamentsRef.doc(id).update({ open });
  } catch (error) {
    alert("تعذر تغيير حالة البطولة: " + error.message);
  }
}

// =============================================
// DELETE TOURNAMENT
// =============================================

async function deleteTournament(id) {
  if (!currentAdmin) return;

  if (!confirm("واش متأكد بغيتي تحذف هاد البطولة؟")) {
    return;
  }

  try {
    await tournamentsRef.doc(id).delete();
  } catch (error) {
    alert("تعذر حذف البطولة: " + error.message);
  }
}

// =============================================
// EDIT TOURNAMENT
// =============================================

function editTournament(id) {
  const tournament = getTournament(id);

  if (!tournament) return;

  $("editTournamentId").value = tournament.id;
  $("editTournamentName").value = tournament.name || "";
  $("editTournamentType").value = tournament.type || "SOLO";
  $("editTournamentDate").value = tournament.date || "";
  $("editTournamentTime").value = tournament.time || "21:00";
  $("editTournamentPrice").value = tournament.price ?? 5;

  showMessage($("editTournamentMessage"), "");

  openOverlay("editTournamentModal");
}

// =============================================
// SAVE TOURNAMENT EDIT
// =============================================

$("saveTournamentEdit").addEventListener("click", async () => {
  if (!currentAdmin) return;

  const id = $("editTournamentId").value;
  const name = $("editTournamentName").value.trim();
  const type = $("editTournamentType").value;
  const date = $("editTournamentDate").value;
  const time = $("editTournamentTime").value;
  const price = Number($("editTournamentPrice").value);

  if (!name || !date || !time || !Number.isFinite(price) || price < 0) {
    showMessage(
      $("editTournamentMessage"),
      "تأكد من جميع المعلومات.",
      true
    );
    return;
  }

  const button = $("saveTournamentEdit");
  button.disabled = true;

  try {
    await tournamentsRef.doc(id).update({
      name,
      type,
      date,
      time,
      price
    });

    closeOverlay("editTournamentModal");
    alert("✅ تم تعديل البطولة.");

  } catch (error) {
    showMessage(
      $("editTournamentMessage"),
      "تعذر تعديل البطولة: " + error.message,
      true
    );

  } finally {
    button.disabled = false;
  }
});

// =============================================
// ADMIN ACCOUNTS DISPLAY
// =============================================

function renderAdmins() {
  const container = $("adminAccounts");
  const message = $("adminPermissionMessage");

  if (!container) return;

  const form = $("adminManagement")?.querySelector(".admin-form");

  if (form) {
    form.classList.add("hidden");
  }

  if (message) {
    message.textContent =
      "إضافة Admin جديد تتم من Firebase Authentication ثم إنشاء وثيقة له في admins باستعمال UID دياله.";
  }

  if (!currentAdminData || currentAdminData.role !== "main") {
    container.innerHTML =
      "<p class='message'>إدارة الحسابات متاحة للإدارة الرئيسية فقط.</p>";
    return;
  }

  if (!admins.length) {
    container.innerHTML =
      "<p class='message'>لا توجد حسابات إدارة.</p>";
    return;
  }

  container.innerHTML = admins.map(admin => `
    <article class="account-card">
      <p>UID: ${escapeHTML(admin.id)}</p>
      <p>الصلاحية: ${escapeHTML(admin.role || "admin")}</p>
    </article>
  `).join("");
}

// =============================================
// START WEBSITE
// =============================================

function startWebsite() {
  startPublicTournamentListener();
}

startWebsite();
