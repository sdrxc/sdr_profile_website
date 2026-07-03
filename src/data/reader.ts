export type Book = {
  title: string;
  author: string;
  year?: string;
  rating?: number; // out of 5
  cover?: string;
  note?: string;
  genre?: string;
};

// A favourite quote — append yours here.
export type Quote = {
  text: string;
  author?: string; // who said / wrote it
  source?: string; // book, film, essay…
  note?: string;   // why it stuck with you
};

// A shayari / ghazal couplet or verse — append yours here.
// `text` can be multi-line (use \n for line breaks); script can be Hindi/Urdu/Roman.
export type Verse = {
  text: string;
  poet?: string;            // shayar / poet
  kind?: "shayari" | "ghazal";
  translation?: string;     // optional English rendering
  note?: string;            // a line on why you love it
};

// genre → accent color for the distribution viz
export const genreColors: Record<string, string> = {
  Fantasy: "#a855f7",
  "Literary Fiction": "#ec4899",
  Nonfiction: "#22d3ee",
  "Sci-Fi": "#a3e635",
  Classic: "#f59e0b",
};

export const reader = {
  intro:
    "I read widely and slowly — fiction to rewire how I see, nonfiction to learn how things work. The shelf:",
  current: [
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      year: "2021",
      genre: "Sci-Fi",
      note: "Hard sci-fi, a lone astronaut, and the best fictional alien friendship.",
    },
  ] as Book[],
  queue: [
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: "1866", genre: "Classic" },
  ] as Book[],
  finished: [
    { title: "Why the Poor Don't Kill Us: The Psychology of Indians", author: "Manu Joseph", year: "2025", genre: "Nonfiction" },
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", year: "2011", genre: "Nonfiction" },
    { title: "The White Tiger", author: "Aravind Adiga", year: "2008", genre: "Literary Fiction" },
    { title: "Midnight's Children", author: "Salman Rushdie", year: "1981", genre: "Literary Fiction" },
    { title: "Life of Pi", author: "Yann Martel", year: "2001", genre: "Literary Fiction" },
    { title: "Harry Potter and the Philosopher's Stone", author: "J. K. Rowling", year: "1997", genre: "Fantasy" },
    { title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", year: "1998", genre: "Fantasy" },
    { title: "Harry Potter and the Prisoner of Azkaban", author: "J. K. Rowling", year: "1999", genre: "Fantasy" },
    { title: "Harry Potter and the Goblet of Fire", author: "J. K. Rowling", year: "2000", genre: "Fantasy" },
    { title: "Harry Potter and the Order of the Phoenix", author: "J. K. Rowling", year: "2003", genre: "Fantasy" },
    { title: "Harry Potter and the Half-Blood Prince", author: "J. K. Rowling", year: "2005", genre: "Fantasy" },
    { title: "Harry Potter and the Deathly Hallows", author: "J. K. Rowling", year: "2007", genre: "Fantasy" },
  ] as Book[],

  // ── Favourite quotes ── append yours below ──
  quotes: [
    {
      text: "A reader lives a thousand lives before he dies. The man who never reads lives only one.",
      author: "George R. R. Martin",
      source: "A Dance with Dragons",
    },
  ] as Quote[],

  // ── Shayari & Ghazals (Hindi / Urdu) ── append yours below ──
  verses: [
    {
      text: "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले",
      poet: "Mirza Ghalib",
      kind: "ghazal",
      translation:
        "A thousand desires such, that each could take a life —\nmany of mine were fulfilled, yet too few they were.",
    },
    {
      text: "हाल ऐसा नहीं कि तुम से कहें\nएक झगड़ा नहीं कि तुम से कहें\nज़ेर-ए-लब आह भी मुहाल हुई\nदर्द इतना नहीं कि तुम से कहें",
      poet: "Mahboob Khizan",
      kind: "ghazal",
      translation:
        "Things aren't such that I'd tell you of them,\nthere isn't even a quarrel I'd tell you of —\neven a sigh beneath the breath has grown impossible;\nthe pain isn't so much that I'd tell you of it.",
    },
    {
      text: "लम्बी है ग़म की शाम, मगर शाम ही तो है",
      poet: "Faiz Ahmad Faiz",
      kind: "shayari",
      translation: "Long is the evening of sorrow — but it is, after all, only an evening.",
    },
    {
      text: "दोनों जहान तेरी मोहब्बत में हार के\nवो जा रहा है कोई शब-ए-ग़म गुज़ार के\n\nवीराँ है मय-कदा ख़ुम-ओ-साग़र उदास हैं\nतुम क्या गए कि रूठ गए दिन बहार के\n\nइक फ़ुर्सत-ए-गुनाह मिली वो भी चार दिन\nदेखे हैं हम ने हौसले परवरदिगार के\n\nदुनिया ने तेरी याद से बेगाना कर दिया\nतुझ से भी दिल-फ़रेब हैं ग़म रोज़गार के\n\nभूले से मुस्कुरा तो दिए थे वो आज 'फ़ैज़'\nमत पूछ वलवले दिल-ए-ना-कर्दा-कार के",
      poet: "Faiz Ahmad Faiz",
      kind: "ghazal",
      translation:
        "Losing both worlds in your love,\nsomeone walks away, passing one more night of grief.\n\nThe tavern lies desolate, jar and goblet forlorn —\nyou left, and the days of spring sulked away.\n\nA brief respite for sin, and that too but four days:\nsuch is the courage I have seen of the Sustainer.\n\nThe world estranged me from your memory —\nthe sorrows of livelihood beguile even more than you.\n\nAbsently, he did smile today, O Faiz —\nask not the raptures of a heart that left its work undone.",
      note: "परवरदिगार (Parwardigar) — 'the Sustainer', the one who nurtures and protects (Persian).",
    },
    {
      text: "आए कुछ अब्र कुछ शराब आए\nइस के बा'द आए जो अज़ाब आए\n\nबाम-ए-मीना से माहताब उतरे\nदस्त-ए-साक़ी में आफ़्ताब आए\n\nहर रग-ए-ख़ूँ में फिर चराग़ाँ हो\nसामने फिर वो बे-नक़ाब आए\n\nउम्र के हर वरक़ पे दिल की नज़र\nतेरी मेहर-ओ-वफ़ा के बाब आए\n\nकर रहा था ग़म-ए-जहाँ का हिसाब\nआज तुम याद बे-हिसाब आए\n\nन गई तेरे ग़म की सरदारी\nदिल में यूँ रोज़ इंक़लाब आए\n\nजल उठे बज़्म-ए-ग़ैर के दर-ओ-बाम\nजब भी हम ख़ानुमाँ-ख़राब आए\n\nइस तरह अपनी ख़ामुशी गूँजी\nगोया हर सम्त से जवाब आए\n\n'फ़ैज़' थी राह सर-ब-सर मंज़िल\nहम जहाँ पहुँचे कामयाब आए",
      poet: "Faiz Ahmad Faiz",
      kind: "ghazal",
      translation:
        "Let some clouds gather, let some wine be poured —\nand after that, let whatever trials may come.\n\nFrom the tavern's rooftop, let the moon descend,\nand in the cupbearer's hand, let the sun arrive.\n\nLet every vein be lit again like a festival of lamps,\nlet that unveiled presence appear before me once more.\n\nOn every page of life, may the heart behold\nchapters filled with your kindness and fidelity.\n\nI was counting the sorrows of the world —\ntoday, you returned to memory beyond all measure.\n\nThe reign of your sorrow never faded;\neach day, a quiet revolution stirred within my heart.\n\nLet the doors and walls of strangers' gatherings blaze\nwhenever we arrive — ruined, without a home.\n\nSuch was the resonance of my silence,\nas though answers came from every direction.\n\nO Faiz, the journey itself became the destination —\nwherever we arrived, we arrived fulfilled.",
      note: "Immortalised in Mehdi Hassan's voice.",
    },
    {
      text: "मकतब-ए-इश्क़ का दस्तूर निराला देखा\nउस को छुट्टी न मिली जिस को सबक़ याद हुआ",
      kind: "shayari",
      translation:
        "Strange I found the ways of love's schoolhouse:\nwhoever learned the lesson was never granted leave.",
      note: "मकतब (maktab) = school. Widely quoted; poet commonly cited as traditional.",
    },
    {
      text: "शमा बुझ भी जाए तो क्या है\nधड़कन रुक भी जाए तो क्या है\nइतना कुछ गँवा दिया है तुझे\nपाने की ख़ातिर — अब तुम मिल भी जाओ तो क्या है…!!",
      kind: "shayari",
      translation:
        "So what if the flame goes out,\nso what if the heartbeat stops —\nI have lost so much in trying to win you\nthat now, even were you mine, what of it?",
      note: "Poet unverified — tell me the source if you know it.",
    },
    {
      text: "पिया पिया कूक हारी हारी मैं,\nउस तक ना आवाज़ें जा रहीं…\nमोरे मन की पीर न जानी,\nकैसे कहूँ मैं दुखवा पिया।",
      kind: "shayari",
      translation:
        "Calling 'beloved, beloved', I have worn myself out —\nmy cries will not travel as far as you…\nYou never knew the ache of my heart —\nhow, then, do I speak my sorrow, beloved?",
      note: "Sufi/folk fragment — attribution uncertain. Share the kalaam if you'd like it credited.",
    },
  ] as Verse[],
};
