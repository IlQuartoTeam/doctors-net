![logo](/public/img/logo/logo-plain.png)

# Un progetto finale di Boolean Academy, diventato realtà. 

## Sviluppato da:

- Raffaele Capaldo [Github](https://github.com/raffaelecapaldo) | [Linkedin](https://www.linkedin.com/in/raffaelecapaldo/)
- Gaetano Spampinato [Github](https://github.com/Gaetano26) | [Linkedin](https://www.linkedin.com/in/gaetano-spampinato-349818280/)
- Nicolò Zibra [Github](https://github.com/nicolozibra1) | [Linkedin](https://www.linkedin.com/in/nicolozibra1/)
- Filippo Giampapa [Github](https://github.com/filecc) | [Linkedin](https://www.linkedin.com/in/filippogiampapa/)
- Filippo Verrone [Github](https://github.com/Lip-7) | [Linkedin](https://www.linkedin.com/in/filippo-verrone-b8540a280/)

## Screenshots e funzionamento
Doctors NET è un sito web ponte tra chi cerca uno specialista o una specialista e i dottori e le dottorese che sul sito web possono offrire i loro servizi. 
Il sito web è interamente sviluppato con Laravel (per la parte backend) e VUE 3 per la parte frontend. 

<br>

L'hompage del sitoweb.

![homepage](/public/img/screenshots/homepage.png)

Gli utenti possono ricercare un medico specialista per "città", "specializzazione", "numero di recensioni", "valutazione media".

![search](/public/img/screenshots/search.png)

La ricerca mostrerà per i primi i risultati consigliati da Doctors NET.

![doctors](/public/img/screenshots/doctors.png)

I dettagli della o della professionista sono visualizzabili nella loro pagina personale, cliccando sul bottone "dettagli". Dalla stessa pagina è possibile inviare un messaggio per richiedere una visita o lasciare una recensione.

![single](/public/img/screenshots/single.png)

La pagina personale, la dashboard, è completa e contiene tutte le funzionalità necessarie per interagire con gli utenti e ottenere le ultime statistiche.

![dashboard](/public/img/screenshots/dashboard.png)

## Come installare questo progetto

1. Clona questa repo
2. Run 

```bash 
npm install
npm run dev
```
3. Clona la repo del backend
https://github.com/IlQuartoTeam/backend-doctorsnet

5. Modifica il file ```env``` valorizzando le variabili
```php
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword

FILESYSTEM_DISK=public

BRAINTREE_ENV=sandbox
BRAINTREE_MERCHANT_ID=yourid
BRAINTREE_PUBLIC_KEY=yourkey
BRAINTREE_PRIVATE_KEY=yourprivatekey

```

4. Run 
```bash 
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed

```

Enjoy.
