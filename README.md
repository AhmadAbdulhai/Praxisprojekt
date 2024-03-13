
# Praxisprojekt: Task-List App mit Microservices

## Autor: Ahmad Abdulhai

### Ziel des Projekts

Das Ziel dieser Arbeit ist die Demonstration der praktischen Umsetzung von Microservices durch die Entwicklung einer realen Anwendung. Hierbei wird aufgezeigt, wie durch den Einsatz von Microservices eine Anwendung geschaffen werden kann, die sich durch Modularität, Skalierbarkeit und Wartbarkeit auszeichnet.

Im Fokus steht eine Task-List App, als Beispiel zur Implementierung dieser Technologie, um zu verdeutlichen, wie Microservices in der Softwareentwicklung eingesetzt werden können, um robuste Systeme zu bauen. Die Tasklist-App ermöglicht das einfache Erstellen, Bearbeiten und Verwalten von Aufgaben, ergänzt durch Benutzerlogin und -registrierung.

### Voraussetzungen

- Docker und Docker Compose müssen auf Ihrem System installiert sein.
- Grundlegende Kenntnisse über Docker, Docker Compose und Microservices.

### Anwendung starten

Um die Task-List App zu starten, führen Sie die folgenden Schritte aus:

1. **Images bauen**

   Bauen Sie die Docker-Images für die verschiedenen Services der Anwendung:

   ```sh
   docker build -t userservice:latest ./UserService
   docker build -t taskservice:latest ./TaskService
   docker build -t frontend:latest ./Frontend
   ```

2. **Docker Swarm erzeugen**

   Initialisieren Sie Docker Swarm, falls noch nicht geschehen:

   ```sh
   docker swarm init
   ```

3. **Container starten**

   Starten Sie die Anwendung mit Docker Stack:

   ```sh
   docker stack deploy -c docker-compose.yml tasklist
   ```

4. **Anwendung aufrufen**

   Die Anwendung kann unter der folgenden URL aufgerufen werden: [http://localhost](http://localhost)

### Anwendung verwalten

- **Container löschen**

  Um die Anwendung und alle dazugehörigen Services zu entfernen:

  ```sh
  docker stack rm tasklist
  ```

- **Ausfall des UserService simulieren**

  Um den Ausfall des UserService zu simulieren, skalieren Sie den Service auf 0:

  ```sh
  docker service scale tasklist_userservice=0
  ```

- **UserService wiederherstellen**

  Um den UserService wiederherzustellen, skalieren Sie den Service zurück:

  ```sh
  docker service scale tasklist_userservice=2
  ```

