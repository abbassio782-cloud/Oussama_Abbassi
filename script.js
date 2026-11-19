
// RIFII TEACHER

const EMAIL = "ALAL1@TAALIM.MA";
const PASSWORD = "RIFII";

const sections = [];
["1", "2", "3"].forEach(level => {
  for (let i = 1; i <= 9; i++) {
    sections.push(`${level}/${i}`);
  }
});

const subjects = [
  "اللغة العربية",
  "اللغة الفرنسية",
  "اللغة الإنجليزية",
  "الرياضيات",
  "علوم الحياة والأرض",
  "الفيزياء والكيمياء",
  "الاجتماعيات",
  "التربية الإسلامية",
  "التربية البدنية",
  "التكنولوجيا",
  "المعلوميات",
  "التربية التشكيلية",
  "التربية الموسيقية"
];

let students = JSON.parse(localStorage.getItem("rifii_students") || "[]");
let grades = JSON.parse(localStorage.getItem("rifii_grades") || "[]");

const $ = id => document.getElementById(id);

function saveData() {
  localStorage.setItem("rifii_students", JSON.stringify(students));
  localStorage.setItem("rifii_grades", JSON.stringify(grades));
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

// تسجيل الدخول
$("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = $("email").value.trim().toUpperCase();
  const password = $("password").value;

  if (email === EMAIL && password === PASSWORD) {
    $("loginPage").classList.add("hidden");
    $("app").classList.remove("hidden");
    $("loginError").textContent = "";
    initializeApp();
  } else {
    $("loginError").textContent = "البريد الإلكتروني أو كلمة المرور غير صحيحة";
  }
});

// تسجيل الخروج
$("logoutBtn").addEventListener("click", function() {
  $("app").classList.add("hidden");
  $("loginPage").classList.remove("hidden");
  $("password").value = "";
});

// تجهيز الأقسام والمواد
function initializeApp() {
  $("classSelect").innerHTML = sections.map(section =>
    `<option value="${section}">القسم ${section}</option>`
  ).join("");

  $("gradeSubject").innerHTML =
    '<option value="">اختار المادة</option>' +
    subjects.map(subject =>
      `<option value="${escapeHTML(subject)}">${escapeHTML(subject)}</option>`
    ).join("");

  renderAll();
}

function currentClass() {
  return $("classSelect").value;
}

// تغيير القسم
$("classSelect").addEventListener("change", renderAll);

// إضافة تلميذ
$("studentForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = $("studentName").value.trim();
  const section = currentClass();

  if (!name || !section) return;

  students.push({
    id: Date.now().toString() + Math.random().toString(16).slice(2),
    name,
    section
  });

  saveData();
  $("studentName").value = "";
  renderAll();
});

// حذف تلميذ
function deleteStudent(id) {
  if (!confirm("واش متأكد بغيتي تحذف هاد التلميذ وجميع النقط ديالو؟")) return;

  students = students.filter(student => student.id !== id);
  grades = grades.filter(grade => grade.studentId !== id);

  saveData();
  renderAll();
}

// حساب معدل تلميذ
function calculateAverage(studentId) {
  const studentGrades = grades.filter(grade =>
    grade.studentId === studentId
  );

  if (studentGrades.length === 0) return null;

  let totalPoints = 0;
  let totalCoefficients = 0;

  studentGrades.forEach(grade => {
    totalPoints += Number(grade.value) * Number(grade.coefficient);
    totalCoefficients += Number(grade.coefficient);
  });

  if (totalCoefficients === 0) return null;

  return totalPoints / totalCoefficients;
}

function averageText(studentId) {
  const average = calculateAverage(studentId);
  return average === null ? "لا توجد نقط" : average.toFixed(2) + " / 20";
}

function resultText(studentId) {
  const average = calculateAverage(studentId);

  if (average === null) {
    return '<span>غير متوفر</span>';
  }

  if (average >= 10) {
    return '<span class="result-pass">فوق المعدل</span>';
  }

  return '<span class="result-fail">دون المعدل</span>';
}

// عرض لائحة التلاميذ
function renderStudents() {
  const section = currentClass();

  const classStudents = students.filter(student =>
    student.section === section
  );

  $("studentsTable").innerHTML = classStudents.length
    ? classStudents.map((student, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHTML(student.name)}</td>
        <td>${escapeHTML(student.section)}</td>
        <td>${averageText(student.id)}</td>
        <td>${resultText(student.id)}</td>
        <td>
          <button class="delete-btn" onclick="deleteStudent('${student.id}')">
            حذف
          </button>
        </td>
      </tr>
    `).join("")
    : '<tr><td colspan="6">مازال ما زدتي حتى تلميذ فهاد القسم</td></tr>';

  $("gradeStudent").innerHTML =
    '<option value="">اختار التلميذ</option>' +
    classStudents.map(student =>
      `<option value="${student.id}">${escapeHTML(student.name)}</option>`
    ).join("");
}

// إضافة أو تحديث نقطة
$("gradeForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const studentId = $("gradeStudent").value;
  const subject = $("gradeSubject").value;
  const value = Number($("gradeValue").value);
  const coefficient = Number($("gradeCoefficient").value);

  if (!studentId || !subject) {
    alert("اختار التلميذ والمادة");
    return;
  }

  if (!Number.isFinite(value) || value < 0 || value > 20) {
    alert("النقطة خاصها تكون بين 0 و20");
    return;
  }

  if (!Number.isFinite(coefficient) || coefficient <= 0) {
    alert("المعامل خاصو يكون أكبر من صفر");
    return;
  }

  const existingGrade = grades.find(grade =>
    grade.studentId === studentId &&
    grade.subject === subject
  );

  if (existingGrade) {
    existingGrade.value = value;
    existingGrade.coefficient = coefficient;
  } else {
    grades.push({
      id: Date.now().toString() + Math.random().toString(16).slice(2),
      studentId,
      subject,
      value,
      coefficient
    });
  }

  saveData();

  $("gradeValue").value = "";
  $("gradeCoefficient").value = "1";

  renderAll();
  alert("تم حفظ النقطة بنجاح");
});

// عرض جدول النقط
function renderGrades() {
  const section = currentClass();

  const classStudents = students.filter(student =>
    student.section === section
  );

  const studentIds = classStudents.map(student => student.id);

  const classGrades = grades.filter(grade =>
    studentIds.includes(grade.studentId)
  );

  $("gradesTable").innerHTML = classGrades.length
    ? classGrades.map(grade => {
        const student = students.find(s => s.id === grade.studentId);

        return `
          <tr>
            <td>${escapeHTML(student ? student.name : "غير معروف")}</td>
            <td>${escapeHTML(grade.subject)}</td>
            <td>${Number(grade.value).toFixed(2)}</td>
            <td>${Number(grade.coefficient)}</td>
            <td>
              <button class="delete-btn" onclick="deleteGrade('${grade.id}')">
                حذف
              </button>
            </td>
          </tr>
        `;
      }).join("")
    : '<tr><td colspan="5">مازال ما تسجلات حتى نقطة</td></tr>';
}

// حذف نقطة
function deleteGrade(id) {
  if (!confirm("واش متأكد بغيتي تحذف هاد النقطة؟")) return;

  grades = grades.filter(grade => grade.id !== id);

  saveData();
  renderAll();
}

// عرض النتائج
function renderResults() {
  const section = currentClass();

  const classStudents = students.filter(student =>
    student.section === section
  );

  $("resultsTable").innerHTML = classStudents.length
    ? classStudents.map(student => `
      <tr>
        <td>${escapeHTML(student.name)}</td>
        <td>${averageText(student.id)}</td>
        <td>${resultText(student.id)}</td>
      </tr>
    `).join("")
    : '<tr><td colspan="3">لا يوجد تلاميذ في هذا القسم</td></tr>';
}

// تحديث الإحصائيات
function renderStats() {
  $("totalStudents").textContent = students.length;
  $("totalGrades").textContent = grades.length;
}

// تحديث جميع أجزاء المنصة
function renderAll() {
  renderStudents();
  renderGrades();
  renderResults();
  renderStats();
}
