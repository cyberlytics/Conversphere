export interface Room{
    id: string
    name: string
    description: string
    users: [
        {
            user_id: string
        }
    ]
}