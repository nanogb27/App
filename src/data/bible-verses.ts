export interface BibleVerse {
  text: string;
  reference: string;
}

export const bibleVerses: BibleVerse[] = [
  { text: "Todo lo puedo en Cristo que me fortalece.", reference: "Filipenses 4:13" },
  { text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", reference: "Jeremías 29:11" },
  { text: "Esforzaos y cobrad ánimo; no temáis, ni tengáis miedo de ellos, porque Jehová tu Dios es el que va contigo; no te dejará, ni te desamparará.", reference: "Deuteronomio 31:6" },
  { text: "Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.", reference: "Proverbios 3:5" },
  { text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", reference: "Romanos 8:28" },
  { text: "El Señor es mi pastor; nada me faltará.", reference: "Salmos 23:1" },
  { text: "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.", reference: "Mateo 6:33" },
  { text: "No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir.", reference: "1 Corintios 10:13" },
  { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", reference: "Mateo 11:28" },
  { text: "Jehová es mi luz y mi salvación; ¿de quién temeré?", reference: "Salmos 27:1" },
  { text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.", reference: "Efesios 2:8" },
  { text: "He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.", reference: "Apocalipsis 3:20" },
  { text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.", reference: "Isaías 40:31" },
  { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.", reference: "Isaías 41:10" },
  { text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.", reference: "Juan 14:27" },
  { text: "Sed fuertes y valientes. No temáis ni os asustéis, porque Jehová vuestro Dios estará con vosotros dondequiera que vayáis.", reference: "Josué 1:9" },
  { text: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.", reference: "1 Corintios 13:4" },
  { text: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", reference: "Mateo 18:20" },
  { text: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", reference: "1 Tesalonicenses 5:18" },
  { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", reference: "Salmos 119:105" },
  { text: "Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.", reference: "Juan 14:6" },
  { text: "De cierto, de cierto os digo: El que cree en mí, tiene vida eterna.", reference: "Juan 6:47" },
  { text: "Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.", reference: "Gálatas 5:22-23" },
  { text: "Alégrese el corazón de los que buscan a Jehová.", reference: "1 Crónicas 16:10" },
  { text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.", reference: "Juan 1:1" },
  { text: "Pedid, y se os dará; buscad, y hallaréis; llamad, y se os abrirá.", reference: "Mateo 7:7" },
  { text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", reference: "Juan 3:16" },
  { text: "Bienaventurados los de limpio corazón, porque ellos verán a Dios.", reference: "Mateo 5:8" },
  { text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", reference: "1 Pedro 5:7" },
  { text: "Grande es Jehová, y digno de suprema alabanza; y su grandeza es inescrutable.", reference: "Salmos 145:3" },
];

export function getDailyVerse(): BibleVerse {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return bibleVerses[dayOfYear % bibleVerses.length];
}
