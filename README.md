# SUPER MARIA SIS - Abgabe PRIMA

Link zum Spiel: https://lichtfarbenspiel.github.io/MariaBros/Platformer/

Link zum Code: https://github.com/Lichtfarbenspiel/MariaBros/tree/master/Platformer

Link zu den Design-Dokumenten: https://github.com/Lichtfarbenspiel/MariaBros/tree/master/Documentation

## Anleitung
Steuerung Links/Rechts: Pfeiltasten Rechts und Links oder A/D Tasten.
Springen: Leertaste
Gegner attackieren: Pfeil nach oben/ W Taste

Sound und Musik AN/AUS im Menü unter "Settings"

Eine kurze Anleitung findet man auch nochmal im Menü unter "Story"


## Known Issues
- Position von Platform Collider teilweise nicht ganz exakt


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | SUPER MARIA SIS
|    | Name                  | Salome Dieterle
|    | Matrikelnummer        | 259263
|  1 | Nutzerinteraktion     | Im Menü hat der Nutzer die Möglichkeit Einstellungen vorzunehmen (Ton ein- oder ausschalten), außerdem kann er einen kleinen Einblick in die Hintergrund Geschichte bekommen. Über den Start-Button wird in das Spiel gewechselt. Hier steuert der Nutzer die Hauptfigur Maria und muss sie durch die Welt bis zum Ziel führen. Dabei kann der Nutzer verschiedene Münzen einsammeln und gegen giftige Frösche kämpfen.                                                                                                                     |
|  2 | Objektinteraktion     | Durch einfaches "Berühren" der Münzen werden diese eingesammelt und dem Nutzer wird der jeweils entsprechende Wert gut geschrieben oder er verliert Punkte - je nach Item. Hierbei wird die Entfernung der beiden Objekte (Item und Figur) berechnet und bei einem festgelegt Wert als Kollision betrachtet. Bei der Kollision mit den gegnerischen Fröschen verliert der Nutzer eines seiner Leben. Es kann auch vorkommen, dass direkt alle Drei leben verloren gehen, je nach Kollision. Attackiert befindet sich der Nutzer im Attakier-Modus während einer solchen Kollision, so wird der Gegner entfernt und kann ihm keinen Schaden mehr zufügen. Zusätzlich erhält der Nutzer einige Punkte dafür. Fällt die Figur zu tief ins Wasser, d.h kollidiert die Figur mit einer für die Kamera nicht sichtbaren Platform unterwasser, so verliert sie direkt alle verbleibenden Leben. Allerdings kann der Nutzer Maria auch mit Hilfe der Steuerung wieder aus dem Wasser retten oder gezielt darin "schwimmen". Hat der Nutzer weniger als Drei Leben kann über grüne Kristalle ein weiteres Leben dazugewonnen werden. Außerdem wird ständig auf Kollision mit den Platformen, sowie bestimmten Objekten geprüft. Hierbei Kann die Figur nicht durch diese Hindurch dringen und bleibt oben drauf stehen. Ausgenommen beim Wasser, hier wird die fallende Figur nicht aufgehalten. Bei den Gegnern wird außerdem überprüft, ob diese sich noch auf der Platform befinden. Ist das Ende erreicht, wechselt dieser die Richtung.                                                                                                                                                 |
|  3 | Objektanzahl variabel | Kollidiert die Figur mit einer Box/ springt sie auf sie drauf, so wird für die jeweilige Box einmalig eine zufällige Anzahl an weiteren Münzen generiert.                                                                                                                           |
|  4 | Szenenhierarchie      | Die "game" Node stellt den Ursprung dar. An diese sind alle Objekte als Child Nodes angehangen. Denen wiederum Kinder angehängt sein können. Beispielsweise die Gegner, Collectables oder Platformen (level)..                                                                                                                                                           |
|  5 | Sound                 | Im Hintergrund läuft ein Lied, welches im Hauptmenü aus gestellt werden kann. Zudem unterstützen einzelne Sounds das Spielerlebnis. Ein Klirren beim einsammeln der Münzen, ein Geräusch beim Sprung, bei einer Attacke oder auch bei der Kollision mit einem Gegner.                                                            |
|  6 | GUI                   | Bei Programmstart gelangt der Nutzer in das Hauptmenü. Hier kann er die Sounds und Musik ein- bzw. ausschalten. Außerdem findet er hier noch eine kurze Information zur Story und eine kleine Anleitung zur Steuerung. Im Spiel selbst sieht der Nutzer immer den aktuellen Gesundheitsstand und Score im linken oberen Eck des Spielfensters. Bei Beendigung des Levels (aktuell nur eins) oder bei Gameover wird dem Nutzer nochmal eine kleine Statistik gezeigt, bevor er über einen Button wieder zum Menü zurückkehren kann.                                                                                   |
|  7 | Externe Daten         | Bisher werden die Daten der Gegner aus einer externen Datei geladen. Mittels dieser Daten werden dann die verschiedenen Gegner erzeugt. Der Vorteil dabei ist, dass man nicht den Programmcode ändern muss, sollte eine Änderung der (in diesem Fall nur die Gegner) Objektattribute gewünscht sein.                                                                                  |
|  8 | Verhaltensklassen     | Die Character Klasse beinhaltet von Spieler und Gegner gemeinsam genutzte Methoden und Attribute. Hier wid beispielsweise die Platformkollision berechnet oder das Verhalten bei einer Kollision mit anderen Charakteren festgelegt. Auch die Funktion die das Ertrinken überprüft ist in der Character Klasse zu finden. In den Klassen des Spielers und der Gegner finden sich Funktionen zur Animation der Sprites, so auch in der Klasse der Collectables. In der Sound Klasse werden sowohl Musik als auch die Sounds gesteuert.                                                             |
|  9 | Subklassen            | Die meisten Klassen sind Subklassen von Node, die Klassen Character und Collectables sind Subklassen von NodeSprite. Player und Enemy erben wiederum von der Character Klasse. Die Kollisionsabfragen dieser beiden Klassen sind jedoch recht unterschiedlich, darum wird nur die Plattform-Kollisionsprüfung in der Vaterklasse durchgeführt. Außerdem hat die Player-Klasse zudem die Funktion um Gegenstände ein zu sammeln. |
| 10 | Maße & Positionen     | Der Koordinaten Ursprung sitzt recht weit Links der Welt auf mittlerer Höhe. Es gibt also die Köglichkeit auch ein Stück weit nach Links zu gehen. Ansonsten ist die Welt nach rechts entlang der X-Achse gerichtet. Nach unten kann nur bis zu einem gewissen Punkt gegangen werden. Die Kamera ist auf Höhe des Ursprungs plaziert und bewegt sich mit der Figur entlang der x-Achse, in einem fest definierten Rahmen, mit.                                                              |
| 11 | Event-System          | Durch Tastendruck werden Events gefeuert um das Spielgeschehen zu steuern. Bei jedem Loop werden die Update Funktion und die einzelnen Update Methoden verschiedener Klassen aufgerufen. So werden beispielsweise in jedem Loop die verschiedenen Kollisionen überprüft.                                                                                                                                                                                |

## Abgabeformat
* Fasse die Konzeption als ein wohlformatiertes Designdokument in PDF zusammen!
* Platziere einen Link in der Readme-Datei deines PRIMA-Repositories auf Github auf die fertige und in Github-Pages lauffähige Anwendung.
* Platziere ebenso Links zu den Stellen in deinem Repository, an denen der Quellcode und das Designdokument zu finden sind.
* Stelle zudem auf diese Art dort auch ein gepacktes Archiv zur Verfügung, welches folgende Daten enthält
  * Das Designdokument 
  * Die Projektordner inklusive aller erforderlichen Dateien, also auch Bild- und Audiodaten
  * Eine kurze Anleitung zur Installation der Anwendung unter Berücksichtigung erforderlicher Dienste (z.B. Heroku, MongoDB etc.) 
  * Eine kurze Anleitung zur Interaktion mit der Anwendung

## GameZone
Wenn Du dein Spiel bei der Dauerausstellung "GameZone" am Tag der Medien sehen möchtest, ergänze folgendes  
* Einen Ordner mit zwei Screenshots der laufenden Applikation in den Größen 250x100 und 1920x400 pixel sowie ein Textdokument mit den Informationen:
* Titel
* Autor
* Jahr und Semester der Entwicklung (Sose, Wise)
* Studiensemester
* Lehrplansemester
* Studiengang
* Veranstaltung im Rahmen derer die Entwicklung durchgeführt wurde
* betreuender Dozent
* Genre des Spiels
* ggf. passende Tags/ Schlagwörter zu dem Spiel
* Untertitel (max 40 Zeichen), der Menschen zum Spielen animiert
* Kurzbeschreibung (max 250 Zeichen), die kurz erklärt wie zu spielen ist
* Erklärung, dass die Fakultät Digitale Medien die Anwendung bei Veranstaltungen, insbesondere am Tag der Medien, mit einem expliziten Verweis auf den Autor, vorführen darf.
