export class ArtistRenderer {
    render(artist) {
        let html = /*html*/ `
            <tr class='artist-row' data-artist-id='${artist.artistID}'>
                <td>${artist.name}</td>
                <td>${artist.birthdate}</td>
                <td>${artist.genres}</td>
                <td><a href='${artist.website}'>${artist.website}</a></td>
                <td><img src='${artist.image}'/></td>
                <td>${artist.numberOfAlbums}</td>
            </tr>
        `;

        return html;
    }
}
