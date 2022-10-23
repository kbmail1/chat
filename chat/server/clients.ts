
export const clients: string[] = []

export const addClient = (client: string) => {
  clients.push(client)
}

export const removeClient = (client: string) => {
  clients.splice(clients.indexOf(client), 1)
}

export const getClients = () => {
  return clients
}

export const getClient = (client: string) => {
  return clients.find(c => c === client)
}

export const clientExists = (client: string) => {
  return clients.includes(client)
}

export const getClientIndex = (client: string) => {
  return clients.indexOf(client)
}

export const getClientCount = () => {
  return clients.length
}
