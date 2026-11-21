// ===============================
// TEACHER OUSSAMA - LEARNING APP
// ===============================

const lessons = {
  en: {
    words: [
      { text: "Hello", ar: "مرحبا", pron: "هَـلّو" },
      { text: "Goodbye", ar: "إلى اللقاء", pron: "غود باي" },
      { text: "Thank you", ar: "شكرا لك", pron: "ثانك يو" },
      { text: "Please", ar: "من فضلك", pron: "بليز" },
      { text: "Water", ar: "ماء", pron: "ووتر" },
      { text: "Friend", ar: "صديق", pron: "فريند" },
      { text: "School", ar: "مدرسة", pron: "سكول" },
      { text: "Book", ar: "كتاب", pron: "بوك" },
      { text: "Beautiful", ar: "جميل", pron: "بيوتيفول" },
      { text: "Family", ar: "عائلة", pron: "فاميلي" }
    ],

    sentences: [
      { text: "How are you?", ar: "كيف حالك؟", pron: "هاو آر يو؟" },
      { text: "My name is Oussama.", ar: "اسمي أسامة.", pron: "ماي نايم إز أسامة." },
      { text: "I am happy.", ar: "أنا سعيد.", pron: "آي آم هابي." },
      { text: "Where are you from?", ar: "من أين أنت؟", pron: "وير آر يو فروم؟" },
      { text: "I love learning.", ar: "أنا أحب التعلم.", pron: "آي لاف ليرنينغ." },
      { text: "Good morning.", ar: "صباح الخير.", pron: "غود مورنينغ." },
      { text: "See you tomorrow.", ar: "أراك غدا.", pron: "سي يو تومورو." },
      { text: "I don't understand.", ar: "أنا لا أفهم.", pron: "آي دونت أندرستاند." },
      { text: "Can you help me?", ar: "هل يمكنك مساعدتي؟", pron: "كان يو هيلب مي؟" },
      { text: "Have a nice day.", ar: "أتمنى لك يوما جميلا.", pron: "هاف أ نايس داي." }
    ]
  },

  es: {
    words: [
      { text: "Hola", ar: "مرحبا", pron: "أولا" },
      { text: "Adiós", ar: "إلى اللقاء", pron: "أديوس" },
      { text: "Gracias", ar: "شكرا", pron: "غراسياس" },
      { text: "Por favor", ar: "من فضلك", pron: "بور فابور" },
      { text: "Agua", ar: "ماء", pron: "أغوا" },
      { text: "Amigo", ar: "صديق", pron: "أميغو" },
      { text: "Escuela", ar: "مدرسة", pron: "إسكويلا" },
      { text: "Libro", ar: "كتاب", pron: "ليبرو" },
      { text: "Bonito", ar: "جميل", pron: "بونيتو" },
      { text: "Familia", ar: "عائلة", pron: "فاميليا" }
    ],

    sentences: [
      { text: "¿Cómo estás?", ar: "كيف حالك؟", pron: "كومو إستاس؟" },
      { text: "Me llamo Oussama.", ar: "اسمي أسامة.", pron: "مي يامو أسامة." },
      { text: "Estoy feliz.", ar: "أنا سعيد.", pron: "إستوي فيليث" },
      { text: "¿De dónde eres?", ar: "من أين أنت؟", pron: "دي دوندي إيريس؟" },
      { text: "Me gusta aprender.", ar: "أحب التعلم.", pron: "مي غوستا أبريندير." },
      { text: "Buenos días.", ar: "صباح الخير.", pron: "بوينوس دياس." },
      { text: "Hasta mañana.", ar: "أراك غدا.", pron: "أستا مانيانا." },
      { text: "No entiendo.", ar: "أنا لا أفهم.", pron: "نو إنتييندو." },
      { text: "¿Puedes ayudarme?", ar: "هل يمكنك مساعدتي؟", pron: "بويديس أيودارمي؟" },
      { text: "Que tengas un buen día.", ar: "أتمنى لك يوما جميلا.", pron: "كي تينغاس أون بوين ديا." }
    ]
  }
};

// ===============================
// VARIABLES
// ===============================

let currentLanguage = "en";
let currentType = "words";
let currentIndex = 0;
let quizIndex = 0;
let quizAnswered = false;

const foreignText = document.getElementById("foreignText");
const arabicText = document.getElementById("arabicText");
const pronunciationText = document.getElementById("pronunciationText");
const lessonTitle = document.getElementById("lessonTitle");
const lessonCount = document.getElementById("lessonCount");
const progressFill = document.getElementById("progressFill");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

// ===============================
// GET CURRENT LESSONS
// ===============================

function getCurrentLessons() {
  return lessons[currentLanguage][currentType];
}

// ===============================
// DISPLAY LESSON
// ===============================

function displayLesson() {
  const list = getCurrentLessons();
  const lesson = list[currentIndex];

  foreignText.textContent = lesson.text;
  arabicText.textContent = lesson.ar;
  pronunciationText.textContent = "النطق التقريبي: " + lesson.pron;

  const languageName = currentLanguage === "en"
    ? "الإنجليزية"
    : "الإسبانية";

  const typeName = currentType === "words"
    ? "الكلمات"
    : "الجمل";

  lessonTitle.textContent = "درس " + typeName + " " + languageName;

  lessonCount.textContent = (currentIndex + 1) + " / " + list.length;

  progressFill.style.width =
    ((currentIndex + 1) / list.length * 100) + "%";

  previousBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === list.length - 1;

  nextBtn.textContent =
    currentIndex === list.length - 1
      ? "نهاية الدرس"
      : "الدرس التالي ←";

  document.getElementById("lessonSymbol").textContent =
    currentType === "words" ? "📖" : "💬";
}

// ===============================
// LANGUAGE SELECTION
// ===============================

document.querySelectorAll(".language-card").forEach(button => {
  button.addEventListener("click", () => {
    currentLanguage = button.dataset.language;
    currentIndex = 0;

    document.querySelectorAll(".language-card").forEach(card => {
      card.classList.remove("active");
    });

    button.classList.add("active");

    displayLesson();
    resetQuiz();
  });
});

// ===============================
// TYPE SELECTION
// ===============================

document.querySelectorAll(".type-card").forEach(button => {
  button.addEventListener("click", () => {
    currentType = button.dataset.type;
    currentIndex = 0;

    document.querySelectorAll(".type-card").forEach(card => {
      card.classList.remove("active");
    });

    button.classList.add("active");

    displayLesson();
  });
});

// ===============================
// NEXT AND PREVIOUS
// ===============================

nextBtn.addEventListener("click", () => {
  const list = getCurrentLessons();

  if (currentIndex < list.length - 1) {
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

// ===============================
// TEXT TO SPEECH
// ===============================

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

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

document.getElementById("speakBtn").addEventListener("click", () => {
  speakLesson(0.85);
});

document.getElementById("slowBtn").addEventListener("click", () => {
  speakLesson(0.55);
});

// ===============================
// QUIZ DATA
// ===============================

const quizData = {
  en: [
    {
      question: "شنو معنى Hello؟",
      answers: ["مرحبا", "كتاب", "ماء", "مدرسة"],
      correct: "مرحبا"
    },
    {
      question: "شنو معنى Thank you؟",
      answers: ["صباح الخير", "شكرا", "وداعا", "صديق"],
      correct: "شكرا"
    },
    {
      question: "شنو معنى Water؟",
      answers: ["كتاب", "عائلة", "ماء", "جميل"],
      correct: "ماء"
    },
    {
      question: "شنو معنى School؟",
      answers: ["مدرسة", "صديق", "مرحبا", "جميل"],
      correct: "مدرسة"
    },
    {
      question: "شنو معنى Friend؟",
      answers: ["ماء", "صديق", "كتاب", "عائلة"],
      correct: "صديق"
    }
  ],

  es: [
    {
      question: "شنو معنى Hola؟",
      answers: ["مرحبا", "كتاب", "ماء", "مدرسة"],
      correct: "مرحبا"
    },
    {
      question: "شنو معنى Gracias؟",
      answers: ["وداعا", "شكرا", "صديق", "ماء"],
      correct: "شكرا"
    },
    {
      question: "شنو معنى Agua؟",
      answers: ["كتاب", "عائلة", "ماء", "مدرسة"],
      correct: "ماء"
    },
    {
      question: "شنو معنى Escuela؟",
      answers: ["مدرسة", "مرحبا", "جميل", "صديق"],
      correct: "مدرسة"
    },
    {
      question: "شنو معنى Amigo؟",
      answers: ["ماء", "صديق", "كتاب", "عائلة"],
      correct: "صديق"
    }
  ]
};

// ===============================
// DISPLAY QUIZ
// ===============================

function displayQuiz() {
  const questions = quizData[currentLanguage];
  const question = questions[quizIndex];

  quizAnswered = false;

  document.getElementById("quizNumber").textContent =
    "السؤال " + (quizIndex + 1) + " من " + questions.length;

  document.getElementById("quizQuestion").textContent =
    question.question;

  document.getElementById("quizFeedback").textContent = "";
  document.getElementById("quizFeedback").className = "quiz-feedback";

  document.getElementById("nextQuestionBtn").hidden = true;

  const answersArea = document.getElementById("quizAnswers");
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

// ===============================
// CHECK ANSWER
// ===============================

function checkAnswer(button, answer, correct) {
  if (quizAnswered) return;

  quizAnswered = true;

  const feedback = document.getElementById("quizFeedback");
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach(btn => {
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

  document.getElementById("nextQuestionBtn").hidden = false;

  if (quizIndex === quizData[currentLanguage].length - 1) {
    document.getElementById("nextQuestionBtn").textContent = "إعادة الاختبار";
  } else {
    document.getElementById("nextQuestionBtn").textContent = "السؤال التالي";
  }
}

// ===============================
// NEXT QUIZ QUESTION
// ===============================

document.getElementById("nextQuestionBtn").addEventListener("click", () => {
  const total = quizData[currentLanguage].length;

  if (quizIndex < total - 1) {
    quizIndex++;
  } else {
    quizIndex = 0;
  }

  displayQuiz();
});

// ===============================
// RESET QUIZ WHEN LANGUAGE CHANGES
// ===============================

function resetQuiz() {
  quizIndex = 0;
  displayQuiz();
}

// ===============================
// INITIALIZE WEBSITE
// ===============================

displayLesson();
displayQuiz();
