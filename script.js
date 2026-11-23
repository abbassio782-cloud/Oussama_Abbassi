
// =====================================
// TEACHER OUSSAMA - ENGLISH LEARNING
// =====================================

const WHATSAPP_NUMBER = "212779583670";

// =====================================
// 1. ENGLISH LESSONS
// =====================================

const lessons = {
  words: [
    ["Hello", "مرحبا", "Hello, my friend."],
    ["Good morning", "صباح الخير", "Good morning, teacher."],
    ["Good evening", "مساء الخير", "Good evening, everyone."],
    ["Goodbye", "إلى اللقاء", "Goodbye, see you tomorrow."],
    ["Thank you", "شكرا", "Thank you for your help."],
    ["Please", "من فضلك", "Please, help me."],
    ["Sorry", "آسف", "Sorry, I am late."],
    ["Friend", "صديق", "He is my best friend."],
    ["Family", "العائلة", "I love my family."],
    ["School", "المدرسة", "I go to school every day."],
    ["Teacher", "أستاذ", "My teacher is kind."],
    ["Student", "تلميذ", "I am a student."],
    ["Book", "كتاب", "This is my book."],
    ["Pen", "قلم", "I have a blue pen."],
    ["Water", "ماء", "I drink water every day."],
    ["Food", "طعام", "The food is delicious."],
    ["House", "منزل", "My house is beautiful."],
    ["City", "مدينة", "I live in a small city."],
    ["Beautiful", "جميل", "Your English is beautiful."],
    ["Happy", "سعيد", "I am happy today."],
    ["Sad", "حزين", "She is sad."],
    ["Important", "مهم", "English is important."],
    ["Understand", "يفهم", "I understand the lesson."],
    ["Learn", "يتعلم", "I learn English every day."],
    ["Speak", "يتحدث", "I speak English."],
    ["Listen", "يستمع", "Listen to the teacher."],
    ["Write", "يكتب", "Write your name."],
    ["Read", "يقرأ", "I read a book."],
    ["Computer", "حاسوب", "I use my computer."],
    ["Phone", "هاتف", "This is my phone."],
    ["Morning", "الصباح", "I study in the morning."],
    ["Night", "الليل", "Good night, everyone."],
    ["Today", "اليوم", "Today is a good day."],
    ["Tomorrow", "غدا", "See you tomorrow."],
    ["Yesterday", "أمس", "I was at school yesterday."],
    ["Always", "دائما", "I always study English."],
    ["Sometimes", "أحيانا", "I sometimes play football."],
    ["Never", "أبدا", "I never give up."],
    ["Because", "لأن", "I study because I want to learn."],
    ["Beautifully", "بشكل جميل", "She sings beautifully."],
    ["Quickly", "بسرعة", "He runs quickly."],
    ["Slowly", "ببطء", "Please speak slowly."],
    ["Strong", "قوي", "He is strong."],
    ["Weak", "ضعيف", "The signal is weak."],
    ["Easy", "سهل", "English can be easy."],
    ["Difficult", "صعب", "This question is difficult."],
    ["Beautiful", "جميل", "It is a beautiful day."],
    ["Knowledge", "معرفة", "Knowledge is important."],
    ["Language", "لغة", "English is a language."],
    ["Question", "سؤال", "I have a question."],
    ["Answer", "جواب", "I know the answer."]
  ],

  sentences: [
    ["My name is Oussama.", "اسمي أسامة."],
    ["I am a student.", "أنا تلميذ."],
    ["I live in Morocco.", "أنا أعيش في المغرب."],
    ["I love learning English.", "أحب تعلم الإنجليزية."],
    ["How are you?", "كيف حالك؟"],
    ["I am fine, thank you.", "أنا بخير، شكرا لك."],
    ["What is your name?", "ما اسمك؟"],
    ["Where are you from?", "من أين أنت؟"],
    ["I am from Morocco.", "أنا من المغرب."],
    ["Nice to meet you.", "سعيد بلقائك."],
    ["Can you help me?", "هل يمكنك مساعدتي؟"],
    ["I don't understand.", "أنا لا أفهم."],
    ["Please speak slowly.", "من فضلك تحدث ببطء."],
    ["Can you repeat that?", "هل يمكنك إعادة ذلك؟"],
    ["I am learning English.", "أنا أتعلم الإنجليزية."],
    ["English is easy with practice.", "الإنجليزية سهلة مع الممارسة."],
    ["I wake up early.", "أستيقظ مبكرا."],
    ["I go to school every day.", "أذهب إلى المدرسة كل يوم."],
    ["I study in the evening.", "أدرس في المساء."],
    ["My favorite subject is English.", "مادتي المفضلة هي الإنجليزية."],
    ["What time is it?", "كم الساعة؟"],
    ["I am hungry.", "أنا جائع."],
    ["I am thirsty.", "أنا عطشان."],
    ["Where is the bathroom?", "أين يوجد الحمام؟"],
    ["I would like some water.", "أريد بعض الماء."],
    ["Have a nice day!", "أتمنى لك يوما سعيدا!"],
    ["See you soon.", "أراك قريبا."],
    ["Don't worry.", "لا تقلق."],
    ["Never give up.", "لا تستسلم أبدا."],
    ["Practice makes perfect.", "الممارسة تؤدي إلى الإتقان."],
    ["I like playing football.", "أحب لعب كرة القدم."],
    ["My favorite color is blue.", "لوني المفضل هو الأزرق."],
    ["I have two brothers.", "لدي أخوان."],
    ["She is my sister.", "هي أختي."],
    ["We are good friends.", "نحن أصدقاء جيدون."],
    ["I want to speak English.", "أريد التحدث بالإنجليزية."],
    ["This is my classroom.", "هذا قسمي الدراسي."],
    ["The weather is beautiful.", "الطقس جميل."],
    ["I am ready to learn.", "أنا مستعد للتعلم."],
    ["Thank you for your time.", "شكرا على وقتك."]
  ],

  grammar: [
    ["Verb to be: I am", "الفعل يكون: أنا أكون", "I am happy. = أنا سعيد."],
    ["Verb to be: You are", "الفعل يكون: أنت تكون", "You are smart. = أنت ذكي."],
    ["Verb to be: He is", "الفعل يكون: هو يكون", "He is a teacher. = هو أستاذ."],
    ["Verb to be: She is", "الفعل يكون: هي تكون", "She is a student. = هي تلميذة."],
    ["Verb to be: We are", "الفعل يكون: نحن نكون", "We are friends. = نحن أصدقاء."],
    ["Present Simple", "المضارع البسيط", "I play football every day. = ألعب كرة القدم كل يوم."],
    ["Present Continuous", "المضارع المستمر", "I am studying now. = أنا أدرس الآن."],
    ["Past Simple", "الماضي البسيط", "I played yesterday. = لعبت أمس."],
    ["Future with will", "المستقبل باستعمال will", "I will learn English. = سأتعلم الإنجليزية."],
    ["Articles: A / An", "أدوات التنكير", "A book / An apple."],
    ["Plural nouns", "الجمع", "One book / Two books."],
    ["Possessive adjectives", "صفات الملكية", "My book = كتابي."],
    ["Can / Can't", "القدرة وعدم القدرة", "I can swim. = أستطيع السباحة."],
    ["There is", "يوجد للمفرد", "There is a book. = يوجد كتاب."],
    ["There are", "يوجد للجمع", "There are two books. = يوجد كتابان."],
    ["Questions with Do", "الأسئلة باستعمال Do", "Do you speak English? = هل تتحدث الإنجليزية؟"],
    ["Questions with Does", "الأسئلة باستعمال Does", "Does he play football? = هل يلعب كرة القدم؟"],
    ["Negative sentences", "الجمل المنفية", "I do not like tea. = أنا لا أحب الشاي."],
    ["Adjectives", "الصفات", "A beautiful house = منزل جميل."],
    ["Prepositions", "حروف الجر", "The book is on the table. = الكتاب فوق الطاولة."],
    ["Comparatives", "المقارنة", "Ali is taller than Omar. = علي أطول من عمر."],
    ["Superlatives", "التفضيل", "He is the tallest. = هو الأطول."],
    ["Some and Any", "بعض وأي", "I have some water. = لدي بعض الماء."],
    ["Much and Many", "الكثير", "Many books = كتب كثيرة."],
    ["Must and Mustn't", "يجب ويمنع", "You must study. = يجب أن تدرس."]
  ],

  conversation: [
    ["A: Hello! How are you?", "B: Hello! I am fine, thank you.", "أ: مرحبا، كيف حالك؟ | ب: مرحبا، أنا بخير، شكرا."],
    ["A: What is your name?", "B: My name is Oussama.", "أ: ما اسمك؟ | ب: اسمي أسامة."],
    ["A: Where are you from?", "B: I am from Morocco.", "أ: من أين أنت؟ | ب: أنا من المغرب."],
    ["A: How old are you?", "B: I am fifteen years old.", "أ: كم عمرك؟ | ب: عمري خمسة عشر عاما."],
    ["A: What do you do?", "B: I am a student.", "أ: ماذا تعمل؟ | ب: أنا تلميذ."],
    ["A: Do you speak English?", "B: Yes, a little.", "أ: هل تتحدث الإنجليزية؟ | ب: نعم، قليلا."],
    ["A: What is your favorite color?", "B: My favorite color is blue.", "أ: ما لونك المفضل؟ | ب: لوني المفضل هو الأزرق."],
    ["A: What do you like?", "B: I like football.", "أ: ماذا تحب؟ | ب: أحب كرة القدم."],
    ["A: Are you ready?", "B: Yes, I am ready.", "أ: هل أنت مستعد؟ | ب: نعم، أنا مستعد."],
    ["A: See you tomorrow!", "B: See you!", "أ: أراك غدا! | ب: أراك!"],
    ["A: Can you help me?", "B: Of course!", "أ: هل يمكنك مساعدتي؟ | ب: بالطبع!"],
    ["A: What time is it?", "B: It is nine o'clock.", "أ: كم الساعة؟ | ب: الساعة التاسعة."]
  ]
};

// =====================================
// 2. SPEAK ENGLISH
// =====================================

function speakEnglish(text) {
  if (!("speechSynthesis" in window)) {
    alert("المتصفح ديالك لا يدعم النطق الصوتي.");
    return;
  }

  window.speechSynthesis.cancel();

  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "en-US";
  voice.rate = 0.85;
  voice.pitch = 1;

  window.speechSynthesis.speak(voice);
}

// =====================================
// 3. DISPLAY LESSONS
// =====================================

let currentType = "words";

const lessonList = document.getElementById("lessonList");
const lessonCount = document.getElementById("lessonCount");
const searchInput = document.getElementById("searchInput");

function createLessonCard(item, index) {
  const card = document.createElement("article");
  card.className = "lesson-card";

  let english = "";
  let arabic = "";
  let example = "";

  if (currentType === "words") {
    english = item[0];
    arabic = item[1];
    example = item[2];
  }

  if (currentType === "sentences") {
    english = item[0];
    arabic = item[1];
  }

  if (currentType === "grammar") {
    english = item[0];
    arabic = item[1];
    example = item[2];
  }

  if (currentType === "conversation") {
    english = item[0] + "\n" + item[1];
    arabic = item[2];
  }

  const number = document.createElement("span");
  number.className = "lesson-number";
  number.textContent = `LESSON ${index + 1}`;

  const title = document.createElement("h3");
  title.textContent = english;
  title.style.whiteSpace = "pre-line";

  const translation = document.createElement("div");
  translation.className = "lesson-translation";
  translation.textContent = arabic;

  card.append(number, title, translation);

  if (example) {
    const exampleText = document.createElement("p");
    exampleText.className = "lesson-example";
    exampleText.textContent = example;
    card.appendChild(exampleText);
  }

  // زر النطق فقط، لا يوجد شراء أو تحميل داخل الدروس
  const actions = document.createElement("div");
  actions.className = "lesson-actions";

  const voiceButton = document.createElement("button");
  voiceButton.textContent = "🔊 استمع للنطق";
  voiceButton.addEventListener("click", () => {
    speakEnglish(english);
  });

  actions.appendChild(voiceButton);
  card.appendChild(actions);

  return card;
}

function displayLessons() {
  lessonList.innerHTML = "";

  const search = searchInput.value.trim().toLowerCase();

  const filtered = lessons[currentType].filter(item =>
    item.join(" ").toLowerCase().includes(search)
  );

  lessonCount.textContent = `${filtered.length} درس`;

  if (filtered.length === 0) {
    lessonList.textContent = "لم يتم العثور على أي درس.";
    return;
  }

  filtered.forEach((item, index) => {
    lessonList.appendChild(createLessonCard(item, index));
  });
}

// تغيير نوع الدروس
document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    currentType = button.dataset.type;
    displayLessons();
  });
});

// البحث
searchInput.addEventListener("input", displayLessons);

// =====================================
// 4. WHATSAPP
// =====================================

function openWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener");
}

// زر شراء الدروس باختيارك
document.getElementById("buyAllLessons").addEventListener("click", () => {
  openWhatsApp(
    "السلام عليكم، بغيت نشري الدروس اللي نختار من TEACHER OUSSAMA. بغيت نعرف طريقة الاختيار والثمن."
  );
});

// عروض VIP
document.querySelectorAll(".vip-button").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;

    openWhatsApp(
      `السلام عليكم، بغيت نشترك في ${plan} في TEACHER OUSSAMA.`
    );
  });
});

// =====================================
// 5. QUIZ QUESTIONS
// =====================================

const quizQuestions = [
  {
    question: 'What does "Hello" mean?',
    answers: ["مرحبا", "وداعا", "شكرا"],
    correct: 0
  },
  {
    question: 'What does "Book" mean?',
    answers: ["قلم", "كتاب", "مدرسة"],
    correct: 1
  },
  {
    question: "Choose the correct sentence:",
    answers: ["I am student.", "I is a student.", "I am a student."],
    correct: 2
  },
  {
    question: 'What is the opposite of "Happy"?',
    answers: ["Sad", "Good", "Beautiful"],
    correct: 0
  },
  {
    question: "Complete: She ___ a teacher.",
    answers: ["am", "is", "are"],
    correct: 1
  },
  {
    question: 'What does "Water" mean?',
    answers: ["ماء", "طعام", "خبز"],
    correct: 0
  },
  {
    question: "Choose the correct plural:",
    answers: ["Two book", "Two books", "Two bookes"],
    correct: 1
  },
  {
    question: "Complete: I ___ English every day.",
    answers: ["study", "studies", "studying"],
    correct: 0
  },
  {
    question: 'What does "Thank you" mean?',
    answers: ["من فضلك", "شكرا", "آسف"],
    correct: 1
  },
  {
    question: "Complete: They ___ happy.",
    answers: ["is", "am", "are"],
    correct: 2
  },
  {
    question: 'What does "Beautiful" mean?',
    answers: ["صعب", "جميل", "حزين"],
    correct: 1
  },
  {
    question: "Complete: He ___ my friend.",
    answers: ["is", "are", "am"],
    correct: 0
  },
  {
    question: 'What does "Tomorrow" mean?',
    answers: ["أمس", "اليوم", "غدا"],
    correct: 2
  },
  {
    question: "Choose the correct sentence:",
    answers: ["I likes English.", "I like English.", "I liking English."],
    correct: 1
  },
  {
    question: 'What does "School" mean?',
    answers: ["المدرسة", "المنزل", "الكتاب"],
    correct: 0
  }
];

// =====================================
// 6. QUIZ SYSTEM
// =====================================

let questionIndex = 0;
let score = 0;
let answered = false;

const quizQuestion = document.getElementById("quizQuestion");
const quizAnswers = document.getElementById("quizAnswers");
const quizProgress = document.getElementById("quizProgress");
const quizScore = document.getElementById("quizScore");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const restartQuiz = document.getElementById("restartQuiz");

function showQuestion() {
  answered = false;

  const current = quizQuestions[questionIndex];

  quizQuestion.textContent = current.question;

  quizProgress.textContent =
    `السؤال ${questionIndex + 1} / ${quizQuestions.length}`;

  quizScore.textContent = `النقطة: ${score}`;

  quizAnswers.innerHTML = "";
  quizFeedback.textContent = "";

  nextQuestion.disabled = true;
  nextQuestion.hidden = false;
  restartQuiz.hidden = true;

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-option";
    button.textContent = answer;

    button.addEventListener("click", () => {
      checkAnswer(index, button);
    });

    quizAnswers.appendChild(button);
  });
}

function checkAnswer(selected, selectedButton) {
  if (answered) return;

  answered = true;

  const current = quizQuestions[questionIndex];
  const allButtons = quizAnswers.querySelectorAll("button");

  allButtons.forEach(button => {
    button.disabled = true;
  });

  if (selected === current.correct) {
    score++;

    selectedButton.classList.add("correct");

    quizFeedback.textContent = "✅ إجابة صحيحة! ممتاز.";
    quizFeedback.style.color = "#35df8c";
  } else {
    selectedButton.classList.add("wrong");

    allButtons[current.correct].classList.add("correct");

    quizFeedback.textContent =
      "❌ جواب غير صحيح، حاول مرة أخرى في المرة القادمة.";

    quizFeedback.style.color = "#ff647c";
  }

  quizScore.textContent = `النقطة: ${score}`;
  nextQuestion.disabled = false;
}

function finishQuiz() {
  quizQuestion.textContent =
    `انتهى الاختبار! نتيجتك ${score} من ${quizQuestions.length}`;

  quizProgress.textContent = "النتيجة النهائية";
  quizAnswers.innerHTML = "";

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage >= 80) {
    quizFeedback.textContent = "🏆 ممتاز! مستواك رائع.";
  } else if (percentage >= 50) {
    quizFeedback.textContent = "👏 جيد! استمر في التعلم.";
  } else {
    quizFeedback.textContent =
      "💪 لا تستسلم! راجع الدروس وحاول مجددا.";
  }

  nextQuestion.hidden = true;
  restartQuiz.hidden = false;
}

nextQuestion.addEventListener("click", () => {
  if (!answered) return;

  questionIndex++;

  if (questionIndex >= quizQuestions.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
});

restartQuiz.addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  showQuestion();
});

// =====================================
// 7. START WEBSITE
// =====================================

displayLessons();
showQuestion();
