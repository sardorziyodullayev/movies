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

movies = movies.slice(0, 100);

let elList = $(".js-movies-list");
let elMovieTemplate = $("#template-element").content;
let elSelect = document.querySelector(".site-select");
let elInput = document.querySelector(".site-input");
let elSortedSelect = document.querySelector(".sort-select");

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
].sort();
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

let arrange = movies.slice(0, 100);

elSortedSelect.addEventListener("change", function () {

	if (this.value == "sorted-5-10") {
		arrange = arrange.sort((a, b) => a.imdb_rating - b.imdb_rating);
		renderMovies(arrange);
	}
	
	 else if (this.value == "sorted-10-5") {
		arrange = movies.sort((a, b) => b.imdb_rating - a.imdb_rating);
		renderMovies(arrange);
	}

	else if (this.value == "sorted-A-Z") {
		arrange = arrange.sort((a, b) => {
			let movName1 = a.Title.toLowerCase();
			let movName2 = b.Title.toLowerCase();
			if (movName1 < movName2) return -1;
			return 1;
		});
		renderMovies(arrange);
	} 

	else if (this.value == "sorted-Z-A") {
		arrange = arrange.sort((a, b) => {
			let movName1 = a.Title.toLowerCase();
			let movName2 = b.Title.toLowerCase();
			if (movName1 > movName2) return -1;
			return 1;
		});
		renderMovies(arrange);
	} 

});
