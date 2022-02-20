const router = require('express').Router();
const { mapErrors } = require('../util/mappers');
const { isUser } = require('../middlewares/guards');
const { createNewTrip } = require('../services/trip');


router.get('/create', isUser(), createGet);
router.post('/create', isUser(), createPost);

function createGet(req, res) {
    res.render('create', { title: 'Create Trip Page' })
}

//TODO 
async function createPost(req, res) {
    const userId = req.session.user._id;
    const data = {
        start: req.body.start,
        end: req.body.end,
        seats: req.body.seats,
        description: req.body.description,
        brand: req.body.brand,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        owner: userId
    }

    try {
        await createNewTrip(data);
        
        res.redirect('/allPosts');

    } catch (error) {
        console.log(error);
        res.render('create', { title: 'Create Trip Page', errors: mapErrors(error), data })
    }
}

module.exports = router;