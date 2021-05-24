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
            backgroundColor: ["rgba(23, 191, 68, 1)"],
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

    Chart.pluginService.register({
      beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
          // Get ctx from string
          var ctx = chart.chart.ctx;

          // Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || "Montserrat-Bold";
          var txt = centerConfig.text;
          var color = centerConfig.color || "rgba(28, 28, 28, 1)";
          var maxFontSize = centerConfig.maxFontSize || 50;
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated =
            (sidePadding / 100) * (chart.innerRadius * 2);
          // Start with a base font of 20px
          ctx.font = "20px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(20 * widthRatio);
          var elementHeight = chart.innerRadius * 2;

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 15;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(" ");
          var line = "";
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + " ";
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + " ";
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
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
            backgroundColor: ["rgba(23, 191, 68, 1)"],
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
            backgroundColor: ["rgba(23, 191, 68, 1)"],
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
            text: `9.2/10`,
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
