const { joinTrip } = require('../services/trip');
const { mapPost } = require('../util/mappers');
const preload = require('../middlewares/preload');
const { isUser } = require('../middlewares/guards');

const router = require('express').Router();

router.get('/details/:id', preload(), detailsGet);

async function detailsGet(req, res) {
    res.locals.info.remainingSeats = res.locals.info.seats - res.locals.info.buddies.length;
    res.locals.info.buddiesList = res.locals.info.buddies.map(b => b.email).join(', ');
    console.log(res.locals.info.buddiesList)

    if (req.session.user) {
        res.locals.hasUser = true;
        if (req.session.user._id == res.locals.info.owner._id) {
            res.locals.isOwner = true;
        }
        if (res.locals.info.buddies.find(b => b._id == req.session.user._id)) {
            res.locals.hasJoined = true;
        }
    }

    res.render('details', { title: `Trip Details` })
}


router.get('/join/:id', preload(), async (req, res) => {
    const id = req.params.id;
    console.log(id, req.session.user._id);
    try {
        await joinTrip(id, req.session.user._id);
        res.redirect('/details/' + id);

    } catch (errors) {
        console.log(errors);
        res.redirect('/details/' + id);
    }
})

module.exports = router;