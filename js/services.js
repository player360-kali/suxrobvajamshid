let services_container = document.querySelector(".services_cards");
let prices_container = document.querySelector(".price_cards");

async function fetchCards() {
  const url = {
    services: "../db/services.json",
    prices: "../db/prices.json",
  };
  const services_response = await fetch(url.services);
  const prices_response = await fetch(url.prices);
  const services_cards = await services_response.json();
  const prices_cards = await prices_response.json();

  console.log(prices_cards);

  if (services_cards) {
    services_cards.map((item) => {
      services_container.innerHTML += `
        <div class="services_card">
        <img src=".${item.icon_url}" />
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
}
fetchCards();
