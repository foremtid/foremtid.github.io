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



function Gestaltwandler() {
  const AktuellesAussehen = document.getElementById('SpezifischeDarstellungsregeln');

  const NeuesAussehen = document.createElement('link');
  NeuesAussehen.rel = 'stylesheet';
  NeuesAussehen.id = 'SpezifischeDarstellungsregeln';

  const AktuellerHintergrund = document.getElementById('Hintergrund');
  
  const NeuerHintergrund = document.createElement('iframe');
  NeuerHintergrund.id = "Hintergrund";
  NeuerHintergrund.style="height:100%; width:100%; position:fixed; top:0; left:0; z-index:-1; border: none;";

  if (AktuellesAussehen.href.includes('dunkel.css')) {
    NeuesAussehen.href = 'hell.css';
    NeuerHintergrund.src = "Rhombuskachel-Hintergrund_hell.svg";
  } else {
    NeuesAussehen.href = 'dunkel.css';
    NeuerHintergrund.src = "Rhombuskachel-Hintergrund_dunkel.svg";
  }

  document.head.appendChild(NeuesAussehen);
  document.head.removeChild(AktuellesAussehen);

  document.body.prepend(NeuerHintergrund);
  document.body.removeChild(AktuellerHintergrund);
}
