/* eslint-disable camelcase */
// database db_openmusic tabel m_song

exports.shorthands = undefined;

// create tebel m_song
exports.up = (pgm) => {
  pgm.createTable('m_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
    performer: {
      type: 'TEXT',
      notNull: true,
    },
    genre: {
      type: 'TEXT',
      notNull: true,
    },
    duration: {
      type: 'INTEGER',
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

// drop tebel m_song
exports.down = (pgm) => { pgm.dropTable('m_songs'); };
