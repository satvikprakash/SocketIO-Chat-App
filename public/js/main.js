const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
let roomName = document.getElementById('room-name');
let listOfUsers = document.getElementById('users');

// Getting hold of the username and room from the URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


// io is obtained from the socketio script tag included in the chat.html page 
const socket = io();


// Join chatroom
socket.emit('joinRoom', { username, room });


// Message from Sever
socket.on('message', message => {
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});


// Setting Users List and Room Names
socket.on('roomUsers', ({ room, users }) => {
    roomName.innerText = room;
    
    userList = '';
    users.forEach(user => userList += `<li>${user.userName}</li>`);
    listOfUsers.innerHTML = userList;
});


// New Message Submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.msg;
    socket.emit('chat-message', message.value);
    message.value='';
});


// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
						<p class="text">${message.text}</p>`;
    
    document.querySelector('.chat-messages').appendChild(div);
}