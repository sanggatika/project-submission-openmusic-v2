// Routes Users
const routes = (handler) => [
  // URL Menambahkan User
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  // URL Mendapatkan User
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;
