export function safeFetchJSON(url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error("Could not find data. Please check your inputs.");
    return res.json();
  });
}

export function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function parseVerseRange(input, maxVerse) {
  if (!input) return null;
  const clean = input.trim();

  if (clean.includes("-")) {
    const [start, end] = clean.split("-").map(v => parseInt(v.trim(), 10));
    if (isNaN(start) || isNaN(end) || start < 1 || end < start || end > maxVerse) return null;
    return { start, end };
  }

  const single = parseInt(clean, 10);
  if (isNaN(single) || single < 1 || single > maxVerse) return null;
  return { start: single, end: single };
}

export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function tokenizeText(text) {
  const regex = /(\s+|[^\p{L}\p{N}_]+|[\p{L}\p{N}_]+)/gu;
  const rawTokens = text.match(regex) || [];

  return rawTokens.map((value, index) => {
    let type = "word";
    if (/^\s+$/.test(value)) type = "space";
    else if (/^[^\p{L}\p{N}_]+$/u.test(value)) type = "punct";
    return { id: index, type, value };
  });
}
