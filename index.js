const fetch = require('node-fetch');
const fs = require('fs');

const baseUrl = "https://api.scryfall.com/cards/search?order=set&q=e%3Aspm&unique=prints";

async function fetchAllCards() {
  let url = baseUrl;
  let allCards = [];

  while (url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.status}`);
    }

    const data = await response.json();
    allCards = allCards.concat(data.data);
    url = data.next_page;
  }

  return allCards;
}

function simplifyCardData(cards) {
  return cards.map(card => ({
    name: card.name,
    mana_cost: card.mana_cost,
    type_line: card.type_line,
    oracle_text: card.oracle_text,
    power: card.power,
    toughness: card.toughness,
    loyalty: card.loyalty
  }));
}