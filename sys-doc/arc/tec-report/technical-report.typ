#import "template.typ": *

// Take a look at the file `template.typ` in the file panel
// to customize this template and discover how it works.
#show: project.with(
  title: "Conversphere",
  authors: (
    (name: "Feil Lukas", email: "l.feil@oth-aw.de", affiliation: "OTH Amberg-Weiden", postal: "Bad Kötzting, Deutschland"),
    (name: "Markus Fleischmann", email: "m.fleischmann2@oth-aw.de", affiliation: "OTH Amberg-Weiden", postal: "Wernberg-Köblitz, Deutschland"),
    (name: "Stefan Reger", email: "s.reger@oth-aw.de", affiliation: "OTH Amberg-Weiden", postal: "Schwarzenfeld, Deutschland"),
    (name: "Lukas Rupp", email: "l.rupp@oth-aw.de", affiliation: "OTH Amberg-Weiden", postal: "Amberg, Deutschland"),
    (name: "Sorel Tahata Djoumsi", email: "s.tahata-djoumsi@oth-aw.de", affiliation: "OTH Amberg-Weiden", postal: "Regensburg, Deutschland"),
  ),
  // Insert your abstract after the colon, wrapped in brackets.
  // Example: `abstract: [This is my abstract...]`
  abstract: [hier sollte ein abstract stehen],
)


= Einführung

= Mission statement
Conversphere ist eine Web Chat-Anwendung, die es
Benutzern ermöglicht, miteinander über Textnachrichten zu
kommunizieren. Dadurch wird ein sicherer Raum geschaffen
in welchem man seine Gedanken und Ideen teilen kann und
gleichzeitig sozial distanziert bleibt. Benötigt wird dafür
lediglich ein Gerät mit Webbrowser und ein Internetzugang.
== Kontextabgrenzung
Die Anwendung wird im Rahmen einer Studienarbeit an der Oth Amberg-Weiden erstellt. Die Anwendung ist zu lern und Testzwecken gedacht und wird nicht kommerziell genutzt. Es soll die Möglichkeit gebotten werden die Andwendung in Zukunft bei persöhnlichem Interesse weiterzuentwickeln.

== Qualitätsziele
=== Gute Benutzbarkeit:
- Conversphere ist für Benutzer aller Altersklassen intuitiv und ohne Erklärung bedienbar.

=== Hohe Zuverlässigkeit:
- Das System steht den Spielern jederzeit zur Verfügung und stellt Chaträume live dar.
- Gute Wartbarkeit Conversphere ist ohne großen Administrationsaufwand betreibbar und leicht um zusätzliche Features erweiterbar.
- Die Funktionen der Anwendung sind durch Tests geprüft und funktionieren wie erwartet.

== Rahmenbedingungen
Zeitlicher Rahmen Das Projekt ist innerhalb von fünf Kalenderwochen abzuschließen.

Technischer Anspruch:
- Das Projekt muss mindestens einen der Themenbereiche Web-Anwendung oder Cloud-Computing abdecken.
- Die Anwendung soll so einfach gehalten werden, dass sie im gegebenen Zeitraum umgesetzt werden kann.

= Umsetzung

== Architekturentscheidung

Bei der Umsetzung der Conversphere-Webanwendung haben wir uns für eine Web-Anwendung entschieden, um eine breite Zugänglichkeit über verschiedene Geräte und Plattformen hinweg zu gewährleisten. Dabei setzen wir die leistungsfähige und moderne Programmiersprache TypeScript ein, die uns eine einfache und typsichere entwicklung ermöglicht. 

Um die Entwicklung der Benutzeroberfläche zu vereinfachen und eine hohe Benutzerfreundlichkeit zu gewährleisten, verwenden wir das Angular Framework. Angular bietet uns eine strukturierte und komponentenbasierte Architektur, die es uns ermöglicht, die Anwendung in logisch getrennte Teile aufzuteilen und somit den Entwicklungsprozess zu vereinfachen.

Für die Datenverwaltung setzen wir die MongoDB Datenbank ein. MongoDB ist eine dokumentenorientierte Datenbank, die uns Flexibilität und Skalierbarkeit bietet. Durch die Integration der MongoDB in unsere Anwendung können wir Daten effizient speichern und abrufen, um eine reibungslose Kommunikation zwischen den Benutzern zu gewährleisten.

Bei der serverseitigen Entwicklung nutzen wir das leistungsstarke Node.js Framework. Node.js ermöglicht uns die Entwicklung von serverseitigem Code in JavaScript und bietet eine effiziente und skalierbare Plattform für die Ausführung unserer Webanwendung.

Zusätzlich verwenden wir das Express.js Framework, das auf Node.js aufbaut und uns eine einfache und effektive Art der Entwicklung von Webanwendungen ermöglicht. Express.js bietet uns eine Vielzahl von Funktionen und Erweiterungen, die uns helfen, einen robusten und sicheren Webserver für unsere Anwendung bereitzustellen.

Damit die Conversphere-Webanwendung Echtzeitkommunikation unterstützen kann, integrieren wir das Socket.io Framework. Socket.io ermöglicht es uns, Websockets zu implementieren und eine zuverlässige bidirektionale Echtzeitkommunikation zwischen den Benutzern herzustellen. Dadurch können die Benutzer in Echtzeit Nachrichten austauschen und interaktiv miteinander kommunizieren. Zusätzlich zu der Kommunikation über Socket.io wurde auch noch eine REST-Schnittstelle verwendet, um Anfragen an das Backend zu senden.

Durch die geschickte Kombination dieser Technologien und Frameworks schaffen wir eine leistungsfähige und benutzerfreundliche Webanwendung, die es den Benutzern ermöglicht, sicher und effizient miteinander zu kommunizieren. Die Umsetzung in TypeScript, die Verwendung von Angular, MongoDB, Node.js, Express.js und Socket.io ermöglichen es uns, eine hochwertige und skalierbare Lösung zu entwickeln, die den Anforderungen der Conversphere-Webanwendung gerecht wird.

Um eine detaillierten Einblick in die Funktionalität des Express-Servers zu erhalten, werden nachfolgend die REST-Schnittstelle und die Websocket-Endpoints kurz beschrieben.

== Beschreibung der REST-Schnittstelle

Die REST-Schnittstelle dient zur Bereitstellung einer Kommunikationsschiene für die Anfragen, welche nicht für die Funktionalität des Chat-Services benötigt werden, beispielsweise das Erstellen von Räumen.
Die Schnittstelle stellt 3 Endpunkte bereit:
=== GET /api/rooms:

Unter diesem Endpunkt kann eine List mit den akutellen Räumen abgerufen werden.

=== POST /api/createRoom

Über diesen Endpunkt kann ein neuer Raum mit einem neuem Namen erstellt werden.

=== POST /api/join

Über diesen Endpunkt kann einem bestehenden Raum beigetreten werden. Als Response wird das User-Objekt gesendet, mit welchem der Aufrufer im Chat-Room identifiziert wird. Mit diesem kann anschließend die Socket.io-Verbindung initiiert werden.

== Beschreibung der Socket.io-Schnittstelle

Diese Schnittstelle dient zur bidirektionalen Echtzeitkommunikation zwischem dem Server und der Webseite. Folgende Endpunkte sind für diese Schnittstelle definiert:

=== ws/rooms/{roomId}/messages

Dieser Kanal wird verwendet, um über neue Nachrichten im Chat-Room zu informieren. Das Backend hört dabei auf Nachrichten mit dem Topic "sendNewMessage". Über diese kann das Frontend neue Nachrichten vom Nutzer an das Backend senden. Dort wird diese Nachricht verabeitet und an die anderen Nutzer weitergesendet.
Das Weitersenden der Nachrichten geschieht über Nachrichtem mit dem Topic "receiveNewMessage". Bei diesen Nachrichten wird die anzuzeigenden Nachricht mit der entsprechenden Sichtbarkeit an jeden einzelnen Nutzer in dem Raum gesendet.

=== ws/rooms/{roomId}/users

Dieser Kanal wird verwendet, um Nutzer bezogenen Nachrichten zwischen dem Frontend und dem Backend auszutauschen. Das Backend kann über eine Nachricht mit dem Topic "userInformation" eine akutelle Liste aller Nutzer in dem Chatraum mit deren akutellen Position an alle Nutzer in dem Raum zu senden. Dies wird beispielsweise gemacht, wenn ein neuer Nutzer den Raum betreten hat oder sich ein Status eines Nutzer im Raum verändert hat. Damit das Frontend das Backend über eine Änderung des Nutzer informieren kann, sind dafür zwei Topics definiert: "leaveRoom" und "positionUpdate".
Mittels "leaveRoom" kann ein Nutzer einen akutellen Chatraum verlassen. "positionUpdate" informiert das Backend über einen Positionswechsel des Nutzers. In beiden Fällen wird die akutelle Nutzerinformation über das Topic "userInformation" an alle Nutzer im Raum verteilt. 


= Herausforderungen während der Entwicklung
Während der Entwicklung der Conversphere-Webanwendung traten verschiedene Herausforderungen auf, die es zu bewältigen galt. Eine dieser Herausforderungen bestand darin, die Position eines Mausklicks im Browser zu erfassen und die Spieler entsprechend im Spielfeld zu platzieren. Die genaue Erfassung der Mausposition und die korrekte Umsetzung im Spielfeld erforderten eine umrechnung ausgelesenen Positionen im Verhältins zum Spielfeld, welche sich durch die Größe des Browserfensters verändert. Dadurch muss zusätzlich die Größe des Browserfensters erfasst werden, um die Mausposition korrekt umrechnen zu können. Außerdem muss die Position der Spieler im Spielfeld in Abhängigkeit von der Größe des Browserfensters angepasst werden und bei einer änderung der Fenstergröße neu berechnet werden.

Die Umsetztung des Chats war zunächst nicht wie gewünscht möglich. Die Nachrichten wurden nicht in Echtzeit übertragen und die Kommunikation zwischen den Benutzern war nicht möglich. Um dies zu beheben, musste die Kommunikation zwischen den Benutzern über Websockets realisiert werden. Websockets ermöglichen eine Echtzeitkommunikation zwischen den Benutzern und sind entscheidend für die sofortige Übertragung von Nachrichten im Chat. Es erforderte ein gründliches Verständnis der Websocket implementierung von Socket.io und eine effiziente Integration in die Anwendung, um eine zuverlässige und stabile Kommunikation zu gewährleisten.

Das Durchführen von Angular-Komponententests gestaltete sich ebenfalls als Herausforderung. Das Testen der einzelnen Komponenten unabhängig voneinander erforderte ein tiefes Verständnis der Angular-Testwerkzeuge und -methoden. Es war notwendig, geeignete Testfälle zu entwickeln, um sicherzustellen, dass die Komponenten korrekt funktionieren und mögliche Fehler oder Schwachstellen identifiziert werden können.

Eine weitere Herausforderung bestand darin, die MongoDB-Datenbank anzusprechen und effizient mit ihr zu interagieren. Die Integration der Datenbank erforderte das Schreiben geeigneter Abfragen und die Beherrschung der Datenbank-APIs. Die korrekte Handhabung von Datenzugriff und -manipulation sowie die Gewährleistung einer effizienten Datenbankperformance waren entscheidend für eine reibungslose Funktion der Anwendung.

Trotz dieser Herausforderungen haben wir uns intensiv mit den technischen Anforderungen auseinandergesetzt und kreative Lösungen gefunden, um diese Hindernisse zu überwinden. Durch sorgfältige Planung, Zusammenarbeit im Team und eine iterative Entwicklung konnten wir letztendlich die gewünschten Funktionen erfolgreich umsetzen und eine hochwertige Conversphere-Webanwendung bereitstellen.



= Architektur
== Architekturdiagramm






= Fazit und Ausblick
== Fazit

== Ausblick
Aufgrund zeitlicher Beschränkungen wird die Anwendung derzeit nicht auf AWS gehostet, sondern lokal als Docker-Container betrieben. Es ist jedoch geplant, den Docker-Container in Zukunft auf dem AWS Elastic Container Service zu hosten.
Darüber hinaus planen wir in naher Zukunft die Implementierung eines Schiebereglers zur Einstellung der Lautstärke, um die Reichweite von Nachrichten anzupassen. Abhängig von der Lautstärke wird der Radius für den Empfang oder Versand von Nachrichten entsprechend vergrößert oder verkleinert.
Des Weiteren möchten wir den "Drunk-Modus" einführen, bei dem Buchstaben zufällig vertauscht werden, um einen spielerischen Aspekt in unseren Chatraum zu integrieren.
Denkbar für die Anwendung ist auch, eine tokenbasierte Benutzerauthentifizierung zu erstellen und diese dann in unserer Datenbank abzuspeichern, um ein Benutzerprofil erstellen zu können. 

