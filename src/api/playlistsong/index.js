// Index Playlistsong
const PlaylistSongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsong',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistsongHandler = new PlaylistSongHandler(service, validator);
    server.route(routes(playlistsongHandler));
  },
};
