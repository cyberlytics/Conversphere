<a> Dokumentation Kommunikationsarchitektur </a>

<b> REST Schnittstellen: </b>
<ul>
        <li>A: Information für Startseite(Liste der Räume) </li>
        <li>B: Nachrichten für einen Raum</li>
        <li>C: Beitritt zu einem Raum </li>
        <li>D: Verlassen eines Raumes </li>
</ul>

###    Frontend zum Server:
<ul>
        <li>A: GET     /server/rooms</li>
        <li>B: GET     /server/room/{{room_id}}/message</li>
        <li>C: GET/POST    /server/join mit Daten im body oder als dynamische URL wie D</li>
        <li>D: GET     /server/leave/{{room_id}}/user/{{user_id}}</li>
</ul>


###    Server zum Frontend:
<ul>
        <li>A: POST    /client/rooms</li>
        <li>B: POST    /client/room/{{room_id}}/messages/{{user_id}}</li>
        <li>C: POST/GET     /client/join</li>
        <li>D: POST/GET   /client/leave</li>
</ul>

<b> JSON Objekte : </b>

        Room {
                - room_id: int
                - name: string
                - description: string
                - userlist_id: int[]                    // Liste der User IDs
        }

        User {
                - user_id: int
                - nickname: string
        }

        Message {
                - id: int                               // ID der Nachricht
                - message_text: string                  // Nachrichtentext
                - user_id: int                          // Autor der Nachricht
                
                - visibility: int [0:100]               // Sichtbarkeit der Nachricht

      }

<warning> Möglicherweise Notwendig: </warning>

        Message {
                - receiver_user_id: int                 // Empfänger der Nachricht 
                                                        // (wird aus URL entnommen, im JSON nicht notwendig?)
                - room_id: int                          // Raum der Nachricht 
                                                        // (wird aus URL entnommen, im JSON nicht notwendig?)

              }

<info> Weitere Mögliche Ergänzungen: </info>

        Message {
                - timestamp: int                        // Zeitstempel der Nachricht
        }

<b> Backend Klassen: </b>

Zur Einfachheit nach möglichkeit identisch oder ähnlich zu den JSON Objekten.
        Game {
                - rooms: Room[]
                - users: User[]
        }

        Room {
                - room_id: int
                - name: string
                - description: string
                - userlist_id: int[]   // Liste der User IDs
        }

        User {
                - user_id: int
                - nickname: string
        }

        Message {
                - id: int                               // ID der Nachricht
                - message_text: string                  // Nachrichtentext
                - user_id: int                          // Autor der Nachricht
                - visibility: int [0:100]               // Sichtbarkeit der Nachricht
                - room_id: int                          // Raum der Nachricht (wird aus URL entnommen)
        }

<info> Weitere Mögliche Ergänzungen: </info>

        Message {
                - timestamp: int                       // Zeitstempel der Nachricht
        }

Weitere Klassen sind möglich, aber nicht zwingend notwendig.

        //Falls es User-Rollen oder Datentypen gibt die zum User gehören aber nicht in diesen gespeichert werden sollen

        UserStore {     
                - users: User[]
                ...
        }




<style>
a { 
        color: rgb(110, 164, 198);
        font-weight: bold;
        font-size: 30px 
        }
b { 
        color: rgb(139, 207, 250);
        font-size: 20px  
        }
info {     
        color: orange 
        }
warning {  
        color: red 
        }
</style>