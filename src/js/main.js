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

function getMainImgAndDesc() {
  let showPoster = document.getElementById("show-poster");
  let showDesc = document.getElementById("main-description");
  getTMDBImage();
  getTVMazeImage();
  getTMDBDescription();

  showPoster.src = showImage1;

  showDesc.innerHTML = showDescriptionText;
}
getMainImgAndDesc();

async function getTMDBDescription() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/60625?api_key=${TMDBKey}`
    );
    const data = await response.json();
    showDescriptionText = data.overview;
    let showDesc = document.getElementById("main-description");
    showDesc.innerHTML = showDescriptionText;
  } catch (error) {
    console.log(error);
  }
}

async function getTMDBImage() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/60625?api_key=${TMDBKey}`
    );
    const data = await response.json();
    showImage1 = TMDBImgLinkPrefix + data.poster_path;
    let showPoster = document.getElementById("show-poster");
    showPoster.src = showImage1;
  } catch (error) {
    console.log(error);
  }
}

async function getTVMazeImage() {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/216`);
    const data = await response.json();
    showImage2 = data.image.original;
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
