/* eslint-disable no-underscore-dangle */
// PlaylistsService Menampung Data Playlists Kedalam Database

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistSongService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  // Function Menambahkan Lagu Kedalam Playlist Owner
  async addMusicToPlaylist({
    playlistId, songId,
  }) {
    const id = `mtp-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO playlistsong VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, songId, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  // Function Menampilkan Lagu Dalam Playlist
  async getAllMusicPlaylist(playlistId) {
    const query = {
      text: `SELECT m_songs.id as id,m_songs.title, m_songs.performer FROM playlistsong
      JOIN m_songs on playlistsong.song_id=m_songs.id
      WHERE playlistsong.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  // Fungsi Menhapus Lagu dalam Playlist
  async deleteMusicPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlistsong WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus');
    }
  }

  // Fungsi Mengecek Lagu Ada Atau Tidak Ada
  async verifyMusicById(SongId) {
    const query = {
      text: 'SELECT * FROM m_songs WHERE id = $1',
      values: [SongId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu Tidak Ada. SongId tidak ditemukan');
    }
  }

  // Function verifikasi Playlists berdasarkan id dan owner
  async verifyPlaylistsOwner(PlaylistId, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [PlaylistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  // Fungsi Mengecek Lagu Dalam Playlist Ada Atau Tidak Ada
  async verifyMusicByIdPlaylist(SongId) {
    const query = {
      text: 'SELECT * FROM playlistsong WHERE song_id = $1',
      values: [SongId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Lagu gagal dihapus');
    }
  }

  // Function verifikasi Playlists berdasarkan Collaboration
  async verifyPlaylistAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistsOwner(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      try {
        await this._collaborationService.verifyCollaborator(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = PlaylistSongService;
