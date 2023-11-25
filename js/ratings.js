const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const TRAKT_KEY = import.meta.env.VITE_TRAKT_KEY;

import Chart from "chart.js/auto";

let ratings = {};

export async function getRatings() {
	// TMDB
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
			"https://api.themoviedb.org/3/tv/60625?language=en-US",
			requestOptions
		);
		let data = await response.json();

		ratings["TMDB"] = data.vote_average;
	} catch (error) {
		console.log(error);
	}

	// Trakt
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

		let response = await fetch(
			"https://api.trakt.tv/shows/rick-and-morty/ratings",
			requestOptions
		);

		let data = await response.json();

		ratings["Trakt"] = data.rating;
	} catch (error) {
		console.log(error);
	}

	// Simkl
	try {
		let response = await fetch("https://api.simkl.com/ratings?simkl=34902");

		let data = await response.json();

		ratings["Simkl"] = data.simkl.rating;
	} catch (error) {
		console.log(error);
	}

	// TVmaze
	try {
		let response = await fetch("https://api.tvmaze.com/shows/216");

		let data = await response.json();

		ratings["TVmaze"] = data.rating.average;
	} catch (error) {
		console.log(error);
	}

	insertRatings();
}

function insertRatings() {
	let chartsDiv = document.getElementById("chartjs-charts");

	for (let i = 0; i < Object.keys(ratings).length; i++) {
		const data = {
			labels: false,
			datasets: [
				{
					data: [
						ratings[Object.keys(ratings)[i]].toFixed(2),
						10 - ratings[Object.keys(ratings)[i]].toFixed(2),
					],
					backgroundColor: ["rgba(23, 191, 68, 1)", "rgba(0,0,0,0)"],
					borderColor: ["rgba(0,0,0,0)"],
					borderWidth: 0,
				},
			],
		};
		const centerText = {
			id: "centerText",
			beforeDatasetsDraw(chart, args, pluginOptions) {
				const { ctx, data } = chart;

				const text = ratings[Object.keys(ratings)[i]].toFixed(2);

				ctx.save();
				const x = chart.getDatasetMeta(0).data[0].x;
				const y = chart.getDatasetMeta(0).data[0].y;

				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.font = "bold 30px arial";
				ctx.fillStyle = "#FFFFFF";
				ctx.fillText(text, x, y);
			},
		};
		const config = {
			type: "doughnut",
			data: data,
			options: {
				cutout: "70%",
			},
			plugins: [centerText],
		};

		const chartContainer = document.createElement("div");
		chartContainer.className = `chartjs-chart`;
		chartContainer.id = `chartjs-chart-${i}`;
		chartContainer.innerHTML = `<p class="chart-rating-source">${
			Object.keys(ratings)[i]
		}</p><canvas id="myChart${i}" width="200" height="200"></canvas>`;
		chartsDiv.appendChild(chartContainer);

		const newDonutChart = new Chart(
			document.getElementById(`myChart${i}`),
			config
		);
	}
}
