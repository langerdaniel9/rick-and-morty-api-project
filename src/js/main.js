const TMDBKey = process.env.TMDBKey;
const TMDBImgLinkPrefix = "https://image.tmdb.org/t/p/w500";

let currentURL = window.location.hash;
if (currentURL != "") {
  changePage();
}

window.addEventListener("hashchange", () => {
  currentURL = window.location.hash;
  console.log(currentURL);
});

function changePage() {
  alert("you arent at the home page");
  currentURL = window.location.hash;
}

//
//
//

let showImage1 = "";
let showImage2 = "";
let showDescriptionText = "";
let rating1 = "";
let rating2 = "";

function getMainImgAndDesc() {
  let showPoster = document.getElementById("show-poster");
  let showDesc = document.getElementById("main-description");
  getTMDBInfo();
  getTVMazeInfo();

  showPoster.src = showImage1;
  showDesc.innerHTML = showDescriptionText;
}
getMainImgAndDesc();

async function getTMDBInfo() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/60625?api_key=${TMDBKey}`
    );
    const data = await response.json();

    showDescriptionText = data.overview;
    let showDesc = document.getElementById("main-description");
    showDesc.innerHTML = showDescriptionText;

    showImage1 = TMDBImgLinkPrefix + data.poster_path;
    let showPoster = document.getElementById("show-poster");
    showPoster.src = showImage1;

    rating2 = data.vote_average;
    let ratingBox = document.getElementById("ratings");
    ratingBox.innerHTML += `
    <div class="rating">
      <div class="rating-value">${rating2}</div>
    </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

async function getTVMazeInfo() {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/216`);
    const data = await response.json();
    showImage2 = data.image.original;

    rating1 = data.rating.average;
    let ratingBox = document.getElementById("ratings");
    ratingBox.innerHTML += `
    <div class="rating">
      <div class="rating-value">${rating1}</div>
    </div>
    `;
  } catch (error) {
    console.log(error);
  }
}

let nextImg = document.getElementById("img-left");
let prevImg = document.getElementById("img-right");

let imgChangeButtons = [nextImg, prevImg];

imgChangeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let showPoster = document.getElementById("show-poster");
    if (showPoster.src == showImage1) {
      showPoster.src = showImage2;
    } else {
      showPoster.src = showImage1;
    }
  });
});
