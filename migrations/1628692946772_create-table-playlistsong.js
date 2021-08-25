/* eslint-disable camelcase */
// database db_openmusic tabel playlistsong

exports.shorthands = undefined;

// create tebel playlistsong
exports.up = (pgm) => {
  pgm.createTable('playlistsong', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

// drop tebel playlistsong
exports.down = (pgm) => {
  pgm.dropTable('playlistsong');
};
