/* eslint-disable no-underscore-dangle */
// PlaylistsService Menampung Data Playlists Kedalam Database

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  // Function Menambahkan Playlists
  async addPlaylist({
    name, owner,
  }) {
    const id = `playlist-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, owner, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  // Function Menampilkan Playlists
  async getPlaylists(owner) {
    const query = {
      text: `SELECT playlists.id as id,playlists.name as name,users.username as username FROM playlists      
      LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id
      JOIN users on playlists.owner=users.id
      WHERE playlists.owner = $1 OR collaborations.user_id = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  // Function Delete Playlists
  async deletePlaylists(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Playlists gagal dihapus. Id tidak ditemukan');
    }
  }

  // Function verifikasi Playlists berdasarkan id dan owner
  async verifyPlaylistsOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
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

module.exports = PlaylistsService;
