const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({    
    socketId: {
        required: true,
        type: String
    },
    
    userName: {
        required: true,
        type: String
    },

    room: {
        required: true,
        type: String
    }

}, { timestamps: true });


const USER = mongoose.model('user', userSchema);



// Exported to ../utils/users.js
module.exports = USER;