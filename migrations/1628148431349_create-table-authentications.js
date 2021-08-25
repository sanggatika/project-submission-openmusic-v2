/* eslint-disable camelcase */
// database db_openmusic tabel authentications

exports.shorthands = undefined;

// create tebel authentications
exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

// drop tebel authentications
exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
