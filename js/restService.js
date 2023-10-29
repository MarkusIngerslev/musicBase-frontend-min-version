"use strict";

// Endpoint
const port = 3333;
const endpoint = `http://localhost:${port}`;

// GET JSON-data for Albums
async function getAlbumData() {
    const res = await fetch(`${endpoint}/albums`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
}

// GET JSON-data for Tracks
async function getTrackData() {
    const res = await fetch(`${endpoint}/tracks`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
}

// GET JSON-data for Artists
async function getArtistData() {
    const res = await fetch(`${endpoint}/artists`);
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data;
}

export { getAlbumData, getTrackData, getArtistData };
