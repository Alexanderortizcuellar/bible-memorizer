import { HIDE_PERCENTAGE, MIN_HIDE_COUNT, PICK_OPTIONS_COUNT } from './constants';
import { shuffleArray, removeAccents } from './utils';

export function generatePickOptionsForIndex(index, order, wordBank) {
  if (index >= order.length) return [];
  const correctId = order[index];
  const correct = wordBank.find(w => w.id === correctId);
  if (!correct) return [];

  const uniqueValues = new Set();
  uniqueValues.add(removeAccents(correct.value.toUpperCase()));

  const distractorPool = [];
  for (const w of shuffleArray(wordBank)) {
    const upperVal = removeAccents(w.value.toUpperCase());
    if (!uniqueValues.has(upperVal)) {
      uniqueValues.add(upperVal);
      distractorPool.push(w);
    }
  }

  const distractors = distractorPool.slice(0, PICK_OPTIONS_COUNT - 1);
  return shuffleArray([correct, ...distractors]);
}

export const modes = {
  hide: {
    initialize(tokens) { return { hidden: new Set() }; },
    action(state, tokens) {
      const wordIds = tokens.filter(t => t.type === "word").map(t => t.id);
      const remaining = wordIds.filter(id => !state.hidden.has(id));
      if (remaining.length === 0) return state;

      let amountToHide = Math.max(MIN_HIDE_COUNT, Math.floor(remaining.length * HIDE_PERCENTAGE));
      amountToHide = Math.min(amountToHide, remaining.length);

      const selected = shuffleArray(remaining).slice(0, amountToHide);
      const newSet = new Set(state.hidden);
      selected.forEach(id => newSet.add(id));
      return { hidden: newSet };
    },
    isComplete(state, tokens) {
      const totalWords = tokens.filter(t => t.type === "word").length;
      return state.hidden.size >= totalWords;
    },
    getProgress(state, totalWords) {
      return totalWords === 0 ? 0 : (state.hidden.size / totalWords) * 100;
    }
  },
  pick: {
    initialize(tokens) {
      const words = tokens.filter(t => t.type === "word");
      const order = words.map(t => t.id);
      const wordBank = words.map(t => ({ id: t.id, value: t.value }));
      const currentOptions = generatePickOptionsForIndex(0, order, wordBank);
      return { index: 0, order, wordBank, currentOptions };
    },
    action(state, tokens, payload) {
      if (!payload) return state;
      const expected = state.order[state.index];
      if (payload.id === expected) {
        const nextIndex = state.index + 1;
        return {
          ...state,
          index: nextIndex,
          currentOptions: generatePickOptionsForIndex(nextIndex, state.order, state.wordBank)
        };
      }
      return state;
    },
    isComplete(state) {
      return state.index >= state.order.length;
    },
    getProgress(state, totalWords) {
      return totalWords === 0 ? 0 : (state.index / totalWords) * 100;
    }
  },
  type: {
    initialize(tokens) {
      const words = tokens.filter(t => t.type === "word");
      return { index: 0, order: words.map(t => t.id) };
    },
    action(state, tokens, payload) {
      if (!payload) return state;
      const expectedId = state.order[state.index];
      const token = tokens.find(t => t.id === expectedId);
      if (!token) return state;

      const userChar = removeAccents(payload.toLowerCase());
      const expectedChar = removeAccents(token.value[0].toLowerCase());

      if (userChar === expectedChar) return { ...state, index: state.index + 1 };
      return state;
    },
    isComplete(state) {
      return state.index >= state.order.length;
    },
    getProgress(state, totalWords) {
      return totalWords === 0 ? 0 : (state.index / totalWords) * 100;
    }
  }
};
