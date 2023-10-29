// ===== IMPORTS ===== \\
import { initTabs } from "./tabs.js";
import { getAlbumData, getTrackData, getArtistData } from "./restService.js";
// class imports
import { ListRenderer } from "./renderers/ListRenderer.js";
import { AlbumRenderer } from "./renderers/AlbumRenderer.js";
import { ArtistRenderer } from "./renderers/ArtistRenderer.js";
import { TrackRenderer } from "./renderers/TrackRenderer.js";

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

    // Group tracks by trackID
    const groupedTracks = groupTracksByTrackID(tracks);

    // Create instance of Renderes
    const albumRenderer = new AlbumRenderer();
    const artistRenderer = new ArtistRenderer();
    const trackRenderer = new TrackRenderer(albums);

    // Display lists
    const albumList = new ListRenderer(albums, "#albums-table-tbody", albumRenderer);
    const artistList = new ListRenderer(artists, "#artists-table-tbody", artistRenderer);
    const trackList = new ListRenderer(groupedTracks, "#tracks-table-tbody", trackRenderer);

    albumList.render();
    artistList.render();
    trackList.render();

    // Event Listeners
    document.querySelector("#sort-album-title").addEventListener("click", () => albumList.sort("albumTitle"));
    document.querySelector("#sort-album-releasedate").addEventListener("click", () => albumList.sort("releaseDate"));
    document.querySelector("#sort-album-tracks").addEventListener("click", () => albumList.sort("numberofTracks"));
    // add sort eventlisteners artist
    document.querySelector("#sort-artist-name").addEventListener("click", () => artistList.sort("name"));
    document.querySelector("#sort-artist-birthdate").addEventListener("click", () => artistList.sort("birthdate"));
    document.querySelector("#sort-artist-genres").addEventListener("click", () => artistList.sort("genres"));
    document.querySelector("#sort-artist-website").addEventListener("click", () => artistList.sort("website"));
    document
        .querySelector("#sort-artist-numberOfAlbums")
        .addEventListener("click", () => artistList.sort("numberOfAlbums"));
    // add sort eventlisteners tracks
    document.querySelector("#sort-tracks-trackName").addEventListener("click", () => trackList.sort("trackName"));
    document.querySelector("#sort-tracks-duration").addEventListener("click", () => trackList.sort("duration"));
    document.querySelector("#sort-tracks-artistNames").addEventListener("click", () => trackList.sort("artistNames"));
}

// ===== FUNKTIONS ===== \\
// function to group tracks by their ID
function groupTracksByTrackID(tracks) {
    const groupedTracks = {};

    for (const track of tracks) {
        if (groupedTracks.hasOwnProperty(track.trackID)) {
            // If the trackID is already in the groupedTracks object, add the albumID to the existing entry
            groupedTracks[track.trackID].albumIDs.push(track.albumID);
        } else {
            // If the trackID is not in the groupedTracks object, create a new entry
            groupedTracks[track.trackID] = {
                ...track,
                albumIDs: [track.albumID],
            };
        }
    }

    // Convert the groupedTracks object back to an array
    return Object.values(groupedTracks);
}
