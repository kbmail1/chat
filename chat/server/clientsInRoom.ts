import { rooms } from './rooms'
import { clients } from './clients'

export const clientsInRoom = new Map<string, string[]>()

export const addClientToRoom = (room: string, client: string) => {
  const clients = clientsInRoom.get(room)
  if (!clients!.includes(client)) {
    clients.push(client)
  } else {
    clientsInRoom.set(room, [client])
  }
}

export const removeClientFromRoom = (room: string, client: string) => {
  const clients = clientsInRoom.get(room)
  clients!.splice(clients!.indexOf(client), 1)
}

export const getClientsInRoom = (room: string) => {
  return clientsInRoom.get(room)
}

export const getClientInRoom = (room: string, client: string) => {
  return clientsInRoom.get(room)!.find(c => c === client)
}

export const clientInRoomExists = (room: string, client: string) => {
  return clientsInRoom.get(room)!.includes(client)
}

export const getClientIndexInRoom = (room: string, client: string) => {
  return clientsInRoom.get(room)!.indexOf(client)
}

export const getClientCountInRoom = (room: string) => {
  return clientsInRoom.get(room)!.length
}
