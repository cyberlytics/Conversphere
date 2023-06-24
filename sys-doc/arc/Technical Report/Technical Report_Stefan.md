Ausblick
Aufgrund zeitlicher Beschränkungen wird die Anwendung derzeit nicht auf AWS gehostet, sondern lokal als Docker-Container betrieben. Es ist jedoch geplant, den Docker-Container in Zukunft auf dem AWS Elastic Container Service zu hosten.
Darüber hinaus planen wir in naher Zukunft die Implementierung eines Schiebereglers zur Einstellung der Lautstärke, um die Reichweite von Nachrichten anzupassen. Abhängig von der Lautstärke wird der Radius für den Empfang oder Versand von Nachrichten entsprechend vergrößert oder verkleinert.
Des Weiteren möchten wir den "Drunk-Modus" einführen, bei dem Buchstaben zufällig vertauscht werden, um einen spielerischen Aspekt in unseren Chatraum zu integrieren.
Denkbar für die Anwendung ist auch, eine tokenbasierte Benutzerauthentifizierung zu erstellen und diese dann in unserer Datenbank abzuspeichern, um ein Benutzerprofil erstellen zu können. 


Herausforderungen während der Entwicklung

•	Detektieren der Maus-klick Position im Browser und setzten der Spieler im Spielfeld

•	Implementierung von Websockets

•	Angular standalone-component
