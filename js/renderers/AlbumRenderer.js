export class AlbumRenderer {
    render(album) {
        let html = /*html */ `
            <tr class='album-row' data-album-id='${album.albumID}'>
                <td><img src='${album.albumCover}'/></td>
                <td>${album.albumTitle}</td>
                <td>${album.releaseDate}</td>
                <td>${album.numberofTracks}</td>
            </tr>
        `;
        return html;
    }
}
