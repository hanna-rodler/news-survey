import { Mistral } from "@mistralai/mistralai";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const NUXT_MISTRAL_API_KEY = useRuntimeConfig().private.NUXT_MISTRAL_API_KEY;
  const apiKey = NUXT_MISTRAL_API_KEY;
  const article =
    'Human Rights Watch und ein UN-Sonderausschuss kritisieren Israels Kriegsführung im Gazastreifen scharf. Israel und auch die USA weisen die Vorwürfe zurück.Menschen in Nord-Gaza wurden wiederholt aufgerufen, das Gebiet zu verlassen. Human Rights Watch spricht von "systematischen Zwangsvertreibungen".  Täglich kommen neue Meldungen über Angriffe, Vertreibungen und Tote aus dem Gazastreifen. Am Montag wurden bei neuen israelischen Angriffen im Norden des Gazastreifens palästinensischen Angaben zufolge fast 100 Menschen getötet. Ein fünfstöckiges Wohnhaus in Beit Lahiya sei getroffen worden, allein dort seien 72 Menschen getötet worden. Im Zentrum des Küstengebiets wurden weitere Tote gemeldet. Hilfsorganisationen sprechen seit Monaten von einer humanitären Katastrophe in dem Küstengebiet und warnen, dass sich vor allem im Norden des Gazastreifens die Lage derzeit immer weiter verschlimmert. Nordgaza steht im Fokus einer Offensive von Israels Armee, die angibt, gegen Terroristen vorzugehen, die sich in Jabalia, Beit Hanoun und Beit Lahiya neu gruppiert hätten. Heftige Kritik an Israels Kriegsführung kam zuletzt von der Uno und Human Rights Watch (HRW). Die Menschenrechtsorganisation warf Israel eine absichtliche Massenvertreibung von Zivilisten im Gazastreifen vor und kritisierte dies als Kriegsverbrechen. Zwangsvertreibungen seien weitverbreitet, hieß es vergangene Woche in einem Bericht der Organisation. "Die Beweise zeigen, dass sie systematisch und Teil einer staatlichen Politik sind. Solche Taten stellen auch Verbrechen gegen die Menschlichkeit dar."';
  const title =
    'Systematische Zwangsvertreibung", "Genozid-Merkmale": Schwere Vorwürfe gegen Israel';

  const persona =
    "You are professional german journalist. You excel at rewriting german articles that are emotionally calming.";
  const audience =
    "Your target group are german people who are extremely emotionally distressed.";
  const instruction =
    "Rewrite the tone of the text. Do not add any aditional information.";
  const context =
    "Modify the languge in the news article to reduce alarming or sensational terms. Avoid describing specifics about violence like how many people died or what kind of violence exactly happened.";
  const tone =
    "Your tone should be very softening, professional and calming. The article should end without additional commentary on future hopes";

  const systemMessage = persona + instruction + audience + context + tone;

  const userText = `The article body is denoted by three dashes. The article title is denoted by angle brackets. Article Title: <${title}>. Article body --- ${article} ---`;

  const client = new Mistral({ apiKey: apiKey });

  const chatResponse = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userText },
    ],
  });

  console.log("Chat:", chatResponse.choices);
});
