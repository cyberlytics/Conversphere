export interface Users {
    users : User[]
  }

  export interface User {
    id: string,
    nickname: string,
    position:{
      x: number,
      y: number
    }
  }
