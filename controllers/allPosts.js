const router = require('express').Router();
const { getTrips } = require('../services/trip');
const { mapPost } = require('../util/mappers');

router.get('/allPosts', postsGet);

//TODO check names, service
async function postsGet(req, res) {
    const trips = await getTrips();

    res.render('shared-trips', { title: 'All Trips', trips });
}

module.exports = router;