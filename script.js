// App namespace object
const exhibitApp = {}

// Variables
exhibitApp.apiKey = "9idJTqH5";
exhibitApp.url = new URL("https://www.rijksmuseum.nl/api/nl/collection");

// Gather elements from DOM
exhibitApp.gatherElements = () => {
    exhibitApp.helpButton = document.querySelector(".help");
    exhibitApp.helpContainer = document.querySelector(".helpContainer");
    exhibitApp.exitHelp = document.querySelector(".exitHelp");
    exhibitApp.selectionButtons = document.querySelectorAll(".selection button");
    exhibitApp.selection = document.querySelector(".selection");
    exhibitApp.title = document.querySelector("h1");
    exhibitApp.modal = document.querySelector(".modal");
    exhibitApp.paintingsContainer = document.querySelector(".paintingsContainer");
}

// Hide help & instructions section
exhibitApp.hideHelp = () => {
    window.addEventListener("click", (event) => {
        if (event.target === exhibitApp.selection || event.target === exhibitApp.title) {
            exhibitApp.helpContainer.classList.remove("displayed");
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            exhibitApp.helpContainer.classList.remove("displayed");
        }
    })
}

exhibitApp.displayPaintings = (artworks) => {
    artworks.forEach((artwork) => {
        exhibitApp.artpiece = document.createElement("li");
        exhibitApp.artpiece.innerHTML = `
            <h4>${artwork.title}</h4>
            <img src="${artwork.webImage.url}">
        `
        exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
    })
}

// Call to Rijks API
exhibitApp.getPaintings = (painter) => {
    exhibitApp.url.search = new URLSearchParams({
        key: exhibitApp.apiKey,
        format: "json",
        culture: "en",
        involvedMaker: painter,
        ps: 5,
        imgonly: "true"
    })

    fetch(exhibitApp.url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            exhibitApp.artworkArray = jsonResponse.artObjects;
            exhibitApp.displayPaintings(exhibitApp.artworkArray);
            console.log(exhibitApp.artworkArray);
        })
}

exhibitApp.init = () => {
    // Gather elements from DOM
    exhibitApp.gatherElements();

    exhibitApp.selectionButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            exhibitApp.modal.style.display = "inherit";
            exhibitApp.painter = event.target.textContent;
            exhibitApp.getPaintings(exhibitApp.painter);
        });
    });

    // When help button (?) is clicked, display the help & instructions section
    exhibitApp.helpButton.addEventListener("click", () => {
        exhibitApp.helpContainer.classList.add("displayed");
    });

    // When exitHelp button (x) is clicked, hide help & instructions
    exhibitApp.exitHelp.addEventListener("click", () => {
        exhibitApp.helpContainer.classList.remove("displayed");
    });

    exhibitApp.hideHelp();
}

exhibitApp.init();