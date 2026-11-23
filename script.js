
const phoneNumber = "212779583670";

const packages = [
  {
    name: "100 DIAMONDS",
    diamonds: 100,
    price: 14
  },
  {
    name: "210 DIAMONDS",
    diamonds: 210,
    price: 28
  },
  {
    name: "530 DIAMONDS",
    diamonds: 530,
    price: 70
  },
  {
    name: "1080 DIAMONDS",
    diamonds: 1080,
    price: 140
  },
  {
    name: "2200 DIAMONDS",
    diamonds: 2200,
    price: 280
  }
];

const productsContainer = document.getElementById("products");

packages.forEach((item) => {

  const card = document.createElement("div");
  card.className = "product";

  card.innerHTML = `
    <div class="diamond-icon">💎</div>

    <h3>${item.name}</h3>

    <div class="price">
      ${item.price}
      <span class="currency">DH</span>
    </div>

    <a class="order-btn" href="#" target="_blank">
      ORDER NOW
    </a>
  `;

  const orderButton = card.querySelector(".order-btn");

  orderButton.addEventListener("click", (event) => {
    event.preventDefault();

    const message =
      `Hello OUSSAMA SHOP!\n\n` +
      `I want to order:\n` +
      `${item.diamonds} Diamonds\n` +
      `Price: ${item.price} DH\n\n` +
      `Please confirm the payment method and delivery.`;

    const whatsappLink =
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, "_blank");
  });

  productsContainer.appendChild(card);

});
