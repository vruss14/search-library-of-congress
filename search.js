// Search Name is the span element that includes what the user searched for specifically
let searchName = document.getElementById("search-name");
let resultsContainer = document.getElementById("results-container");

// This function splits the URL parameters into an array
function accessParameters() {
    let parametersArray = document.location.search.split('&');

    // Accesses the value of each parameter so that this can be used by the API
    let userSearch = parametersArray[0].split('=').pop().toLowerCase();
    let userFilter = parametersArray[1].split('=').pop().toLowerCase();

    // This means that the user did not choose a filter, and so the filter is undefined
    if(userFilter == "choose%20a%20filter...") {
        userFilter = undefined;
    }

    fetchResults(userSearch, userFilter);
}

function fetchResults(userSearch, userFilter) {
    let url = 'https://www.loc.gov/search/?fo=json';

    // If the filter is not undefined (i.e., the user did include a filter, then that changes the URL)
    if (!userFilter === undefined) {
        url = `https://www.loc.gov/${userFilter}/?q=${userSearch}&fo=json`;
    } else {
        url += `&q=${userSearch}`;
    }

    // This URL used to fetch data from the API will vary depending on what the user has selected in the form 
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {

            // Capitalizes the first letter of the string that the user searched
            searchName.textContent = response.search.query.charAt(0).toUpperCase() + response.search.query.slice(1);

            //  Clear user feedback in case there are no results
            if (response.status === 404 || response.results.length === 0) {
                console.log("No results found.");
                resultsContainer.innerHTML = `<h3 class = "text-center text-white mt-3 no-results">No results found for ${searchName.textContent}. Try another search.</h3>`

            // The displayResults function is called for each of the items in the results array
            } else {
                for (let i = 0; i < response.results.length; i++) {
                    displayResults(response.results[i]);
                  }
            }
        })
}

// This data argument is response.results[i]; in other words, one item from the results array
function displayResults (data) {

    // Creates a container for each item in the results array
    let singleResultContainer = document.createElement("div");
    singleResultContainer.classList.add("single-result");

    // Includes the title attribute from the Library of Congress API
    let singleResultTitle = document.createElement("h4");
    singleResultTitle.textContent = data.title;
    singleResultTitle.setAttribute("style", "font-family: 'Raleway', sans-serif; margin-right: 60%;")
    singleResultContainer.appendChild(singleResultTitle);

    // Includes the description attribute from the Library of Congress API, if available
    let singleResultDescr = document.createElement("p");
    singleResultDescr.textContent = data.description;
    singleResultContainer.appendChild(singleResultDescr);

    // Creates a clickable button that opens in a new tab for a link (url from the API)
    let readMoreLink = document.createElement("a");
    readMoreLink.textContent = "Read More";
    readMoreLink.setAttribute("href", data.url);
    readMoreLink.setAttribute("target", "_blank");
    readMoreLink.setAttribute("rel", "noopener");
    readMoreLink.classList.add("btn", "read-more-btn");
    singleResultContainer.appendChild(readMoreLink);

    resultsContainer.appendChild(singleResultContainer);
}

// Function responsible for handling subsequent searches on the search.html page
// The location does not need to be reassigned in this case; all that needs to happen is
// to clear the previous results and call the fetchResults function again 

let searchForm = document.getElementById("search-form-left");
let searchInput = document.getElementById("search-input");
let searchFilter = document.getElementById("search-filter");

function handleSearch(event) {
    event.preventDefault();

    resultsContainer.innerHTML= "";

    let newSearch = searchInput.value;
    let newFilter = searchFilter.value;

    console.log(newSearch);
    console.log(newFilter);

    fetchResults(newSearch, newFilter);
}

searchForm.addEventListener("submit", handleSearch);

// This function is called initially on page load (i.e. during the first search)
accessParameters();
