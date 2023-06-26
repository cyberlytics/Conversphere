Eine weitere wichtige Architekturentscheidung war die Verwendung von MongoDB Atlas zur Speicherung von Nachrichten und Profilen. MongoDB Atlas bietet eine skalierbare, verwaltete Datenbanklösung in der Cloud, die es ermöglicht, Daten sicher und effizient zu speichern und abzurufen. Durch die Nutzung von MongoDB Atlas können wir die Flexibilität und Leistungsfähigkeit einer NoSQL-Datenbank nutzen, um die Anforderungen an die Speicherung von Nachrichten und Profilen effektiv zu erfüllen.

Die Entscheidung, MongoDB Atlas einzusetzen, basierte auf mehreren Faktoren. Zum einen bietet MongoDB Atlas eine automatische Skalierung, die es uns ermöglicht, die Datenbankkapazität bei Bedarf anzupassen, um eine hohe Verfügbarkeit und Leistung sicherzustellen. Darüber hinaus bietet MongoDB Atlas erweiterte Sicherheitsfunktionen wie Verschlüsselung im Ruhezustand und in Bewegung sowie Zugriffskontrollen, die dazu beitragen, die Vertraulichkeit und Integrität der gespeicherten Daten zu gewährleisten.


C. Verhalten 

1. Ein Benutzer öffnet die Chat-Webseite und hat die Möglichkeit, entweder einen neuen Raum zu erstellen oder einem vorhandenen Raum beizutreten.

2. Wenn der Benutzer einen neuen Raum erstellt, wird über einen "POST"-Endpoint das API-Gateway aufgefordert, die entsprechende Funktion aufzurufen. Diese Funktion generiert einen neuen Raum und speichert ihn in der MongoDB-Datenbank ab.

3. Ein anderer Benutzer öffnet die Anwendung und tritt dem Raum bei, entweder indem er einem Link folgt oder den Raumnamen manuell eingibt.

4. Über einen "join"-Endpoint wird das API-Gateway aufgefordert, die Benutzeranzahl im Raum in der Datenbank zu aktualisieren (die Benutzer-ID wird im Raum gespeichert).

5. Alle Benutzer verwenden nun dieselbe URL, die die Raum-ID enthält, um miteinander zu interagieren.

6. Die Benutzer wählen ihre Position auf der Karte aus, bevor sie Nachrichten senden können. Diese Position wird gespeichert und für die Berechnung der Sichtbarkeit von Nachrichten verwendet.

7. Die Benutzer können Nachrichten senden, indem sie Text in das Eingabefeld eingeben und auf "Senden" klicken. Über Socket.io wird die Nachricht an den Server gesendet und in der MongoDB-Datenbank für den entsprechenden Raum und die Benutzer-ID gespeichert.

8. Beim Senden einer Nachricht kann ein Benutzer verschiedene Effekte auswählen, die die Nachricht beeinflussen, wie z.B. die Sichtbarkeitsentfernung. Dies wird durch das Frontend-Interface ermöglicht und an den Server übermittelt.

9. Der Server (Node.js) empfängt die Nachrichten und verarbeitet sie gemäß den ausgewählten Effekten. Basierend auf den Positionen der Benutzer und den Effekten wird entschieden, welche Benutzer die Nachricht sehen können und in welcher Entfernung sie sichtbar ist.

10. Die gesendete Nachricht wird über Socket.io an die entsprechenden Benutzer gesendet und im Frontend angezeigt. Die MongoDB-Datenbank wird ebenfalls aktualisiert, um den neuen Status der Nachrichten widerzuspiegeln.



A. Herausforderungen während der Entwicklung

Integration mehrerer Technologien: Die Verwendung von Angular, Node.js, Socket.io und MongoDB erforderte eine nahtlose Integration dieser verschiedenen Technologien. Es war wichtig, sicherzustellen, dass sie reibungslos zusammenarbeiten und effektiv kommunizieren. Hierbei wurden ausführliche Tests und sorgfältige Konfigurationen durchgeführt.



Skalierbarkeit und Leistung: Das Chat-Web musste in der Lage sein, mit einer wachsenden Benutzerzahl umzugehen und gleichzeitig eine gute Leistung zu gewährleisten. Durch die Nutzung von skalierbaren Diensten wie MongoDB Atlas und der Serverlogik konnte die Skalierbarkeit verbessert und eine reibungslose Benutzererfahrung gewährleistet werden.

Die Bewältigung dieser Herausforderungen erforderte eine sorgfältige Planung, umfangreiche Tests  während der Entwicklung des Chat-Webs. Durch die Kombination von Fachwissen konnten diese Herausforderungen erfolgreich gemeistert und ein hochwertiges und zuverlässiges Chat-Webprojekt entwickelt werden.

