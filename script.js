
// =====================================
// RIFII SCHOOL - الإعدادات
// =====================================

const TEACHER_CODE = "ALAL1@TAALIM.MA";
const TEACHER_PASSWORD = "RIFII";

const STUDENTS_KEY = "rifii_students_v3";
const GRADES_KEY = "rifii_exam_grades_v3";
const RESULTS_KEY = "rifii_final_results_v3";

const classes = [];
for (let level = 1; level <= 3; level++) {
  for (let section = 1; section <= 9; section++) {
    classes.push(`${level}/${section}`);
  }
}

const subjects = [
  "اللغة العربية",
  "اللغة الفرنسية",
  "اللغة الإنجليزية",
  "الرياضيات",
  "الفيزياء والكيمياء",
  "علوم الحياة والأرض",
  "الاجتماعيات",
  "التربية الإسلامية",
  "التربية البدنية",
  "المعلوميات"
];

let currentStudent = null;
const $ = id => document.getElementById(id);

// =====================================
// التخزين
// =====================================

function readData(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function getStudents() { return readData(STUDENTS_KEY); }
function getGrades() { return readData(GRADES_KEY); }
function getResults() { return readData(RESULTS_KEY); }

function saveStudents(data) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(data));
}
function saveGrades(data) {
  localStorage.setItem(GRADES_KEY, JSON.stringify(data));
}
function saveResults(data) {
  localStorage.setItem(RESULTS_KEY, JSON.stringify(data));
}

function randomCode(length) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function createAccount() {
  let code;
  do {
    code = "RF-" + randomCode(7);
  } while (getStudents().some(s => s.loginCode === code));

  return {
    loginCode: code,
    loginPassword: randomCode(9)
  };
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function termName(term) {
  return String(term) === "2" ? "الدورة الثانية" : "الدورة الأولى";
}

// =====================================
// حساب معدل كل مادة
// =====================================

// معدل المادة = مجموع نقط الامتحانات / عدد الامتحانات
function getSubjectAverages(studentId, term) {
  const grades = getGrades().filter(g =>
    g.studentId === studentId &&
    String(g.term) === String(term)
  );

  const grouped = {};

  grades.forEach(g => {
    if (!grouped[g.subject]) {
      grouped[g.subject] = {
        subject: g.subject,
        total: 0,
        count: 0,
        coefficient: Number(g.coefficient) || 1,
        exams: []
      };
    }

    grouped[g.subject].total += Number(g.value);
    grouped[g.subject].count += 1;
    grouped[g.subject].coefficient = Number(g.coefficient) || 1;
    grouped[g.subject].exams.push(g.examName);
  });

  return Object.values(grouped).map(item => ({
    ...item,
    average: item.total / item.count
  }));
}

// المعدل العام = مجموع (معدل المادة × معاملها) / مجموع المعاملات
function getGeneralAverage(studentId, term) {
  const subjectsData = getSubjectAverages(studentId, term);

  let weightedSum = 0;
  let coefficientSum = 0;

  subjectsData.forEach(item => {
    weightedSum += item.average * item.coefficient;
    coefficientSum += item.coefficient;
  });

  if (coefficientSum === 0) return null;

  return weightedSum / coefficientSum;
}

// =====================================
// التنقل بين الواجهات
// =====================================

function showOnly(panelId) {
  [
    "homePanel",
    "teacherLoginPanel",
    "studentLoginPanel",
    "teacherDashboard",
    "studentDashboard"
  ].forEach(id => $(id).classList.add("hidden"));

  $(panelId).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

$("showTeacherLogin").onclick = () => showOnly("teacherLoginPanel");
$("showStudentLogin").onclick = () => showOnly("studentLoginPanel");
$("backFromTeacher").onclick = () => showOnly("homePanel");
$("backFromStudent").onclick = () => showOnly("homePanel");

// =====================================
// ملء القوائم
// =====================================

function fillClassSelect(id) {
  $(id).innerHTML = classes.map(c =>
    `<option value="${c}">${c}</option>`
  ).join("");
}

[
  "studentClassInput",
  "bulkStudentClass",
  "studentListClass",
  "accountSection",
  "markClass",
  "resultClass"
].forEach(fillClassSelect);

$("markSubject").innerHTML = subjects.map(s =>
  `<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`
).join("");

// =====================================
// دخول الأستاذ
// =====================================

$("teacherLoginBtn").onclick = () => {
  const code = $("teacherCode").value.trim().toUpperCase();
  const password = $("teacherPassword").value;

  if (code === TEACHER_CODE && password === TEACHER_PASSWORD) {
    $("teacherLoginMessage").textContent = "";
    showOnly("teacherDashboard");
    refreshDashboard();
    showTab("studentsTab");
  } else {
    $("teacherLoginMessage").textContent =
      "رمز الدخول أو كلمة المرور غير صحيحة.";
  }
};

$("teacherPassword").addEventListener("keydown", e => {
  if (e.key === "Enter") $("teacherLoginBtn").click();
});

$("teacherLogoutBtn").onclick = () => {
  $("teacherCode").value = "";
  $("teacherPassword").value = "";
  showOnly("homePanel");
};

// =====================================
// التبويبات
// =====================================

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(tab =>
    tab.classList.add("hidden")
  );

  document.querySelectorAll(".tab").forEach(btn =>
    btn.classList.toggle("active", btn.dataset.tab === tabId)
  );

  $(tabId).classList.remove("hidden");

  if (tabId === "studentsTab") renderStudents();
  if (tabId === "accountsTab") renderAccounts();

  if (tabId === "marksTab") {
    refreshMarkStudents();
    renderMarks();
  }

  if (tabId === "resultsTab") renderResults();
}

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => showTab(btn.dataset.tab));
});

// =====================================
// إضافة تلميذ واحد
// =====================================

$("addStudentBtn").onclick = () => {
  const name = $("studentNameInput").value.trim();
  const section = $("studentClassInput").value;

  if (!name) {
    $("addStudentMessage").textContent = "أدخل اسم التلميذ.";
    return;
  }

  const account = createAccount();

  const students = getStudents();
  students.push({
    id: "ST-" + Date.now() + randomCode(4),
    name,
    section,
    loginCode: account.loginCode,
    loginPassword: account.loginPassword
  });

  saveStudents(students);
  $("studentNameInput").value = "";
  $("addStudentMessage").textContent =
    "تمت إضافة التلميذ وإنشاء حسابه بنجاح.";

  refreshDashboard();
};

// =====================================
// إضافة مجموعة تلاميذ
// =====================================

$("bulkAddStudentsBtn").onclick = () => {
  const names = $("bulkStudentNames").value
    .split("\n")
    .map(n => n.trim())
    .filter(Boolean);

  const section = $("bulkStudentClass").value;

  if (!names.length) {
    $("bulkMessage").textContent = "اكتب أسماء التلاميذ أولا.";
    return;
  }

  const students = getStudents();
  const created = [];

  names.forEach(name => {
    const account = createAccount();

    const student = {
      id: "ST-" + Date.now() + randomCode(6),
      name,
      section,
      loginCode: account.loginCode,
      loginPassword: account.loginPassword
    };

    students.push(student);
    created.push(student);
  });

  saveStudents(students);
  $("bulkStudentNames").value = "";

  $("bulkMessage").textContent =
    `تم إنشاء ${created.length} حساب. افتح تبويب الحسابات لرؤية معلومات الدخول.`;

  refreshDashboard();
};

// =====================================
// لائحة التلاميذ
// =====================================

function renderStudents() {
  const section = $("studentListClass").value;
  const search = $("studentSearch").value.trim().toLowerCase();

  const students = getStudents().filter(s =>
    s.section === section &&
    s.name.toLowerCase().includes(search)
  );

  $("studentsTableBody").innerHTML = students.length
    ? students.map(s => `
      <tr>
        <td>${escapeHTML(s.name)}</td>
        <td>${escapeHTML(s.section)}</td>
        <td>${escapeHTML(s.loginCode)}</td>
        <td><button class="small-btn delete-btn"
          data-delete-student="${escapeHTML(s.id)}">حذف</button></td>
      </tr>
    `).join("")
    : `<tr><td colspan="4">لا يوجد تلاميذ في هذا القسم.</td></tr>`;
}

$("studentListClass").onchange = renderStudents;
$("studentSearch").oninput = renderStudents;

$("studentsTableBody").addEventListener("click", e => {
  const button = e.target.closest("[data-delete-student]");
  if (!button) return;

  const id = button.dataset.deleteStudent;
  const student = getStudents().find(s => s.id === id);
  if (!student) return;

  if (!confirm(`هل تريد حذف ${student.name} وجميع نقطه ونتائجه؟`)) return;

  saveStudents(getStudents().filter(s => s.id !== id));
  saveGrades(getGrades().filter(g => g.studentId !== id));
  saveResults(getResults().filter(r => r.studentId !== id));

  refreshDashboard();
});

// =====================================
// الحسابات
// =====================================

function renderAccounts() {
  const section = $("accountSection").value;
  const students = getStudents().filter(s => s.section === section);

  $("accountsTableBody").innerHTML = students.length
    ? students.map(s => `
      <tr>
        <td>${escapeHTML(s.name)}</td>
        <td>${escapeHTML(s.loginCode)}</td>
        <td>${escapeHTML(s.loginPassword)}</td>
        <td><button class="small-btn" data-copy-account="${escapeHTML(s.id)}">نسخ</button></td>
      </tr>
    `).join("")
    : `<tr><td colspan="4">لا توجد حسابات.</td></tr>`;
}

$("accountSection").onchange = renderAccounts;

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

$("accountsTableBody").addEventListener("click", async e => {
  const button = e.target.closest("[data-copy-account]");
  if (!button) return;

  const s = getStudents().find(x => x.id === button.dataset.copyAccount);
  if (!s) return;

  await copyText(
    `الاسم: ${s.name}\nالقسم: ${s.section}\nالكود: ${s.loginCode}\nكلمة المرور: ${s.loginPassword}`
  );

  alert("تم نسخ معلومات الحساب.");
});

$("copyAllAccountsBtn").onclick = async () => {
  const section = $("accountSection").value;
  const students = getStudents().filter(s => s.section === section);

  if (!students.length) {
    alert("لا توجد حسابات في هذا القسم.");
    return;
  }

  const text = students.map(s =>
    `الاسم: ${s.name}\nالقسم: ${s.section}\nالكود: ${s.loginCode}\nكلمة المرور: ${s.loginPassword}\n---------------------`
  ).join("\n");

  await copyText(text);
  alert("تم نسخ حسابات القسم.");
};

$("printAccountsBtn").onclick = () => window.print();

// =====================================
// اختيار التلاميذ في صفحة النقط
// =====================================

function refreshMarkStudents() {
  const section = $("markClass").value;
  const students = getStudents().filter(s => s.section === section);

  const options = students.map(s =>
    `<option value="${escapeHTML(s.id)}">${escapeHTML(s.name)}</option>`
  ).join("");

  const empty = `<option value="">لا يوجد تلاميذ</option>`;

  $("markStudent").innerHTML = options || empty;
  $("marksViewStudent").innerHTML = options || empty;

  renderMarks();
}

$("markClass").onchange = refreshMarkStudents;
$("marksViewStudent").onchange = renderMarks;
$("marksViewTerm").onchange = renderMarks;

// =====================================
// حفظ نقطة امتحان
// =====================================

$("saveMarkBtn").onclick = () => {
  const studentId = $("markStudent").value;
  const term = $("markTerm").value;
  const subject = $("markSubject").value;
  const examName = $("examName").value.trim();
  const value = Number($("markValue").value);
  const coefficient = Number($("markCoefficient").value);

  if (!studentId) {
    $("markMessage").textContent = "اختار التلميذ أولا.";
    return;
  }

  if (!examName) {
    $("markMessage").textContent = "اكتب اسم أو رقم الامتحان.";
    return;
  }

  if ($("markValue").value === "" || !Number.isFinite(value) || value < 0 || value > 20) {
    $("markMessage").textContent = "النقطة خاصها تكون بين 0 و20.";
    return;
  }

  if (!Number.isFinite(coefficient) || coefficient < 1 || coefficient > 20) {
    $("markMessage").textContent = "المعامل خاصو يكون بين 1 و20.";
    return;
  }

  const grades = getGrades();

  // نفس اسم الامتحان والمادة والدورة: تعديل النقطة القديمة
  const index = grades.findIndex(g =>
    g.studentId === studentId &&
    g.subject === subject &&
    g.examName.toLowerCase() === examName.toLowerCase() &&
    String(g.term) === String(term)
  );

  const grade = {
    id: index >= 0 ? grades[index].id : "GR-" + Date.now() + randomCode(4),
    studentId,
    term,
    subject,
    examName,
    value,
    coefficient
  };

  if (index >= 0) grades[index] = grade;
  else grades.push(grade);

  saveGrades(grades);

  $("markValue").value = "";
  $("examName").value = "";
  $("markMessage").textContent =
    `تم حفظ ${examName} في ${subject} - ${termName(term)}.`;

  renderMarks();
  renderResults();
};

// =====================================
// عرض الامتحانات ومعدلات المواد
// =====================================

function renderMarks() {
  const studentId = $("marksViewStudent").value;
  const term = $("marksViewTerm").value;

  const grades = getGrades().filter(g =>
    g.studentId === studentId && String(g.term) === String(term)
  );

  $("marksTableBody").innerHTML = grades.length
    ? grades.map(g => `
      <tr>
        <td>${escapeHTML(g.subject)}</td>
        <td>${escapeHTML(g.examName)}</td>
        <td>${Number(g.value).toFixed(2)}</td>
        <td>${Number(g.coefficient)}</td>
        <td><button class="small-btn delete-btn" data-delete-grade="${escapeHTML(g.id)}">حذف</button></td>
      </tr>
    `).join("")
    : `<tr><td colspan="5">لا توجد امتحانات مسجلة في هذه الدورة.</td></tr>`;

  renderSubjectAverages(studentId, term);
}

function renderSubjectAverages(studentId, term) {
  const data = studentId ? getSubjectAverages(studentId, term) : [];

  $("subjectAveragesBody").innerHTML = data.length
    ? data.map(item => `
      <tr>
        <td>${escapeHTML(item.subject)}</td>
        <td>${item.average.toFixed(2)} / 20</td>
        <td>${item.coefficient}</td>
        <td>${item.count}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4">لا توجد نقط لحساب المعدلات.</td></tr>`;

  const average = studentId ? getGeneralAverage(studentId, term) : null;
  $("teacherAverage").textContent =
    average === null ? "--" : average.toFixed(2) + " / 20";
}

$("marksTableBody").addEventListener("click", e => {
  const button = e.target.closest("[data-delete-grade]");
  if (!button) return;

  if (!confirm("هل تريد حذف نقطة هذا الامتحان؟")) return;

  saveGrades(getGrades().filter(g => g.id !== button.dataset.deleteGrade));
  renderMarks();
  renderResults();
});

// =====================================
// النتائج النهائية التي يكتبها الأستاذ
// =====================================

function getStudentResult(studentId, term) {
  return getResults().find(r =>
    r.studentId === studentId && String(r.term) === String(term)
  );
}

function renderResults() {
  const section = $("resultClass").value;
  const term = $("resultTerm").value;

  const students = getStudents().filter(s => s.section === section);

  $("resultsTableBody").innerHTML = students.length
    ? students.map(s => {
        const average = getGeneralAverage(s.id, term);
        const result = getStudentResult(s.id, term);

        return `
          <tr>
            <td>${escapeHTML(s.name)}</td>
            <td>${average === null ? "--" : average.toFixed(2) + " / 20"}</td>
            <td>
              <input
                class="final-result-input"
                data-result-student="${escapeHTML(s.id)}"
                value="${escapeHTML(result?.result || "")}"
                placeholder="مثال: ناجح أو ينتقل..."
              >
              <input
                class="final-note-input"
                data-note-student="${escapeHTML(s.id)}"
                value="${escapeHTML(result?.note || "")}"
                placeholder="ملاحظة الأستاذ (اختياري)"
              >
            </td>
            <td>
              <button class="small-btn" data-save-result="${escapeHTML(s.id)}">حفظ</button>
            </td>
          </tr>
        `;
      }).join("")
    : `<tr><td colspan="4">لا يوجد تلاميذ في هذا القسم.</td></tr>`;
}

$("resultsTableBody").addEventListener("click", e => {
  const button = e.target.closest("[data-save-result]");
  if (!button) return;

  const studentId = button.dataset.saveResult;
  const term = $("resultTerm").value;

  const resultInput = document.querySelector(
    `[data-result-student="${studentId}"]`
  );

  const noteInput = document.querySelector(
    `[data-note-student="${studentId}"]`
  );

  const resultText = resultInput.value.trim();
  const noteText = noteInput.value.trim();

  if (!resultText) {
    alert("كتب النتيجة الدراسية أولا.");
    resultInput.focus();
    return;
  }

  const results = getResults();
  const index = results.findIndex(r =>
    r.studentId === studentId && String(r.term) === String(term)
  );

  const item = {
    studentId,
    term,
    result: resultText,
    note: noteText
  };

  if (index >= 0) results[index] = item;
  else results.push(item);

  saveResults(results);
  alert("تم حفظ النتيجة الدراسية.");
});

$("resultClass").onchange = renderResults;
$("resultTerm").onchange = renderResults;
$("printResultsBtn").onclick = () => window.print();

// =====================================
// دخول التلميذ
// =====================================

$("studentLoginBtn").onclick = () => {
  const code = $("studentCode").value.trim().toUpperCase();
  const password = $("studentPassword").value;

  const student = getStudents().find(s =>
    s.loginCode.toUpperCase() === code &&
    s.loginPassword === password
  );

  if (!student) {
    $("studentLoginMessage").textContent =
      "الكود أو كلمة المرور غير صحيحة.";
    return;
  }

  currentStudent = student;
  $("studentLoginMessage").textContent = "";
  $("studentInfo").textContent =
    `${student.name} - القسم ${student.section}`;

  $("studentTermView").value = "1";
  renderStudentGrades();
  showOnly("studentDashboard");
};

$("studentPassword").addEventListener("keydown", e => {
  if (e.key === "Enter") $("studentLoginBtn").click();
});

$("studentTermView").onchange = renderStudentGrades;

// =====================================
// ما يشاهده التلميذ
// =====================================

function renderStudentGrades() {
  if (!currentStudent) return;

  const term = $("studentTermView").value;
  const data = getSubjectAverages(currentStudent.id, term);
  const average = getGeneralAverage(currentStudent.id, term);
  const finalResult = getStudentResult(currentStudent.id, term);

  $("studentGradesBody").innerHTML = data.length
    ? data.map(item => `
      <tr>
        <td>${escapeHTML(item.subject)}</td>
        <td>${item.count}</td>
        <td>${item.average.toFixed(2)} / 20</td>
        <td>${item.coefficient}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="4">لم يتم تسجيل النقط بعد.</td></tr>`;

  $("studentAverage").textContent =
    average === null ? "--" : average.toFixed(2) + " / 20";

  $("studentFinalResult").textContent =
    finalResult?.result || "لم يتم إدخال النتيجة بعد";

  $("studentTeacherNote").textContent =
    finalResult?.note || "";
}

$("logoutStudentBtn").onclick = () => {
  currentStudent = null;
  $("studentCode").value = "";
  $("studentPassword").value = "";
  showOnly("homePanel");
};

// =====================================
// تحديث لوحة الأستاذ
// =====================================

function refreshDashboard() {
  $("totalStudents").textContent = getStudents().length;
  $("totalSubjects").textContent = subjects.length;

  renderStudents();
  renderAccounts();
  refreshMarkStudents();
  renderResults();
}

// =====================================
// تشغيل التطبيق
// =====================================

refreshDashboard();
showOnly("homePanel");
