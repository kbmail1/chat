const SOCKET_PORT = 3000
const REST_PORT = 3001

const io = require('socket.io')(SOCKET_PORT);
import express from 'express';
import { compression } from 'compression';
import { Subscriber, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import * as util from './util';
import bodyParser from 'body-parser';

// import { rooms }  from './rooms';
// import { users } from './users';
// import { usersInRoom } from './usersInRoom';

export interface IMsg {
    text: string
    uuid: string
}
const defaultRoom = 'defaultRoom';
const userUuids: string[] = []
const userSockets: any[] = []

const app = express()
const router = express.Router()
// app.use(compression({}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())


const obj = util.getRoomsAndUsers() // this is a synchronous call
let rooms = obj.rooms
let users = obj.users
console.log('rooms', rooms)
console.log('users', users)

export const createRoom = (roomName: string) => {
    util.createRoom(roomName)
}
export const deleteRoom = (roomName: string) => {
    util.deleteRoom(roomName)
}

export const createUser = (userName: string) => {
    util.createUser(userName)
}
export const deleteUser = (userName: string) => {
    util.deleteUser(userName)
}
export const getUser = (userName: string) => {
    util.getUser(userName)
}
export const getRoom = (roomName: string) => {
    util.getRoom(roomName)
}

app.listen(REST_PORT, () => {
    console.log(`listening for REST requests on ${REST_PORT} port`)
    router.use(express.urlencoded({ extended: true }))
    router.use(express.json())
})

// Listeners for REST requests

app.get('/', (req, res) => {
    res.send('Hello World!').status(200)
})

app.get('/rooms', (req, res) => {
    console.log('in rooms')
    res.send(rooms).status(200)
})

app.get('/room/:roomName', (req, res) => {
    console.log('in rooms')
    const roomName = req.params.roomName
    console.log(`roomName: ${roomName}`)
    const x = util.getRoom(roomName)
    if (typeof x === 'undefined') {
        res.send('room not found').status(404)
    }
    // TODO: am creating new uuid. should store and use those from within data.json
    const uuid = util.generateUUID()
    res.send({ room: roomName, uuid }).status(200)
})

app.post('/room', (req, res) => {
    let body = req.body;
    const name = body['name']
    const uuid = util.generateUUID()
    util.createRoom(name)
    res.send({ name, uuid }).status(200)
})

app.delete('/room', (req, res) => {
    let body = req.body;
    const name = body['name']
    const uuid = util.generateUUID()
    util.deleteRoom(name)
    res.send({ name, uuid }).status(200)
})

app.get('/users', (req, res) => {
    console.log('in users')
    console.log(`****** users: ${users}`)
    res.send(users).status(200)
})

app.get('/user/:userName', (req, res) => {
    console.log('in users')
    const userName = req.params.userName
    console.log(`roomName: ${userName}`)
    const x = util.getUser(userName)
    if (typeof x === 'undefined') {
        res.send('user not found').status(404)
    }
    // TODO: am creating new uuid. should store and use those from within data.json
    const uuid = util.generateUUID()
    res.send({ user: userName, uuid }).status(200)
})

app.post('/user', (req, res) => {
    let body = req.body;
    const name = body['name']
    const uuid = util.generateUUID()
    util.createUser(name)
    res.send({ name, uuid }).status(200)
})

app.delete('/user', (req, res) => {
    let body = req.body;
    const name = body['name']
    const uuid = util.generateUUID()
    util.deleteUser(name)
    res.send({ name, uuid }).status(200)
})

// Listeners for socket.io
io.on('connection', (userSocket: any) => {
    addUser(userSocket, defaultRoom)
    registerMsgExchange(userSocket)
    console.log(`listening for Websocket connection requests on ${SOCKET_PORT} port`)
})

io.on('disconnect', (userSocket: any) => {
    removeUser(userSocket)
})

export const registerMsgExchange = (userSocket: any) => {
    userSocket.on('chat-message', (data: any) => {
        // if new user add it to list of users
        console.log('Server received this IMsg', JSON.parse(data) as IMsg)
        // send message to all users (excluding sender)
        userSocket.broadcast.emit('chat-message', data)
    })
}

// new user request.  Create uuid, and send back to user.
export const addUser = (userSocket: any, room: string = defaultRoom) => {
    // save and join default room.
    console.log('New user connected')
    userSockets.push(userSocket)
    userSocket.join(room)

    const uuid = util.generateUUID()
    userUuids.push(uuid)
    io.to(defaultRoom).emit('uuid', JSON.stringify({
        text: `Hello,  ${uuid}`,
        uuid,
    }))
}

export const removeUser = (userSocket: any) => {
    console.log('user disconnected')
    userSockets.splice(userSockets.indexOf(userSocket), 1)
}
