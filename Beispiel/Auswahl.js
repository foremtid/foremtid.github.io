// Die Funktion „Warte“ akzeptiert eine Zeitangabe in Millisekunden als Parameter
// und simuliert eine asynchrone Operation, indem sie eine Verzögerung um die 
// übergebene Anzahl von Millisekunden verursacht.
async function Warte(ms) {
  // Der Rückgabewert ist ein Promise-Objekt
  // Die setTimeout-Funktion wird verwendet, um eine Verzögerung zu verursachen
  // Die resolve-Funktion wird als „Callback“ an setTimeout übergeben
  // um das „Promise“ nach Ablauf der Zeit aufzulösen
  return new Promise(resolve => setTimeout(resolve, ms));
}



let P1 = (1 + Math.sqrt(5)) / 2;
let P2 = (3 + Math.sqrt(5)) / 2;
let AktuelleFensterbreite = window.innerWidth;   // Werden benötigt, um auf
let AktuelleFensterhöhe   = window.innerHeight;  // Veränderungen zu reagieren
let Fensterbreite         = 0;
let Fensterhöhe           = 0;
let FenstermitteX         = Math.floor(Fensterbreite / 2);
let FenstermitteY         = Math.floor(Fensterhöhe / 2);
let HalbeAuswahlbreite    = 0;
let HalbeAuswahlhöhe      = 0;
let Skalierungsfaktor     = 1;
if (Fensterbreite > P2 * Fensterhöhe) {
  HalbeAuswahlhöhe   = Fensterhöhe - 32;
  HalbeAuswahlbreite = Math.max(0, Math.ceil(HalbeAuswahlhöhe * P2));
} else {
  HalbeAuswahlbreite = Fensterbreite - 32;
  HalbeAuswahlhöhe   = Math.max(0, Math.ceil(HalbeAuswahlbreite / P2));
}



const Auswahl              = document.getElementById('Auswahl');
const Auge                 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
Auge.id                    = 'Auge';
const IS_Martin            = document.createElementNS('http://www.w3.org/2000/svg', 'path');
IS_Martin.id               = 'IS_Martin';
const IS_Hundeschule       = document.createElementNS('http://www.w3.org/2000/svg', 'path');
IS_Hundeschule.id          = 'IS_Hundeschule';
const IS_Vermögensberatung = document.createElementNS('http://www.w3.org/2000/svg', 'path');
IS_Vermögensberatung.id    = 'IS_Vermögensberatung';
const Pupille              = document.createElementNS('http://www.w3.org/2000/svg', 'image');
Pupille.id                 = 'Pupille';

Auswahl.append(Auge);
Auswahl.append(IS_Martin);
Auswahl.append(IS_Hundeschule);
Auswahl.append(IS_Vermögensberatung);
Auswahl.append(Pupille);



async function MaßeNeuBestimmen(NeueBreite, NeueHöhe) {
  FenstermitteX     = Math.floor(NeueBreite / 2);
  FenstermitteY     = Math.floor(NeueHöhe / 2);
  if (NeueBreite > P2 * NeueHöhe) {
    Skalierungsfaktor  = 1 / P2 + (1 / P1) * (1 + Math.cos(Math.min(Math.PI, Math.sqrt(NeueHöhe * NeueHöhe + NeueBreite * NeueBreite) / 1402.41))) / 2; //687.55
    HalbeAuswahlhöhe   = Math.ceil((NeueHöhe / P1 - 32) * Skalierungsfaktor);
    HalbeAuswahlbreite = Math.ceil(HalbeAuswahlhöhe * P2);
  } else {
    Skalierungsfaktor = 1 / P2 + (1 / P1) * (1 + Math.cos(Math.min(Math.PI, Math.sqrt(NeueHöhe * NeueHöhe + NeueBreite * NeueBreite) / 1402.41))) / 2; //1222.31
    HalbeAuswahlbreite = Math.ceil((NeueBreite / P1 - 32) * Skalierungsfaktor);
    HalbeAuswahlhöhe   = Math.ceil(HalbeAuswahlbreite / P2);
  }
}



async function AugeNeuZeichnen() {
  let Pfad = "M " + (FenstermitteX + HalbeAuswahlbreite) + " " + FenstermitteY;
  let Stil = 'stroke-width: 3; stroke: #cdba80; fill: none; fill-rule: evenodd;';;

  for (let i = 1; i <= 360; i++) {
    Pfad = Pfad + " T " + (FenstermitteX + Math.cos(Math.PI * i / 180) * HalbeAuswahlbreite) + " " + (FenstermitteY - Math.sin(Math.PI * i / 180) * HalbeAuswahlhöhe);
  }
  Pfad = Pfad + " Z"

  Auge.style = Stil;
  //Auge.setAttribute('filter', 'url(#inner-shadow-glow)');
  Auge.setAttribute('d', Pfad);
}



async function PupilleNeuZeichnen() {
  let PK = document.getElementById('Pupillenkreis');
  PK.setAttribute('cx', FenstermitteX);
  PK.setAttribute('cy', FenstermitteY);
  PK.setAttribute('r', (HalbeAuswahlhöhe / P2));

  Pupille.setAttribute('x', (FenstermitteX - HalbeAuswahlhöhe / P2));
  Pupille.setAttribute('y', (FenstermitteY - HalbeAuswahlhöhe / P2));
  Pupille.setAttribute('width', (2 * HalbeAuswahlhöhe / P2));
  Pupille.setAttribute('height', (2 * HalbeAuswahlhöhe / P2));
  Pupille.setAttribute('href', 'Martin.png');
  Pupille.setAttribute('clip-path', 'url(#Pupillenpfad)');
}



async function ISMneuZeichnen() {
  let Stil = 'stroke-width: 3; stroke: #242424; fill: #608c8c; fill-rule: evenodd;'; //TODO
  let Pfad = "M " 
           + (FenstermitteX + Math.cos(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " L "
           + (FenstermitteX + Math.cos(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " A "
           + ((HalbeAuswahlhöhe) / P1) + " " + ((HalbeAuswahlhöhe) / P1) + " 0 0 0 "
           + (FenstermitteX + Math.cos(5 *  Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(5 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " L "
           + (FenstermitteX + Math.cos(5 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(5 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " A "
           + ((HalbeAuswahlhöhe + 12) / P2) + " " + ((HalbeAuswahlhöhe + 12) / P2) + " 0 0 1 "
           + (FenstermitteX + Math.cos(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " Z "
;
  IS_Martin.style = Stil;
  IS_Martin.setAttribute('d', Pfad);

  IS_Martin.addEventListener("mouseenter", () => {
    Pupille.setAttribute("href", "Tennisaufschlag2.png");
  });
  IS_Martin.addEventListener("mouseleave", () => {
    Pupille.setAttribute("href", "Martin.png");
  });
}



async function ISHneuZeichnen() {
  let Stil = 'stroke-width: 3; stroke: #242424; fill: #60a078; fill-rule: evenodd;'; //TODO
  let Pfad = "M " 
           + (FenstermitteX + Math.cos(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " L "
           + (FenstermitteX + Math.cos(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " A "
           + ((HalbeAuswahlhöhe) / P1) + " " + ((HalbeAuswahlhöhe) / P1) + " 0 0 0 "
           + (FenstermitteX + Math.cos(9 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(9 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " L "
           + (FenstermitteX + Math.cos(9 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(9 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " A "
           + ((HalbeAuswahlhöhe + 12) / P2) + " " + ((HalbeAuswahlhöhe + 12) / P2) + " 0 0 1 "
           + (FenstermitteX + Math.cos(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(5 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " Z "
;
  IS_Hundeschule.style = Stil;
  IS_Hundeschule.setAttribute('d', Pfad);

  IS_Hundeschule.addEventListener("mouseenter", () => {
    Pupille.setAttribute("href", "Flo.png");
  });
  IS_Hundeschule.addEventListener("mouseleave", () => {
    Pupille.setAttribute("href", "Martin.png");
  });
}



async function ISVneuZeichnen() {
  let Stil = 'stroke-width: 3; stroke: #242424; fill: #6078a0; fill-rule: evenodd;';
  let Pfad = "M " 
           + (FenstermitteX + Math.cos(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " L "
           + (FenstermitteX + Math.cos(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " A "
           + ((HalbeAuswahlhöhe) / P1) + " " + ((HalbeAuswahlhöhe) / P1) + " 0 0 0 "
           + (FenstermitteX + Math.cos(13 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) + " "
           + (FenstermitteY - Math.sin(13 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe) / P1)) 
           + " L "
           + (FenstermitteX + Math.cos(13 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(13 * Math.PI / 6 - 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " A "
           + ((HalbeAuswahlhöhe + 12) / P2) + " " + ((HalbeAuswahlhöhe + 12) / P2) + " 0 0 1 "
           + (FenstermitteX + Math.cos(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) + " "
           + (FenstermitteY - Math.sin(9 * Math.PI / 6 + 0.03) * ((HalbeAuswahlhöhe + 12) / P2)) 
           + " Z "
;
  IS_Vermögensberatung.style = Stil;
  IS_Vermögensberatung.setAttribute('d', Pfad);

  IS_Vermögensberatung.addEventListener("mouseenter", () => {
    Pupille.setAttribute("href", "Piratenschatzkarte.png");
  });
  IS_Vermögensberatung.addEventListener("mouseleave", () => {
    Pupille.setAttribute("href", "Martin.png");
  });
}



async function AnzeigenbereichAnpassen(NeueBreite, NeueHöhe) {
  Auswahl.setAttribute('width',  NeueBreite);
  Auswahl.setAttribute('height', NeueHöhe);
  Auswahl.setAttribute('viewBox', 0 + ' ' + 0 + ' ' + NeueBreite + ' ' + NeueHöhe);

  await MaßeNeuBestimmen(NeueBreite, NeueHöhe);
  //await AugeNeuZeichnen();
  await ISMneuZeichnen();
  await ISHneuZeichnen();
  await ISVneuZeichnen();
  await PupilleNeuZeichnen();

  Fensterbreite = NeueBreite;
  Fensterhöhe   = NeueHöhe;
}

async function Anzeigenwächter() {
  while (true) {
    await Warte(1000);

    AktuelleFensterbreite = window.innerWidth;
    AktuelleFensterhöhe   = window.innerHeight;
    if (AktuelleFensterbreite == Fensterbreite && AktuelleFensterhöhe == Fensterhöhe)
      continue;

    await AnzeigenbereichAnpassen(AktuelleFensterbreite, AktuelleFensterhöhe);
  }
}
Anzeigenwächter();





//Auswahl.setAttribute('viewBox', 0 + ' ' + 0 + ' ' + Fensterbreite + ' ' + Fensterhöhe);
//Auswahl.style = 'background-color: orangered;';

// Auge.id    = 'Auge';
// Auge.style = 'stroke-width: 1.5; stroke: #007654; fill: #CACACA; fill-rule: evenodd;';
// Auge.setAttribute('d', 'M 48 48 a 96 128 0 1 0 -32 0 a 17 33 0 1 0 25 0 Z M 22.500000000000004 -38.97114317029973 Q 23.336345735121395 -38.46987710464099 24.156397114527657 -37.94123223948109 Z');
//Auswahl.append(Auge);






/*
const HintergrundMartin = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
HintergrundMartin.setAttribute('id', 'HintergrundMartin');
HintergrundMartin.setAttribute('patternUnits', 'userSpaceOnUse');
HintergrundMartin.setAttribute('width', 100);
HintergrundMartin.setAttribute('height', 100);

const BildMartin = document.createElementNS('http://www.w3.org/2000/svg', 'image');
BildMartin.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'Tennisaufschlag.jpg'); // Pfad zum Bild
BildMartin.setAttribute('width', 100);
BildMartin.setAttribute('height', 100);
Hintergrund.appendChild(BildMartin);

let Definitionen = Auswahl.querySelector('defs');
if (!defs) {
  Definitionen = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  Auswahl.appendChild(Definitionen);
}
Definitionen.appendChild(HintergrundMartin);
*/






