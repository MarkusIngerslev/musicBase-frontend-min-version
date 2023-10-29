// ===== IMPORTS ===== \\
import { initTabs } from "./tabs.js";
import { getAlbumData, getTrackData, getArtistData } from "./restService.js";
// class imports
import { ListRenderer } from "./ListRenderer.js";

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

    // display lists
    const albumList = new ListRenderer(albums, "albums-table-tbody", null);
    const artistList = new ListRenderer(artists, "artists-table-tbody", null);
    const trackList = new ListRenderer(tracks, "tracks-table-tbody", null);
}
