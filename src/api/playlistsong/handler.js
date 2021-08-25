/* eslint-disable no-underscore-dangle */
// Hendler Playlists

const ClientError = require('../../exceptions/ClientError');

class PlaylistSongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistSongHandler = this.postPlaylistSongHandler.bind(this);
    this.getAllMusicPlaylistHandler = this.getAllMusicPlaylistHandler.bind(this);
    this.deleteMusicIdPlaylistHandler = this.deleteMusicIdPlaylistHandler.bind(this);
  }

  // Function Hendler Menambahkan Lagu Kedalam Playlist
  async postPlaylistSongHandler(request, h) {
    try {
      this._validator.validatePlaylistsongPayload(request.payload);

      // Body Request
      const {
        songId,
      } = request.payload;

      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      // Verisikasi Owner Playlist dan Lagu
      // await this._service.verifyPlaylistsOwner(playlistId, credentialId);
      await this._service.verifyPlaylistAccess(playlistId, credentialId);

      await this._service.verifyMusicById(songId);

      // Proses Menyimpan Lagu
      const PlaylistSong = await this._service.addMusicToPlaylist({
        playlistId, songId,
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
        data: {
          PlaylistSong,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Function Hendler Menampilkan Playlist Owner
  async getAllMusicPlaylistHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      // await this._service.verifyPlaylistsOwner(playlistId, credentialId);
      await this._service.verifyPlaylistAccess(playlistId, credentialId);

      const songs = await this._service.getAllMusicPlaylist(playlistId);

      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',

      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Function Delete Lagu Dalam Playlist
  async deleteMusicIdPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistsongPayload(request.payload);

      const { songId } = request.payload;
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      // Verisikasi Owner Playlist dan Lagu
      // await this._service.verifyPlaylistsOwner(playlistId, credentialId);
      await this._service.verifyPlaylistAccess(playlistId, credentialId);
      await this._service.verifyMusicByIdPlaylist(songId);

      // Proses Delete Music Dalam Playlist
      await this._service.deleteMusicPlaylist(
        playlistId, songId,
      );
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',

      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlaylistSongHandler;
