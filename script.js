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
        exhibitApp.modal.style.opacity = "0";
        setTimeout(() => {
            exhibitApp.modal.style.display = "none";
        }, 800);
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

exhibitApp.postLabel = () => {
    let form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const textarea = document.querySelector("textarea");
        exhibitApp.labelInput = textarea.value;
        console.log(exhibitApp.labelInput);
        form.textContent = exhibitApp.labelInput;

        // Clear textarea after submission
        textarea.value = "";
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
        <div class="linkContainer">
            <a href=${artworks[i].link}>Learn more</a>
        </div>
        <h4>${artworks[i].title}</h4>
        <form>
            <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
            <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500"></textarea>
            <button type="submit" class="post">Post label</button>
        </form>
    `;
    exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
    exhibitApp.postLabel();

    next.addEventListener("click", () => {
        artworks[i++];
        if (i === 5) {
            i = 0;
        }
        exhibitApp.artpiece.innerHTML = `
            <div class="imageContainer">
                <img src=${artworks[i].image} alt="${artworks[i].altText}" />
            </div>
            <div class="linkContainer">
                <a href=${artworks[i].link}>Learn more</a>
            </div>
            <h4>${artworks[i].title}</h4>
            <form>
                <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
                <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500"></textarea>
                <button type="submit" class="post">Post label</button>
            </form>
        `;
        exhibitApp.paintingsContainer.append(exhibitApp.artpiece);

        exhibitApp.postLabel();
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
            <div class="linkContainer">
                <a href=${artworks[i].link}>Learn more</a>
            </div>
            <h4>${artworks[i].title}</h4>
            <form>
                <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
                <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500"></textarea>
                <button type="submit" class="post">Post label</button>
            </form>
        `;
        exhibitApp.paintingsContainer.append(exhibitApp.artpiece);

        exhibitApp.postLabel();
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
            setTimeout(() => {
                exhibitApp.modal.style.opacity = "1";
            }, 400);
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