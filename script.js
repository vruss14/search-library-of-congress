let searchInput = document.getElementById("search-input");
let searchFilter = document.getElementById("search-filter");
let searchBtn = document.getElementById("search-btn");

function handleSearch(event) {
    event.preventDefault();

    let userSearch = searchInput.value;
    let userFilter = searchFilter.value;

    // To change the page to the search page
    // window.location.href = "./search.html";

    console.log(userSearch);
    console.log(userFilter);

}

searchBtn.addEventListener("click", handleSearch);