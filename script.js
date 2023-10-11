document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search_form");
    const animeResults = document.getElementById("anime-results");

    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const animeName = document.getElementById("search").value;
            if (animeName) {
                searchAnime(animeName);
            }
        });
    }

    const searchAnime = async (name) => {
        const apiUrl = `https://api.jikan.moe/v4/anime?q=${name}&sfw`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            displayAnimeResults(data);
        } catch (error) {
            animeResults.innerHTML = "Error fetching anime data.";
            console.error(error);
        }
    }

    function displayAnimeResults(data) {
        animeResults.innerHTML = "";
    
        if (data && data.data) {
            const sortedData = data.data.sort((a, b) => a.title.localeCompare(b.title));
    
            sortedData.forEach((anime) => {
                const title = anime.title || "Title not available";
                const coverImage = anime.images?.jpg?.image_url || "https://via.placeholder.com/200";
    
                const animeCard = document.createElement("li"); // Use uma lista não ordenada (ul) com itens de lista (li) para cada anime
                animeCard.classList.add("anime-list-item");
                animeCard.innerHTML = `
                    <h2 class="anime-title">${title}</h2>
                    <a href="${anime.url}" target="_blank" class="mal-link">
                        <img src="${coverImage}" alt="${title}">
                    </a>
                `;
    
                animeResults.appendChild(animeCard);
    
                // Adicionar um link para o MyAnimeList com o atributo "href" e a imagem dentro do link
            });
        } else {
            animeResults.innerHTML = "Nenhum resultado encontrado.";
        }
    }
});
