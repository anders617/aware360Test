
const socketCluster = require('socketcluster-client');

function handleUpdate(message) {
    console.log(message);
    console.log('Received message');
}

/**
 Constructors
 */

/**
 Creates a Message object. This is the basic form of
 what should be sent to the server for various tasks.
 */
function Message(action, payload, meta) {
    this.type = action;
    this.payload = payload;
    this.meta = meta;
}

function LoginMessage(email, password) {
    Message.call(this, 'user.login', {email: email, password: password}, {remote: true});
}

/**
 Program
 */

const socket = socketCluster.connect({
    protocol: 'https',
    hostname: 'testing.aware360.net',
    port: 443,
    secure: true,
});

socket.on('error', error => {
    console.log('error: ' + error);
    setTimeout(() => {socket.connect();}, 2000);
});

socket.on('connect', (status, callback) => {
    //console.log(status);
    console.log('Connected');
});

socket.on('updates', handleUpdate);

const globalUpdatesChannel = socket.subscribe('updates');
globalUpdatesChannel.watch(handleUpdate);

socket.emit('updates', new LoginMessage('umichtest@mailinator.com', '1234567890'));


