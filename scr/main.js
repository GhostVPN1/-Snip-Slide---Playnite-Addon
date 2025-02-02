import { handlePopupVisibility } from './popupHandler.js';
import { addEventListeners } from './utils.js';

let popupVisible = false;
let triggerArea;
let popup;
let allGames = {};

const triggerPosition = 'left';

function initialize() {
    triggerArea = document.createElement('div');
    triggerArea.id = 'snip-slide-trigger';
    triggerArea.style[triggerPosition] = '0';
    document.body.appendChild(triggerArea);

    popup = document.createElement('div');
    popup.id = 'snip-slide-popup';
    document.body.appendChild(popup);

    const filterContainer = document.createElement('div');
    filterContainer.id = "filter-container";
    popup.appendChild(filterContainer);

    const platformFilter = document.createElement("select");
    platformFilter.id = "platform-filter";
    filterContainer.appendChild(platformFilter);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'game-search';
    searchInput.placeholder = 'Spiel suchen...';
    filterContainer.appendChild(searchInput);

    let ul = document.createElement('ul');
    popup.appendChild(ul);

    addEventListeners(triggerArea, 'mouseover', () => {
        handlePopupVisibility(true);
        if (ul.children.length === 0) { // Direkte Prüfung der Anzahl der Kindelemente
            loadGames();
        }
    });

    addEventListeners(document, 'mousemove', (event) => {
        if (popupVisible && !popup.contains(event.target) && !triggerArea.contains(event.target)) {
            handlePopupVisibility(false);
        }
    });

    searchInput.addEventListener('input', filterGames);
    platformFilter.addEventListener("change", filterGames);
}

function loadGames() {
    try {
        allGames = playnite.database.games;
        populatePlatformFilter();
        filterGames();
    } catch (error) {
        console.error("Fehler beim Laden der Spiele:", error);
        displayErrorMessage("Fehler beim Laden der Spiele.");
    }
}

function populatePlatformFilter() {
    const platformFilter = document.getElementById("platform-filter");
    platformFilter.innerHTML = ""; // Filter zurücksetzen
    const platforms = new Set();
    platforms.add("Alle");

    for (const gameId in allGames) {
        const game = allGames[gameId];
        if (game.Platforms) {
            game.Platforms.forEach(platform => platforms.add(platform.Name));
        }
    }

    platforms.forEach(platform => {
        const option = document.createElement("option");
        option.value = platform;
        option.text = platform;
        platformFilter.appendChild(option);
    });
}

function filterGames() {
    const searchTerm = document.getElementById('game-search').value.toLowerCase();
    const selectedPlatform = document.getElementById("platform-filter").value;
    const ul = popup.querySelector('ul');
    ul.innerHTML = '';

    const filteredGames = Object.values(allGames).filter(game => {
        const nameMatch = game.Name.toLowerCase().includes(searchTerm);
        let platformMatch = true;

        if (selectedPlatform !== "Alle") {
            if (game.Platforms) {
                platformMatch = game.Platforms.some(platform => platform.Name === selectedPlatform);
            } else {
                platformMatch = false;
            }
        }
        return nameMatch && platformMatch;
    }).sort((a, b) => a.Name.localeCompare(b.Name));

    if (filteredGames.length === 0) {
        displayErrorMessage("Keine Spiele gefunden.");
        return;
    }

    filteredGames.forEach(game => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "#";

        const coverImage = document.createElement('img');
        coverImage.classList.add('game-cover');

        if (game.CoverImage) {
            coverImage.src = playnite.GetImage(game.CoverImage);
            coverImage.onerror = () => {
                coverImage.src = 'assets/placeholder.png'; // Pfad zum Platzhalterbild
            };
        } else {
            coverImage.src = 'assets/placeholder.png'; // Pfad zum Platzhalterbild
        }
        a.appendChild(coverImage);

        const gameNameSpan = document.createElement('span');
        gameNameSpan.textContent = game.Name;
        a.appendChild(gameNameSpan);

        a.addEventListener('click', () => {
            playnite.startgame(game.Id);
            handlePopupVisibility(false);
        });
        li.appendChild(a);
        ul.appendChild(li);
    });
}

function displayErrorMessage(message) {
    const ul = popup.querySelector('ul');
    ul.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = message;
    ul.appendChild(li);
}

document.addEventListener('DOMContentLoaded', initialize);
