const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO
async function register(email, password, gender) {
    const existing = await getUserByUsername(email);
    if (existing) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        gender,
        hashedPassword
    });
    await user.save();

    return user;
}

//TODO
async function login(email, password) {
    const user = await getUserByUsername(email);
    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return user;
}

//TODO
async function getUserByUsername(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });

    return user;
}

module.exports = {
    register,
    login
}