const apiKey = "9idJTqH5";

const url = new URL("https://www.rijksmuseum.nl/api/nl/collection");

const getPaintings = () => {
    url.search = new URLSearchParams({
        key: apiKey,
        format: "json",
        culture: "en",
        q: "monet",
        ps: 10,
        imgonly: "true"
    })

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse.artObjects);
        })
}

getPaintings();