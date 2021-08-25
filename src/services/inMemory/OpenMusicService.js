/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

// eslint-disable-next-line no-unused-vars
class OpenMusicService {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._songs = [];
  }

  addSongs({
    title, year, performer, genre, duration,
  }) {
    const id = `song-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newSongs = {
      id, title, year, performer, genre, duration, insertedAt, updatedAt,
    };

    // eslint-disable-next-line no-underscore-dangle
    this._songs.push(newSongs);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs() {
    // menampung filter
    const filterSongs = this._songs;

    const datatampil = filterSongs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));

    return datatampil;
  }

  getSongsById(id) {
    const song = this._songs.filter((n) => n.id === id)[0];
    if (!song) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return song;
  }

  editSongById(id, {
    title, year, performer, genre, duration,
  }) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui Lagu. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this._songs[index] = {
      ...this._songs[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteSongById(id) {
    const index = this._songs.findIndex((song) => song.id === id);
    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._songs.splice(index, 1);
  }
}

module.exports = OpenMusicService;
