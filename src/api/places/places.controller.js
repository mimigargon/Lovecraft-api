const Place = require('./places.model');

const getAllPlaces = async (req, res, next) => {
    try {
        const places = await Place.find();
        return res.status(200).json(places);
    } catch (error) {
        return next(error);
    }
}

const getPlace = async (req, res, next) => {
    try {
        const {id} = req.params;
        const place = await Place.findById(id);
        if(!place) {
            const error = new Error('No place found');
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(place);
    } catch (error) {
        return next(error);
    }
}

const postNewPlace = async (req, res, next) => {
    try {
        const newPlace = new Place(req.body);
        const placeDB = await newPlace.save();
        return res.status(201).json(placeDB);
    } catch (error) {
        return next(error);
    }
}

const putPlace = async (rreq, res, next) => {
    try {
        const {id} = req.params;
        const putPlace = new Place(req.body);
        putPlace._id = id;
        const placeDB = await Place.findByIdAndUpdate(id, putPlace);
        if(!placeDB) {
            const error = new Error('No place found');
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(placeDB);
    } catch (error) {
        return next(error);
    }
}

const deletePlace = async (req, res, next) => {
    try {
        const {id} = req.params;
        const placeDB = await Place.findByIdAndDelete(id);
        if(!placeDB) {
            const error = new Error('No place found');
            error.status = 404;
            return next(error);
        }
        return res.status(200).json(placeDB);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAllPlaces,
    getPlace,
    postNewPlace,
    putPlace,
    deletePlace
}