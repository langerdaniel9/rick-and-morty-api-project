document.addEventListener("DOMContentLoaded", function () {
	const searchButton = document.getElementById("navbar-search");
	const searchBar = document.getElementById("search-div");

	searchButton.addEventListener("click", function () {
		searchBar.scrollIntoView({ behavior: "smooth" });
	});
});
