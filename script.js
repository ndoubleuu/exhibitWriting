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
    exhibitApp.exitModal = document.querySelector(".exitModal");
}

// Hide modal
exhibitApp.hideModal = () => {
    exhibitApp.exitModal.addEventListener("click", () => {
        exhibitApp.modal.style.display = "none";
    })
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
    const next = document.querySelector(".next");
    const previous = document.querySelector(".previous");
    let i = 0;

    exhibitApp.artpiece = document.createElement("li");

    exhibitApp.artpiece.innerHTML = `
        <div class="imageContainer">
            <img src=${artworks[i].image} alt="${artworks[i].altText}" />
        </div>
        <a href=${artworks[i].link}>Learn more</a>
        <h4>${artworks[i].title}</h4>
        <form>
            <label class="srOnly">Write your own exhibit label for the painting</label>
            <textarea placeholder="How would you describe this painting?" maxlength="500"></textarea>
        </form>
    `;
    exhibitApp.paintingsContainer.append(exhibitApp.artpiece);

    next.addEventListener("click", () => {
        artworks[i++];
        if (i === 5) {
            i = 0;
        }
        exhibitApp.artpiece.innerHTML = `
            <div class="imageContainer">
                <img src=${artworks[i].image} alt="${artworks[i].altText}" />
            </div>
            <a href=${artworks[i].link}>Learn more</a>
            <h4>${artworks[i].title}</h4>
            <form>
                <label class="srOnly">Write your own exhibit label for the painting</label>
                <textarea placeholder="How would you describe this painting?" maxlength="500"></textarea>
            </form>
        `;
        exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
    });

    previous.addEventListener("click", () => {
        artworks[i--];
        if (i < 0) {
            i = 4;
        }
        exhibitApp.artpiece.innerHTML = `
            <div class="imageContainer">
                <img src=${artworks[i].image} alt="${artworks[i].altText}" />
            </div>
            <a href=${artworks[i].link}>Learn more</a>
            <h4>${artworks[i].title}</h4>
            <form>
                <label class="srOnly">Write your own exhibit label for the painting</label>
                <textarea placeholder="How would you describe this painting?" maxlength="500"></textarea>
            </form>
        `;
        exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
    });
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

            exhibitApp.newPaintingsArray = exhibitApp.artworkArray.map((artwork) => {
                return {
                    image: artwork.webImage.url,
                    title: artwork.title,
                    altText: artwork.longTitle,
                    link: artwork.links.web
                }
            });

            exhibitApp.displayPaintings(exhibitApp.newPaintingsArray);
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

            // Clear previous paintings
            const clearResults = exhibitApp.paintingsContainer;
            clearResults.innerHTML = "";
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

    exhibitApp.hideModal();
}

exhibitApp.init();