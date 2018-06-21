export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getFunName() {
  const adjectives = [
    "Odd",
    "Woven",
    "Ghastly",
    "Fierce",
    "Brave",
    "Sly",
    "Beguiled",
    "Wise",
    "Royal",
    "Blunt",
    "Majestic",
    "Prideful",
    "Angry",
    "Jade",
    "Ugly",
    "Demonic",
    "Ferocious",
    "Stumbling",
    "Shining",
    "Golden",
    "Traveled",
    "Old",
    "Young",
    "Helpless",
    "Bewildered",
    "Creepy",
    "Bold",
    "Holy",
    "Sweaty",
    "Sweet",
    "Bitter",
    "Smelly",
    "Wet",
    "Dry",
    "Strict",
    "Goofy"
  ];

  const nouns = [
    "Steed",
    "Mare",
    "Murloc",
    "Kobold",
    "Snapjaw",
    "Elf",
    "Dire Wolf",
    "Gnat",
    "Basilisk",
    "Dragon",
    "Ancient",
    "Centaur",
    "Panda",
    "Bear",
    "Raptor",
    "Giant",
    "Meed",
    "Goblin",
    "Hound",
    "Condor",
    "Gargoyle",
    "Ghoul",
    "Gnoll",
    "Harpy",
    "Naga",
    "Scorpid",
    "Satyr",
    "Yeti",
    "Worg",
    "Wraith"
  ];

  return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}
