//tastedive goes here, puts the similar movies here.
console.log("here is file for related api");

let similarShows = [];
/*let showBoiler = `
    <div class="show">
    <h2>${showTitle}</h2>
    <img src="${showImage}" alt="${showImageAlt}">
    <h5>${showDesc}</h5>
    </div>`;
*/
async function findSimilarShows() {
  try {
    const response = await fetch(
      `https://tastedive.com/api/similar?q=rick+and+morty`
    );
    const data = await response.json();
    let numOfSimilarShowsToDisplay = 5;
    for (let i = 0; i < numOfSimilarShowsToDisplay; i++) {
      similarShows += data.Similar.Results[i].Name;
    }
    console.log(data.Similar.Results[0]);
  } catch (error) {
    console.log(error);
  }
}
findSimilarShows();
/*function makeBoxesForSimilarShow() {
  similarShows.forEach((show) => {
    let showsBox = document.getElementById("showsbox");
    let showTitle = similarShows.title;
    let showImage = similarShows.image;
    let showImageAlt = showTitle + "image";
    let showDesc = similarShows.description;
    showsBox.innerHTML += showBoiler;
  });
}*/
