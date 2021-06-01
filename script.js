let searchForm = document.getElementById("search-form");
let searchInput = document.getElementById("search-input");
let searchFilter = document.getElementById("search-filter");

function handleSearch(event) {
    event.preventDefault();

    let userSearch = searchInput.value;
    let userFilter = searchFilter.value;
    let userQuery = `./search.html?q=${userSearch}&format=${userFilter}`;

    // To change the page to the search page (with the user's search parameters)
    location.assign(userQuery);

}

searchForm.addEventListener("submit", handleSearch);
