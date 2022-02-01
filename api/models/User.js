const { Schema, model } = require('mongoose');

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageurl:{
        type: String,
    }
});

module.exports = model('User', userSchema);
