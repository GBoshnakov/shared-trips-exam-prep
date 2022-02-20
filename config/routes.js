const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const createController = require('../controllers/create');
const allPostsController = require('../controllers/allPosts');
const detailsController = require('../controllers/details');
const editController = require('../controllers/edit');
const deleteController = require('../controllers/delete');
const notFoundController = require('../controllers/notFound');
const profileController = require('../controllers/profile');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(createController);
    app.use(allPostsController);
    app.use(detailsController);
    app.use(editController);
    app.use(deleteController);
    app.use(profileController);
    
    
    app.use(notFoundController);
};