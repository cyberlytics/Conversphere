export interface Message {
  id: string | null, // auto gegeben durch mongoose
  text: string,
  user_id: string,
  visibility: number | null // nicht in db
}
