export interface Message {
  id: string,
  text: string,
  user_id: string,
  visibility: number,
}

export interface Messages {
  messages: Message[]
}
