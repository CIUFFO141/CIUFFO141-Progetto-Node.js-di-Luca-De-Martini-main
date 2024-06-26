# API di gestione di viaggi e paesi

Questo progetto implementa un'API RESTful per la gestione di viaggi e paesi utilizzando Node.js, Express.js e MongoDB.

## Requisiti

- Node.js
- MongoDB

## Installazione

1. Clona il repository:

2. Installa le dipendenze:

3. Crea un file `.env` nella radice del progetto e imposta le seguenti variabili d'ambiente:


## Utilizzo

1. Avvia il server:


2. Utilizza un'applicazione per fare richieste HTTP alle API, ad esempio Postman o cURL.

## Rotte disponibili

### Viaggi

- `POST /travels`: Inserisce un nuovo viaggio.
- `PUT /travels/:travelId`: Modifica un viaggio esistente.
- `DELETE /travels/:travelId`: Cancella un viaggio esistente.
- `GET /travels/latest/:limit`: Visualizza le ultime disponibilità dei viaggi.

### Paesi

- `POST /countries`: Inserisce un nuovo paese.
- `PUT /countries/:countryId`: Modifica un paese esistente.
- `DELETE /countries/:countryId`: Cancella un paese esistente.

