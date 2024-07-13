document.addEventListener('DOMContentLoaded', function() {
    fetch('games.json')
        .then(response => response.json())
        .then(games => {
            const gameListContainer = document.getElementById('game-list');
            const sortSelect = document.getElementById('sortrank');
            const moneySelect = document.getElementById('sortmoney');
            const platformCheckboxes = document.querySelectorAll('input[type="checkbox"]');
            const loadMoreButton = document.getElementById('button-load');
            const totalGamesCount = document.getElementById('total-games');
            let displayedGamesCount = 0;
            const gamesPerPage = 10;

            loadSettings();
            PrintGamesTotal();

            function PrintGamesTotal() {
                console.log("TOTAL GAMES: " + games.length);
                totalGamesCount.textContent = "TOTAL GAMES: " + games.length;
            }

            function renderGames() {
                gameListContainer.innerHTML = '';

                let sortedGames = sortGames([...games]);
                sortedGames = filterGames(sortedGames);
                sortedGames = filterByMoney(sortedGames);

                const gamesToShow = sortedGames.slice(0, displayedGamesCount + gamesPerPage);
                gamesToShow.forEach(game => {
                    const gameElement = document.createElement('div');
                    gameElement.classList.add('game');
                    const formattedTitle = game.title.replace(/[^\w\s]/gi, '').replace(/\s+/g, '').toLowerCase();
                    gameElement.innerHTML = `
                        <div class="game-info">
                            <div class="game-title">
                                <img class="game-icon" src="games/${formattedTitle}/icon.ico" alt="${game.title}">
                                ${game.title}
                            </div>
                            <p>${game.description}</p>
                            <div class="game-littledetails">
                                Creator: ${game.creator} • Release Date: ${game.releaseDate} • Rank: ${game.rank} • ${game.multiplayer ? 'Multiplayer' : 'Singleplayer'} • ${game.money ? 'paid' : 'free'} • ${game.platforms.map(platform => platform.charAt(0).toUpperCase() + platform.slice(1)).join(', ')}
                            </div>
                        </div>
                        <iframe class="game-gameplay" src="${game.youtubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <div class="button-container">
                            <a class="button-play" href="${game.playLink}">PLAY</a>
                        </div>
                    `;
                    gameListContainer.appendChild(gameElement);
                });

                displayedGamesCount += gamesPerPage;
                if (displayedGamesCount >= sortedGames.length) {
                    loadMoreButton.style.display = 'none';
                } else {
                    loadMoreButton.style.display = 'block';
                }
            }

            function sortGames(games) {
                const sortBy = sortSelect.value;
                if (sortBy === 'newest') {
                    return games.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                } else if (sortBy === 'oldest') {
                    return games.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
                } else if (sortBy === 'random') {
                    return games.sort(() => Math.random() - 0.5);
                } else {
                    return games.sort((a, b) => a.rank - b.rank);
                }
            }

            function filterGames(games) {
                const selectedPlatforms = Array.from(platformCheckboxes)
                                            .filter(checkbox => checkbox.checked)
                                            .map(checkbox => checkbox.value);
                return games.filter(game => {
                    return game.platforms.some(platform => selectedPlatforms.includes(platform));
                });
            }

            function filterByMoney(games) {
                const moneySort = moneySelect.value;
                if (moneySort === 'paid') {
                    return games.filter(game => game.money);
                } else if (moneySort === 'free') {
                    return games.filter(game => !game.money);
                } else {
                    return games;
                }
            }

            function saveSettings() {
                const selectedSort = sortSelect.value;
                const selectedMoneySort = moneySelect.value;
                const selectedPlatforms = Array.from(platformCheckboxes)
                                            .filter(checkbox => checkbox.checked)
                                            .map(checkbox => checkbox.value);
                localStorage.setItem('selectedSort', selectedSort);
                localStorage.setItem('selectedMoneySort', selectedMoneySort);
                localStorage.setItem('selectedPlatforms', JSON.stringify(selectedPlatforms));
            }

            function loadSettings() {
                const selectedSort = localStorage.getItem('selectedSort');
                const selectedMoneySort = localStorage.getItem('selectedMoneySort');
                const selectedPlatforms = JSON.parse(localStorage.getItem('selectedPlatforms'));

                if (selectedSort) {
                    sortSelect.value = selectedSort;
                }

                if (selectedMoneySort) {
                    moneySelect.value = selectedMoneySort;
                }

                if (selectedPlatforms) {
                    platformCheckboxes.forEach(checkbox => {
                        checkbox.checked = selectedPlatforms.includes(checkbox.value);
                    });
                }
            }

            renderGames();

            sortSelect.addEventListener('change', () => {
                displayedGamesCount = 0;
                renderGames();
                saveSettings();
            });

            moneySelect.addEventListener('change', () => {
                displayedGamesCount = 0;
                renderGames();
                saveSettings();
            });

            platformCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    displayedGamesCount = 0;
                    renderGames();
                    saveSettings();
                });
            });

            loadMoreButton.addEventListener('click', renderGames);
        })
        .catch(error => {
            console.error('Error fetching games!:', error);
        });
});
