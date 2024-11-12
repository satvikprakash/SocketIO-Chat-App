This project uses WebSockets to enable real-time communication between users in a chat application with multiple "rooms". In this system:

Rooms: The project supports multiple rooms, where each room can be seen as a separate chat space.
User Participation: Users can join multiple rooms at the same time, and interact with other users in the rooms they are part of.
Room Isolation: Communication between users is isolated to each room. Users in one room cannot communicate with users in other rooms.
Real-time Communication: All interactions (like messages) between users in a room happen instantly in real-time through WebSocket connections.
This project provides a foundation for building real-time chat applications or collaborative spaces, with the ability to scale to multiple rooms and handle simultaneous user connections.

Features
Join Multiple Rooms: A user can join as many rooms as they like and interact within them simultaneously.
Real-Time Messaging: Messages sent by users in a room are delivered to other participants in real-time.
Room Isolation: Communication is restricted to the room a user is currently in. Users cannot send messages between rooms.
WebSocket-based Architecture: Utilizes WebSockets to ensure persistent, real-time communication channels between clients and the server.

Clone this project and enter the directory where package.json file is present.
Once you're inside the directory, run the dev script for making your own changes and viewing them.
Run the dev script: npm run dev - for viewing your changes.
Run the start script: npm start - for viewing the project when its completely done.
