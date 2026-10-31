
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MOTO MAROC PRIX</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body>

  <header class="header">
    <div class="logo">MOTO <span>MAROC</span></div>
    <nav>
      <a href="#home">الرئيسية</a>
      <a href="#catalog">الدراجات</a>
      <a href="#team">فريق العمل</a>
      <a href="#contact">تواصل معنا</a>
    </nav>
  </header>

  <section class="hero" id="home">
    <div class="hero-content">
      <p class="small-title">مرحباً بك في عالم الدراجات النارية</p>
      <h1>MOTO <span>MAROC</span> PRIX</h1>
      <h2>اكتشف دراجتك المفضلة واعرف ثمنها</h2>
      <p>كتالوج متنوع للدراجات النارية مع معلومات وأثمنة تقريبية بالدرهم المغربي.</p>
      <a href="#catalog" class="main-btn">اكتشف الدراجات</a>
    </div>
  </section>

  <main>
    <section class="catalog-section" id="catalog">
      <div class="section-heading">
        <p>كتالوج الدراجات</p>
        <h2>اكتشف <span>أكثر من 200 دراجة</span></h2>
      </div>

      <div class="filters">
        <input id="searchInput" type="search" placeholder="قلب على اسم الدراجة أو الماركة...">

        <select id="brandFilter">
          <option value="">جميع الماركات</option>
        </select>

        <select id="typeFilter">
          <option value="">جميع الأنواع</option>
          <option value="Sport">رياضية</option>
          <option value="Naked">Naked</option>
          <option value="Scooter">سكوتر</option>
          <option value="Adventure">مغامرات</option>
          <option value="Cruiser">كروزر</option>
          <option value="Street">Street</option>
          <option value="Touring">سياحية</option>
          <option value="Dirt">طرق وعرة</option>
        </select>

        <select id="priceFilter">
          <option value="">جميع الأثمنة</option>
          <option value="0-15000">أقل من 15,000 درهم</option>
          <option value="15000-30000">15,000 - 30,000 درهم</option>
          <option value="30000-60000">30,000 - 60,000 درهم</option>
          <option value="60000-100000">60,000 - 100,000 درهم</option>
          <option value="100000-9999999">أكثر من 100,000 درهم</option>
        </select>
      </div>

      <div class="results-bar">
        <span id="resultsCount">جاري عرض الدراجات...</span>
        <button id="resetFilters" class="reset-btn">إعادة ضبط البحث</button>
      </div>

      <div class="bike-grid" id="bikeGrid"></div>

      <p id="noResults" class="no-results" hidden>ما لقيناش دراجات بهاد المواصفات.</p>
    </section>

    <section class="about-section">
      <div>
        <p class="small-title">MOTO MAROC PRIX</p>
        <h2>كل ما تحتاج معرفته عن الدراجات النارية</h2>
        <p>
          هذا الموقع عبارة عن كتالوج تعريفي يساعدك على اكتشاف موديلات
          مختلفة من الدراجات النارية والتعرف على أثمنتها التقريبية.
          الأثمنة قابلة للتغيير حسب الحالة والسنة والسوق.
        </p>
      </div>
      <div class="about-icon">🏍️</div>
    </section>

    <section class="team-section" id="team">
      <div class="section-heading">
        <p>الأشخاص وراء المشروع</p>
        <h2>فريق <span>العمل</span></h2>
      </div>

      <div class="team-grid">
        <div class="team-card">
          <div class="team-avatar">O</div>
          <h3>أسامة العباسي</h3>
          <p>صاحب المشروع</p>
        </div>

        <div class="team-card">
          <div class="team-avatar">M</div>
          <h3>محمد أمين الدوادي</h3>
          <p>فريق العمل</p>
        </div>

        <div class="team-card">
          <div class="team-avatar">A</div>
          <h3>أيوب البالي</h3>
          <p>فريق العمل</p>
        </div>
      </div>
    </section>

    <section class="contact-section" id="contact">
      <p class="small-title">نحن هنا للإجابة عن استفساراتكم</p>
      <h2>تواصل <span>معنا</span></h2>
      <p>للتواصل أو إرسال اقتراحاتكم عبر البريد الإلكتروني:</p>
      <a class="email-link" href="mailto:oussamaabbassi733@gmail.com">
        oussamaabbassi733@gmail.com
      </a>
    </section>
  </main>

  <footer>
    <p>© 2026 MOTO MAROC PRIX - جميع الحقوق محفوظة</p>
    <p>الأثمنة المعروضة تقريبية وليست عروض بيع رسمية.</p>
  </footer>

  <div class="modal" id="bikeModal" aria-hidden="true">
    <div class="modal-content">
      <button class="close-modal" id="closeModal" aria-label="إغلاق">×</button>
      <div class="modal-image-wrap">
        <img id="modalImage" alt="صورة الدراجة">
      </div>
      <div class="modal-info">
        <p class="modal-brand" id="modalBrand"></p>
        <h2 id="modalName"></h2>
        <p class="modal-price" id="modalPrice"></p>
        <div class="details-list">
          <p>النوع: <strong id="modalType"></strong></p>
          <p>سعة المحرك: <strong id="modalCC"></strong></p>
          <p>القوة: <strong id="modalPower"></strong></p>
          <p>السنة: <strong id="modalYear"></strong></p>
        </div>
        <p class="price-note">الثمن تقريبي وقد يختلف حسب السنة والحالة والسوق.</p>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
