const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export async function getShowDetails() {
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
			`https://api.themoviedb.org/3/tv/60625?language=en-US`,
			requestOptions
		);

		const data = await response.json();

		let description = data.overview;
		let firstEpisode = data.first_air_date;
		let lastEpisode = data.last_air_date;
		let createdBy = [];
		data.created_by.forEach((creator) => {
			createdBy.push(creator.name);
		});
		let coverImage = data.poster_path;
		let mainLink = data.homepage;

		let seasons = data.number_of_seasons;
		let episodes = {};
		data.seasons.forEach((season) => {
			episodes[season.name] = season.episode_count;
		});

		document.getElementById("description").innerHTML = description;
		document.getElementById("first-air-date").innerHTML = firstEpisode;
		document.getElementById("last-air-date").innerHTML = lastEpisode;
		let creatorsString = "";
		createdBy.forEach((creator) => {
			creatorsString += creator + ", ";
		});
		creatorsString = creatorsString.slice(0, -2); // Removes last space and comma
		document.getElementById("creator").innerHTML = creatorsString;
		document.getElementById("show-poster").src =
			"https://image.tmdb.org/t/p/original" + coverImage;
		document.getElementById("show-link").href = mainLink;
	} catch (error) {
		console.log(error);
	}
}

getShowDetails();
