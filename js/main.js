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
