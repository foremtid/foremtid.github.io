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



const Auswahl              = document.getElementById('Auswahl');
const HGK                  = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      HGK.id               = 'HGK'; // Hintergrundkreis
const IKM                  = document.createElementNS('http://www.w3.org/2000/svg', 'image');
      IKM.id               = 'IKM'; // Innerer Kreis mit dem Begrüßungsbild
const KSO                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      KSO.id               = 'KSO'; // Kreissegment Oben
const KSL                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      KSL.id               = 'KSL'; // Kreissegment Links
const KSR                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      KSR.id               = 'KSR'; // Kreissegment Rechts
const SBTO                 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      SBTO.id              = 'SBTO'; // Segmentbeschriftungstext Oben
const SBEO                 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      SBEO.id              = 'SBEO'; // Segmentbeschriftungseigenschaften Oben
const BPO                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      BPO.id               = 'BPO'; // Beschriftungspfad Oben
const SBTL                 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      SBTL.id              = 'SBTO'; // Segmentbeschriftungstext Links
const SBEL                 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      SBEL.id              = 'SBEL'; // Segmentbeschriftungseigenschaften Links
const BPL                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      BPL.id               = 'BPL'; // Beschriftungspfad Links
const SBTR                 = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
      SBTR.id              = 'SBTO'; // Segmentbeschriftungstext Rechts
const SBER                 = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      SBER.id              = 'SBER'; // Segmentbeschriftungeigenschaften Rechts
const BPR                  = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      BPR.id               = 'BPR'; // Beschriftungspfad Rechts



const P1 = (1 + Math.sqrt(5)) / 2;
const P2 = (3 + Math.sqrt(5)) / 2;
const ZM = 500;



async function ZeichneHGK() {
  HGK.setAttribute('cx', ZM);
  HGK.setAttribute('cy', ZM);
  HGK.setAttribute('r', 253);
  HGK.setAttribute('stroke', '#202020');
  HGK.setAttribute('stroke-width', '124px');
  HGK.setAttribute('fill', '#202020');
  Auswahl.append(HGK);
}



async function ZeichneIKM() {
  let IK = document.getElementById('Inkreis');
  IK.setAttribute('cx', ZM);
  IK.setAttribute('cy', ZM);
  IK.setAttribute('r', (ZM / P2));

  IKM.setAttribute('x', (ZM - ZM / P2));
  IKM.setAttribute('y', (ZM - ZM / P2));
  IKM.setAttribute('width', (2 * ZM / P2));
  IKM.setAttribute('height', (2 * ZM / P2));
  IKM.setAttribute('href', 'HalloWelt.png');
  IKM.setAttribute('clip-path', 'url(#Kreispfad)');
  Auswahl.append(IKM);
}



async function ZeichneKSO() {
  let Stil = 'stroke-width: 3; stroke: #989898; fill: #608c8c; fill-rule: evenodd;';
  let Pfad = "M "
           + (ZM + Math.cos(Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " L "
           + (ZM + Math.cos(Math.PI / 6 + 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(Math.PI / 6 + 0.02) * ((ZM) / P1))
           + " A "
           + ((ZM) / P1) + " " + ((ZM) / P1) + " 0 0 0 "
           + (ZM + Math.cos(5 * Math.PI / 6 - 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(5 * Math.PI / 6 - 0.02) * ((ZM) / P1))
           + " L "
           + (ZM + Math.cos(5 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(5 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2))
           + " A "
           + ((ZM + 12) / P2) + " " + ((ZM + 12) / P2) + " 0 0 1 "
           + (ZM + Math.cos(Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " Z ";

  KSO.style = Stil;
  KSO.setAttribute('d', Pfad);
  Auswahl.append(KSO);

  KSO.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Martin.png");
  });
  KSO.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });

  Pfad = "M "
       + (ZM + Math.cos(5 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(5 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2))
       + " A "
       + ((ZM + 99) / P2) + " " + ((ZM + 99) / P2) + " 0 0 1 "
       + (ZM + Math.cos(Math.PI / 6 + 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(Math.PI / 6 + 0.02) * ((ZM + 99) / P2));
  BPO.setAttribute('d', Pfad);
  BPO.setAttribute('fill', 'none');
  BPO.setAttribute('stroke', 'none');
  Auswahl.append(BPO);

  SBEO.setAttribute('fill', '#fcac57');
  SBEO.setAttribute('font-size', '48');
  SBEO.setAttribute('font-family', '"Londrina Shadow", sans-serif');
  SBEO.setAttribute('font-weight', 'bold');
  SBEO.setAttribute('text-anchor', 'middle');

  SBTO.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#BPO");
  SBTO.setAttribute('startOffset', "50%");
  SBTO.textContent = "Martin Döhler";

  SBEO.appendChild(SBTO);
  Auswahl.appendChild(SBEO);

  SBEO.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Martin.png");
  });
  SBEO.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });
}



async function ZeichneKSL() {
  let Stil = 'stroke-width: 3; stroke: #989898; fill: #60a078; fill-rule: evenodd;';
  let Pfad = "M "
           + (ZM + Math.cos(5* Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(5* Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " L "
           + (ZM + Math.cos(5 * Math.PI / 6 + 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(5 * Math.PI / 6 + 0.02) * ((ZM) / P1))
           + " A "
           + ((ZM) / P1) + " " + ((ZM) / P1) + " 0 0 0 "
           + (ZM + Math.cos(9 * Math.PI / 6 - 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(9 * Math.PI / 6 - 0.02) * ((ZM) / P1))
           + " L "
           + (ZM + Math.cos(9 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(9 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2))
           + " A "
           + ((ZM + 12) / P2) + " " + ((ZM + 12) / P2) + " 0 0 1 "
           + (ZM + Math.cos(5 * Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(5 * Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " Z ";

  KSL.style = Stil;
  KSL.setAttribute('d', Pfad);
  Auswahl.append(KSL);

  KSL.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Hundeschule.png");
  });
  KSL.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });

  Pfad = "M "
       + (ZM + Math.cos(9 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(9 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2))
       + " A "
       + ((ZM + 99) / P2) + " " + ((ZM + 99) / P2) + " 0 0 1 "
       + (ZM + Math.cos(5 * Math.PI / 6 + 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(5 * Math.PI / 6 + 0.02) * ((ZM + 99) / P2));
  BPL.setAttribute('d', Pfad);
  BPL.setAttribute('fill', 'none');
  BPL.setAttribute('stroke', 'none');
  Auswahl.append(BPL);

  SBEL.setAttribute('fill', '#fcac57');
  SBEL.setAttribute('font-size', '48');
  SBEL.setAttribute('font-family', '"Londrina Shadow", sans-serif');
  SBEL.setAttribute('font-weight', 'bold');
  SBEL.setAttribute('text-anchor', 'middle');

  SBTL.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#BPL");
  SBTL.setAttribute('startOffset', "50%");
  SBTL.textContent = "Hundeschule";

  SBEL.appendChild(SBTL);
  Auswahl.appendChild(SBEL);

  SBEL.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Hundeschule.png");
  });
  SBEL.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });
}



async function ZeichneKSR() {
  let Stil = 'stroke-width: 3; stroke: #989898; fill: #6078a0; fill-rule: evenodd;';
  let Pfad = "M "
           + (ZM + Math.cos(9* Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(9* Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " L "
           + (ZM + Math.cos(9 * Math.PI / 6 + 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(9 * Math.PI / 6 + 0.02) * ((ZM) / P1))
           + " A "
           + ((ZM) / P1) + " " + ((ZM) / P1) + " 0 0 0 "
           + (ZM + Math.cos(13 * Math.PI / 6 - 0.02) * ((ZM) / P1)) + " "
           + (ZM - Math.sin(13 * Math.PI / 6 - 0.02) * ((ZM) / P1))
           + " L "
           + (ZM + Math.cos(13 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(13 * Math.PI / 6 - 0.02) * ((ZM + 12) / P2))
           + " A "
           + ((ZM + 12) / P2) + " " + ((ZM + 12) / P2) + " 0 0 1 "
           + (ZM + Math.cos(9 * Math.PI / 6 + 0.02) * ((ZM + 12) / P2)) + " "
           + (ZM - Math.sin(9 * Math.PI / 6 + 0.02) * ((ZM + 12) / P2))
           + " Z ";

  KSR.style = Stil;
  KSR.setAttribute('d', Pfad);
  Auswahl.append(KSR);

  KSR.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Vermoegensberatung.png");
  });
  KSR.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });

  Pfad = "M "
       + (ZM + Math.cos(13 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(13 * Math.PI / 6 - 0.02) * ((ZM + 99) / P2))
       + " A "
       + ((ZM + 99) / P2) + " " + ((ZM + 99) / P2) + " 0 0 1 "
       + (ZM + Math.cos(9 * Math.PI / 6 + 0.02) * ((ZM + 99) / P2)) + " "
       + (ZM - Math.sin(9 * Math.PI / 6 + 0.02) * ((ZM + 99) / P2));
  BPR.setAttribute('d', Pfad);
  BPR.setAttribute('fill', 'none');
  BPR.setAttribute('stroke', 'none');
  Auswahl.append(BPR);

  SBER.setAttribute('fill', '#fcac57');
  SBER.setAttribute('font-size', '48');
  SBER.setAttribute('font-family', '"Londrina Shadow", sans-serif');
  SBER.setAttribute('font-weight', 'bold');
  SBER.setAttribute('text-anchor', 'middle');

  SBTR.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#BPR");
  SBTR.setAttribute('startOffset', "50%");
  SBTR.textContent = "Vermögensberatung";

  SBER.appendChild(SBTR);
  Auswahl.appendChild(SBER);

  SBER.addEventListener("mouseenter", () => {
    IKM.setAttribute("href", "Vermoegensberatung.png");
  });
  SBER.addEventListener("mouseleave", () => {
    IKM.setAttribute("href", "HalloWelt.png");
  });
}



async function ZeichneAuswahlmenü() {
  await ZeichneHGK();
  await ZeichneIKM(); 
  await ZeichneKSO();
  await ZeichneKSL();
  await ZeichneKSR();
}
ZeichneAuswahlmenü();



