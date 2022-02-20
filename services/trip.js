const Trip = require('../models/Trip');

async function createNewTrip(post) {
    const result = new Trip(post);
    await result.save();

    return result;
}

async function getTrips() {
    return Trip.find({}).populate('owner').lean();
}

async function getTripById(id) {
    return Trip.findById(id).populate('owner').populate('buddies').lean();

}

async function getOwnerTrips(id) {
    return Trip.find({ owner: id }).lean();

}

async function editTripById(id, post) {
    const existing = await Trip.findById(id);

    existing.start = post.start;
    existing.end = post.end;
    existing.seats = post.seats;
    existing.description = post.description;
    existing.brand = post.brand;
    existing.price = post.price;
    existing.date = post.date;
    existing.time = post.time;
    existing.image = post.image;

    await existing.save();
}

async function deleteById(id) {
    await Trip.findByIdAndDelete(id);
}

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);

    if (trip.buddies.includes(userId)) {
        throw new Error('User has already joined the trip');
    }

    trip.buddies.push(userId);

    await trip.save();
}


module.exports = {
    getTrips,
    createNewTrip,
    getTripById,
    editTripById,
    deleteById,
    getOwnerTrips,
    joinTrip
}