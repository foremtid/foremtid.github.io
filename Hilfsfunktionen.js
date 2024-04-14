let hell = 0;

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



async function Gestaltwandler() {
  const AktuellesAussehen = document.getElementById('SpezifischeDarstellungsregeln');

  const NeuesAussehen = document.createElement('link');
  NeuesAussehen.id = 'SpezifischeDarstellungsregeln';
  NeuesAussehen.rel = 'stylesheet';

  if (AktuellesAussehen.href.includes('dunkel.css')) {
    NeuesAussehen.href = 'hell.css';
    hell = 1;

    RgbMin = 192;
    RgbMax = 224;
    rGbMin = 134;
    rGbMax = 208;
    rgBMin =  80;
    rgBMax = 176;

    NeueSpaltenanzahl = 0;
    NeueZeilenanzahl  = 0;
    await RasterBereinigen();
    Fensterbreite = 0;
    Fensterhöhe   = 0;
  } else {
    NeuesAussehen.href = 'dunkel.css';
    hell = 0;

    RgbMin = 112;
    RgbMax = 144;
    rGbMin =  64;
    rGbMax = 128;
    rgBMin =   0;
    rgBMax =  96;

    NeueSpaltenanzahl = 0;
    NeueZeilenanzahl  = 0;
    await RasterBereinigen();
    Fensterbreite = 0;
    Fensterhöhe   = 0;
  }

  if (AktuellesAussehen.nextSibling) {
    document.head.insertBefore(NeuesAussehen, AktuellesAussehen.nextSibling);
  } else {
    document.head.appendChild(NeuesAussehen);
  }
  document.head.removeChild(AktuellesAussehen);
}



// h(t)       = A / (1 + exp(-bt + c))  [1]
// h(0)       = 1                       [2]
// h(N/2)     = A-1                     [3] (Variante 1)
// [2], [3]   => N += 2, Ergebnis -= 1
// Lösung des Gleichungssystems für die…
// (1.) steigende Wachstumsfunktion
// b: 4 * log(A-1) / N
// c: log(A-1)
// h(t) = A / (1 + (A-1)^(1 - 4*t/N))
// (2.) abnehmende Wachstumsfunktion
// bei rückwärts laufendem Parameter (N-t)
// b: 4 * log(A-1) / N
// c: 3 * log(A-1)
// h(t) = A / (1 + (A-1)^(3 - 4*(N-t)/N))
// Bedingungen: A > 1
// Abbildungsbereich: t ∈ [0, N]
// h(N)       = A-1                     [3'] (Variante 2)
// =>           c: log(A-1), b: log((A-1)²)/N
// =>           h(t) = A / (1 + (A-1)^(1 - 2*t/N))
async function Wachstumsfunktion(Ao, Az, N, t) {
  // if (t >= N/2) return Az; // für Variante 1
  if (t >= N) return Az;
  if (t <= 0) return Ao;

  let D;
  if (Ao < Az) {
    // steigende Wachstumsfunktion
    D = Az - Ao + 2;
    // return (Ao - 1 + D / (1 + (D - 1) ** (1 - 4 * t / N))); // Variante 1
    return (Ao - 1 + D / (1 + (D - 1) ** (1 - 2 * t / N))); // Variante 2
  } else if (Ao > Az) {
    // abnehmende Wachstumsfunktion
    D = Ao - Az + 2;
    // return (Az - 1 + D / (1 + (D - 1) ** (3 - 4 * (N-t) / N))); // Variante 1
    return (Az - 1 + D / (1 + (D - 1) ** (1 - 2 * (N-t) / N))); // Variante 2
  } else return Ao;
}



// Eine Funktion, die einen zufälligen RGB-Wert
// innerhalb eines vorgegebenen Spektrums zurückgibt
async function ZufallsRGB(R0, R1, G0, G1, B0, B1) {
  if (R0 < R1) {
    R0 = Math.floor(R0 + Math.random() * (R1 - R0 + 1));
  } else if (R0 > R1) {
    R0 = Math.floor(R1 + Math.random() * (R0 - R1 + 1));
  }

  if (G0 < G1) {
    G0 = Math.floor(G0 + Math.random() * (G1 - G0 + 1));
  } else if (G0 > G1) {
    G0 = Math.floor(G1 + Math.random() * (G0 - G1 + 1));
  }

  if (B0 < B1) {
    B0 = Math.floor(B0 + Math.random() * (B1 - B0 + 1));
  } else if (B0 > B1) {
    B0 = Math.floor(B1 + Math.random() * (B0 - B1 + 1));
  }

  if (R0 < 0) R0 = 0; if (R0 > 255) R0 = 255;
  if (G0 < 0) G0 = 0; if (G0 > 255) G0 = 255;
  if (B0 < 0) B0 = 0; if (B0 > 255) B0 = 255;
  
  return '#' + parseInt(R0).toString(16).padStart(2, '0')
             + parseInt(G0).toString(16).padStart(2, '0')
             + parseInt(B0).toString(16).padStart(2, '0');
}
