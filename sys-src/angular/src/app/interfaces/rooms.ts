export interface Rooms {
  room : Room[]
}

export interface Room {
  id: string,
  name: string,
  description: string
  //Users: User[]   // Nur in DB und Server
}
