export interface Emotion {
  id: string;
  label: string;
  emoji: string;
  color: string; // tailwind semantic class
}

export interface EmotionVerse {
  text: string;
  reference: string;
}

export const emotions: Emotion[] = [
  { id: "angry", label: "Enojo", emoji: "😤", color: "bg-destructive/15 text-destructive" },
  { id: "sad", label: "Tristeza", emoji: "😢", color: "bg-primary/15 text-primary" },
  { id: "anxious", label: "Ansiedad", emoji: "😰", color: "bg-accent/20 text-accent-foreground" },
  { id: "lonely", label: "Soledad", emoji: "🥺", color: "bg-muted text-muted-foreground" },
  { id: "fearful", label: "Miedo", emoji: "😨", color: "bg-secondary text-secondary-foreground" },
  { id: "discouraged", label: "Desánimo", emoji: "😞", color: "bg-muted text-muted-foreground" },
  { id: "grateful", label: "Gratitud", emoji: "🙏", color: "bg-success/15 text-foreground" },
  { id: "happy", label: "Alegría", emoji: "😊", color: "bg-streak/15 text-foreground" },
  { id: "peaceful", label: "Paz", emoji: "😌", color: "bg-primary/15 text-primary" },
  { id: "confused", label: "Confusión", emoji: "😕", color: "bg-accent/20 text-accent-foreground" },
  { id: "guilty", label: "Culpa", emoji: "😔", color: "bg-secondary text-secondary-foreground" },
  { id: "hopeless", label: "Desesperanza", emoji: "💔", color: "bg-destructive/15 text-destructive" },
];

export const emotionVerses: Record<string, EmotionVerse[]> = {
  angry: [
    { text: "Airaos, pero no pequéis; no se ponga el sol sobre vuestro enojo.", reference: "Efesios 4:26" },
    { text: "La blanda respuesta quita la ira; mas la palabra áspera hace subir el furor.", reference: "Proverbios 15:1" },
    { text: "Mejor es el que tarda en airarse que el fuerte; y el que se enseñorea de su espíritu, que el que toma una ciudad.", reference: "Proverbios 16:32" },
    { text: "Por esto, mis amados hermanos, todo hombre sea pronto para oír, tardo para hablar, tardo para airarse.", reference: "Santiago 1:19" },
  ],
  sad: [
    { text: "Cercano está Jehová a los quebrantados de corazón; y salva a los contritos de espíritu.", reference: "Salmos 34:18" },
    { text: "Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor.", reference: "Apocalipsis 21:4" },
    { text: "Los que sembraron con lágrimas, con regocijo segarán.", reference: "Salmos 126:5" },
    { text: "Bienaventurados los que lloran, porque ellos recibirán consolación.", reference: "Mateo 5:4" },
  ],
  anxious: [
    { text: "No os afanéis por nada, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.", reference: "Filipenses 4:6" },
    { text: "Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.", reference: "1 Pedro 5:7" },
    { text: "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.", reference: "Juan 14:27" },
    { text: "Cuando mis inquietudes se multiplican dentro de mí, tus consolaciones alegran mi alma.", reference: "Salmos 94:19" },
  ],
  lonely: [
    { text: "No te desampararé, ni te dejaré.", reference: "Hebreos 13:5" },
    { text: "Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.", reference: "Mateo 18:20" },
    { text: "Jehová va delante de ti; él estará contigo, no te dejará, ni te desamparará; no temas ni te intimides.", reference: "Deuteronomio 31:8" },
    { text: "Aunque mi padre y mi madre me dejaran, con todo, Jehová me recogerá.", reference: "Salmos 27:10" },
  ],
  fearful: [
    { text: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.", reference: "Isaías 41:10" },
    { text: "Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.", reference: "2 Timoteo 1:7" },
    { text: "Jehová es mi luz y mi salvación; ¿de quién temeré?", reference: "Salmos 27:1" },
    { text: "En el amor no hay temor, sino que el perfecto amor echa fuera el temor.", reference: "1 Juan 4:18" },
  ],
  discouraged: [
    { text: "Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.", reference: "Isaías 40:31" },
    { text: "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.", reference: "Gálatas 6:9" },
    { text: "Todo lo puedo en Cristo que me fortalece.", reference: "Filipenses 4:13" },
    { text: "Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo.", reference: "Josué 1:9" },
  ],
  grateful: [
    { text: "Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.", reference: "1 Tesalonicenses 5:18" },
    { text: "Alabad a Jehová, porque él es bueno; porque para siempre es su misericordia.", reference: "Salmos 136:1" },
    { text: "Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces.", reference: "Santiago 1:17" },
    { text: "Bendeciré a Jehová en todo tiempo; su alabanza estará de continuo en mi boca.", reference: "Salmos 34:1" },
  ],
  happy: [
    { text: "Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.", reference: "Salmos 118:24" },
    { text: "El gozo de Jehová es vuestra fuerza.", reference: "Nehemías 8:10" },
    { text: "Estad siempre gozosos.", reference: "1 Tesalonicenses 5:16" },
    { text: "Me mostrarás la senda de la vida; en tu presencia hay plenitud de gozo.", reference: "Salmos 16:11" },
  ],
  peaceful: [
    { text: "Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.", reference: "Filipenses 4:7" },
    { text: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera.", reference: "Isaías 26:3" },
    { text: "Aquietaos, y conoced que yo soy Dios.", reference: "Salmos 46:10" },
    { text: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.", reference: "Mateo 11:28" },
  ],
  confused: [
    { text: "Confía en Jehová con todo tu corazón, y no te apoyes en tu propia prudencia.", reference: "Proverbios 3:5" },
    { text: "Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche.", reference: "Santiago 1:5" },
    { text: "Lámpara es a mis pies tu palabra, y lumbrera a mi camino.", reference: "Salmos 119:105" },
    { text: "Yo te instruiré, y te enseñaré el camino en que debes andar; sobre ti fijaré mis ojos.", reference: "Salmos 32:8" },
  ],
  guilty: [
    { text: "Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.", reference: "1 Juan 1:9" },
    { text: "Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús.", reference: "Romanos 8:1" },
    { text: "Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.", reference: "Salmos 103:12" },
    { text: "Venid luego, dice Jehová, y estemos a cuenta: si vuestros pecados fueren como la grana, como la nieve serán emblanquecidos.", reference: "Isaías 1:18" },
  ],
  hopeless: [
    { text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.", reference: "Jeremías 29:11" },
    { text: "Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.", reference: "Romanos 8:28" },
    { text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.", reference: "Romanos 5:8" },
    { text: "Claman los justos, y Jehová oye, y los libra de todas sus angustias.", reference: "Salmos 34:17" },
  ],
};

export function getRandomVerseForEmotion(emotionId: string): EmotionVerse | null {
  const verses = emotionVerses[emotionId];
  if (!verses || verses.length === 0) return null;
  return verses[Math.floor(Math.random() * verses.length)];
}
