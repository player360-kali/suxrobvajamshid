let services_container = document.querySelector(".services_cards");
let about_us_container = document.querySelector(".about-us_cards");
let prices_container = document.querySelector(".price_cards");
let nav_links = document.querySelector(".mobile_navlinks");
let nav_btn = document.querySelector(".nav_icon");
let styles = getComputedStyle(nav_links).display;
let html = document.querySelector("html");
let button = document.querySelectorAll("button");

async function fetchCards() {
  const url = {
    services: "../db/services.json",
    about_us: "../db/about_us.json",
    prices: "../db/prices.json",
  };
  const services_response = await fetch(url.services);
  const about_us_response = await fetch(url.about_us);
  const prices_response = await fetch(url.prices);
  const services_cards = await services_response.json();
  const about_us_cards = await about_us_response.json();
  const prices_cards = await prices_response.json();

  console.log(about_us_cards);

  if (services_cards) {
    services_cards.map((item) => {
      services_container.innerHTML += `
        <div class="services_card">
        <img src="${item.icon_url}" alt="${item.title}" />
        <article>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
        </article>
        </div>
      `;
    });
  }

  if (prices_cards) {
    prices_cards.map((item) => {
      prices_container.innerHTML += `
        <div class="price_card">
          <div class="price_card_title">
            <h4>${item.title}</h4>
            <span></span>
            <h4>$${item.price}</h4>
          </div>
          <div class="price_card_text">
            <p>${item.text}</p>
          </div>
        </div>
        `;
    });
  }

  if (about_us_cards) {
    about_us_cards.map((item) => {
      about_us_container.innerHTML += `
      <div class="about-us_card">
      <img src="${item.img_url ? item.img_url : "../img/profile.png"}" alt="${item.name}"/>
      <article>
      <h2>${item.name}</h2>
      <div class="about-us_card_icons">
        ${
          item.contacts.phone
            ? `
            <a href="tel:${item.contacts.phone}">
            <img src="../img/phone_icon.png" alt="${item.contacts.phone}"/>
            </a>
        `
            : ``
        }
        ${
          item.contacts.telegram
            ? `
                <a href="${item.contacts.telegram}">
                <img src="../img/telegram_icon.svg" alt="${item.contacts.telegram}"/>
                </a>
              `
            : ``
        }
        ${
          item.contacts.instagram
            ? `
                <a href="${item.contacts.instagram}">
                <img src="../img/instagram_icon.png" alt="${item.contacts.instagram}"/>
                </a>
              `
            : ``
        }
      </div>
      <button id="btn">BOOK</button>
      </article>
      </div>
      `;
    });
  }
}
fetchCards();

function modal() {
  let styles = getComputedStyle(nav_links).display;

  if (styles === "none") {
    nav_links.style.display = "flex";
    html.style.overflow = "hidden";
  } else {
    nav_links.style.display = "none";
    html.style.overflow = "";
  }
}

document.addEventListener("selectionchange", function () {
  let selection = window.getSelection().toString();
  if (selection.length > 0) {
    document.documentElement.style.cursor =
      "url('../img/cursor_icon2.png'), auto";
  } else {
    document.documentElement.style.cursor =
      "url('../img/cursor_icon.png'), auto";
  }
});

document.getElementById("footerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let number = document.getElementById("number").value;
  let message = document.getElementById("message").value;

  let botToken = "7063030181:AAHkMZ_-RGHLlGDKZ471Gy8R2pbATOGOS2k";
  let chatId = "5980662358";

  let text = `📩 *Yangi xabar!* \n\n👤 *Ism:* ${name}\n📧 *Email:* ${email}\n📞 *Telefon:* ${number}\n💬 *Xabar:* ${message}`;

  let url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Xabar yuborildi!");
      document.getElementById("footerForm").reset();
    })
    .catch((err) => alert("Xatolik yuz berdi: " + err));
});

document.querySelectorAll("#btn").forEach((button) => {
  button.onclick = () => {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  };
});
