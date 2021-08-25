// Validator Schema Playlists
const Joi = require('joi');

const PlayListsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PlayListsPayloadSchema };
