const router = require('express').Router();
const { isUser } = require('../middlewares/guards');
const { getOwnerTrips } = require('../services/trip');


router.get('/profile', isUser(), profileGet);

//TODO check names, service
async function profileGet(req, res) {

    res.locals.user.trips = await getOwnerTrips(res.locals.user._id);

    res.render('profile', { title: 'Profile Page' });
}

module.exports = router;