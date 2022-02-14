# skreprCodeTest

Om het project te kunnen draaien dienen docker desktop met docker-compose geïnstalleerd te zijn.
Indien dit niet de eerste keer is dat dit project gerunt word, kan stap 1 overgeslagen worden
## Stap 1, eerste run van het project
1. Voer in de root van het project in de terminal `docker compose up --build` uit.
2. Voer hierna het volgende uit: `docker exec -it skreprcodetest-php-1 /bin/bash`. Indien dit niet werkt, zoek dan uit hoe de php docker container heet.
3. Voer nu `cd backend` uit om daarna `composer install` uit te voeren.
## Stap 2, backend api gebruiken
Via postman of een soortgelijk api testing platform kan de api getest en gebruikt worden
1. Voeg een customer toe door een post uit te voeren op de volgende url `http://backend.localhost/api/customer`. De volgende body-data kan worden meegestuurd:

| Key          | Value      |
| -------------| -----------|
| name         | Verplicht  |
| phoneNumber  | Optioneel  |
| description  | Optioneel  |

2. Om de zojuist toegevoegde customer op te kunnen halen kan er een get worden uitgevoerd op de volgende url `http://backend.localhost/api/customers/{id}`. 
Vervang {id} door het id van de zojuist toegevoegde record.
3. Om alle customers op te kunnen halen kan er een get worden uitgevoerd op de volgende url: `http://backend.localhost/api/customers/all`.
## Stap 3, frontend
Om de uitwerking van de frontend in te zien kan de volgende url in de browser geopend worden: [http://frontend.localhost](http://frontend.localhost).
