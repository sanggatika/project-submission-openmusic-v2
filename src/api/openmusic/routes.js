// Routes Openmusic/Songs
const routes = (handler) => [
  // URL Menambahkan Lagu
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
  },
  // URL Menampilkan Semua Lagu
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getAllSongHandler,
  },
  // URL Menampilkan Lagu Berdasarkan ID
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
  },
  // URL Edit Lagu
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHandler,
  },
  // URL Delete Lagu
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHandler,
  },
];

module.exports = routes;
