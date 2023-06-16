export interface Message {
  id: string, // auto gegeben durch mongoose
  text: string,
  user_id: string,
  visibility: // nicht in db
}
