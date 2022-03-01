import getDataPokemonAndPrintLS from "./async-data.js";
import favoritesLS from "./local-storage.js";
import searchPokemon from "./search.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  getDataPokemonAndPrintLS();
  searchPokemon("btn-search", "input-search");
  favoritesLS(".btn-add-favs", ".btn-remove-favs");
});
