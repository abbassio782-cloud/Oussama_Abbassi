
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

let currentAdmin = null;
let tournaments = [];
let requests = [];
let unsubscribeRequests = null;
let unsubscribeAdmins = null;

const $ = id => document.getElementById(id);

function showMessage(id, message, type = "") {
  const element = $(id);
  element.textContent = message;
  element.className = "message " + type;
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

function formatDate(date) {
  if (!date) return "";
  const parts = String(date).split("-");
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;
}

const defaultTournaments = [
  {
    id: "ramadan-solo",
    name: "RAMADAN SOLO",
    type: "SOLO",
    date: "2027-02-12",
    time: "21:00",
    open: true
  },
  {
    id: "ramadan-duo",
    name: "RAMADAN DUO",
    type: "DUO",
    date: "2027-02-17",
    time: "21:00",
    open: true
  },
  {
    id: "ramadan-squad",
    name: "RAMADAN SQUAD",
    type: "SQUAD",
    date: "2027-02-22",
    time: "21:00",
    open: true
  }
];

// تحميل البطولات للزوار
tournamentsRef.onSnapshot(snapshot => {
  tournaments = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  renderPublicTournaments();
  renderTournamentOptions();

  if (currentAdmin) renderAdminTournaments();
}, error => {
  console.error(error);
  $("tournamentList").innerHTML =
    '<p class="empty">تعذر تحميل البطولات. تحقق من قواعد Firestore.</p>';
});

function renderPublicTournaments() {
  const container = $("tournamentList");

  if (!tournaments.length) {
    container.innerHTML = '<p class="empty">لا توجد بطولات حالياً.</p>';
    return;
  }

  container.innerHTML = tournaments.map(t => `
    <article class="tournament-card">
      <div>
        <h3>${escapeHTML(t.name)}</h3>
        <p>نوع البطولة: ${escapeHTML(t.type)}</p>
        <div class="tournament-meta">
          <p>📅 ${escapeHTML(formatDate(t.date))}</p>
          <p>⏰ ${escapeHTML(t.time)}</p>
          <p>💰 5 DH</p>
        </div>
      </div>
      <div>
        <p class="tournament-status ${t.open ? "" : "closed"}">
          ${t.open ? "التسجيل مفتوح" : "التسجيل مغلق"}
        </p>
        ${t.open ? `<a class="main-btn" href="#register" onclick="selectTournament('${escapeHTML(t.id)}')">سجل الآن</a>` : ""}
      </div>
    </article>
  `).join("");
}

function renderTournamentOptions() {
  const select = $("tournamentId");
  const oldValue = select.value;

  select.innerHTML = '<option value="">اختار البطولة</option>';

  tournaments.filter(t => t.open).forEach(t => {
    const option = document.createElement("option");
    option.value = t.id;
    option.textContent = `${t.name} - ${formatDate(t.date)}`;
    select.appendChild(option);
  });

  if (tournaments.some(t => t.id === oldValue && t.open)) {
    select.value = oldValue;
  }
}

function selectTournament(id) {
  $("tournamentId").value = id;
}

$("registrationForm").addEventListener("submit", async event => {
  event.preventDefault();

  const tournamentId = $("tournamentId").value;
  const tournament = tournaments.find(t => t.id === tournamentId);

  if (!tournament || !tournament.open) {
    showMessage("registrationMessage", "هذه البطولة غير متاحة للتسجيل.", "error");
    return;
  }

  const members = $("teamMembers").value
    .split("\n")
    .map(name => name.trim())
    .filter(Boolean)
    .slice(0, 3);

  const submitButton = event.submitter;
  submitButton.disabled = true;
  submitButton.textContent = "جاري إرسال الطلب...";

  try {
    await requestsRef.add({
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    $("registrationForm").reset();
    showMessage(
      "registrationMessage",
      "تم إرسال طلبك بنجاح! انتظر مراجعة الإدارة.",
      "success"
    );
  } catch (error) {
    console.error(error);
    showMessage(
      "registrationMessage",
      "وقع مشكل في الإرسال. تأكد من نشر قواعد Firestore.",
      "error"
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "إرسال طلب المشاركة";
  }
});

// تسجيل دخول الإدارة
$("loginForm").addEventListener("submit", async event => {
  event.preventDefault();

  const username = $("adminUsername").value.trim();
  const password = $("adminPassword").value;

  // admin1 هو اسم الدخول، أما التحقق من كلمة المرور فيتم عبر Firebase
  if (username !== "admin1") {
    showMessage("loginMessage", "اسم المستخدم غير صحيح.", "error");
    return;
  }

  const button = event.submitter;
  button.disabled = true;
  button.textContent = "جاري الدخول...";

  try {
    const result = await auth.signInWithEmailAndPassword(
      "oussamaabbassi733@gmail.com",
      password
    );

    const adminDoc = await adminsRef.doc(result.user.uid).get();

    if (!adminDoc.exists) {
      await auth.signOut();
      showMessage("loginMessage", "هذا الحساب غير مسجل كأدمن.", "error");
      return;
    }

    currentAdmin = {
      uid: result.user.uid,
      ...adminDoc.data()
    };

    await createDefaultTournaments();
    openAdminPanel();

  } catch (error) {
    console.error(error);
    showMessage("loginMessage", "اسم المستخدم أو كلمة المرور غير صحيحة.", "error");
  } finally {
    button.disabled = false;
    button.textContent = "دخول الإدارة";
  }
});

async function createDefaultTournaments() {
  const snapshot = await tournamentsRef.limit(1).get();

  if (!snapshot.empty) return;

  const batch = db.batch();

  defaultTournaments.forEach(t => {
    const ref = tournamentsRef.doc(t.id);
    const { id, ...data } = t;
    batch.set(ref, data);
  });

  await batch.commit();
}

function openAdminPanel() {
  $("adminPanel").hidden = false;
  $("adminLogin").hidden = true;
  $("adminPanel").scrollIntoView({ behavior: "smooth" });

  if (unsubscribeRequests) unsubscribeRequests();

  unsubscribeRequests = requestsRef
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      renderAdminRequests();
      renderStats();
    }, error => {
      console.error(error);
      $("adminRequests").innerHTML =
        '<p class="empty">تعذر تحميل الطلبات. راجع قواعد Firestore.</p>';
    });

  renderAdminTournaments();
}

function renderStats() {
  $("totalCount").textContent = requests.length;
  $("acceptedCount").textContent = requests.filter(r => r.status === "accepted").length;
  $("rejectedCount").textContent = requests.filter(r => r.status === "rejected").length;
  $("pendingCount").textContent = requests.filter(r => r.status === "pending").length;
}

function getTournamentName(id) {
  const tournament = tournaments.find(t => t.id === id);
  return tournament ? tournament.name : "بطولة غير معروفة";
}

function renderAdminRequests() {
  const container = $("adminRequests");

  if (!requests.length) {
    container.innerHTML = '<p class="empty">ما كاين حتى طلب مشاركة حالياً.</p>';
    return;
  }

  container.innerHTML = requests.map(r => {
    const statusClass = r.status === "accepted"
      ? "status-accepted"
      : r.status === "rejected"
        ? "status-rejected"
        : "status-pending";

    const statusText = r.status === "accepted"
      ? "مقبول"
      : r.status === "rejected"
        ? "مرفوض"
        : "في الانتظار";

    const members = Array.isArray(r.members) ? r.members : [];

    return `
      <div class="request-card">
        <h4>${escapeHTML(r.fullName)}</h4>
        <p>🏆 البطولة: ${escapeHTML(getTournamentName(r.tournamentId))}</p>
        <p>🎮 اسم اللعبة: ${escapeHTML(r.gameName)}</p>
        <p>🆔 Player ID: ${escapeHTML(r.playerId)}</p>
        <p>📞 الهاتف: ${escapeHTML(r.phone || "غير متوفر")}</p>
        <p>👥 الأعضاء: ${members.map(escapeHTML).join("، ") || "لا يوجد"}</p>
        <p>💳 كود الأداء: ${escapeHTML(r.paymentCode || "غير متوفر")}</p>
        <p>📝 ملاحظة: ${escapeHTML(r.paymentNote || "لا توجد")}</p>
        <p>الحالة: <span class="status-label ${statusClass}">${statusText}</span></p>
        <p>الأداء: <strong>${r.paid ? "تم الأداء" : "لم يتم تأكيد الأداء"}</strong></p>

        <div class="action-row">
          <button class="accept-btn" onclick="updateRequest('${r.id}', 'accepted')">قبول</button>
          <button class="reject-btn" onclick="updateRequest('${r.id}', 'rejected')">رفض</button>
          <button class="neutral-btn" onclick="togglePaid('${r.id}', ${!r.paid})">
            ${r.paid ? "إلغاء تأكيد الأداء" : "تأكيد الأداء"}
          </button>
          <button class="delete-btn" onclick="deleteRequest('${r.id}')">حذف</button>
        </div>
      </div>
    `;
  }).join("");
}

async function updateRequest(id, status) {
  if (!currentAdmin) return;

  try {
    await requestsRef.doc(id).update({ status });
  } catch (error) {
    alert("تعذر تحديث الطلب: " + error.message);
  }
}

async function togglePaid(id, paid) {
  if (!currentAdmin) return;

  try {
    await requestsRef.doc(id).update({ paid });
  } catch (error) {
    alert("تعذر تحديث الأداء: " + error.message);
  }
}

async function deleteRequest(id) {
  if (!currentAdmin || !confirm("واش متأكد من حذف هذا الطلب؟")) return;

  try {
    await requestsRef.doc(id).delete();
  } catch (error) {
    alert("تعذر حذف الطلب: " + error.message);
  }
}

// إدارة البطولات
$("tournamentForm").addEventListener("submit", async event => {
  event.preventDefault();
  if (!currentAdmin) return;

  const editId = $("editTournamentId").value;

  const data = {
    name: $("tournamentName").value.trim(),
    date: $("tournamentDate").value,
    time: $("tournamentTime").value,
    type: $("tournamentType").value,
    open: true
  };

  try {
    if (editId) {
      const existing = tournaments.find(t => t.id === editId);
      data.open = existing ? existing.open : true;
      await tournamentsRef.doc(editId).update(data);
      showMessage("tournamentMessage", "تم تعديل البطولة بنجاح.", "success");
    } else {
      const newId = "tournament-" + Date.now();
      await tournamentsRef.doc(newId).set(data);
      showMessage("tournamentMessage", "تمت إضافة البطولة بنجاح.", "success");
    }

    $("tournamentForm").reset();
    $("editTournamentId").value = "";
  } catch (error) {
    showMessage("tournamentMessage", "تعذر حفظ البطولة: " + error.message, "error");
  }
});

function renderAdminTournaments() {
  const container = $("adminTournaments");

  if (!tournaments.length) {
    container.innerHTML = '<p class="empty">لا توجد بطولات.</p>';
    return;
  }

  container.innerHTML = tournaments.map(t => `
    <div class="admin-tournament-card">
      <h4>${escapeHTML(t.name)}</h4>
      <p>${escapeHTML(t.type)} — ${escapeHTML(formatDate(t.date))} — ${escapeHTML(t.time)}</p>
      <p>${t.open ? "التسجيل مفتوح" : "التسجيل مغلق"}</p>
      <div class="action-row">
        <button class="neutral-btn" onclick="editTournament('${t.id}')">تعديل</button>
        <button class="accept-btn" onclick="toggleTournament('${t.id}', ${!t.open})">
          ${t.open ? "إغلاق التسجيل" : "فتح التسجيل"}
        </button>
        <button class="delete-btn" onclick="deleteTournament('${t.id}')">حذف</button>
      </div>
    </div>
  `).join("");
}

function editTournament(id) {
  const t = tournaments.find(item => item.id === id);
  if (!t) return;

  $("editTournamentId").value = t.id;
  $("tournamentName").value = t.name || "";
  $("tournamentDate").value = t.date || "";
  $("tournamentTime").value = t.time || "";
  $("tournamentType").value = t.type || "SOLO";

  $("tournamentForm").scrollIntoView({ behavior: "smooth" });
}

async function toggleTournament(id, open) {
  if (!currentAdmin) return;

  try {
    await tournamentsRef.doc(id).update({ open });
  } catch (error) {
    alert("تعذر تغيير حالة البطولة: " + error.message);
  }
}

async function deleteTournament(id) {
  if (!currentAdmin || !confirm("واش متأكد من حذف البطولة؟")) return;

  try {
    await tournamentsRef.doc(id).delete();
  } catch (error) {
    alert("تعذر حذف البطولة: " + error.message);
  }
}

$("cancelEditBtn").addEventListener("click", () => {
  $("tournamentForm").reset();
  $("editTournamentId").value = "";
  showMessage("tournamentMessage", "");
});

$("logoutBtn").addEventListener("click", async () => {
  if (unsubscribeRequests) unsubscribeRequests();

  await auth.signOut();
  currentAdmin = null;
  requests = [];

  $("adminPanel").hidden = true;
  $("adminLogin").hidden = false;
  $("loginForm").reset();
  $("loginMessage").textContent = "";
  $("adminLogin").scrollIntoView({ behavior: "smooth" });
});

// التحقق من الجلسة الحالية
auth.onAuthStateChanged(async user => {
  if (!user) return;

  try {
    const adminDoc = await adminsRef.doc(user.uid).get();

    if (adminDoc.exists) {
      currentAdmin = {
        uid: user.uid,
        ...adminDoc.data()
      };

      await createDefaultTournaments();
      openAdminPanel();
    } else {
      await auth.signOut();
    }
  } catch (error) {
    console.error("Admin session check:", error);
  }
});
