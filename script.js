document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search_form");
    const animeResults = document.getElementById("anime-results");
  
    if (searchForm) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const animeTitle = document.getElementById("search").value;
            if (animeTitle) {
                searchAnime(animeTitle);
            }
        });
  
        const searchAnime = async (title) => {
            const apiUrl = `https://api.jikan.moe/v4/anime/{id}`;
  
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    displayAnimeResults(data);
                })
                .catch((error) => {
                    animeResults.innerHTML = "Error fetching anime data.";
                    console.error("Network response was not ok");
                });
        }
  
        function displayAnimeResults(data) {
            animeResults.innerHTML = "";
  
            if (data && data.results) {
                data.results.forEach((result) => {
                    const title = result.title || "Title not available";
                    const description = result.synopsis || "Description not available";
                    const coverImage = result.image_url || "https://via.placeholder.com/200";
  
                    const animeCard = document.createElement("div");
                    animeCard.classList.add("card");
                    animeCard.innerHTML = `
                        <div class="card-image">
                            <img src="${coverImage}" alt="${title}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${title}</span>
                            <p>${description}</p>
                        </div>
                    `;
  
                    animeResults.appendChild(animeCard);
                });
            }
        }
    }
  });