/* eslint-disable camelcase */
// database db_openmusic tabel user

exports.shorthands = undefined;

// create tebel users
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

// drop tebel users
exports.down = (pgm) => {
  pgm.dropTable('users');
};
