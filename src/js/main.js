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
  let showDesc = document.getElementById("description-value");
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
    let showDesc = document.getElementById("description-value");
    showDesc.innerHTML = showDescriptionText;

    showImage1 = TMDBImgLinkPrefix + data.poster_path;
    let showPoster = document.getElementById("show-poster");
    showPoster.src = showImage1;

    rating2 = data.vote_average;
    let ratingBox = document.getElementById("ratings");
    /*ratingBox.innerHTML += `
    <div class="rating">
      <div class="rating-value">${rating2}</div>
    </div>
    `;*/

    //chart.js

    const ctx2 = document.getElementById("myChart2");
    const myChart2 = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: false,
        datasets: [
          {
            data: [rating2, 10 - rating2],
            backgroundColor: ["rgba(64, 253, 19, 1)"],
            borderColor: ["rgba(0,0,0,0)"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 60,
        responsive: false,
        animateRotate: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "TMDB Rating",
          fontStyle: "normal",
          fontColor: "#000000",
        },
        elements: {
          center: {
            text: `${rating2}/10`,
            fontColor: "rgba(0, 0, 0, 1)",
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 15, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: null,
        },
      },
    });

    //chart.js

    let showCreators = data.created_by;

    let showCreatorValue = document.getElementById("creator-value");
    showCreatorValue.innerHTML =
      showCreators[0].name + " and " + showCreators[1].name;

    let firstAirDate = document.getElementById("air-date-value");
    firstAirDate.innerHTML = data.first_air_date + " to " + data.last_air_date;
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
    /*ratingBox.innerHTML += `
    <div class="rating">
      
    <canvas id="rating-value-1" width="400" height="400"></canvas>

    <div class="rating-value">${rating1}</div>
    </div>
    `;*/

    //chart.js

    const ctx1 = document.getElementById("myChart1");
    const myChart1 = new Chart(ctx1, {
      type: "doughnut",
      data: {
        labels: false,
        datasets: [
          {
            data: [rating1, 10 - rating1],
            backgroundColor: ["rgba(49, 253, 15, 1)"],
            borderColor: ["rgba(0,0,0,0)"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 60,
        responsive: false,
        animateRotate: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "TVMaze Rating",
          fontStyle: "normal",
          fontColor: "#000000",
        },
        elements: {
          center: {
            text: `${rating1}/10`,
            fontColor: "rgba(0, 0, 0, 1)",
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 15, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: null,
        },
      },
    });

    ///////

    const ctx2 = document.getElementById("myChart3");
    const myChart3 = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: false,
        datasets: [
          {
            data: [9.2, 10 - 9.2],
            backgroundColor: ["rgba(40, 254, 12, 1)"],
            borderColor: ["rgba(0,0,0,0)"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutoutPercentage: 60,
        responsive: false,
        animateRotate: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "IMDB Rating",
          fontStyle: "normal",
          fontColor: "#000000",
        },
        elements: {
          center: {
            text: `${rating1}/10`,
            fontColor: "rgba(0, 0, 0, 1)",
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 15, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        tooltips: {
          enabled: false,
        },
        hover: {
          mode: null,
        },
      },
    });

    //////

    //chart.js
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
