const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const logSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
    loginDate: {
        type: Date,
        required: true,
    },
});

module.exports = model('Log', logSchema);


