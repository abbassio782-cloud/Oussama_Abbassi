// =====================================
// TEACHER OUSSAMA - LESSONS
// =====================================

const lessons = {
  en: {
    words: [
      ["Hello", "مرحبا", "هالو"],
      ["Goodbye", "إلى اللقاء", "غود باي"],
      ["Thank you", "شكرا", "ثانك يو"],
      ["Please", "من فضلك", "بليز"],
      ["Yes", "نعم", "يَس"],
      ["No", "لا", "نو"],
      ["Water", "ماء", "ووتر"],
      ["Book", "كتاب", "بوك"],
      ["School", "مدرسة", "سكول"],
      ["Teacher", "أستاذ", "تيتشر"],
      ["Student", "تلميذ", "ستيودنت"],
      ["Friend", "صديق", "فريند"],
      ["Family", "عائلة", "فاميلي"],
      ["House", "منزل", "هاوس"],
      ["Food", "طعام", "فود"],
      ["Apple", "تفاحة", "آبل"],
      ["Beautiful", "جميل", "بيوتيفول"],
      ["Happy", "سعيد", "هابي"],
      ["Sad", "حزين", "ساد"],
      ["Good", "جيد", "غود"],
      ["Bad", "سيئ", "باد"],
      ["Morning", "الصباح", "مورنينغ"],
      ["Night", "الليل", "نايت"],
      ["Love", "حب", "لاف"],
      ["Learn", "يتعلم", "ليرن"]
    ],

    sentences: [
      ["How are you?", "كيف حالك؟", "هاو آر يو"],
      ["I am fine.", "أنا بخير.", "آي آم فاين"],
      ["What is your name?", "ما اسمك؟", "وات إز يور نايم"],
      ["My name is Oussama.", "اسمي أسامة.", "ماي نايم إز أسامة"],
      ["Nice to meet you.", "سعيد بلقائك.", "نايس تو ميت يو"],
      ["Where are you from?", "من أين أنت؟", "وير آر يو فروم"],
      ["I am from Morocco.", "أنا من المغرب.", "آي آم فروم موروكو"],
      ["I love English.", "أحب الإنجليزية.", "آي لاف إنغليش"],
      ["I am a student.", "أنا تلميذ.", "آي آم أ ستيودنت"],
      ["This is my book.", "هذا كتابي.", "ذيس إز ماي بوك"],
      ["Open the door.", "افتح الباب.", "أوبن ذا دور"],
      ["Close the window.", "أغلق النافذة.", "كلوز ذا ويندو"],
      ["I want some water.", "أريد بعض الماء.", "آي وانت سام ووتر"],
      ["Good morning.", "صباح الخير.", "غود مورنينغ"],
      ["Good night.", "تصبح على خير.", "غود نايت"],
      ["See you tomorrow.", "أراك غدا.", "سي يو تومورو"],
      ["Can you help me?", "هل يمكنك مساعدتي؟", "كان يو هيلب مي"],
      ["I understand.", "أنا أفهم.", "آي أندرستاند"],
      ["I don't understand.", "أنا لا أفهم.", "آي دونت أندرستاند"],
      ["Please speak slowly.", "تحدث ببطء من فضلك.", "بليز سبيك سلولي"],
      ["Where is the school?", "أين المدرسة؟", "وير إز ذا سكول"],
      ["I am happy today.", "أنا سعيد اليوم.", "آي آم هابي توداي"],
      ["What time is it?", "كم الساعة؟", "وات تايم إز إت"],
      ["Have a nice day.", "أتمنى لك يوما سعيدا.", "هاف أ نايس داي"],
      ["Never give up.", "لا تستسلم أبدا.", "نيفر غيف أب"]
    ]
  },

  es: {
    words: [
      ["Hola", "مرحبا", "أولا"],
      ["Adiós", "إلى اللقاء", "أديوس"],
      ["Gracias", "شكرا", "غراسياس"],
      ["Por favor", "من فضلك", "بور فافور"],
      ["Sí", "نعم", "سي"],
      ["No", "لا", "نو"],
      ["Agua", "ماء", "أغوا"],
      ["Libro", "كتاب", "ليبرو"],
      ["Escuela", "مدرسة", "إسكويلا"],
      ["Profesor", "أستاذ", "بروفيسور"],
      ["Estudiante", "تلميذ", "إستوديانتِه"],
      ["Amigo", "صديق", "أميغو"],
      ["Familia", "عائلة", "فاميليا"],
      ["Casa", "منزل", "كاسا"],
      ["Comida", "طعام", "كوميدا"],
      ["Manzana", "تفاحة", "مانثانا"],
      ["Bonito", "جميل", "بونيتو"],
      ["Feliz", "سعيد", "فيليس"],
      ["Triste", "حزين", "تريستي"],
      ["Bueno", "جيد", "بوينو"],
      ["Malo", "سيئ", "مالو"],
      ["Mañana", "الصباح / غدا", "مانيانا"],
      ["Noche", "الليل", "نوتشي"],
      ["Amor", "حب", "أمور"],
      ["Aprender", "يتعلم", "أبريندير"]
    ],

    sentences: [
      ["¿Cómo estás?", "كيف حالك؟", "كومو إستاس"],
      ["Estoy bien.", "أنا بخير.", "إستوي بيين"],
      ["¿Cómo te llamas?", "ما اسمك؟", "كومو تي ياماس"],
      ["Me llamo Oussama.", "اسمي أسامة.", "مي يامو أسامة"],
      ["Mucho gusto.", "سعيد بلقائك.", "موتشو غوستو"],
      ["¿De dónde eres?", "من أين أنت؟", "دي دوندي إيريس"],
      ["Soy de Marruecos.", "أنا من المغرب.", "سوي دي مارويكوس"],
      ["Me gusta el español.", "أحب الإسبانية.", "مي غوستا إل إسبانيول"],
      ["Soy estudiante.", "أنا تلميذ.", "سوي إستوديانتِه"],
      ["Este es mi libro.", "هذا كتابي.", "إيستي إس مي ليبرو"],
      ["Abre la puerta.", "افتح الباب.", "أبري لا بويرتا"],
      ["Cierra la ventana.", "أغلق النافذة.", "سييرا لا فينتانا"],
      ["Quiero agua.", "أريد الماء.", "كييرو أغوا"],
      ["Buenos días.", "صباح الخير.", "بوينوس دياس"],
      ["Buenas noches.", "تصبح على خير.", "بويناس نوتشيس"],
      ["Hasta mañana.", "إلى الغد.", "أستا مانيانا"],
      ["¿Puedes ayudarme?", "هل يمكنك مساعدتي؟", "بويديس أيودارمي"],
      ["Entiendo.", "أنا أفهم.", "إنتييندو"],
      ["No entiendo.", "أنا لا أفهم.", "نو إنتييندو"],
      ["Habla despacio, por favor.", "تحدث ببطء من فضلك.", "أبلا ديسباسيو بور فافور"],
      ["¿Dónde está la escuela?", "أين المدرسة؟", "دوندي إستا لا إسكويلا"],
      ["Estoy feliz hoy.", "أنا سعيد اليوم.", "إستوي فيليس أوي"],
      ["¿Qué hora es?", "كم الساعة؟", "كي أورا إس"],
      ["Que tengas un buen día.", "أتمنى لك يوما سعيدا.", "كي تينغاس أون بوين ديا"],
      ["Nunca te rindas.", "لا تستسلم أبدا.", "نونكا تي رينداس"]
    ]
  }
};

// =====================================
// ELEMENTS
// =====================================

const $ = id => document.getElementById(id);

let currentLanguage = "en";
let currentType = "words";
let currentIndex = 0;

const foreignText = $("foreignText");
const arabicText = $("arabicText");
const pronunciation = $("pronunciation");
const lessonNumber = $("lessonNumber");
const progressBar = $("progressBar");
const progressText = $("progressText");

// =====================================
// LESSON DISPLAY
// =====================================

function getCurrentLessons() {
  return lessons[currentLanguage][currentType];
}

function showLesson() {
  const list = getCurrentLessons();
  const lesson = list[currentIndex];

  if (!lesson) return;

  foreignText.textContent = lesson[0];
  arabicText.textContent = lesson[1];
  pronunciation.textContent = "النطق التقريبي: " + lesson[2];

  lessonNumber.textContent =
    `الدرس ${currentIndex + 1} من ${list.length}`;

  const percent = Math.round(
    ((currentIndex + 1) / list.length) * 100
  );

  progressBar.style.width = percent + "%";
  progressText.textContent = percent + "%";

  $("previousBtn").disabled = currentIndex === 0;
  $("nextBtn").disabled = currentIndex === list.length - 1;

  localStorage.setItem(
    "teacherOussamaProgress",
    JSON.stringify({
      language: currentLanguage,
      type: currentType,
      index: currentIndex
    })
  );
}

function changeLesson(step) {
  const list = getCurrentLessons();

  currentIndex += step;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= list.length) {
    currentIndex = list.length - 1;
  }

  showLesson();
}

$("nextBtn").addEventListener("click", () => {
  changeLesson(1);
});

$("previousBtn").addEventListener("click", () => {
  changeLesson(-1);
});

// =====================================
// LANGUAGE AND TYPE SELECTION
// =====================================

document.querySelectorAll("[data-language]").forEach(button => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.language;
    currentIndex = 0;

    document.querySelectorAll("[data-language]").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    showLesson();
  });
});

document.querySelectorAll("[data-type]").forEach(button => {
  button.addEventListener("click", () => {
    currentType = button.dataset.type;
    currentIndex = 0;

    document.querySelectorAll("[data-type]").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    showLesson();
  });
});

// =====================================
// VOICE
// =====================================

function speakText(rate) {
  if (!("speechSynthesis" in window)) {
    alert("المتصفح ديالك لا يدعم خاصية النطق.");
    return;
  }

  window.speechSynthesis.cancel();

  const text = foreignText.textContent;
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = currentLanguage === "en" ? "en-US" : "es-ES";
  utterance.rate = rate;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

$("normalBtn").addEventListener("click", () => {
  speakText(0.9);
});

$("slowBtn").addEventListener("click", () => {
  speakText(0.55);
});

// =====================================
// QUIZ SYSTEM
// =====================================

let quizQuestions = [];
let quizIndex = 0;
let score = 0;
let answered = false;

function makeQuizQuestions() {
  const allLessons = getCurrentLessons();

  const shuffled = [...allLessons].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 10).map(item => {
    const wrongAnswers = allLessons
      .filter(other => other[1] !== item[1])
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(other => other[1]);

    const options = [...wrongAnswers, item[1]]
      .sort(() => Math.random() - 0.5);

    return {
      question: item[0],
      correct: item[1],
      options
    };
  });
}

function startQuiz() {
  quizQuestions = makeQuizQuestions();
  quizIndex = 0;
  score = 0;
  answered = false;

  $("startQuizBtn").hidden = true;
  $("nextQuestionBtn").hidden = true;

  showQuestion();
}

function showQuestion() {
  const question = quizQuestions[quizIndex];

  answered = false;

  $("quizCounter").textContent =
    `السؤال ${quizIndex + 1} من ${quizQuestions.length}`;

  $("questionText").textContent =
    `ما معنى: ${question.question} ؟`;

  $("quizFeedback").textContent = "";
  $("answers").innerHTML = "";

  question.options.forEach(option => {
    const button = document.createElement("button");

    button.className = "answer-option";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(button, option);
    });

    $("answers").appendChild(button);
  });

  $("nextQuestionBtn").hidden = true;
}

function checkAnswer(button, selected) {
  if (answered) return;

  answered = true;

  const correct = quizQuestions[quizIndex].correct;
  const buttons = document.querySelectorAll(".answer-option");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });

  if (selected === correct) {
    score++;
    $("quizFeedback").textContent = "✅ إجابة صحيحة! أحسنت.";
    $("quizFeedback").style.color = "#4ade80";
  } else {
    button.classList.add("wrong");
    $("quizFeedback").textContent =
      "❌ جواب غير صحيح. الجواب الصحيح هو: " + correct;
    $("quizFeedback").style.color = "#fb7185";
  }

  $("nextQuestionBtn").hidden = false;
  $("nextQuestionBtn").textContent =
    quizIndex === quizQuestions.length - 1
      ? "عرض النتيجة"
      : "السؤال التالي";
}

function nextQuizQuestion() {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    showQuestion();
  } else {
    showQuizResult();
  }
}

function showQuizResult() {
  $("quizCounter").textContent = "انتهى الاختبار 🎉";
  $("questionText").textContent =
    `نتيجتك هي ${score} من ${quizQuestions.length}`;

  $("answers").innerHTML = "";

  const message = document.createElement("p");

  if (score >= 8) {
    message.textContent = "ممتاز! مستواك رائع 🌟";
  } else if (score >= 5) {
    message.textContent = "عمل جيد! استمر في التعلم 💪";
  } else {
    message.textContent = "حاول مرة أخرى، ستتحسن مع التدريب ❤️";
  }

  $("answers").appendChild(message);

  $("quizFeedback").textContent =
    `النسبة: ${Math.round(score / quizQuestions.length * 100)}%`;

  $("nextQuestionBtn").hidden = true;
  $("startQuizBtn").hidden = false;
  $("startQuizBtn").textContent = "إعادة الاختبار";
}

$("startQuizBtn").addEventListener("click", startQuiz);
$("nextQuestionBtn").addEventListener("click", nextQuizQuestion);

// =====================================
// RESTORE SAVED PROGRESS
// =====================================

function restoreProgress() {
  const saved = localStorage.getItem("teacherOussamaProgress");

  if (saved) {
    try {
      const data = JSON.parse(saved);

      if (
        lessons[data.language] &&
        lessons[data.language][data.type] &&
        Number.isInteger(data.index) &&
        data.index >= 0 &&
        data.index < lessons[data.language][data.type].length
      ) {
        currentLanguage = data.language;
        currentType = data.type;
        currentIndex = data.index;

        document.querySelectorAll("[data-language]").forEach(button => {
          button.classList.toggle(
            "active",
            button.dataset.language === currentLanguage
          );
        });

        document.querySelectorAll("[data-type]").forEach(button => {
          button.classList.toggle(
            "active",
            button.dataset.type === currentType
          );
        });
      }
    } catch (error) {
      console.log("تعذر استرجاع التقدم المحفوظ.");
    }
  }

  showLesson();
}

// تشغيل الموقع
restoreProgress();
