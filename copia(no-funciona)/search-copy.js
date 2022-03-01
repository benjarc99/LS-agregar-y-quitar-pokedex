const d = document,
  ls = localStorage;

const $template = d.querySelector("template").content,
  $fragment = d.createDocumentFragment(),
  $containerCards = d.querySelector(".container-cards"),
  $btnSearch = d.getElementById("btn-search"),
  $inputSearch = d.getElementById("input-search");

let myFavsLS;
if (ls.getItem("myFavs")) {
  myFavsLS = ls.getItem("myFavs");
  myFavsLS = JSON.parse(myFavsLS);
}

d.addEventListener("DOMContentLoaded", () => {
  getDataPokemon();
});

const printCardPokemon = (data) => {
  $template
    .querySelector(".img-card")
    .setAttribute("src", `${data.sprites.front_default}`);
  $template.querySelector(
    "h4"
  ).textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`;

  $template.querySelector("button").id = data.id;
  $template.querySelector("button").dataset.name = data.name;
  $template.querySelector("button").textContent = "Add to favs";

  $template.querySelector("button").classList.add("btn-add-favs");
  if (!(ls.getItem("myFavs") === null)) {
    let findIndex = myFavsLS.findIndex((el) => el === data.name);
    if (findIndex > -1) {
      $template.querySelector("button").textContent = "Remove";

      $template.querySelector("button").classList.remove("btn-add-favs");
      $template.querySelector("button").classList.add("btn-remove-favs");
    }
  }

  if (data.types.length === 2) {
    $template.querySelector(
      ".text-card"
    ).textContent = `Type: ${data.types[0].type.name}, ${data.types[1].type.name}`;
  } else {
    $template.querySelector(
      ".text-card"
    ).textContent = `Type: ${data.types[0].type.name}`;
  }

  let $clone = d.importNode($template, true);
  $fragment.appendChild($clone);
  $containerCards.appendChild($fragment);
};

const getDataPokemon = async () => {
  try {
    for (let id = 1; id <= 150; id++) {
      let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        pokemon = await res.data;

      printCardPokemon(pokemon);
    }
  } catch (err) {
    console.log(err);
  }
};

d.addEventListener("input", (e) => {
  if (e.target === $inputSearch) {
    if (e.target.value === "") {
      d.querySelectorAll(".card").forEach((card) =>
        card.classList.remove("card-oculta")
      );
    }
  }
});

let arrayLS = [];

d.addEventListener("click", (e) => {
  if (e.target === $btnSearch) {
    const $cards = d.querySelectorAll(".card");

    $cards.forEach((card) => {
      card
        .querySelector("h4")
        .textContent.toLocaleLowerCase()
        .includes($inputSearch.value.toLocaleLowerCase())
        ? card.classList.remove("card-oculta")
        : card.classList.add("card-oculta");
    });
  }
  if (e.target.matches(".panel-btn *")) {
    d.querySelector(".panel-btn").classList.toggle("is-active");
  }
  if (e.target.matches(".btn-action-card")) {
    myFavsLS = ls.getItem("myFavs");
    myFavsLS = JSON.parse(myFavsLS);
    console.log(e.target.textContent);

    if (e.target.textContent === "Add to favs") {
      let dataLS = e.target.dataset.name;
      arrayLS.push(dataLS);
      console.log(arrayLS);
      console.log(myFavsLS);
      ls.setItem("myFavs", JSON.stringify(arrayLS));

      e.target.classList.remove("btn-add-favs");
      e.target.classList.add("btn-remove-favs");

      e.target.textContent = "Remove";
    }
    if (e.target.textContent === "Remove") {
      let dataLS = e.target.dataset.name;
      console.log(myFavsLS);

      let indexRemove = myFavsLS.findIndex((el) => el === dataLS);
      myFavsLS.splice(indexRemove, 1);

      ls.setItem("myFavs", JSON.stringify(myFavsLS));

      e.target.classList.remove("btn-remove-favs");
      e.target.classList.add("btn-add-favs");

      e.target.textContent = "Add to favs";
    }
  }
});
