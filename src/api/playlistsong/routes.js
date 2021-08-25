// Routes Playlistsong
const routes = (handler) => [
  // URL Menambahkan Lagu Kedalam Playlist
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: handler.postPlaylistSongHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  // URL Menampilkan Lagu dalam playlist
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: handler.getAllMusicPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  // URL Mennghapus lagu dalam playlist
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteMusicIdPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
