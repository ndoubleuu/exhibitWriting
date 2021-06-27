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
    exhibitApp.next = document.querySelector(".next");
    exhibitApp.previous = document.querySelector(".previous");
    exhibitApp.paintingsContainer = document.querySelector(".paintingsContainer");
    exhibitApp.exitModal = document.querySelector(".exitModal");
}

// Method that will cause modal to fade out on exit (called in hideModal method)
exhibitApp.fadeOutModal = () => {
    exhibitApp.modal.style.opacity = "0";
    setTimeout(() => {
        exhibitApp.modal.style.display = "none";
    }, 800);
}

// Hide modal
exhibitApp.hideModal = () => {
    exhibitApp.exitModal.addEventListener("click", () => {
        exhibitApp.fadeOutModal();
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            exhibitApp.fadeOutModal();
        }
    });
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

exhibitApp.postLabel = (i) => {
    let form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const textarea = document.querySelector("textarea");
        exhibitApp.labelInput = textarea.value.trim();

        // Push new label from form submission to the newPaintingsArray to be accessed in displayPaintings function
        exhibitApp.newPaintingsArray[i].label = exhibitApp.labelInput;

        // Hide form, create paragraph element which will hold the submitted label
        form.style.display = "none";
        exhibitApp.labelPara = document.createElement("p");
        exhibitApp.labelPara.textContent = exhibitApp.labelInput;
        exhibitApp.artpiece.appendChild(exhibitApp.labelPara);

        // Clear textarea after submission
        textarea.value = "";
    })
}

// Method that displays NEXT painting with either form or label
exhibitApp.nextPainting = (i) => {
    if (exhibitApp.newPaintingsArray[i].label === undefined) {
        exhibitApp.artpiece.innerHTML = `
                <div class="imageContainer">
                    <img src=${exhibitApp.newPaintingsArray[i].image} alt="${exhibitApp.newPaintingsArray[i].altText}" />
                </div>
                <div class="linkContainer">
                    <a href=${exhibitApp.newPaintingsArray[i].link} target="_blank">Learn more</a>
                </div>
                <h4>${exhibitApp.newPaintingsArray[i].title}</h4>
                <form>
                    <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
                    <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500" required></textarea>
                    <button type="submit" class="post">Post label</button>
                </form>
            `;

        exhibitApp.postLabel(i);
    } else {
        exhibitApp.artpiece.innerHTML = `
                <div class="imageContainer">
                    <img src=${exhibitApp.newPaintingsArray[i].image} alt="${exhibitApp.newPaintingsArray[i].altText}" />
                </div>
                <div class="linkContainer">
                    <a href=${exhibitApp.newPaintingsArray[i].link} target="_blank">Learn more</a>
                </div>
                <h4>${exhibitApp.newPaintingsArray[i].title}</h4>
                <p>${exhibitApp.newPaintingsArray[i].label}</p>
            `;
    }
    exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
}

// Method that displays PREVIOUS painting with either form or label
exhibitApp.previousPainting = (i) => {
    if (exhibitApp.newPaintingsArray[i].label === undefined) {
        exhibitApp.artpiece.innerHTML = `
                <div class="imageContainer">
                    <img src=${exhibitApp.newPaintingsArray[i].image} alt="${exhibitApp.newPaintingsArray[i].altText}" />
                </div>
                <div class="linkContainer">
                    <a href=${exhibitApp.newPaintingsArray[i].link} target="_blank">Learn more</a>
                </div>
                <h4>${exhibitApp.newPaintingsArray[i].title}</h4>
                <form>
                    <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
                    <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500" required></textarea>
                    <button type="submit" class="post">Post label</button>
                </form>
            `;

        exhibitApp.postLabel(i);
    } else {
        exhibitApp.artpiece.innerHTML = `
                <div class="imageContainer">
                    <img src=${exhibitApp.newPaintingsArray[i].image} alt="${exhibitApp.newPaintingsArray[i].altText}" />
                </div>
                <div class="linkContainer">
                    <a href=${exhibitApp.newPaintingsArray[i].link} target="_blank">Learn more</a>
                </div>
                <h4>${exhibitApp.newPaintingsArray[i].title}</h4>
                <p>${exhibitApp.newPaintingsArray[i].label}</p>
            `;
    }
    exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
}

exhibitApp.displayPaintings = (artworks) => {
    let i = 0;

    exhibitApp.artpiece = document.createElement("li");

    exhibitApp.artpiece.innerHTML = `
        <div class="imageContainer">
            <img src=${artworks[i].image} alt="${artworks[i].altText}" />
        </div>
        <div class="linkContainer">
            <a href=${artworks[i].link} target="_blank">Learn more</a>
        </div>
        <h4>${artworks[i].title}</h4>
        <form>
            <label for="label" class="srOnly">Write your own exhibit label for the painting</label>
            <textarea id="label" name="label" class="label" placeholder="How would you describe this painting?" maxlength="500" required></textarea>
            <button type="submit" class="post">Post label</button>
        </form>
    `;
    exhibitApp.paintingsContainer.append(exhibitApp.artpiece);
    exhibitApp.postLabel(i);

    // Display next painting
    exhibitApp.next.addEventListener("click", () => {
        artworks[i++];
        if (i === 5) {
            i = 0;
        }

        exhibitApp.nextPainting(i);
    });

    // Display previous painting
    exhibitApp.previous.addEventListener("click", () => {
        artworks[i--];
        if (i < 0) {
            i = 4;
        }

        exhibitApp.previousPainting(i);
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

    // Method that opens modal and displays paintings
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