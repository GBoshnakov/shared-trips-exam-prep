const router = require('express').Router();
const { register, login } = require('../services/user');
const { mapErrors } = require('../util/mappers');
const { isGuest, isUser } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');


router.get('/register', isGuest(), registerGet);
router.post('/register', isGuest(),
    body('gender')
        .custom((value) => value == 'male' || value == 'female')
        .withMessage('Gender must be male or female'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    body('repass')
        .custom((value, { req }) => value == req.body.password)
        .withMessage('Passwords don\'t match'), registerPost);

router.get('/login', isGuest(), loginGet);
router.post('/login', isGuest(), loginPost);

router.get('/logout', isUser(), logout);

function registerGet(req, res) {
    res.render('register', { title: 'Register Page' });
}

//TODO check form names, actions, methods
async function registerPost(req, res) {

    const { errors } = validationResult(req);
    try {
        if (errors.length >= 1) {
            throw errors;
        }

        const user = await register(req.body.email, req.body.password, req.body.gender);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements

    } catch (error) {
        console.log(error);
        const data = {
            email: req.body.email,
            gender: req.body.gender,
            isMale: req.body.gender == 'male'
        }

        res.render('register', { title: 'Register Page', data, errors: mapErrors(error) });
    }
}

function loginGet(req, res) {
    res.render('login', { title: 'Login Page' })
}

async function loginPost(req, res) {
    try {
        const user = await login(req.body.email, req.body.password);
        req.session.user = user;
        res.redirect('/'); //TODO check redirect requirements
    } catch (error) {
        
        console.log(error);
        res.render('login', { title: 'Login Page', data: { email: req.body.email }, errors: mapErrors(error) });

    }

}

function logout(req, res) {
    delete req.session.user;
    res.redirect('/'); //TODO check redirect requirements
}

module.exports = router;