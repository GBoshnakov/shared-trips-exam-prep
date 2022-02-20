//TODO replace with service name
const { getTripById } = require('../services/trip');
// const collectionService = require('../services/post');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        //TODO change prop name (collectionService) if needed
        const data = await getTripById(id);
        res.locals.info = data;

        next();
    }
}

module.exports = preload;