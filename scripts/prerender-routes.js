const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 10;

(async () => {
  // "use strict";

  const fs = require("fs");

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const totalPages = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);

  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join("\n");
  fileContent =
    fileContent +
    "\n" +
    totalPages.map((page) => `/pokemons/page/${page}`).join("\n");

  const pokemonNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`,
  )
    .then((res) => res.json())
    .catch(console.error);

  fileContent += "\n";
  fileContent += pokemonNameList.results
    .map((pokemon) => `/pokemons/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);

  console.log("routes.txt generated");
})();
