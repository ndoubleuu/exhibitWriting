// App namespace object
const exhibitApp = {}

// Variables
exhibitApp.apiKey = "9idJTqH5";
exhibitApp.url = new URL("https://www.rijksmuseum.nl/api/nl/collection");

// Gather elements
exhibitApp.helpButton = document.querySelector(".help");
exhibitApp.helpContainer = document.querySelector(".helpContainer");
exhibitApp.exitHelp = document.querySelector(".exitHelp");

// When help button (?) is clicked, display the help & instructions section
exhibitApp.helpButton.addEventListener("click", () => {
    exhibitApp.helpContainer.style.right = "0";
});

// When exitHelp button is clicked, hide help & instructions
exhibitApp.exitHelp.addEventListener("click", () => {
    exhibitApp.helpContainer.style.right = "-100%";
});

// API call
exhibitApp.getPaintings = () => {
    exhibitApp.url.search = new URLSearchParams({
        key: exhibitApp.apiKey,
        format: "json",
        culture: "en",
        q: "monet",
        ps: 10,
        imgonly: "true"
    })

    fetch(exhibitApp.url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse.artObjects);
        })
}

exhibitApp.getPaintings();