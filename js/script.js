let normalizedMovies = [];

movies.forEach((movie) => {
	normalizedMovies.push({
		title: movie.Title,
		fullTitle: movie.fulltitle,
		movieYear: movie.movie_year,
		categories: movie.Categories,
		summary: movie.summary,
		rating: movie.imdb_rating,
		link: movie.ytid,
		img: `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`,
	});
});

let elList = $(".js-movies-list");
let elMovieTemplate = $("#template-element").content;
let elSelect = document.querySelector(".site-select");
let elInput = document.querySelector(".site-input");

let createMovieElement = (movie) => {
	let elNewElement = elMovieTemplate.cloneNode(true);

	elNewElement.querySelector(
		".card-img",
	).src = `https://i3.ytimg.com/vi/${movie.ytid}/maxresdefault.jpg`;

	elNewElement.querySelector(".card-title").textContent = movie.Title;
	elNewElement.querySelector(".card-full-title").textContent = movie.fulltitle;
	elNewElement.querySelector(
		".card-movie-year",
	).textContent = `Movie year: ${movie.movie_year}`;
	elNewElement.querySelector(
		".card-movie-categories",
	).textContent = `Categories: ${movie.Categories}`;
	elNewElement.querySelector(
		".card-text",
	).textContent = `Summary: ${movie.summary.split(" ").splice(0, 15).join(" ")}`;
	elNewElement.querySelector(
		".card-movie-rating",
	).textContent = `Rating: ${movie.imdb_rating}`;
	elNewElement.querySelector(
		".card-movie-link",
	).textContent = `YouTube link: ${movie.ytid}`;
	//   elNewElement.querySelector(".card-movie-link").href = `https://www.youtube.com/watch?v=VDs8IvgurPc&ab_channel=${movie.ytid}`;
	elNewElement.querySelector(
		".card-movie-link",
	).href = `https://www.youtube.com/watch?v=${movie.ytid}_channel=MovieThread`;

	return elNewElement;
};

let categories = [
	...new Set(movies.map((item) => item.Categories.split("|")).flat()),
];
categories.forEach((item) => {
	let elOption = document.createElement("option");
	elOption.textContent = item;
	elOption.value = item;
	elSelect.appendChild(elOption);
});

elSelect.addEventListener("change", function () {
	let filt = movies.filter((item) => item.Categories.includes(elSelect.value));
	renderMovies(filt);
});

let inputTitle = [...movies.map((item) => item.Title)];

elInput.addEventListener("input", function (e) {
	let inputFilt = movies.filter((item) =>
		item.Title.toString().toLowerCase().includes(e.target.value.toLowerCase()),
	);
	renderMovies(inputFilt);
});

let renderMovies = (movies) => {
	elList.innerHTML = "";

	let elMoviesWrapperFragment = document.createDocumentFragment();

	movies.forEach((movie) => {
		elMoviesWrapperFragment.appendChild(createMovieElement(movie));
	});
	elList.appendChild(elMoviesWrapperFragment);
};

renderMovies(movies);
