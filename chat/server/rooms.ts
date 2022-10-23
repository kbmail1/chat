export const rooms: string[] = [ ]

export const addRoom = (room: string) => {
  rooms.push(room)
}

export const removeRoom = (room: string) => {
  rooms.splice(rooms.indexOf(room), 1)
}

export const getRooms = () => {
  return rooms
}

export const getRoom = (room: string) => {
  return rooms.find(r => r === room)
}

export const roomExists = (room: string) => {
  return rooms.includes(room)
}

export const getRoomIndex = (room: string) => {
  return rooms.indexOf(room)
}

export const getRoomCount = () => {
  return rooms.length
}
