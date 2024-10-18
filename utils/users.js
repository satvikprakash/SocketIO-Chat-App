const USER = require('../models/users');


async function userJoin(socketId, userName, room) {
    try{
        const existingUser = await USER.updateOne({ userName, room }, { socketId });
        
        if(existingUser.modifiedCount) 
            return await USER.findOne({ userName, room });

        const newUser = await USER.create({ socketId, userName, room });
        return newUser;
    }

    catch(err) {
        console.log(err);

        return null;
    }
};


async function getCurrentUser(socketId) {
    try {
        const currentUser = await USER.findOne({ socketId });

        return currentUser;
    }

    catch(err) {
        console.log(err);

        return null;
    }
}


async function getAllUsers(room) {
    try {
        return await USER.find({ room });
    }

    catch(err) {
        console.log(err);

        return null;
    }
}

async function userLeave(socketId) {
    const user = await USER.deleteOne({ socketId});
};


// Exported to ../server.js
module.exports = {
    userJoin,
    getCurrentUser,
    getAllUsers,
    userLeave
};