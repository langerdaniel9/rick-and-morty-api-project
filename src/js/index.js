const TMDBKey = process.env.TMDBKey;

let currentURL = window.location.hash;
if (currentURL != "") {
  changePage();
}

let searchBar = document.getElementById("searchbar");
let searchBox = document.getElementById("searchbox");
let searchEnter = document.getElementById("searchenter");
let searchOptions = document.getElementById("searchoptions");

function createSeasonAndEpisodeSelect() {
  let searchEnter = document.getElementById("searchenter");
  searchEnter.disabled = true;
  const searchBySeasonBox = document.createElement("select");
  searchBySeasonBox.className = "searchbarselect";
  searchBySeasonBox.id = "searchseason";
  searchBySeasonBox.name = "searchseason";
  searchBySeasonBox.innerHTML = `
      <option disabled selected value="">Season</option>
      <option value="0">Season 0(Specials)</option>
      <option value="1">Season 1</option>
      <option value="2">Season 2</option>
      <option value="3">Season 3</option>
      <option value="4">Season 4</option>`;
  searchBox.insertAdjacentElement("beforeend", searchBySeasonBox);

  const searchByEpisodeBox = document.createElement("select");
  searchByEpisodeBox.className = "searchbarselect";
  searchByEpisodeBox.id = "searchepisode";
  searchByEpisodeBox.name = "searchepisode";
  searchByEpisodeBox.innerHTML = `
      <option value="" hidden>Episode</option>
      <option value="" disabled>Choose a season</option>`;
  searchBox.insertAdjacentElement("beforeend", searchByEpisodeBox);

  searchBar = document.getElementById("searchbar");
}

function createSearchBar(type) {
  const searchInput = document.createElement("input");
  let searchEnter = document.getElementById("searchenter");
  searchEnter.disabled = true;
  searchInput.className = "searchbar";
  searchInput.id = "searchbar";
  searchInput.placeholder = `Search for a ${type}`;
  searchInput.type = "text";
  searchBox.insertAdjacentElement("beforeend", searchInput);
  searchBar = document.getElementById("searchbar");
}

function removeWhateverIsInInputArea() {
  let searchBar = document.getElementById("searchbar");
  let seasonBox = document.getElementById("searchseason");
  let episodeBox = document.getElementById("searchepisode");
  if (searchBar != null) {
    searchBar.remove();
  }
  if (seasonBox != null) {
    seasonBox.remove();
  }
  if (episodeBox != null) {
    episodeBox.remove();
  }
}

let episodesPerSeason = [];

async function findNumberOfEpisodesForEachSeason() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/60625?api_key=${TMDBKey}`
    );
    const data = await response.json();
    let seasonNums = [0, 1, 2, 3, 4];
    seasonNums.forEach((num) => {
      episodesPerSeason[num] = [num, data.seasons[num].episode_count];
    });
  } catch (error) {
    console.log(error);
  }
}

function addDropDownsForEpisodeNumber(season) {
  let episodeNumber = episodesPerSeason[season][1];
  let searchEpisode = document.getElementById("searchepisode");
  searchEpisode.innerHTML = "<option disabled selected>Episode</option>";
  for (let i = 0; i < episodeNumber; i++) {
    searchEpisode.innerHTML += `<option value="${i + 1}">Episode ${
      i + 1
    }</option>`;
  }
}

function changeNumberOfEpisodesDependingOnSeason(seasonNumber) {
  let episodeBox = document.getElementById("searchepisode");
  switch (seasonNumber) {
    case "0":
      episodeBox.disabled = false;
      addDropDownsForEpisodeNumber(seasonNumber);
      break;
    case "1":
      episodeBox.disabled = false;
      addDropDownsForEpisodeNumber(seasonNumber);
      break;
    case "2":
      episodeBox.disabled = false;
      addDropDownsForEpisodeNumber(seasonNumber);
      break;
    case "3":
      episodeBox.disabled = false;
      addDropDownsForEpisodeNumber(seasonNumber);
      break;
    case "4":
      episodeBox.disabled = false;
      addDropDownsForEpisodeNumber(seasonNumber);
      break;
    default:
      break;
  }
}

searchOptions.addEventListener("change", () => {
  let value = searchOptions.value;

  switch (value) {
    case "character":
      removeWhateverIsInInputArea();
      createSearchBar("character");
      searchBar.disabled = false;
      searchBar.placeholder = "Search for a character";
      if (searchBar != undefined) {
        searchEnter.disabled = false;
      }
      break;
    case "seasonepisode":
      removeWhateverIsInInputArea();
      createSeasonAndEpisodeSelect();
      findNumberOfEpisodesForEachSeason();
      let seasonBox = document.getElementById("searchseason");
      seasonBox.addEventListener("change", (event) => {
        let seasonNumber = seasonBox.value;
        changeNumberOfEpisodesDependingOnSeason(seasonNumber);
        let searchEnter = document.getElementById("searchenter");
        searchEnter.disabled = false;
      });
      break;
    case "location":
      removeWhateverIsInInputArea();
      createSearchBar("location");
      searchBar.disabled = false;
      searchBar.placeholder = "Search for a location";
      break;

    default:
      break;
  }
});

/*const on = (selector, eventType, childSelector, eventHandler) => {
  const elements = document.querySelectorAll(selector);
  for (element of elements) {
    element.addEventListener(eventType, (eventOnElement) => {
      if (eventOnElement.target.matches(childSelector)) {
        eventHandler(eventOnElement);
      }
    });
  }
};

on("ul", "keyup", ".module.complete", (event) => {
  const item = event.target;
  //...your event handler
});*/

searchBar.addEventListener("keyup", (event) => {
  console.log("yello");
  let searchBar = document.getElementById("searchbar");
  console.log(searchBar.value);
});

searchEnter.addEventListener("click", (event) => {
  console.log("clicked");
  let value = searchOptions.value;
  console.log(searchBar.value);
  switch (value) {
    case "character":
      let characterInput = document.getElementById("searchbar").value;
      window.location.hash = `search/c=${characterInput}/`;
      break;
    case "seasonepisode":
      /*if(episode selector = nothing) {
        window.location.hash = `s=${season}/`;
      } else {
        window.location.hash = `s=${season}/e=${episode}/`;
      }*/
      break;
    case "location":
      let locationInput = document.getElementById("searchbar").value;
      window.location.hash = `search/l=${locationInput}/`;
      break;

    default:
      break;
  }
});

window.addEventListener("hashchange", (event) => {
  currentURL = window.location.hash;
  console.log(currentURL);
});

function changePage() {
  alert("you arent at the home page");
  currentURL = window.location.hash;
}

searchBar.onclick = function () {
  console.log("hehehhehhe");
};
