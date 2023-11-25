const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TRAKT_KEY = import.meta.env.VITE_TRAKT_KEY;

export async function findSimilarShows() {
	try {
		let requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TMDB_TOKEN}`,
			},
			redirect: "follow",
		};

		let response = await fetch(
			`https://api.themoviedb.org/3/tv/60625/recommendations?language=en-US&page=1`,
			requestOptions
		);

		const data = await response.json();

		const showsReturned = 20;
		let numOfSimilarShowsToDisplay = 5;

		let randomNums = [];
		// Pick `numOfSimilarShowsToDisplay` random numbers from 0 to `showsReturned`, and display those shows
		while (randomNums.length < numOfSimilarShowsToDisplay) {
			let randomNum = Math.floor(Math.random() * showsReturned);
			if (!randomNums.includes(randomNum)) {
				randomNums.push(randomNum);
			}
		}
		randomNums.forEach((num) => {
			let show = data.results[num];

			document.getElementById("showsbox").innerHTML += `<div class="show">
			<h2>${show.name}</h2>
			<img class="showposter" src="${
				"https://image.tmdb.org/t/p/w500" + show.poster_path
			}" alt="${show.name + " Poster"}">
			<h5>${show.overview}</h5>
			</div>`;
		});
	} catch (error) {
		console.log(error);
	}
}

export async function findSimilarShowsTRAKT() {
	try {
		let requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"trakt-api-version": "2",
				"trakt-api-key": TRAKT_KEY,
			},
			redirect: "follow",
		};

		// let randomPage = 2;
		const showsReturned = 10;
		let randomPage = Math.floor(Math.random() * 3 + 1);

		const response = await fetch(
			`https://api.trakt.tv/shows/rick-and-morty/related?id=rick-and-morty&page=${randomPage}&limit=${showsReturned}`,
			requestOptions
		);
		const data = await response.json();
		let numOfSimilarShowsToDisplay = 5;

		let randomNums = [];
		// Pick `numOfSimilarShowsToDisplay` random numbers from 0 to `showsReturned`, and display those shows
		while (randomNums.length < numOfSimilarShowsToDisplay) {
			let randomNum = Math.floor(Math.random() * showsReturned);
			if (data[randomNum].ids.tmdb != null && !randomNums.includes(randomNum)) {
				randomNums.push(randomNum);
			}
		}
		randomNums.forEach((num) => {
			addShowToPage(data[num].ids.tmdb);
		});
	} catch (error) {
		console.log(error);
	}
}

async function addShowToPage(showID) {
	// Uses tmbd show id to get show info
	try {
		let requestOptions = {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${TMDB_TOKEN}`,
			},
			redirect: "follow",
		};

		let response = await fetch(
			`https://api.themoviedb.org/3/tv/${showID}?language=en-US`,
			requestOptions
		);

		const data = await response.json();

		document.getElementById("showsbox").innerHTML += `<div class="show">
			<h2>${data.name}</h2>
			<img class="showposter" src="${
				"https://image.tmdb.org/t/p/w500" + data.poster_path
			}" alt="${data.name + " Poster"}">
			<h5>${data.overview}</h5>
			</div>`;
	} catch (error) {
		console.log(error);
	}
}
