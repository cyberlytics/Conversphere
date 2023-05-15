# Dokumentation Kommunikationsarchitektur
### REST Schnittstellen:
<ul>
        <li>A: Information für Startseite(Liste der Räume) </li>
        <li>B: Nachrichten für einen Raum</li>
        <li>C: Beitritt zu einem Raum </li>
        <li>D: Verlassen eines Raumes </li>
</ul>

##    Frontend zum Server:
A:    GET     /server/rooms

B:    POST     /server/room/{{room_id}}/message

C:    GET/POST    /server/join mit Daten im body oder als dynamische URL wie D
    
D:    GET     /server/leave/{{room_id}}/user/{{user_id}}


##    Server zum Frontend:
A:    POST    /client/rooms

B:    POST    /client/room/{{room_id}}/messages/{{user_id}}

C:    POST/GET     /client/join

D:    POST/GET   /client/leave

### JSON OBjekte:
    Room {
            - id: int
            - name: string
            - description: string
            - users: User[]
    }

    User {
            - id: int
            - nickname: string
    }

    Message {
            - id: int
            - text: string
            - user: User
            - room: Room
            - visibility: int [0:100]
    }

### Backend Klassen:
Zur Einfachheit nach möglichkeit identisch zu den JSON Objekten.

Zusätzlich: 
        Game {
                - rooms: Room[]
        }