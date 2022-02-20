const { isUser, isOwner } = require('../middlewares/guards');
const { editTripById } = require('../services/trip');
const { mapPost, mapErrors } = require('../util/mappers');
const preload = require('../middlewares/preload');

const router = require('express').Router();

router.get('/edit/:id', isUser(), preload(), isOwner(), editGet);
router.post('/edit/:id', isUser(), preload(), isOwner(), editPost);

//TODO check names
async function editGet(req, res) {
    res.render('edit', { title: `Edit Page` })
}
//TODO check prop names
async function editPost(req, res) {
    const id = req.params.id;

    const trip = {
        start: req.body.start,
        end: req.body.end,
        seats: req.body.seats,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image
    }

    try {
        await editTripById(id, trip);
        res.redirect('/details/' + id) //TODO check redirect requirements

    } catch (errors) {
        trip._id = id;
        console.log(errors);
        res.render('edit', { title: `Edit Page`, info: trip, errors: mapErrors(errors) });
    }
}

module.exports = router;