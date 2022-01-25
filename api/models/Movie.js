const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: Array,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    director:{
        type: String,
        required: true,
    },
    scores:{
        type: Array,
    },
    imageurl:{
        type: String,
    }
});

module.exports = model('Card', cardSchema);


