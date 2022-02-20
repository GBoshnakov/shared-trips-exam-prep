const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { deleteById } = require('../services/trip');

const router = require('express').Router();

router.get('/delete/:id', isUser(), preload(), isOwner(), del);

async function del(req, res) {
    const id = req.params.id;

    try {
        //TODO check names and path
        await deleteById(id);
        res.redirect('/allPosts');
    } catch (error) {
        console.log(error);
        res.redirect('/404');
    }
}


module.exports = router;