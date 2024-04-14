/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
/*   Vorbereitung…                                                       */
/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
let HintergrundanimationAktiv = true;

let Streckfaktor = window.devicePixelRatio;

let Segmentlänge = 11.5 * Streckfaktor;

// Vertikaler Abstand von senkrechten Segmenten von ihrer vertikalen Start- und Endposition
let AbstandslückeS  = (8 - 4 * Math.sqrt(3)) * Streckfaktor;
// Horizontaler bzw. vertikaler Abstand von diagonalen Segmenten
// von ihrer horizontalen bzw. vertikalen Start- und Endposition
let AbstandslückeDX = AbstandslückeS * Math.cos(Math.PI / 6);
let AbstandslückeDY = AbstandslückeS * Math.sin(Math.PI / 6);

let AktuelleFensterbreite = 0;
let AktuelleFensterhöhe   = 0;
let Fensterbreite         = 0;
let Fensterhöhe           = 0;

let Spaltenbreite = Segmentlänge * Math.cos(Math.PI / 6);
let Zeilenhöhe    = Segmentlänge * 1.5;

let Spaltenanzahl         = 0;
let Zeilenanzahl          = 0;
let NeueSpaltenanzahl = Math.floor(window.innerWidth  / Spaltenbreite);
let NeueZeilenanzahl  = Math.floor(window.innerHeight / Zeilenhöhe);

// Der Versatz für das „viewBox“-Attribut
let xVersatz = -Math.floor((window.innerWidth  - Spaltenbreite * NeueSpaltenanzahl) / 2);
let yVersatz = -Math.floor((window.innerHeight - Zeilenhöhe    * NeueZeilenanzahl)  / 2);

const Hintergrund = document.getElementById('Hintergrund');
Hintergrund.setAttribute('viewBox', xVersatz + ' ' + yVersatz + ' ' + Fensterbreite + ' ' + Fensterhöhe);
/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */



/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
/*   Sonderfall: Mobiltelefone mit hoher Pixeldichte…                    */
/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
if (Streckfaktor > 1) {
  // Die allgemeine Darstellungsregel für „#Hintergrund line“ suchen und anpassen
  const cssLinkElement = document.querySelector('link[href="allgemein.css"]');
  const cssDokument = cssLinkElement.sheet;

  // Folgendes funktioniert nur, wenn die CSS-Datei vom selben Server geladen wird,
  // wie die HTML- und JavaScript-Dateien. Wenn man die Datei lokal betrachtet,
  // wird folgender Fehler ausgelöst:
  // Uncaught DOMException: CSSStyleSheet.cssRules getter: Not allowed to access cross-origin stylesheet
  // In einen Try-Catch-Block einschließen, um unerwartetes Verhalten zu vermeiden

  try {
    // Moderne HTML-Präsentationsprogramme unterstützen „cssRules“, Ältere kennen stattdessen „rules“
    const AllgemeineDarstellungsregeln = cssDokument.cssRules || cssDokument.rules;
    // Der Fehler ist aber nicht weiter schlimm und hat keine relevante Auswirkung, zumal dieser
    // Abschnitt ohnehin nur auf Geräten wie Mobiltelefonen, die eine höhere Pixeldichte als 1 haben,
    // ausgeführt werden würde – und solche Geräte rufen diesen Inhalt ja normalerweise auch tatsächlich
    // über eine Netzwerk-Verbindung ab, und nicht von dem lokalen Speicher.

    // Der Spread-Operator „...“ konvertiert die Liste in ein Array,
    // um dann den Index der gesuchten Regel herausfinden zu können.
    const RegelIndex = [...AllgemeineDarstellungsregeln]
                         .findIndex(Regel => Regel.selectorText === '#Hintergrund line');

    // Durch den Index kann der Eigenschaftswert angepasst werden.
    // Zuerst die Strichdicke:
    AllgemeineDarstellungsregeln[RegelIndex]
      .style.setProperty('stroke-width', 
                         parseFloat(AllgemeineDarstellungsregeln[RegelIndex]
                                    .style.getPropertyValue('stroke-width'))
                         * Math.sqrt(Streckfaktor)
                         + 'px');
    // Dann die Parameter für die Strichelung:
    AllgemeineDarstellungsregeln[RegelIndex]
      .style.setProperty('stroke-dasharray',
                         AllgemeineDarstellungsregeln[RegelIndex]
                           .style.getPropertyValue('stroke-dasharray')
                             .match(/-?\d+(\.\d+)?/g)
                               .map(Number)
                                 .map(Z => Z * Math.sqrt(Streckfaktor))
                                   .join('px, '));

  } catch (Ereignis) {
    console.log('================================ Bekannter abgefangener Konflikt: ================================');
    console.warn(Ereignis);
    console.log('==================================================================================================');
  }
}



/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
/*   Variablen, die wiederkehrend in den Animationsschritten verwendet   */
/*   werden                                                              */
/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */

    let RgbMin = 112;
    let RgbMax = 144;
    let rGbMin = 64;
    let rGbMax = 128;
    let rgBMin = 0;
    let rgBMax = 96;

/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */



/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */
/*   Funktionen, um den Hintergrund zu generieren und zu animieren…      */
/*   ~ ~ ~~ ~~~ ~~~~~ ~~~~~~~~ ~~~~~~~~~~~~~ ~~~~~~~~ ~~~~~ ~~~ ~~ ~ ~   */

// Ein senkrechtes Segment für die Zeile Z und die Spalte S erzeugen
async function S_SegmentErstellen(Z, S) {
  let NeuesSegment = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  NeuesSegment.setAttributeNS(null, 'id', 'L' + Z + '_' + S + '_1');
  NeuesSegment.setAttributeNS(null, 'x1', S * Spaltenbreite);
  NeuesSegment.setAttributeNS(null, 'x2', S * Spaltenbreite);

  if ((Z % 2 == 1 && S % 2 == 0) || (Z % 2 == 0 && S % 2 == 1)) {
    NeuesSegment.setAttributeNS(null, 'y1',      Z  * Zeilenhöhe + AbstandslückeS - Segmentlänge);
    NeuesSegment.setAttributeNS(null, 'y2',      Z  * Zeilenhöhe - AbstandslückeS);
  } else {
    NeuesSegment.setAttributeNS(null, 'y1', (Z - 1) * Zeilenhöhe + AbstandslückeS);
    NeuesSegment.setAttributeNS(null, 'y2', (Z - 1) * Zeilenhöhe - AbstandslückeS + Segmentlänge);
  }

  NeuesSegment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);

  Hintergrund.appendChild(NeuesSegment);
}



// Zwei diagonale Segmente für die Zeile Z und die Spalte S erzeugen
async function D_SegmenteErstellen(Z, S) {
  let NeuesSegment = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  NeuesSegment.setAttributeNS(null, 'id', 'L' + Z + '_' + S + '_0');
  NeuesSegment.setAttributeNS(null, 'x1', Spaltenbreite * (S - 1) + AbstandslückeDX);
  NeuesSegment.setAttributeNS(null, 'x2', Spaltenbreite *  S      - AbstandslückeDX);

  if ((Z % 2 == 1 && S % 2 == 1) || (Z % 2 == 0 && S % 2 == 0)) {
    NeuesSegment.setAttributeNS(null, 'y1', Zeilenhöhe *  Z      - AbstandslückeDY - Segmentlänge);
    NeuesSegment.setAttributeNS(null, 'y2', Zeilenhöhe * (Z - 1) + AbstandslückeDY);
  } else {
    NeuesSegment.setAttributeNS(null, 'y1', Zeilenhöhe * (Z - 1) + AbstandslückeDY);
    NeuesSegment.setAttributeNS(null, 'y2', Zeilenhöhe *  Z      - AbstandslückeDY - Segmentlänge);
  }

  NeuesSegment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);

  Hintergrund.appendChild(NeuesSegment);


  NeuesSegment = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  NeuesSegment.setAttributeNS(null, 'id', 'L' + Z + '_' + S + '_2');
  NeuesSegment.setAttributeNS(null, 'x1', Spaltenbreite * (S - 1) + AbstandslückeDX);
  NeuesSegment.setAttributeNS(null, 'x2', Spaltenbreite *  S      - AbstandslückeDX);

  if ((Z % 2 == 1 && S % 2 == 1) || (Z % 2 == 0 && S % 2 == 0)) {
    NeuesSegment.setAttributeNS(null, 'y1', Zeilenhöhe *  Z      - AbstandslückeDY);
    NeuesSegment.setAttributeNS(null, 'y2', Zeilenhöhe * (Z - 1) + AbstandslückeDY + Segmentlänge);
  } else {
    NeuesSegment.setAttributeNS(null, 'y1', Zeilenhöhe * (Z - 1) + AbstandslückeDY + Segmentlänge);
    NeuesSegment.setAttributeNS(null, 'y2', Zeilenhöhe *  Z      - AbstandslückeDY);
  }

  NeuesSegment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);

  Hintergrund.appendChild(NeuesSegment);
}



// Das Segmenteraster durch Auffüllen an den Anzeigebereich anpassen
async function RasterAuffüllen() {
  if (Zeilenanzahl < NeueZeilenanzahl) {
    for (let Z = Zeilenanzahl + 1; Z <= NeueZeilenanzahl; Z++) {
      // Erzeuge erstes Strichlein…
      await S_SegmentErstellen(Z, 0);
      for (let S = 1; S <= Spaltenanzahl; S++) {
        // Die drei Liniensgemente erstellen…
        await S_SegmentErstellen(Z, S);
        await D_SegmenteErstellen(Z, S);
      }
    }
    Zeilenanzahl = NeueZeilenanzahl;
  }

  if (Spaltenanzahl < NeueSpaltenanzahl) {
    for (let Z = 1; Z <= NeueZeilenanzahl; Z++) {
      for (let S = Spaltenanzahl + 1; S <= NeueSpaltenanzahl; S++) {
        // Die drei Liniensegmente erstellen…
        await S_SegmentErstellen(Z, S);
        await D_SegmenteErstellen(Z, S);
      }
    }
    Spaltenanzahl = NeueSpaltenanzahl;
  }
}



// Das Segmenteraster durch Bereinigung an den Anzeigebereich anpassen
async function RasterBereinigen() {
  let Segment;

  if (NeueSpaltenanzahl < Spaltenanzahl) {
    for (let Z = 1; Z <= Zeilenanzahl; Z++) {
      for (let S = (NeueSpaltenanzahl + 1); S <= Spaltenanzahl; S++) {
        for (let I = 0; I <= 2; I++) {
          Segment = document.getElementById('L' + Z + '_' + S + '_' + I);
          if (Segment) await Segment.remove();
        }
      }
    }
    Spaltenanzahl = NeueSpaltenanzahl;
  }

  if (NeueZeilenanzahl < Zeilenanzahl) {
    for (let Z = (NeueZeilenanzahl + 1); Z <= Zeilenanzahl; Z++) {
      Segment = document.getElementById('L' + Z + '_0_1');
      if (Segment) await Segment.remove();
      for (let S = 1; S <= Spaltenanzahl; S++) {
        for (let I = 0; I <= 2; I++) {
          Segment = document.getElementById('L' + Z + '_' + S + '_' + I);
          if (Segment) await Segment.remove();
        }
      }
    }
    Zeilenanzahl = NeueZeilenanzahl;
  }
}



// Das Segmenteraster an den Anzeigebereich anpassen
async function RasterAnAnzeigenbereichAnpassen(NeueBreite, NeueHöhe) {
  // Raster auffüllen, falls die Breite oder die Höhe des Anzeigenbereichs die Rasterbreite oder die Rasterhöhe überschreiten
  // Raster bereinigen, falls die Rasterbreite oder die Rasterhöhe den Anzeigebereich überschreiten
  NeueSpaltenanzahl = Math.floor(NeueBreite / Spaltenbreite);
  NeueZeilenanzahl  = Math.floor(NeueHöhe / Zeilenhöhe);

  xVersatz = -Math.floor((NeueBreite - Spaltenbreite * NeueSpaltenanzahl) / 2);
  yVersatz = -Math.floor((NeueHöhe   - Zeilenhöhe    * NeueZeilenanzahl)  / 2);

  Hintergrund.setAttribute('width',  NeueBreite);
  Hintergrund.setAttribute('height', NeueHöhe);
  Hintergrund.setAttribute('viewBox', xVersatz + ' ' + yVersatz + ' ' + NeueBreite + ' ' + NeueHöhe);

  if (NeueZeilenanzahl < Zeilenanzahl || NeueSpaltenanzahl < Spaltenanzahl)
    await RasterBereinigen();

  if (NeueZeilenanzahl > Zeilenanzahl || NeueSpaltenanzahl > Spaltenanzahl)
    await RasterAuffüllen();

  Fensterbreite = NeueBreite;
  Fensterhöhe   = NeueHöhe;
}



async function Rasteranzeigenwächter() {
  while (true) {
    await Warte(1000);

    AktuelleFensterbreite = window.innerWidth;
    AktuelleFensterhöhe   = window.innerHeight;
    if (AktuelleFensterbreite == Fensterbreite && AktuelleFensterhöhe == Fensterhöhe)
      continue;

    await RasterAnAnzeigenbereichAnpassen(AktuelleFensterbreite, AktuelleFensterhöhe);
  }
}
Rasteranzeigenwächter();



async function Animationsschritt (Spalte, Zeile, Länge, Schritt) {
  let Index;
  let Segment;

  if (Länge == 0 || Schritt >= Länge) {
    Segment = document.getElementById('L' + Zeile + '_' + (Spalte-1) + '_1');
    if (Segment)
      Segment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);
    Segment = document.getElementById('L' + Zeile + '_' + Spalte + '_0');
    if (Segment)
      Segment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);
    Segment = document.getElementById('L' + Zeile + '_' + Spalte + '_1');
    if (Segment)
      Segment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);
    Segment = document.getElementById('L' + Zeile + '_' + Spalte + '_2');
    if (Segment)
      Segment.style.stroke = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);
  } else {
    for (let Z = Zeile; Z >= Zeile - Schritt; Z--) {
      if (Z < 1 || Z > Zeilenanzahl) continue;
      for (let I = 0; I <= 2; I ++) {
        Segment = document.getElementById('L' + Z + '_' + Spalte + '_' + I);
        if (Segment)
          if (hell == 0)
            Segment.style.stroke = await ZufallsRGB(await Wachstumsfunktion(RgbMax, RgbMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(255, RgbMax, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(rGbMax, rGbMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(255, rGbMax, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(rgBMax, rgBMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(255, rgBMax, Länge, Schritt + Zeile - Z));
          else
            Segment.style.stroke = await ZufallsRGB(await Wachstumsfunktion(0, RgbMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(RgbMin, RgbMax, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(0, rGbMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(rGbMin, rGbMax, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(0, rgBMin, Länge, Schritt + Zeile - Z),
                                                    await Wachstumsfunktion(rgBMin, rgBMax, Länge, Schritt + Zeile - Z));
      }

      Segment = document.getElementById('L' + Z + '_' + (Spalte - 1) + '_1');
      if (Segment)
        if (hell == 0)
          Segment.style.stroke = await ZufallsRGB(await Wachstumsfunktion(RgbMax, RgbMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(255, RgbMax, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(rGbMax, rGbMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(255, rGbMax, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(rgBMax, rgBMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(255, rgBMax, Länge, Schritt + Zeile - Z));
        else
          Segment.style.stroke = await ZufallsRGB(await Wachstumsfunktion(0, RgbMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(RgbMin, RgbMax, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(0, rGbMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(rGbMin, rGbMax, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(0, rgBMin, Länge, Schritt + Zeile - Z),
                                                  await Wachstumsfunktion(rgBMin, rgBMax, Länge, Schritt + Zeile - Z));
    }
  }
}



async function SegmentAufhellenOderVerdunkeln (Z, S, I, H) {
  let Segment = document.getElementById('L' + Z + '_' + S + '_' + I);
  let RGB;
  if (Segment)
    if (H == 0) {
      RGB = await ZufallsRGB(RgbMin, RgbMax, rGbMin, rGbMax, rgBMin, rgBMax);
      Segment.style.stroke = RGB;
    } else
      if (hell == 0) {
        RGB = await ZufallsRGB(RgbMax, 255, rGbMax, 255, rgBMax, 255);
        Segment.style.stroke = RGB;
      } else {
        RGB = await ZufallsRGB(0, RgbMin, 0, rGbMin, 0, rgBMin);
        Segment.style.stroke = RGB;
      }
}



let Aktionen = [];
async function AktionenHinzufügen() {
  if (!HintergrundanimationAktiv) return;
  let Aktion  = [];
  let Zeile   = 1 + Math.floor(Math.random() * (Zeilenanzahl));
  let Spalte  = 1 + Math.floor(Math.random() * (Spaltenanzahl));
  let Einfügeposition = parseInt(Math.floor(Aktionen.length * (0.85 + 0.15 * Math.random()) - 1));
  let AktionsNr, Index, Länge, Schritt;

  AktionsNr = 2 * Math.random();
  if (AktionsNr > 0.75) 
    AktionsNr = 2;
  else
    AktionsNr = 1;

  switch (AktionsNr) {
    case 1:
      Index = parseInt(Math.floor(Math.random() * 3));

      Aktion = [AktionsNr, Zeile, Spalte, Index, 1];
      await Aktionen.splice(Einfügeposition, 0, Aktion);

      Einfügeposition = (Aktionen.length - Einfügeposition > 5)? Einfügeposition + 5: Aktionen.length;
      Aktion = [AktionsNr, Zeile, Spalte, Index, 0];
      await Aktionen.splice(Einfügeposition, 0, Aktion);
      break;

    case 2:
      Länge = parseInt(Math.floor(Zeilenanzahl * (0.38 + 0.62 * Math.random())));
      if (Zeile + Länge > Zeilenanzahl) Zeile = Zeilenanzahl - Länge;

      Schritt = 0;
      while (Schritt < Länge) {
        Aktion = [AktionsNr, Spalte, Zeile, Länge, Schritt];
        await Aktionen.splice(Einfügeposition, 0, Aktion);

        Einfügeposition = (Aktionen.length - Einfügeposition > 2)? Einfügeposition + 2: Aktionen.length;
        Zeile++;
        Schritt++;
      }

      break;
  }
}


let Animationsgeschwindigkeit = 115;
async function Hintergrundanimation() {
  let Aktion;

  while (true) {
    if (Aktionen.length < 100)
      await AktionenHinzufügen();

    Aktion = await Aktionen.shift();
    if (Aktion)
      switch (Aktion[0]) {
        case 1:
          await SegmentAufhellenOderVerdunkeln(Aktion[1], Aktion[2], Aktion[3], Aktion[4]);
          break;

        case 2:
          await Animationsschritt(Aktion[1], Aktion[2], Aktion[3], Aktion[4]);
          break;
      } else {
        if (!HintergrundanimationAktiv)
          await Warte(1000);
        else
          continue;
      }

    await Warte(Animationsgeschwindigkeit);
  }
}
Hintergrundanimation();
