<template>
   <section class="privacy">
      <div class="text-center mt-5 pt-5">
         <h1 class="title">Informativa Privacy</h1>
      </div>
      <div class="container-fluid">
         <div class="row">
            <div class="col pt-4 mt-5">
               <ul class="p-3 my-3">
                  <h4>Indice</h4>
                  <li class="mt-2 ps-2" v-for="(item, index) in privacyIndex" :key="index">{{ index + 1 }}. <a
                        class="link" :href="`#${item}`">{{ item }}</a></li>
               </ul>
               <ul class="mt-5 pt-4" v-for="(section, index) in privacyData">
                  <li>
                     <h2 :id="section.title" class="ps-2 mb-3">{{ index + 1 }}. {{ section.title }}</h2>
                  </li>
                  <li v-for="(row, index) in section.paragraphs">
                     <p class="m-0 paragrafo">{{ index + 1 }}. {{ row }} </p>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </section>
</template>
  
<script>
export default {
   data() {
      return {
         privacyIndex: [
            "Informazioni relative alla Privacy del sito",
            "Titolare del trattamento",
            "Luogo trattamento dati",
            "Base giuridica del trattamento",
            "Cookies",
            "Tipologia di trattamento dati",
            "Tipologia di dati acquisti",
            "Dati forniti dall'utente",
            "Finalità del trattamento dati",
            "Conservazione Dati",
            "Pagamenti",
            "Moduli di contatto",
            "Diritti dell'utente",
         ],
         privacyData: [
            {
               title: "Informazioni relative alla Privacy del sito",
               paragraphs: [
                  "In questa sezione sono contenute le informazioni relative alle modalità di gestione di Doctors NET, di proprietà di Team 4, in riferimento al trattamento dei dati degli utenti del sito stesso.",
                  "La presente informativa ha valore anche ai fini dell'articolo 13 del Regolamento (UE) n. 2016/679, relativo alla protezione delle persone fisiche con riguardo al trattamento dei dati personali nonché alla libera circolazione di tali dati, per i soggetti che interagiscono con Doctors NET.",
                  "L'informativa è resa solo per Doctors NET e non anche per altri siti web eventualmente consultati dall'utente tramite link in esso contenuti.",
                  "Scopo del presente documento è fornire indicazioni circa le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono fornire agli utenti al momento della connessione alle pagine web di Doctors NET, indipendentemente dagli scopi del collegamento stesso, secondo la legislazione Italiana ed Europea.",
                  "L'informativa può subire modifiche a causa dell'introduzione di nuove norme al riguardo, si invita pertanto l'utente a controllare periodicamente la presente pagina.",
                  "Se l'utente ha meno di quattordici anni, ai sensi dell'art.8, c.1 regolamento (UE) 2016/679, e dell'Art. 2 - Quinquies del D.Lgs 196/2003, così come modificato dal D.Lgs 181/18, dovrà legittimare il suo consenso attraverso l'autorizzazione dei genitori o di chi ne fa le veci.",
               ],
            },
            {
               title: "Titolare del trattamento",
               paragraphs: [
                  "Il titolare del trattamento è la persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali. Si occupa anche dei profili sulla sicurezza.",
                  "Relativamente al presente sito web il titolare del trattamento è: team4, e per ogni chiarimento o esercizio dei diritti dell'utente potrà contattarlo al seguente indirizzo mail: team4@admin.it.",
               ],
            },
            {
               title: "Luogo trattamento dati",
               paragraphs: [
                  "Il trattamento dei dati generato dall'utilizzo di Doctors NET avviene presso Il nostro gruppo Discord.",
                  "In caso di necessità, i dati connessi al servizio newsletter possono essere trattati dal responsabile del trattamento o soggetti da esso incaricati a tal fine presso la relativa sede.",
               ],
            },
            {
               title: "Base giuridica del trattamento",
               paragraphs: [
                  "Il trattamento dei dati personali da parte di Doctors NET si basa sul consenso – ai sensi dell'art. 6, par. 1, lett. a) del Regolamento UE 2016/679 – espresso dall'utente mediante la navigazione su questo sito web e la sua consultazione, così accettando la presente informativa.",
                  "Il consenso è facoltativo e può essere revocato in qualsiasi momento mediante richiesta inviata a mezzo email a team4@admin.it precisando che, in tal caso, in assenza di consenso non potranno essere erogati alcuni servizi e la navigazione sul sito web potrebbe essere compromessa.",
               ],
            },
            {
               title: "Cookies",
               paragraphs: [
                  "Il trattamento dei dati personali è necessario per il perseguimento del legittimo interesse del titolare del trattamento per finalità di fornire informazioni circa l'attività di Doctors NET ai sensi dell'art. 6, par. 1, lett. f) del Regolamento UE 2016/679, nel rispetto di quanto previsto dal medesimo Regolamento.",
                  ` Il presente sito fa uso di Log Files nei quali vengono conservate informazioni raccolte in maniera automatizzata durante le visite degli utenti. Le informazioni raccolte potrebbero essere le seguenti:- indirizzo internet protocol (IP);- tipo di browser e parametri del dispositivo usato per connettersi al sito;- nome dell'internet service provider (ISP);- data e orario di visita;- pagina web di provenienza del visitatore (referral) e di uscita;- eventualmente il numero di click.`,
                  "Le suddette informazioni sono trattate in forma automatizzata e raccolte in forma esclusivamente aggregata al fine di verificare il corretto funzionamento del sito, e per motivi di sicurezza. Tali informazioni saranno trattate in base ai legittimi interessi del titolare.",
                  " A fini di sicurezza (filtri antispam, firewall, rilevazione virus), i dati registrati automaticamente possono eventualmente comprendere anche dati personali come l'indirizzo Ip, che potrebbe essere utilizzato, conformemente alle leggi vigenti in materia, al fine di bloccare tentativi di danneggiamento al sito medesimo o di recare danno ad altri utenti, o comunque attività dannose o costituenti reato. Tali dati non sono mai utilizzati per l'identificazione o la profilazione dell'utente, ma solo a fini di tutela del sito e dei suoi utenti, tali informazioni saranno trattate in base ai legittimi interessi del titolare.",
               ],
            },
            {
               title: "Tipologia di dati acquisiti",
               paragraphs: [
                  " Doctors NET raccoglie i dati degli utenti direttamente dal sito o da terze parti. I dati sono necessari per la navigazione del sito.",
                  `  I dati raccolti sono da Doctors NET sono:
              Nome, cognome, numero di cellulare, indirizzo email e prestazioni fornite
              `,
               ],
            },
            {
               title: "Dati forniti dall'utente",
               paragraphs: [
                  "  Qualora il sito consenta l'inserimento di commenti, oppure in caso di specifici servizi richiesti dall'utente, ivi compresi la possibilità di inviare il Curriculum Vitae per un eventuale rapporto lavorativo, il sito rileva automaticamente e registra alcuni dati identificativi dell'utente, compreso l'indirizzo mail. Tali dati si intendono volontariamente forniti dall'utente al momento della richiesta di erogazione del servizio.",
                  "Inserendo un commento o altra informazione l'utente accetta espressamente l'informativa privacy. I dati ricevuti verranno utilizzati esclusivamente per l'erogazione del servizio richiesto e per il solo tempo necessario per la fornitura del servizio.",
                  "Le informazioni che gli utenti del sito riterranno di rendere pubbliche tramite i servizi e gli strumenti messi a disposizione degli stessi, sono fornite dall'utente consapevolmente e volontariamente, esentando il presente sito da qualsiasi responsabilità in merito ad eventuali violazioni delle leggi. Spetta all'utente verificare di avere i permessi per l'immissione di dati personali di terzi o di contenuti tutelati dalle norme nazionali ed internazionali.",
                  " L'invio facoltativo, esplicito e volontario di posta elettronica agli indirizzi indicati su questo sito comporta la successiva acquisizione dell'indirizzo del mittente, necessario per rispondere alle richieste, nonché degli eventuali altri dati personali inseriti nella missiva.",
                  " Specifiche informative di sintesi verranno progressivamente riportate o visualizzate nelle pagine del sito predisposte per particolari servizi a richiesta.",
               ],
            },
            {
               title: "Finalità del trattamento dati",
               paragraphs: [
                  "  I dati raccolti dal sito durante il suo funzionamento sono utilizzati per finalità sopra indicate e per le seguenti finalità:Finalità di prestazione e marketing",
               ],
            },
            {
               title: "Conservazione Dati",
               paragraphs: [
                  "  Conformemente a quanto prescritto dall'art. 5.1(c) del Regolamento, i sistemi informativi e i programmi informatici utilizzati da Doctors NET sono configurati in modo da ridurre al minimo l'uso di dati personali e identificativi; tali dati saranno trattati solo nella misura necessaria per il conseguimento delle finalità indicate nella presente Policy.",
                  "I dati verranno conservati per il periodo di tempo strettamente necessario al conseguimento delle finalità in concreto perseguite e, in ogni caso, il criterio utilizzato per determinare il periodo di conservazione è improntato al rispetto dei termini consentiti dalle leggi applicabili e dai principi di minimizzazione del trattamento e limitazione della conservazione.",
                  "I dati utilizzati a fini di sicurezza (blocco tentativi di danneggiamento del sito) sono conservati per il tempo strettamente necessario al raggiungimento del fine anteriormente indicato.",
               ],
            },
            {
               title: "Pagamenti",
               paragraphs: [
                  "Doctors NET utilizza servizi di pagamento per eseguire pagamenti con carta di credito, bonifico bancario o altri strumenti. Doctors NET non raccoglie o acquisisce i dati usati per il pagamento.",
                  "I dati per il pagamento sono raccolti e acquisiti direttamente dal gestore del servizio di pagamento, come l'ente carta di credito, Paypal, Stripe o simili. Questi servizi possono effettuare invio di messaggi verso l'utente, per esempio email o sms di notifiche del pagamento.",
                  "I dati acquisiti e l'utilizzo degli stessi da parte di servizi terzi sono regolamentati dalle rispettive Privacy Policy alle quali si prega di fare riferimento.Braintrees.",
               ],
            },
            {
               title: "Moduli di contatto",
               paragraphs: [
                  "L'utente può compilare il/i moduli di contatto/richiesta informazioni, inserendo i propri dati e acconsentendo al loro uso per rispondere alle richieste di natura indicata nella intestazione del modulo.",
                  " Dati personali che potrebbero essere raccolti: Nome, Cognome e indirizzo email",
               ],
            },
            {
               title: "Diritti dell'utente",
               paragraphs: [
                  ` Viene garantito all'utente il rispetto dei suoi diritti nell'ambito della protezione dei dati personali. In linea con quanto ripreso e affermato dal GDPR, in relazione al trattamento dei propri dati personali, l'utente ha diritto di chiedere al Titolare:
            • L'accesso: l'utente può chiedere conferma che sia o meno in essere un trattamento di dati che lo riguarda, oltre a maggiori chiarimenti circa le informazioni di cui alla presente informativa;
            • La rettifica: può chiedere di rettificare o integrare i dati che ha fornito, qualora inesatti o incompleti;
            • La cancellazione: può chiedere che i suoi dati vengano cancellati, qualora non siano più necessari alle nostre finalità, in caso di revoca del consenso o opposizione al trattamento, in caso di trattamento illecito, ovvero sussista un obbligo legale di cancellazione o si riferiscano a soggetti minori di anni quattordici;
            • La limitazione: può chiedere che i suoi dati siano trattati solo ai fini della conservazione, con esclusioni di altri trattamenti, per il periodo necessario alla rettifica dei suoi dati, in caso di trattamento illecito per il quale si opponga alla cancellazione, qualora lei debba esercitare i suoi diritti in sede giudiziaria e i dati conservati dal Titolare le possono essere utili e, infine, in caso di opposizione al trattamento e sia in corso una verifica sulla prevalenza dei motivi legittimi del Titolare rispetto ai suoi.
            • L'opposizione: può opporsi in qualunque momento al trattamento dei suoi dati, salvo che vi siano motivi legittimi del Titolare per procedere al trattamento che prevalgano sui suoi, per esempio per l'esercizio o la propria difesa in sede giudiziaria.
            • La portabilità: può chiedere di ricevere i suoi dati, o di farli trasmettere ad altro titolare da lei indicato, in un formato strutturato, di uso comune e leggibile da dispositivo automatico.
            • La revoca: può revocare il suo consenso all'utilizzo di cookie (Cookie Policy) in qualsiasi momento, poiché in questo caso costituisca la base del trattamento. La revoca del consenso comunque non pregiudica la liceità del trattamento basata sul consenso svolto prima della revoca stessa.`,
                  "In qualsiasi momento l'utente può chiedere di esercitare i suddetti diritti a Doctors NET rivolgendosi all'indirizzo mail: team4@admin.it.",
                  "Inoltre, l'utente ha diritto di proporre reclamo nei confronti dell'Autorità di controllo italiana: \"Garante per la Protezione dei Dati Personali\" nel caso in cui ritenga che i suoi diritti siano stati violati da Doctors NET o nel caso in cui non ritenga soddisfacente la risposta di Doctors NET alle sue richieste.",
                  "Il presente documento, che costituisce la privacy policy di questo sito, è pubblicato all'indirizzo: doctorsnet.com",
                  "Esso può essere soggetto a modifiche o aggiornamenti. Qualora si tratti di modifiche ed aggiornamenti rilevanti questi saranno segnalati con apposite notifiche agli utenti.",
                  "Le versioni precedenti del documento saranno comunque consultabili a questa pagina.",
                  "Il documento è stato aggiornato in data 27/06/2023 per essere conforme alle disposizioni normative in materia, ed in particolare in conformità al Regolamento (UE) 2016/679.",
               ],
            },
            {
               title: "Scherzo finale",
               paragraphs: [
                  "È tutto uno scherzo, questa privacy policy non ha alcuna ragion d’essere, è stata creata soltanto per darsi un tono.",
               ],
            },
         ],

      }
   },

};
</script>
  
<style lang="scss" scoped>
@use "../assets/styles/_variables.scss" as *;

.title {
   font-size: 24px;
   text-transform: uppercase;
   color: $doc-blue;
   font-weight: bold;
}

h2 {
   font-size: 20px;
   color: $doc-blue;
   font-weight: bold;
}

h4 {
   font-size: 20px;
   color: $doc-blue;
   font-weight: bold;
}



li {
   color: $doc-blue;

   .link {
      font-size: 16px;
      color: $doc-blue;
      font-weight: bold;
      text-decoration: underline;
   }
}

ul {
   list-style-type: none;
}

.paragrafo {
   font-size: 15px;
   color: $doc-blue;

}


@media only screen and (min-width: 768px) {

   .title {
      font-size: 36px;
      text-transform: uppercase;
      color: $doc-blue;
      font-weight: bold;
   }

   h2 {
      font-size: 32px;
      color: $doc-blue;
      font-weight: bold;
   }

   h4 {
      font-size: 24px;
      color: $doc-blue;
      font-weight: bold;
   }

   link {
      font-size: 20px;
      color: $doc-blue;
      font-weight: bold;
      text-decoration: underline;
   }

   .paragrafo {
      font-size: 20px;
      color: $doc-blue;

   }


}






@media only screen and (min-width: 992px) {
   .title {
      font-size: 64px;
      text-transform: uppercase;
      color: $doc-blue;
      font-weight: bold;
   }

   h2 {
      font-size: 32px;
      color: $doc-blue;
      font-weight: bold;
   }

   h4 {
      font-size: 32px;
      color: $doc-blue;
      font-weight: bold;
   }

   link {
      font-size: 24px;
      color: $doc-blue;
      font-weight: bold;
      text-decoration: underline;
   }

   .paragrafo {
      font-size: 20px;
      color: $doc-blue;

   }
}






@media only screen and (min-width: 1200px) {
   .title {
      font-size: 64px;
      text-transform: uppercase;
      color: $doc-blue;
      font-weight: 600;

   }

   h2 {
      font-size: 32px;
      color: $doc-blue;
      font-weight: bold;
   }

   h4 {
      font-size: 32px;
      color: $doc-blue;
      font-weight: bold;
   }

   link {
      font-size: 24px;
      color: $doc-blue;
      font-weight: bold;
      text-decoration: underline;
   }

   .paragrafo {
      font-size: 20px;
      color: $doc-blue;

   }
}
</style>
  
  