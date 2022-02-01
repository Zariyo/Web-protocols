const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const actorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    imageurl:{
        type: String,
    }
});

module.exports = model('Actor', actorSchema);


