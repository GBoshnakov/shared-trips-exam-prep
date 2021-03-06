const { Schema, model, Types: { ObjectId } } = require('mongoose');

const USERNAME_PATTERN = /^[a-zA-Z]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

//TODO check user schema requirements
const userSchema = new Schema({
    email: {
        type: String, required: true, validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must contain English letters only'
        }
    },
    gender: { type: String, required: [true, 'Gender is required'] },
    hashedPassword: { type: String, required: true },
    trips: { type: [ObjectId], ref: 'Trip', default: [] }
});

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;