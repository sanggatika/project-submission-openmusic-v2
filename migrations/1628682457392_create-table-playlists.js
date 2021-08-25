/* eslint-disable camelcase */
// database db_openmusic tabel playlists

exports.shorthands = undefined;

// create tebel playlists
exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    // menetapkan kolom owner sebagai foreign key nantinya
    owner: {
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

// drop tebel playlists
exports.down = (pgm) => {
  pgm.dropTable('playlists');
};
