// Routes Playlists
const routes = (handler) => [
  // URL Menambahkan Playlist
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistsHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  // URL Menampilkan Data Playlist
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getAllPlaylistHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  // URL Delete Data Playlist
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.deletePlaylistByIdHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
