import fs from 'fs'

const dataFile = './data.json'

export const generateUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

let users: string[] | undefined = undefined
let rooms: string[] | undefined = undefined

// how to make it atomic and avoid race conditions?
export const getRoomsAndUsers = ()  => {
    if (!users && !rooms) {
        const data = fs.readFileSync(dataFile, 'utf8')
        rooms = JSON.parse(data).rooms
        users = JSON.parse(data).users
        console.log(rooms)
        console.log(users)
    }

    return { rooms, users }
}

export const deleteRoom = (roomName: string): string[] => {
    const { rooms, users } = getRoomsAndUsers()
    console.log('rooms before filter:', rooms)
    const r = rooms.filter(room => room !== roomName)
    console.log('rooms after filter:', r)
    fs.writeFileSync(dataFile, JSON.stringify({ rooms: r, users }))
    return r
}

export const deleteUser = (userName: string): string[] => {
    const { rooms, users } = getRoomsAndUsers()
    console.log('users before filter:', users)
    const u = users.filter(user => user !== userName)
    console.log('users after filter:', u)
    fs.writeFileSync(dataFile, JSON.stringify({ rooms, users: u }))
    return u
}

export const createUser = (userName: string) => {
    const { rooms, users } = getRoomsAndUsers()
    // deduplicate users

    console.log(`initial users:  ${ users }`)
    console.log(`adding user ${userName}`)
    users.push(userName)
    const uniqueUsers = [...new Set(users) ]
    console.log('util: create users: writing: ${rooms}, ${users}')
    fs.writeFileSync('./data.json', JSON.stringify({ rooms, users: uniqueUsers }))
}

export const createRoom = (roomName: string) => {
    const { rooms, users } = getRoomsAndUsers()
    // deduplicate rooms

    console.log(`initial rooms:  ${ rooms }`)
    console.log(`adding room ${roomName}`)
    rooms.push(roomName)
    const uniqueRooms = [...new Set(rooms) ]
    console.log('util: create rooms: writing: ${rooms}, ${users}')
    fs.writeFileSync('./data.json', JSON.stringify({ users, rooms: uniqueRooms }))
}

export const getRoom = (roomName) => {
    const { rooms, users } = getRoomsAndUsers()
    let r = rooms.filter(room => room === roomName)
    return r.length > 0 ? r[0] : undefined
}

export const getUser = (userName) => {
    const { rooms, users } = getRoomsAndUsers()
    let u = users.filter(user => user === userName)
    return u.length > 0 ?  u[0] : undefined
}
