function API() {
  let APICall = new XMLHttpRequest();
  APICall.open("GET", "http://api.tvmaze.com/shows/216", true);
  APICall.onload = function () {
    let data = JSON.parse(this.response);
    console.log(data);
    img2 = data.image.original;
  };
  APICall.send();
}

let img1 = "https://image.tmdb.org/t/p/w500/8kOWDBK6XlPUzckuHDo3wwVRFwt.jpg";
let img2 = "";
let ImgLeft = document.getElementById("img-left");
let ImgRight = document.getElementById("img-right");
let imgbox = document.getElementById("show-poster");
ImgLeft.onclick = changeImage;
ImgRight.onclick = changeImage;
imgbox.src = img1;

function changeImage() {
  if (imgbox.src === img1) {
    imgbox.src = img2;
  } else {
    imgbox.src = img1;
  }
}

function getTVMazeImage(response) {
  console.log(response);
}

API("http://api.tvmaze.com", "/shows/216", getTVMazeImage);
