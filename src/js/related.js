const TasteDiveKey = process.env.TasteDiveKey;
const TMDBKey = process.env.TMDBKey;
const TMDBImgLinkPrefix = "https://image.tmdb.org/t/p/w500";

async function findSimilarShows() {
  try {
    /*Have a CORS error not sure how to fix, using directly from the json file for now
    const response = await fetch(
      `https://tastedive.com/api/similar?q=rick+and+morty&k=${TasteDiveKey}`
      );
    */
    const response = require("./similar.json");
    const data = response;

    let numOfSimilarShowsToDisplay = 5;

    let possibleNums = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ];
    let randomNums = [];
    for (let n = 1; n <= numOfSimilarShowsToDisplay; n++) {
      let randomNum = Math.floor(Math.random() * (20 - n) + 1);
      randomNums.push(possibleNums[randomNum]);
      possibleNums[randomNum] = possibleNums[20 - n];

      let showName = data.Similar.Results[randomNums[n - 1]].Name;
      makeBoxesForSimilarShow(showName);
    }
  } catch (error) {
    console.log(error);
  }
}

findSimilarShows();

async function makeBoxesForSimilarShow(showName) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${TMDBKey}&query=${showName}`
    );
    const data = await response.json();

    data.results.forEach((result) => {
      if (
        result.name.localeCompare(showName, undefined, {
          sensitivity: "base",
        }) === 0 &&
        result.first_air_date != "1975-01-30"
      ) {
        let showImgLinkHalf = result.poster_path;
        let showImgLink = TMDBImgLinkPrefix + showImgLinkHalf;
        let showImgAlt = showName + " Poster";
        let showDescription = result.overview;

        let showsBox = document.getElementById("showsbox");
        showsBox.innerHTML += `<div class="show">
          <h2>${showName}</h2>
          <img class="showposter" src="${showImgLink}" alt="${showImgAlt}">
          <h5>${showDescription}</h5>
          </div>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
