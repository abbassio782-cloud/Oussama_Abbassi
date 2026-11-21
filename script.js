
// ======================================
// TEACHER OUSSAMA - 100 LESSONS
// ======================================

const lessons = {
  en: {
    words: [
      ["Hello","مرحبا","هَلو"],
      ["Goodbye","إلى اللقاء","غود باي"],
      ["Thank you","شكرا لك","ثانك يو"],
      ["Please","من فضلك","بليز"],
      ["Water","ماء","ووتر"],
      ["Friend","صديق","فريند"],
      ["School","مدرسة","سكول"],
      ["Book","كتاب","بوك"],
      ["Beautiful","جميل","بيوتيفول"],
      ["Family","عائلة","فاميلي"],
      ["House","منزل","هاوس"],
      ["Car","سيارة","كار"],
      ["Computer","حاسوب","كمبيوتر"],
      ["Phone","هاتف","فون"],
      ["Teacher","أستاذ","تيتشر"],
      ["Student","تلميذ","ستيودنت"],
      ["Mother","أم","ماذر"],
      ["Father","أب","فاذر"],
      ["Brother","أخ","براذر"],
      ["Sister","أخت","سيستر"],
      ["Food","طعام","فود"],
      ["Milk","حليب","ميلك"],
      ["Bread","خبز","براد"],
      ["Apple","تفاحة","آبل"],
      ["Beautiful day","يوم جميل","بيوتيفول داي"]
    ],

    sentences: [
      ["How are you?","كيف حالك؟","هاو آر يو"],
      ["My name is Oussama.","اسمي أسامة.","ماي نايم إز أسامة"],
      ["I am happy.","أنا سعيد.","آي آم هابي"],
      ["Where are you from?","من أين أنت؟","وير آر يو فروم"],
      ["I love learning.","أنا أحب التعلم.","آي لاف ليرنينغ"],
      ["Good morning.","صباح الخير.","غود مورنينغ"],
      ["See you tomorrow.","أراك غدا.","سي يو تومورو"],
      ["I don't understand.","أنا لا أفهم.","آي دونت أندرستاند"],
      ["Can you help me?","هل يمكنك مساعدتي؟","كان يو هيلب مي"],
      ["Have a nice day.","أتمنى لك يوما جميلا.","هاف أ نايس داي"],
      ["I am a student.","أنا تلميذ.","آي آم أ ستيودنت"],
      ["This is my book.","هذا كتابي.","ذيس إز ماي بوك"],
      ["I live in Morocco.","أنا أعيش في المغرب.","آي ليف إن موروكو"],
      ["I speak English.","أنا أتكلم الإنجليزية.","آي سبيك إنغليش"],
      ["What is your name?","ما اسمك؟","وات إز يور نايم"],
      ["How old are you?","كم عمرك؟","هاو أولد آر يو"],
      ["I am learning English.","أنا أتعلم الإنجليزية.","آي آم ليرنينغ إنغليش"],
      ["Open the door.","افتح الباب.","أوبن ذا دور"],
      ["Close the window.","أغلق النافذة.","كلوز ذا ويندو"],
      ["I like music.","أنا أحب الموسيقى.","آي لايك ميوزيك"],
      ["Where is the school?","أين المدرسة؟","وير إز ذا سكول"],
      ["I need some water.","أحتاج بعض الماء.","آي نيد سام ووتر"],
      ["Today is a good day.","اليوم يوم جيد.","توداي إز أ غود داي"],
      ["Please speak slowly.","تحدث ببطء من فضلك.","بليز سبيك سلولي"],
      ["I want to travel.","أريد السفر.","آي وانت تو ترافل"]
    ]
  },

  es: {
    words: [
      ["Hola","مرحبا","أولا"],
      ["Adiós","إلى اللقاء","أديوس"],
      ["Gracias","شكرا","غراسياس"],
      ["Por favor","من فضلك","بور فابور"],
      ["Agua","ماء","أغوا"],
      ["Amigo","صديق","أميغو"],
      ["Escuela","مدرسة","إسكويلا"],
      ["Libro","كتاب","ليبرو"],
      ["Bonito","جميل","بونيتو"],
      ["Familia","عائلة","فاميليا"],
      ["Casa","منزل","كاسا"],
      ["Coche","سيارة","كوتشي"],
      ["Ordenador","حاسوب","أوردينادور"],
      ["Teléfono","هاتف","تيليفونو"],
      ["Profesor","أستاذ","بروفيسور"],
      ["Estudiante","تلميذ","إستوديانتِ"],
      ["Madre","أم","مادري"],
      ["Padre","أب","بادري"],
      ["Hermano","أخ","إرمانو"],
      ["Hermana","أخت","إرمانا"],
      ["Comida","طعام","كوميدا"],
      ["Leche","حليب","ليتشي"],
      ["Pan","خبز","بان"],
      ["Manzana","تفاحة","مانثانا"],
      ["Perro","كلب","بيرو"]
    ],

    sentences: [
      ["¿Cómo estás?","كيف حالك؟","كومو إستاس"],
      ["Me llamo Oussama.","اسمي أسامة.","مي يامو أسامة"],
      ["Estoy feliz.","أنا سعيد.","إستوي فيليث"],
      ["¿De dónde eres?","من أين أنت؟","دي دوندي إيريس"],
      ["Me gusta aprender.","أحب التعلم.","مي غوستا أبريندير"],
      ["Buenos días.","صباح الخير.","بوينوس دياس"],
      ["Hasta mañana.","أراك غدا.","أستا مانيانا"],
      ["No entiendo.","أنا لا أفهم.","نو إنتييندو"],
      ["¿Puedes ayudarme?","هل يمكنك مساعدتي؟","بويديس أيودارمي"],
      ["Que tengas un buen día.","أتمنى لك يوما جميلا.","كي تينغاس أون بوين ديا"],
      ["Soy estudiante.","أنا تلميذ.","سوي إستوديانتِ"],
      ["Este es mi libro.","هذا كتابي.","إستي إز مي ليبرو"],
      ["Vivo en Marruecos.","أنا أعيش في المغرب.","بيبو إن مارويكوس"],
      ["Hablo español.","أنا أتكلم الإسبانية.","أبلو إسبانيول"],
      ["¿Cómo te llamas?","ما اسمك؟","كومو تي ياماس"],
      ["¿Cuántos años tienes?","كم عمرك؟","كوانتوس أنيوس تيينيس"],
      ["Estoy aprendiendo español.","أنا أتعلم الإسبانية.","إستوي أبريندييندو إسبانيول"],
      ["Abre la puerta.","افتح الباب.","أبري لا بويرتا"],
      ["Cierra la ventana.","أغلق النافذة.","ثييرا لا بينتانا"],
      ["Me gusta la música.","أنا أحب الموسيقى.","مي غوستا لا موسيكا"],
      ["¿Dónde está la escuela?","أين المدرسة؟","دوندي إستا لا إسكويلا"],
      ["Necesito agua.","أحتاج الماء.","نيسيسيتو أغوا"],
      ["Hoy es un buen día.","اليوم يوم جيد.","أوي إز أون بوين ديا"],
      ["Habla despacio, por favor.","تحدث ببطء من فضلك.","أبلا ديسباسيو بور فابور"],
      ["Quiero viajar.","أريد السفر.","كييرو بياخار"]
    ]
  }
};

// تحويل البيانات إلى الشكل المستعمل في التطبيق
for (const language of Object.keys(lessons)) {
  for (const type of ["words", "sentences"]) {
    lessons[language][type] = lessons[language][type].map(item => ({
      text: item[0],
      ar: item[1],
      pron: item[2]
    }));
  }
}

// ======================================
// VARIABLES
// ======================================

let currentLanguage = "en";
let currentType = "words";
let currentIndex = 0;
let quizIndex = 0;
let quizAnswered = false;
let quizQuestions = [];

const $ = id => document.getElementById(id);

const foreignText = $("foreignText");
const arabicText = $("arabicText");
const pronunciationText = $("pronunciationText");
const lessonTitle = $("lessonTitle");
const lessonCount = $("lessonCount");
const progressFill = $("progressFill");
const previousBtn = $("previousBtn");
const nextBtn = $("nextBtn");

// ======================================
// LESSONS
// ======================================

function getCurrentLessons() {
  return lessons[currentLanguage][currentType];
}

function progressKey() {
  return `teacher_oussama_${currentLanguage}_${currentType}`;
}

function displayLesson() {
  const list = getCurrentLessons();
  const lesson = list[currentIndex];

  foreignText.textContent = lesson.text;
  arabicText.textContent = lesson.ar;
  pronunciationText.textContent = "النطق التقريبي: " + lesson.pron;

  const languageName =
    currentLanguage === "en" ? "الإنجليزية" : "الإسبانية";

  const typeName =
    currentType === "words" ? "الكلمات" : "الجمل";

  lessonTitle.textContent = `درس ${typeName} ${languageName}`;
  lessonCount.textContent = `${currentIndex + 1} / ${list.length}`;

  progressFill.style.width =
    ((currentIndex + 1) / list.length * 100) + "%";

  previousBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === list.length - 1;

  nextBtn.textContent =
    currentIndex === list.length - 1
      ? "وصلتي لنهاية الدروس 🎉"
      : "الدرس التالي ←";

  $("lessonSymbol").textContent =
    currentType === "words" ? "📖" : "💬";

  localStorage.setItem(progressKey(), currentIndex);

  $("savedProgress").textContent =
    "✅ تقدمك محفوظ: " + (currentIndex + 1) + " من " + list.length;
}

function changeLanguage(button) {
  currentLanguage = button.dataset.language;
  currentIndex = 0;

  document.querySelectorAll(".language-card").forEach(card => {
    card.classList.toggle("active", card === button);
  });

  currentIndex = Math.min(
    Number(localStorage.getItem(progressKey()) || 0),
    getCurrentLessons().length - 1
  );

  displayLesson();
  startQuiz();
}

function changeType(button) {
  currentType = button.dataset.type;

  document.querySelectorAll(".type-card").forEach(card => {
    card.classList.toggle("active", card === button);
  });

  currentIndex = Math.min(
    Number(localStorage.getItem(progressKey()) || 0),
    getCurrentLessons().length - 1
  );

  displayLesson();
}

document.querySelectorAll(".language-card").forEach(button => {
  button.addEventListener("click", () => changeLanguage(button));
});

document.querySelectorAll(".type-card").forEach(button => {
  button.addEventListener("click", () => changeType(button));
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < getCurrentLessons().length - 1) {
    currentIndex++;
    displayLesson();
  }
});

previousBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    displayLesson();
  }
});

// ======================================
// VOICE
// ======================================

function speakLesson(rate = 0.8) {
  if (!("speechSynthesis" in window)) {
    alert("المتصفح ديالك لا يدعم النطق الصوتي.");
    return;
  }

  window.speechSynthesis.cancel();

  const lesson = getCurrentLessons()[currentIndex];
  const utterance = new SpeechSynthesisUtterance(lesson.text);

  utterance.lang = currentLanguage === "en" ? "en-US" : "es-ES";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  const voices = window.speechSynthesis.getVoices();

  const voice = voices.find(v =>
    v.lang.toLowerCase().startsWith(
      currentLanguage === "en" ? "en" : "es"
    )
  );

  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}

$("speakBtn").addEventListener("click", () => speakLesson(0.85));
$("slowBtn").addEventListener("click", () => speakLesson(0.55));

// ======================================
// QUIZ
// ======================================

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  const allLessons = [
    ...lessons[currentLanguage].words,
    ...lessons[currentLanguage].sentences
  ];

  quizQuestions = shuffle(allLessons).slice(0, 10).map(lesson => {
    const wrongAnswers = shuffle(
      allLessons
        .filter(item => item.ar !== lesson.ar)
        .map(item => item.ar)
    ).slice(0, 3);

    return {
      question: `شنو معنى "${lesson.text}"؟`,
      correct: lesson.ar,
      answers: shuffle([lesson.ar, ...wrongAnswers])
    };
  });

  quizIndex = 0;
  quizAnswered = false;
  displayQuiz();
}

function displayQuiz() {
  const question = quizQuestions[quizIndex];
  if (!question) return;

  quizAnswered = false;

  $("quizNumber").textContent =
    `السؤال ${quizIndex + 1} من ${quizQuestions.length}`;

  $("quizQuestion").textContent = question.question;

  $("quizFeedback").textContent = "";
  $("quizFeedback").className = "quiz-feedback";

  $("nextQuestionBtn").hidden = true;

  const answersArea = $("quizAnswers");
  answersArea.innerHTML = "";

  question.answers.forEach(answer => {
    const button = document.createElement("button");

    button.className = "answer-btn";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(button, answer, question.correct);
    });

    answersArea.appendChild(button);
  });
}

function checkAnswer(button, answer, correct) {
  if (quizAnswered) return;

  quizAnswered = true;

  const feedback = $("quizFeedback");

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.disabled = true;

    if (btn.textContent === correct) {
      btn.classList.add("correct");
    }
  });

  if (answer === correct) {
    feedback.textContent = "🎉 ممتاز! الجواب صحيح.";
    feedback.classList.add("good");
  } else {
    button.classList.add("wrong");
    feedback.textContent = "❌ الجواب الصحيح هو: " + correct;
    feedback.classList.add("bad");
  }

  $("nextQuestionBtn").hidden = false;

  $("nextQuestionBtn").textContent =
    quizIndex === quizQuestions.length - 1
      ? "عرض النتيجة"
      : "السؤال التالي";
}

$("nextQuestionBtn").addEventListener("click", () => {
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    displayQuiz();
  } else {
    $("quizNumber").textContent = "🎓 نهاية الاختبار";
    $("quizQuestion").textContent =
      "ساليتي الاختبار! تقدر تعاود وتحاول تحسن النتيجة.";
    $("quizAnswers").innerHTML = "";
    $("quizFeedback").textContent =
      "برافو عليك! استمر في التعلم.";
    $("quizFeedback").className = "quiz-feedback good";
    $("nextQuestionBtn").textContent = "إعادة الاختبار";
    $("nextQuestionBtn").onclick = () => {
      $("nextQuestionBtn").onclick = null;
      startQuiz();
    };
  }
});

// ======================================
// INITIALIZE
// ======================================

currentIndex = Math.min(
  Number(localStorage.getItem(progressKey()) || 0),
  getCurrentLessons().length - 1
);

displayLesson();
startQuiz();
