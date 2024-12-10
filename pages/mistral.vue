<template>
  <div
    class="section w-7/8 md:w-3/4 xl:1/2 flex flex-col justify-center items-center"
  >
    <AtomsHeadline level="h1">Trying out mistral</AtomsHeadline>

    <AtomsButton tag="button" variant="primary" class="w-12">Call</AtomsButton>
  </div>
</template>

<script setup lang="ts">
// const template =
//   'Du bist ein professioneller Journalist. Deine Aufgabe ist es eine kurze Zusammenfassung eines deutschen Nachrichtenartikels zu erstellen. Konzentriere dich auf faktische Korrektheit. Fasse den Artikel unten zusemmen, gekennzeichnet durch drei backticks.  Artikel: ```Polizeichefin rät Juden und queeren Menschen zu Vorsicht in Teilen Berlins. Barbara Slowik mahnt hinsichtlich Vierteln mit mehrheitlich arabischstämmiger Bevölkerung, sieht aber keine No-go-Areas in der deutschen Hauptstadt. Berlin – Die Berliner Polizeipräsidentin Barbara Slowik hat Juden und Homosexuellen geraten, in bestimmten Gegenden der deutschen Hauptstadt besonders vorsichtig zu sein. Es gebe zwar keine sogenannten No-go-Areas, also Gebiete, die zu gefährlich zum Betreten seien. "Es gibt allerdings Bereiche – und so ehrlich müssen wir an dieser Stelle sein –, da würde ich Menschen, die Kippa tragen oder offen schwul oder lesbisch sind, raten, aufmerksamer zu sein", sagte Slowik der Berliner Zeitung. Sie wolle dabei keine bestimmte Gruppe von Menschen als Täter "diffamieren", sagte Slowik. Zugleich erklärte sie: "Leider gibt es bestimmte Quartiere, in denen mehrheitlich arabischstämmige Menschen wohnen, die auch Sympathien für Terrorgruppen hegen. Offene Judenfeindlichkeit artikuliert sich dort gegen Menschen jüdischer Glaubensrichtung und Herkunft." Ermittlungen in zahlreichen Fällen Slowik betonte: "Die Gewaltdelikte gegen jüdische Menschen fallen glücklicherweise gering aus, wobei ohne Frage jede Tat eine zu viel ist. Dass Angst und Sorge bleiben, kann ich dennoch verstehen." Menschen aus der jüdisch-israelischen Community in Berlin würden die Gesamtzahl antisemitischer Straftaten wahrnehmen. Seit dem 7. Oktober 2023, dem Tag des Hamas-Angriffs auf Israel, habe die Polizei über 6200 Ermittlungen zum Thema Antisemitismus und Volksverhetzung eingeleitet. Das steigere verständlicherweise die Furcht innerhalb der Community, Ziel einer Attacke zu werden. Ein großer Teil der Ermittlungen befasse sich mit Hasspostings im Internet, außerdem Sachbeschädigungen und Propagandadelikten. Bei 1300 Ermittlungen wegen Gewalttaten gehe es meist um Angriffe oder Widerstand gegen Polizisten bei Demonstrationen. ```';

const article =
  'Human Rights Watch und ein UN-Sonderausschuss kritisieren Israels Kriegsführung im Gazastreifen scharf. Israel und auch die USA weisen die Vorwürfe zurück.Menschen in Nord-Gaza wurden wiederholt aufgerufen, das Gebiet zu verlassen. Human Rights Watch spricht von "systematischen Zwangsvertreibungen".  Täglich kommen neue Meldungen über Angriffe, Vertreibungen und Tote aus dem Gazastreifen. Am Montag wurden bei neuen israelischen Angriffen im Norden des Gazastreifens palästinensischen Angaben zufolge fast 100 Menschen getötet. Ein fünfstöckiges Wohnhaus in Beit Lahiya sei getroffen worden, allein dort seien 72 Menschen getötet worden. Im Zentrum des Küstengebiets wurden weitere Tote gemeldet. Hilfsorganisationen sprechen seit Monaten von einer humanitären Katastrophe in dem Küstengebiet und warnen, dass sich vor allem im Norden des Gazastreifens die Lage derzeit immer weiter verschlimmert. Nordgaza steht im Fokus einer Offensive von Israels Armee, die angibt, gegen Terroristen vorzugehen, die sich in Jabalia, Beit Hanoun und Beit Lahiya neu gruppiert hätten. Heftige Kritik an Israels Kriegsführung kam zuletzt von der Uno und Human Rights Watch (HRW). Die Menschenrechtsorganisation warf Israel eine absichtliche Massenvertreibung von Zivilisten im Gazastreifen vor und kritisierte dies als Kriegsverbrechen. Zwangsvertreibungen seien weitverbreitet, hieß es vergangene Woche in einem Bericht der Organisation. "Die Beweise zeigen, dass sie systematisch und Teil einer staatlichen Politik sind. Solche Taten stellen auch Verbrechen gegen die Menschlichkeit dar."';
const title =
  'Systematische Zwangsvertreibung", "Genozid-Merkmale": Schwere Vorwürfe gegen Israel';

const persona =
  "You are professional german journalist. You excel at rewriting german articles that are emotionally calming.";
const audience =
  "Your target group are german people who are extremely emotionally distressed.";
const instruction = "Rewrite the tone of the text";
const context =
  "Modify the languge in the news article to reduce alarming or sensational terms. Avoid describing specifics about violence like how many people died or what kind of violence exactly happened.";
const tone = "Your tone should be very softening, professional and calming.";
const text = `The article body is denoted by three dashes. The article title is denoted by angle brackets. Article Title: <${title}>. Article body --- ${article} ---`;

const template = persona + instruction + audience + context + tone + text;

onMounted(() => {
  async function callMistral() {
    console.log("clicked");
    const { data, error: fetchError } = await $fetch("/api/mistral", {
      method: "POST",
    });
  }

  callMistral();
});
</script>
