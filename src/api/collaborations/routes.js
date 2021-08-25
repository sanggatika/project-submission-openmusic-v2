// Routes Collaboration
const routes = (handler) => [
  // URL Menambakan Collaboration
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
  // URL Menghapus Collaboration
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaborationHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
