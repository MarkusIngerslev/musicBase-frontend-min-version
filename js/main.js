// ===== IMPORTS ===== \\
import { initTabs } from "./tabs.js";
import { getAlbumData, getTrackData, getArtistData } from "./restService.js";

// ===== Global varibles ===== \\
// array for data from database
let albums = [];
let artists = [];
let tracks = [];

// filter arrays
let filteredAlbums = [];
let filteredArtists = [];
let filteredTracks = [];

// hover variables
let albumsTableBody;
let artistsTableBody;

// ===== LOAD PAGE ===== \\
window.addEventListener("load", initApp);

async function initApp() {
    // Functionality to change between tabs
    initTabs();

    // populate varibles with data
    albums = await getAlbumData();
    artists = await getArtistData();
    tracks = await getTrackData();
}
