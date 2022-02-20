const { Schema, model, Types: { ObjectId } } = require('mongoose');

//TODO check model name and requirements
const tripSchema = new Schema({
    start: { type: String, minlength: [4, 'Starting point must be at least 4 characters long'] },
    end: { type: String, minlength: [4, 'End point must be at least 4 characters long'] },
    seats: { type: Number, min: [0, 'Seats number must be greater than 0'], max: [4, 'Seats number cannot be greater than 4'] },
    description: { type: String, minlength: [10, 'Description must be at least 10 characters long'] },
    brand: { type: String, minlength: [4, 'Brand must be at least 4 characters long'] },
    price: { type: Number, required: [true, 'Price is required'], min: [0, 'Price must be greater than 1'], max: [50, 'Price cannot be greater than 50'] },
    date: { type: String, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    image: { type: String, required: [true, 'Image is required'], match: [/^https?:\/\//, 'Image must be a valid URL address'] },
    owner: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: 'User', default: [] }
})


const Trip = model('Trip', tripSchema);

module.exports = Trip;